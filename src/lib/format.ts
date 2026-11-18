/**
 * Date formatting shared by server and client components.
 *
 * Lives outside `lib/github.ts` because that module is `server-only`, and the
 * contribution graph and footer both render this stamp in the browser.
 */

const STAMP_FORMAT = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

/** Deterministic across server and client (UTC, fixed locale). */
export function formatSyncStamp(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "unknown";
  return STAMP_FORMAT.format(date).toUpperCase();
}
