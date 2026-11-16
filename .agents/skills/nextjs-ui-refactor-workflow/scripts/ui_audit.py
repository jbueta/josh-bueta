#!/usr/bin/env python3
"""Next.js & React UI Refactoring Audit & GitHub Sync CLI.

Provides deterministic auditing for Next.js/React codebases and rate-limited
GitHub repository metadata fetching for portfolio/showcase components.

Subcommands:
- audit-tokens: Scans source files for undefined CSS custom properties (var(--*))
  and optional single-theme mode violations (dark:* classes, useTheme hooks).
- audit-hydration: Scans TSX components for SSR/hydration anti-patterns such as
  onLoad opacity gates on <img> elements and fixed overlays missing createPortal.
- audit-assets: Verifies that all static asset paths (/path/to/file.ext)
  referenced in source files exist inside the public/ directory.
- fetch-github-repos: Fetches public repository metadata from the GitHub REST
  API with file-lock cross-process rate limiting and exponential backoff.
"""

import argparse
import json
import os
import re
import sys
import tempfile
import time
from pathlib import Path
from urllib import error as urllib_error
from urllib import parse as urllib_parse
from urllib import request as urllib_request


class RateLimitError(Exception):
    """Raised when the external API rate limit is exceeded."""


class GitHubAPIClient:
    """Rate-limited client for the GitHub REST API (v3).

    GitHub unauthenticated rate limit: 60 requests/hour (~1 req/min sustained,
    bursts allowed; we enforce 1 request per second with cross-process lock file
    and exponential backoff on 403/429/5xx).
    """

    BASE_URL = "https://api.github.com"
    REQUESTS_PER_SECOND = 1.0

    def __init__(self):
        self.delay = 1.0 / self.REQUESTS_PER_SECOND
        self.last_request_time = 0.0
        self.lock_path = Path(tempfile.gettempdir()) / "nextjs_ui_skill_github.lock"

    def _wait_for_rate_limit(self):
        """Enforces cross-process and in-process rate limiting via monotonic clock."""
        elapsed = time.monotonic() - self.last_request_time
        if elapsed < self.delay:
            time.sleep(self.delay - elapsed)

        try:
            if self.lock_path.exists():
                mtime = self.lock_path.stat().st_mtime
                wall_elapsed = time.time() - mtime
                if 0 <= wall_elapsed < self.delay:
                    time.sleep(self.delay - wall_elapsed)
            self.lock_path.write_text(str(time.time()), encoding="utf-8")
        except OSError:
            pass

    def _request(self, path: str, params: dict | None = None, retries: int = 3):
        url = f"{self.BASE_URL}{path}"
        if params:
            url = f"{url}?{urllib_parse.urlencode(params)}"

        for attempt in range(retries):
            self._wait_for_rate_limit()
            try:
                req = urllib_request.Request(url)
                req.add_header("Accept", "application/vnd.github.v3+json")
                req.add_header("User-Agent", "nextjs-ui-refactor-workflow-skill/1.0")
                with urllib_request.urlopen(req, timeout=20) as response:
                    self.last_request_time = time.monotonic()
                    return json.loads(response.read().decode("utf-8"))
            except urllib_error.HTTPError as e:
                self.last_request_time = time.monotonic()
                if e.code in (429, 403):
                    wait = 2**attempt
                    print(
                        f"Rate limited ({e.code}) from {url}, retrying in {wait}s "
                        f"(attempt {attempt + 1}/{retries})...",
                        file=sys.stderr,
                    )
                    if attempt == retries - 1:
                        raise RateLimitError(
                            f"HTTP {e.code} Rate Limit from {url}. "
                            f"Rate limit ({self.REQUESTS_PER_SECOND} req/s) exceeded."
                        ) from e
                    time.sleep(wait)
                    continue
                if e.code >= 500:
                    wait = 2**attempt
                    print(
                        f"Server error {e.code} from {url}, retrying in {wait}s "
                        f"(attempt {attempt + 1}/{retries})...",
                        file=sys.stderr,
                    )
                    if attempt == retries - 1:
                        raise RuntimeError(
                            f"Server error {e.code} from {url} after {retries} retries."
                        ) from e
                    time.sleep(wait)
                    continue
                try:
                    body = e.read().decode("utf-8", errors="replace")[:1000]
                except OSError:
                    body = str(e.reason)
                raise RuntimeError(f"HTTP {e.code} from {url}: {body}") from e
            except urllib_error.URLError as e:
                if attempt == retries - 1:
                    raise RuntimeError(
                        f"Failed to connect to {url} after {retries} attempts: {e}"
                    ) from e
                time.sleep(2**attempt)
        raise RuntimeError(f"Exhausted retries for {url}")

    def fetch_user_repos(self, username: str, limit: int):
        raw = self._request(
            f"/users/{username}/repos",
            params={"type": "all", "sort": "pushed", "per_page": min(limit, 100)},
        )
        results = []
        for repo in raw[:limit]:
            results.append(
                {
                    "id": repo.get("id"),
                    "name": repo.get("name"),
                    "full_name": repo.get("full_name"),
                    "description": repo.get("description"),
                    "html_url": repo.get("html_url"),
                    "homepage": repo.get("homepage"),
                    "stargazers_count": repo.get("stargazers_count", 0),
                    "forks_count": repo.get("forks_count", 0),
                    "language": repo.get("language"),
                    "topics": repo.get("topics", []),
                    "pushed_at": repo.get("pushed_at"),
                }
            )
        return {"username": username, "count": len(results), "repositories": results}


