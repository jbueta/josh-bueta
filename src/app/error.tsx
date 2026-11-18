"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface the error in the console for local debugging and monitoring hooks.
    console.error(error);
  }, [error]);

  return (
    <main id="main-content" className="relative flex min-h-screen flex-col bg-[var(--ink)]">
      <Navbar />

      <div className="flex flex-1 items-center px-5 pb-16 pt-[calc(var(--header-h)_+_24px)] sm:px-8">
        <div className="panel relative mx-auto w-full max-w-3xl overflow-hidden bg-[var(--paper)] p-8 sm:p-12">
          <div className="speed-lines pointer-events-none absolute inset-0 opacity-20" aria-hidden="true" />

          <div className="relative z-10">
            <span
              className="font-manga slash-cut-right mb-4 inline-block px-3 py-1 text-[10px] tracking-[0.5em] text-white"
              style={{ background: "var(--seido)" }}
            >
              PANEL INTERRUPTED
            </span>

            <div className="flex items-start gap-4">
              <div className="border-2 border-[var(--ink)] bg-[var(--ink)] p-3 text-white">
                <AlertTriangle className="h-6 w-6" aria-hidden="true" />
              </div>
              <h1
                className="font-manga leading-[0.9] tracking-wide text-[var(--ink)]"
                style={{ fontSize: "clamp(2.4rem, 7vw, 4.4rem)" }}
              >
                SOMETHING
                <br />
                <span style={{ color: "var(--seido)" }}>BROKE THE FRAME</span>
              </h1>
            </div>

            <p className="mt-5 max-w-lg font-sans text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
              An unexpected error interrupted this panel. Retrying usually re-draws it; the
              rest of the portfolio is unaffected.
            </p>

            {error.digest && (
              <p className="mt-3 inline-block border border-[var(--ink)]/30 bg-white px-2 py-1 font-mono text-[10px] text-[hsl(var(--muted-foreground))]">
                DIGEST: {error.digest}
              </p>
            )}

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={reset}
                className="font-manga inline-flex items-center gap-2 border-2 border-[var(--ink)] px-5 py-3 text-xs tracking-[0.22em] text-white shadow-[3px_3px_0_var(--ink)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
                style={{ background: "var(--seido)" }}
              >
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                RETRY PANEL
              </button>
              <Link
                href="/"
                className="font-manga inline-flex items-center gap-2 border-2 border-[var(--ink)] bg-white px-5 py-3 text-xs tracking-[0.22em] text-[var(--ink)] transition-colors hover:bg-[var(--ink)] hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                BACK TO CHAPTER 01
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
