import { ImageResponse } from "next/og";
import { SITE } from "@/content/site";

export const alt = `${SITE.name} — ${SITE.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          background: "#ffffff",
          color: "#0a0a0a",
        }}
      >
        <div
          style={{
            width: 748,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: 56,
            borderRight: "10px solid #0a0a0a",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                background: "#003087",
                color: "#ffffff",
                padding: "8px 16px",
                fontSize: 18,
                letterSpacing: 6,
                fontWeight: 700,
              }}
            >
              ACT. 01 // OPENING
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 106,
                fontWeight: 900,
                lineHeight: 0.88,
                letterSpacing: -2,
                marginTop: 28,
              }}
            >
              MARK
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 106,
                fontWeight: 900,
                lineHeight: 0.88,
                letterSpacing: -2,
              }}
            >
              JOSHUA
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 106,
                fontWeight: 900,
                lineHeight: 0.88,
                letterSpacing: -2,
                color: "#003087",
              }}
            >
              BUETA
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", width: 84, height: 8, background: "#0a0a0a" }} />
            <div style={{ display: "flex", marginTop: 18, fontSize: 24, fontWeight: 600 }}>
              {SITE.role}
            </div>
            <div style={{ display: "flex", marginTop: 8, fontSize: 20, color: "#4b4b4b" }}>
              {SITE.location}
            </div>
          </div>
        </div>

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            background: "#0a0a0a",
            color: "#ffffff",
            padding: 48,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                fontSize: 20,
                letterSpacing: 8,
                color: "#8fb0ff",
                fontWeight: 700,
              }}
            >
              PORTFOLIO
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 16,
                fontSize: 44,
                fontWeight: 800,
                lineHeight: 1.05,
              }}
            >
              CASE FILES &amp;
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 44,
                fontWeight: 800,
                lineHeight: 1.05,
              }}
            >
              BUILD LOGS
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              "NEXT.JS · TYPESCRIPT · TAILWIND",
              "FULL-STACK SYSTEM BUILDS",
              "11 VERIFIED CERTIFICATIONS",
            ].map((line) => (
              <div
                key={line}
                style={{
                  display: "flex",
                  border: "2px solid rgba(255,255,255,0.35)",
                  padding: "10px 14px",
                  fontSize: 18,
                  letterSpacing: 2,
                }}
              >
                {line}
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <div style={{ display: "flex", fontSize: 18, letterSpacing: 3, color: "#a3a3a3" }}>
              {SITE.url.replace(/^https?:\/\//, "").toUpperCase()}
            </div>
            <div style={{ display: "flex", fontSize: 96, fontWeight: 900, color: "#003087" }}>
              {SITE.shortName}
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