def iter_source_files(src_dir: Path, extensions: tuple[str, ...]):
    for root, _, files in os.walk(src_dir):
        for fname in sorted(files):
            if fname.endswith(extensions):
                yield Path(root) / fname


def audit_tokens(src_dir: Path, css_files: list[Path], single_theme: bool, limit: int):
    defined_vars: set[str] = set()
    def_pattern = re.compile(r"(--[a-zA-Z0-9_-]+)\s*:")
    font_var_pattern = re.compile(r'variable\s*:\s*["\'](--[a-zA-Z0-9_-]+)["\']')

    for css_path in css_files:
        if css_path.exists():
            content = css_path.read_text(encoding="utf-8", errors="replace")
            defined_vars.update(def_pattern.findall(content))

    for fpath in iter_source_files(src_dir, (".ts", ".tsx", ".css")):
        content = fpath.read_text(encoding="utf-8", errors="replace")
        defined_vars.update(def_pattern.findall(content))
        defined_vars.update(font_var_pattern.findall(content))

    use_pattern = re.compile(r"var\(\s*(--[a-zA-Z0-9_-]+)")
    dark_class_pattern = re.compile(r"\bdark:[a-zA-Z0-9_\-\[\]/]+")
    use_theme_pattern = re.compile(r"\buseTheme\s*\(")

    undefined_usages = []
    theme_warnings = []

    for fpath in iter_source_files(src_dir, (".ts", ".tsx", ".css")):
        lines = fpath.read_text(encoding="utf-8", errors="replace").splitlines()
        rel_path = fpath.as_posix()
        for line_no, line in enumerate(lines, start=1):
            for match in use_pattern.findall(line):
                if match not in defined_vars and len(undefined_usages) < limit:
                    undefined_usages.append(
                        {
                            "file": rel_path,
                            "line": line_no,
                            "variable": match,
                            "snippet": line.strip()[:160],
                        }
                    )
            if single_theme:
                for dm in dark_class_pattern.findall(line):
                    if len(theme_warnings) < limit:
                        theme_warnings.append(
                            {
                                "file": rel_path,
                                "line": line_no,
                                "type": "dark_tailwind_variant",
                                "token": dm,
                            }
                        )
                if use_theme_pattern.search(line) and len(theme_warnings) < limit:
                    theme_warnings.append(
                        {
                            "file": rel_path,
                            "line": line_no,
                            "type": "useTheme_hook_in_single_theme",
                            "token": "useTheme()",
                        }
                    )

    return {
        "status": "pass" if not undefined_usages else "fail",
        "defined_variables_count": len(defined_vars),
        "defined_variables": sorted(defined_vars),
        "undefined_usages_count": len(undefined_usages),
        "undefined_usages": undefined_usages,
        "single_theme_warnings_count": len(theme_warnings),
        "single_theme_warnings": theme_warnings,
    }


def audit_hydration(src_dir: Path, limit: int):
    findings = []
    onload_opacity_re = re.compile(r"opacity\s*:\s*loaded\s*\?")
    fixed_inset_re = re.compile(r"fixed\s+inset-0")

    for fpath in iter_source_files(src_dir, (".tsx", ".jsx")):
        content = fpath.read_text(encoding="utf-8", errors="replace")
        lines = content.splitlines()
        rel_path = fpath.as_posix()
        has_portal = "createPortal" in content

        for line_no, line in enumerate(lines, start=1):
            if onload_opacity_re.search(line) and len(findings) < limit:
                findings.append(
                    {
                        "file": rel_path,
                        "line": line_no,
                        "issue": "img_onload_opacity_gate",
                        "recommendation": (
                            "Avoid gating above-the-fold <img> visibility on React "
                            "onLoad state; cached images before hydration never fire "
                            "onLoad. Render immediately with fetchPriority='high'."
                        ),
                        "snippet": line.strip()[:160],
                    }
                )
            if (
                fixed_inset_re.search(line)
                and "z-[99" in line
                and not has_portal
                and len(findings) < limit
            ):
                findings.append(
                    {
                        "file": rel_path,
                        "line": line_no,
                        "issue": "modal_without_create_portal",
                        "recommendation": (
                            "Full-screen modals with high z-index inside transformed "
                            "or filtered parents should be rendered via createPortal "
                            "into document.body."
                        ),
                        "snippet": line.strip()[:160],
                    }
                )

    return {
        "status": "pass" if not findings else "warn",
        "findings_count": len(findings),
        "findings": findings,
    }


