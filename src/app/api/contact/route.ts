import { NextResponse } from "next/server";
import { SITE } from "@/content/site";

/**
 * Contact endpoint.
 *
 * Delivery requires `CONTACT_WEBHOOK_URL` (a Slack/Formspree/email-provider
 * webhook). Without it the form tells the browser to fall back to a mailto
 * draft, and this route answers `not_configured` — it never silently
 * pretends a message was delivered.
 */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 3;
const MAX_TRACKED_CLIENTS = 2000;
const attempts = new Map<string, number[]>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (attempts.get(key) ?? []).filter((time) => now - time < WINDOW_MS);

  if (recent.length >= MAX_PER_WINDOW) {
    attempts.set(key, recent);
    return true;
  }

  recent.push(now);
  attempts.set(key, recent);

  if (attempts.size > MAX_TRACKED_CLIENTS) {
    for (const [client, times] of attempts) {
      if (times.every((time) => now - time >= WINDOW_MS)) attempts.delete(client);
    }
  }

  return false;
}

function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") ?? "unknown";
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  if (isRateLimited(clientKey(request))) {
    return NextResponse.json(
      { error: "rate_limited", message: "Too many messages. Try again in a few minutes." },
      { status: 429 },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const { name, email, message, company } = (payload ?? {}) as Record<string, unknown>;

  // Honeypot filled → treat as spam and report success without forwarding.
  if (typeof company === "string" && company.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof message !== "string"
  ) {
    return NextResponse.json({ error: "invalid_payload" }, { status: 400 });
  }

  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedMessage = message.trim();

  if (
    trimmedName.length < 2 ||
    trimmedName.length > 80 ||
    !EMAIL_PATTERN.test(trimmedEmail) ||
    trimmedEmail.length > 254 ||
    trimmedMessage.length < 10 ||
    trimmedMessage.length > 2000
  ) {
    return NextResponse.json({ error: "validation_failed" }, { status: 422 });
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (!webhook) {
    return NextResponse.json(
      {
        error: "not_configured",
        message: `Set CONTACT_WEBHOOK_URL to deliver messages. In the meantime: ${SITE.email}`,
      },
      { status: 503 },
    );
  }

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.CONTACT_WEBHOOK_SECRET
          ? { Authorization: `Bearer ${process.env.CONTACT_WEBHOOK_SECRET}` }
          : {}),
      },
      body: JSON.stringify({
        name: trimmedName,
        email: trimmedEmail,
        message: trimmedMessage,
        receivedAt: new Date().toISOString(),
        source: SITE.url,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json({ error: "delivery_failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "delivery_failed" }, { status: 502 });
  }
}
