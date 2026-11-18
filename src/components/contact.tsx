"use client";

import React, { useState } from "react";
import { Copy, Mail, Send, Check, AlertTriangle } from "lucide-react";
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
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();
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
        label="Get in touch"
        title="CONTACT"
        subtitle="INTERNSHIPS, COLLABORATIONS & FRONTEND ROLES"
      />

      <div className="w-full" style={{ background: "var(--tone)", padding: "var(--gutter)" }}>
        <div className="canvas">
          <div className="panel relative overflow-hidden bg-[var(--paper)] p-6 sm:p-8">
            <div className="screentone-fine pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />

            <div className="relative z-10">
              <div className="flex flex-col gap-3 border-b-2 border-[var(--ink)] pb-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex w-full max-w-md items-stretch border-2 border-[var(--ink)] bg-white">
                  <a
                    href={`mailto:${SITE.email}`}
                    className="flex min-w-0 flex-1 items-center gap-2 px-3 py-2.5 font-mono text-[12px] text-[var(--ink)] transition-colors hover:bg-[var(--ink)] hover:text-white"
                  >
                    <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span className="truncate">{SITE.email}</span>
                  </a>
                  <button
                    type="button"
                    onClick={copyEmail}
                    aria-label={copied ? "Email address copied" : "Copy email address"}
                    title={copied ? "Copied" : "Copy email address"}
                    className="flex w-11 shrink-0 items-center justify-center border-l-2 border-[var(--ink)] text-[var(--ink)] transition-colors hover:bg-[var(--seido)] hover:text-white focus-visible:outline-4 focus-visible:outline-[var(--seido)]"
                  >
                    {copied ? (
                      <Check className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <Copy className="h-4 w-4" aria-hidden="true" />
                    )}
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  {[
                    { href: SITE.github, label: "GitHub", icon: <GithubIcon className="h-4 w-4" /> },
                    { href: SITE.linkedin, label: "LinkedIn", icon: <LinkedinIcon className="h-4 w-4" /> },
                  ].map(({ href, label, icon }) => (
                    <a
                      key={label}
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                      aria-label={label}
                      title={label}
                      className="flex h-10 w-10 items-center justify-center border-2 border-[var(--ink)] text-[var(--ink)] transition-colors hover:bg-[var(--ink)] hover:text-white"
                    >
                      {icon}
                    </a>
                  ))}
                </div>
              </div>

              <h3 className="mb-4 mt-6 text-xl tracking-[0.22em] text-[var(--ink)]">
                SEND A MESSAGE
              </h3>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

                <div className="hidden" aria-hidden="true">
                  <label htmlFor="contact-company">Company</label>
                  <input id="contact-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 border-t-2 border-[var(--ink)]/15 pt-4">
                  <p className="max-w-sm font-sans text-[11px] leading-relaxed text-[hsl(var(--muted-foreground))]">
                    Your details are used only to reply.
                  </p>
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="font-manga inline-flex items-center gap-2 border-2 border-[var(--ink)] px-5 py-3 text-xs tracking-[0.22em] text-white shadow-[3px_3px_0_var(--ink)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none disabled:cursor-not-allowed disabled:opacity-60"
                    style={{ background: "var(--seido)" }}
                  >
                    <Send className="h-4 w-4" aria-hidden="true" />
                    {status === "sending" ? "SENDING…" : "SEND MESSAGE"}
                  </button>
                </div>
              </form>

              <div aria-live="polite" className="mt-4 min-h-[1.5rem]">
                {status === "sent" && (
                  <p className="flex items-center gap-2 border-2 border-[var(--ink)] bg-white px-3 py-2 font-mono text-[11px] text-[var(--ink)]">
                    <Check className="h-3.5 w-3.5" style={{ color: "var(--seido)" }} aria-hidden="true" />
                    Message sent — it landed in {SITE.email}. I will get back to you soon.
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
    </section>
  );
}
