/**
 * Cookieless page-view beacon.
 *
 * Nothing is collected unless `NEXT_PUBLIC_ANALYTICS_ENDPOINT` is set to a
 * collector that accepts a JSON POST (Umami, Plausible's self-hosted API, a
 * Cloudflare Worker, …). No cookies, no identifiers, no third-party script tag.
 */
const endpoint = process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT;

function report(path: string) {
  if (!endpoint) return;
  const body = JSON.stringify({
    path,
    referrer: document.referrer || null,
    viewport: `${window.innerWidth}x${window.innerHeight}`,
    recordedAt: new Date().toISOString(),
  });

  try {
    if (navigator.sendBeacon) {
      navigator.sendBeacon(endpoint, new Blob([body], { type: "application/json" }));
      return;
    }
    void fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    });
  } catch {
    // Analytics must never break the page.
  }
}

if (typeof window !== "undefined" && endpoint) {
  report(window.location.pathname);

  // App Router navigations do not reload the document; hook history instead.
  const pushState = window.history.pushState.bind(window.history);
  window.history.pushState = (...args) => {
    pushState(...args);
    report(window.location.pathname);
  };

  window.addEventListener("popstate", () => report(window.location.pathname));
}