def audit_assets(src_dir: Path, public_dir: Path, limit: int):
    asset_re = re.compile(
        r'["\'](/[a-zA-Z0-9_\-/]+\.(?:svg|png|jpg|jpeg|webp|gif|pdf|ico))["\']'
    )
    missing = []
    verified = []

    for fpath in iter_source_files(src_dir, (".ts", ".tsx", ".css")):
        lines = fpath.read_text(encoding="utf-8", errors="replace").splitlines()
        rel_path = fpath.as_posix()
        for line_no, line in enumerate(lines, start=1):
            for asset_rel in asset_re.findall(line):
                target = public_dir / asset_rel.lstrip("/")
                if not target.exists():
                    if len(missing) < limit:
                        missing.append(
                            {
                                "file": rel_path,
                                "line": line_no,
                                "asset": asset_rel,
                                "expected_path": target.as_posix(),
                            }
                        )
                else:
                    if asset_rel not in verified:
                        verified.append(asset_rel)

    return {
        "status": "pass" if not missing else "fail",
        "verified_assets_count": len(verified),
        "verified_assets": sorted(verified),
        "missing_assets_count": len(missing),
        "missing_assets": missing,
    }


def write_output(data: dict, output_file: str):
    try:
        out_path = Path(output_file)
        out_path.parent.mkdir(parents=True, exist_ok=True)
        with open(out_path, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2)
        print(f"Success! Data written to: {output_file}")
    except (OSError, TypeError) as e:
        print(f"Error writing to file {output_file}: {e}", file=sys.stderr)
        sys.exit(1)


def main():
    parser = argparse.ArgumentParser(
        description="Next.js & React UI Refactoring Audit & GitHub Sync CLI"
    )
    subparsers = parser.add_subparsers(dest="command", required=True)

    # Subcommand: audit-tokens
    p_tokens = subparsers.add_parser(
        "audit-tokens",
        help="Scan source files for undefined CSS custom properties and theme drift",
    )
    p_tokens.add_argument("--src", required=True, help="Source directory (e.g. src)")
    p_tokens.add_argument(
        "--css",
        required=True,
        help="Primary global CSS file (e.g. src/app/globals.css)",
    )
    p_tokens.add_argument(
        "--single-theme",
        action="store_true",
        help="Flag leftover dark:* classes and useTheme() calls",
    )
    p_tokens.add_argument(
        "--limit",
        type=int,
        required=True,
        help="Maximum number of findings to record",
    )
    p_tokens.add_argument("--output", required=True, help="Output JSON file path")

    # Subcommand: audit-hydration
    p_hyd = subparsers.add_parser(
        "audit-hydration",
        help="Detect SSR/hydration image buffering gates and non-portal modals",
    )
    p_hyd.add_argument("--src", required=True, help="Source directory (e.g. src)")
    p_hyd.add_argument(
        "--limit",
        type=int,
        required=True,
        help="Maximum number of findings to record",
    )
    p_hyd.add_argument("--output", required=True, help="Output JSON file path")

    # Subcommand: audit-assets
    p_assets = subparsers.add_parser(
        "audit-assets",
        help="Verify all referenced /public static assets exist on disk",
    )
    p_assets.add_argument("--src", required=True, help="Source directory (e.g. src)")
    p_assets.add_argument(
        "--public", required=True, help="Public assets directory (e.g. public)"
    )
    p_assets.add_argument(
        "--limit",
        type=int,
        required=True,
        help="Maximum number of findings to record",
    )
    p_assets.add_argument("--output", required=True, help="Output JSON file path")

    # Subcommand: fetch-github-repos
    p_gh = subparsers.add_parser(
        "fetch-github-repos",
        help="Fetch public GitHub repositories with rate limiting for fallback data",
    )
    p_gh.add_argument("--username", required=True, help="GitHub username")
    p_gh.add_argument(
        "--limit",
        type=int,
        required=True,
        help="Maximum number of repositories to fetch",
    )
    p_gh.add_argument("--output", required=True, help="Output JSON file path")

    args = parser.parse_args()

    try:
        if args.command == "audit-tokens":
            data = audit_tokens(
                Path(args.src),
                [Path(args.css)],
                args.single_theme,
                args.limit,
            )
        elif args.command == "audit-hydration":
            data = audit_hydration(Path(args.src), args.limit)
        elif args.command == "audit-assets":
            data = audit_assets(Path(args.src), Path(args.public), args.limit)
        elif args.command == "fetch-github-repos":
            client = GitHubAPIClient()
            data = client.fetch_user_repos(args.username, args.limit)
        else:
            print(f"Unknown command: {args.command}", file=sys.stderr)
            sys.exit(1)
    except Exception as e:
        print(f"Error executing {args.command}: {e}", file=sys.stderr)
        sys.exit(1)

    write_output(data, args.output)


if __name__ == "__main__":
    main()
