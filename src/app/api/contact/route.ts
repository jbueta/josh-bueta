import { NextResponse } from "next/server";
import { SITE } from "@/content/site";

/**
 * Contact endpoint.
 *
 * Delivery uses `RESEND_API_KEY` (Resend's REST API, no SDK needed) to mail the
 * submission to `CONTACT_TO_EMAIL` — the owner's own inbox by default. A
 * generic `CONTACT_WEBHOOK_URL` is still honoured for anyone relaying to
 * Slack/Formspree instead. With neither configured the route answers
 * `not_configured` and the browser falls back to a mailto draft; it never
 * silently pretends a message was delivered.
 */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 3;
const MAX_TRACKED_CLIENTS = 2000;
const attempts = new Map<string, number[]>();

const RESEND_ENDPOINT = "https://api.resend.com/emails";

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

function escapeHtml(value: string): string {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        character
      ] ?? character,
  );
}

/**
 * Sends through Resend. `null` means "no key configured", so the caller can
 * fall through to the webhook. Visitor input is escaped before it reaches HTML.
 */
async function sendWithResend(payload: {
  name: string;
  email: string;
  message: string;
}): Promise<boolean | null> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;

  const from = process.env.CONTACT_FROM_EMAIL ?? "MJB Portfolio <onboarding@resend.dev>";
  const to = process.env.CONTACT_TO_EMAIL ?? SITE.email;

  const response = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: payload.email,
      subject: `Portfolio message from ${payload.name}`,
      text: [
        `From: ${payload.name} <${payload.email}>`,
        `Received: ${new Date().toISOString()}`,
        "",
        payload.message,
      ].join("\n"),
      html: `
        <div style="font-family:ui-sans-serif,system-ui,sans-serif;line-height:1.6">
          <p style="margin:0 0 4px"><strong>${escapeHtml(payload.name)}</strong></p>
          <p style="margin:0 0 16px"><a href="mailto:${escapeHtml(payload.email)}">${escapeHtml(payload.email)}</a></p>
          <hr style="border:none;border-top:1px solid #ddd;margin:16px 0" />
          <p style="white-space:pre-wrap;margin:0">${escapeHtml(payload.message)}</p>
        </div>
      `,
    }),
    cache: "no-store",
  });

  return response.ok;
}

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
    // Spammer filled the honeypot or timed out; report success without
    // forwarding so the spammer never learns we rejected it.
    return NextResponse.json({ ok: true, message: "Message received." });
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

  try {
    const resend = await sendWithResend({
      name: trimmedName,
      email: trimmedEmail,
      message: trimmedMessage,
    });

    if (resend === true) return NextResponse.json({ ok: true });
    if (resend === false) {
      return NextResponse.json({ error: "delivery_failed" }, { status: 502 });
    }

    const webhook = process.env.CONTACT_WEBHOOK_URL;
    if (!webhook) {
      return NextResponse.json(
        {
          error: "not_configured",
          message: `Set RESEND_API_KEY to deliver messages. In the meantime: ${SITE.email}`,
        },
        { status: 503 },
      );
    }

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
