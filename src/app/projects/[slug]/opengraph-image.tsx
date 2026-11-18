import { ImageResponse } from "next/og";
import { getProject } from "@/content/projects";
import { SITE } from "@/content/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type ImageProps = { params: Promise<{ slug: string }> };

export async function generateImageMetadata({ params }: ImageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  return [
    {
      id: "case-file",
      size, contentType, alt: project ? `${project.name} — case file` : "Case file",
    },
  ];
}

export default async function ProjectOpengraphImage({ params }: ImageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  const title = project?.name ?? "Case file";
  const tagline = project?.tagline ?? SITE.role;
  const techNode = project ? (project.techStack ? formatTech(project.techStack) : undefined) : undefined;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0a",
          color: "#ffffff",
          padding: 56,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              background: "#003087",
              padding: "8px 16px",
              fontSize: 18,
              letterSpacing: 5,
              fontWeight: 700,
            }}
          >
            CASE FILE // {SITE.shortName}
          </div>
          <div style={{ display: "flex", fontSize: 20, letterSpacing: 4, color: "#a3a3a3" }}>
            {SITE.name.toUpperCase()}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: title.length > 42 ? 56 : 68,
              fontWeight: 900,
              lineHeight: 1.02,
              letterSpacing: -1,
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 20,
              width: 96,
              height: 10,
              background: "#003087",
            }}
          />
          <div style={{ display: "flex", marginTop: 20, fontSize: 26, color: "#c7c7c7" }}>
            {tagline}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                    <div
              style={{
                display: "flex",
                border: "2px solid rgba(255,255,255,0.35)",
                padding: "10px 16px",
                fontSize: 20,
                letterSpacing: 2,
              }}
            >
              {techNode ?? /* Show “NO CASE FILE” for a missing project so the card
                  never renders blank. */ (
                <div
                  style={{
                    display: "flex",
                    border: "2px solid rgba(255,255,255,0.35)",
                    padding: "10px 16px",
                    fontSize: 20,
                    letterSpacing: 2,
                    color: "#a3a3a3",
                  }}
                >
                  NO CASE FILE
                </div>
              )}
            </div>
          <div style={{ display: "flex", fontSize: 96, fontWeight: 900, color: "#003087" }}>
            {SITE.shortName}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}

function formatTech(techStack: string[]) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {techStack.map((tech) => (
        <span
          key={tech}
          style={{
            border: "2px solid rgba(255,255,255,0.35)",
            padding: "6px 12px",
            fontSize: 18,
            letterSpacing: 1,
          }}
        >
          {tech}
        </span>
      ))}
    </div>
  );
}
