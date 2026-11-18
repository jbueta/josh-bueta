"use client";

import React, { useState } from "react";
import { Copy, Mail, Send, Check, AlertTriangle, MessageSquare } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { SITE } from "@/content/site";
import { ChapterOpener } from "@/components/chapter-opener";

type Status = "idle" | "sending" | "sent" | "fallback" | "error";

const FIELD_CLASS =
  "w-full border-2 border-[var(--ink)] bg-white px-3 py-2.5 font-sans text-sm text-[var(--ink)] outline-none placeholder:text-[hsl(var(--muted-foreground))]/70 focus-visible:ring-4 focus-visible:ring-[var(--seido)]/30";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [copied, setCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const name = new FormData(event.currentTarget).get("name") as string;
    const email = new FormData(event.currentTarget).get("email") as string;
    const message = new FormData(event.currentTarget).get("message") as string;
    setErrorMessage(null);

    setStatus("sending");
    fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    })
      .then((response) => response.json().then((body) => ({ response, body } as const)))
      .then(({ response, body }) => {
        if (response.ok) {
          setStatus("sent");
          return;
        }
        if (body?.message === "not_configured") {
          window.location.href = `mailto:${SITE.email}`;
          setStatus("fallback");
          return;
        }
        setStatus("error");
        setErrorMessage(
          body?.message ?? `Could not send. Please email ${SITE.email} directly.`,
        );
      })
      .catch(() => {
        setStatus("error");
        setErrorMessage(`Could not send. Please email ${SITE.email} directly.`);
      });
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section id="contact" className="relative z-10 overflow-x-hidden">
      <ChapterOpener
        act="05"
        label="FINAL PANEL"
        title="CONTACT"
        subtitle="INTERNSHIPS, COLLABORATIONS & FRONTEND ROLES"
        meta={
          <div className="border-2 border-white/30 bg-white/5 px-4 py-2">
            <span className="block font-mono text-[10px] tracking-[0.25em] text-white/75">RESPONSE TIME</span>
            <span className="font-manga text-sm tracking-[0.2em] text-white">WITHIN 1–2 DAYS</span>
          </div>
        }
      />

      <div className="w-full" style={{ background: "var(--ink)", padding: "var(--gutter)" }}>
        <div className="canvas grid grid-cols-1 lg:grid-cols-12" style={{ gap: "var(--gutter)" }}>
          {/* Direct channels */}
          <div className="lg:col-span-4">
            <div className="panel relative flex h-full flex-col justify-between overflow-hidden bg-[var(--ink)] p-6 text-white sm:p-7">
              <div className="speed-lines pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />
              <div className="relative z-10">
                <div className="mb-3 inline-flex border-2 border-white/30 p-2">
                  <MessageSquare className="h-4 w-4 text-white" aria-hidden="true" />
                </div>
                <h3 className="font-manga text-2xl leading-tight tracking-[0.18em] text-white">DIRECT <br /> CHANNELS</h3>
                <p className="mt-2 font-sans text-xs leading-relaxed text-white/70">Prefer email? Reach me directly — the form sends to the same inbox.</p>

                <a href={`mailto:${SITE.email}`} className="font-manga mt-5 inline-flex items-center gap-2 border border-white/40 px-3 py-2 text-[10px] tracking-[0.25em] text-white transition-colors hover:bg-white hover:text-[var(--ink)]">
                  <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                  {SITE.email}
                </a>

                <button type="button" onClick={copyEmail} className="font-manga mt-2 flex items-center gap-2 border border-white/25 px-3 py-1.5 text-[10px] tracking-[0.3em] text-white/80 transition-colors hover:border-white hover:text-white focus-visible:outline-4 focus-visible:outline-white/50">
                  {copied ? (
                    <Check className="h-3 w-3" aria-hidden="true" />
                  ) : (
                    <Copy className="h-3 w-3" aria-hidden="true" />
                  )}
                  {copied ? "COPIED" : "COPY ADDRESS"}
                </button>
              </div>

              <div className="relative z-10 mt-6 flex items-center gap-3 border-t border-white/15 pt-4">
                {[
                  { href: SITE.github, label: "GitHub", icon: <GithubIcon className="h-4 w-4" /> },
                  { href: SITE.linkedin, label: "LinkedIn", icon: <LinkedinIcon className="h-4 w-4" /> },
                ].map(({ href, label, icon }) => (
                  <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined} aria-label={label} className="flex h-10 w-10 items-center justify-center border-2 border-white/30 text-white/80 transition-colors hover:border-white hover:bg-white hover:text-[var(--ink)]">
                    {icon}
                  </a>
                ))}
                <div className="flex flex-col gap-0.5 text-white/60" aria-hidden="true">
                  <span className="font-mono text-[10px] leading-tight">PASIG CITY, PH</span>
                  <span className="font-mono text-[10px] leading-tight">GMT+8</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-8">
            <div className="panel relative h-full bg-[var(--paper)] p-6 sm:p-8">
              <div className="screentone-fine pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
              <div className="relative z-10">
                <div className="mb-5 flex flex-wrap items-center justify-between gap-2 border-b-2 border-[var(--ink)] pb-3">
                  <h3 className="font-manga text-xl tracking-[0.28em] text-[var(--ink)]">SEND A MESSAGE</h3>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-[hsl(var(--muted-foreground))]">NO ACCOUNT REQUIRED</span>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate={false}>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="contact-name" className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--ink)]">Name</label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        minLength={2}
                        maxLength={80}
                        autoComplete="name"
                        placeholder="Juan Dela Cruz"
                        className={FIELD_CLASS}
                        aria-describedby={status === "error" ? "contact-error" : undefined}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="contact-email" className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--ink)]">Email</label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="you@company.com"
                        className={FIELD_CLASS}
                        aria-describedby={status === "error" ? "contact-error" : undefined}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-message" className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--ink)]">Message</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      minLength={10}
                      maxLength={2000}
                      rows={5}
                      placeholder="Role, project, or collaboration you have in mind…"
                      className={`${FIELD_CLASS} resize-y`}
                      aria-describedby={status === "error" ? "contact-error" : undefined}
                    />
                  </div>

                  {/* Honeypot: intentionally hidden from humans and assistive tech */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="contact-company">Company</label>
                    <input id="contact-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 border-t-2 border-[var(--ink)]/15 pt-4">
                    <p className="max-w-sm font-sans text-[11px] leading-relaxed text-[hsl(var(--muted-foreground))]">Your details are used only to reply. No newsletter, no tracking pixels.</p>
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="font-manga inline-flex items-center gap-2 border-2 border-[var(--ink)] px-5 py-3 text-xs tracking-[0.22em] text-white shadow-[3px_3px_0_var(--ink)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none disabled:cursor-not-allowed disabled:opacity-60"
                      style={{ background: "var(--seido)" }}
                    >
                      <Send className="h-4 w-4" aria-hidden="true" />
                      {status === "sending" ? "SENDING…" : "TRANSMIT MESSAGE"}
                    </button>
                  </div>
                </form>

                <div aria-live="polite" className="mt-4 min-h-[1.5rem]">
                  {status === "sent" && (
                    <p className="flex items-center gap-2 border-2 border-[var(--ink)] bg-white px-3 py-2 font-mono text-[11px] text-[var(--ink)]">
                      <Check className="h-3.5 w-3.5" style={{ color: "var(--seido)" }} aria-hidden="true" />
                      Message received — I will reply within 1–2 days.
                    </p>
                  )}
                  {status === "fallback" && (
                    <p className="flex items-center gap-2 border-2 border-[var(--ink)] bg-white px-3 py-2 font-mono text-[11px] text-[var(--ink)]">
                      <Mail className="h-3.5 w-3.5" style={{ color: "var(--seido)" }} aria-hidden="true" />
                      Opening your email app with the message prefilled.
                    </p>
                  )}
                  {status === "error" && (
                    <p id="contact-error" className="flex items-center gap-2 border-2 border-[var(--seido)] bg-white px-3 py-2 font-mono text-[11px] text-[var(--ink)]">
                      <AlertTriangle className="h-3.5 w-3.5" style={{ color: "var(--seido)" }} aria-hidden="true" />
                      {errorMessage ?? `Could not send. Please email ${SITE.email} directly.`}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
