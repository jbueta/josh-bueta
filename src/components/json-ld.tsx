import { SITE } from "@/content/site";
import { PROJECTS } from "@/content/projects";
import { ALL_CERTIFICATIONS } from "@/content/certifications";
import { EDUCATION } from "@/content/profile";

/**
 * Structured data generated from the same content modules the page renders,
 * so it cannot drift from what visitors see.
 */
export function JsonLd() {
  const personId = `${SITE.url}/#person`;

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: SITE.name,
        alternateName: SITE.shortName,
        jobTitle: SITE.role,
        description: SITE.description,
        url: SITE.url,
        email: `mailto:${SITE.email}`,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Pasig City",
          addressCountry: "PH",
        },
        sameAs: [SITE.github, SITE.linkedin],
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: EDUCATION.institution,
        },
        knowsAbout: [
          "TypeScript",
          "Next.js",
          "React",
          "Tailwind CSS",
          "PHP",
          "Python",
          "AWS",
          "UI/UX Design",
        ],
        hasCredential: ALL_CERTIFICATIONS.map((certification) => ({
          "@type": "EducationalOccupationalCredential",
          name: certification.title,
          credentialCategory: "Certificate",
          description: certification.description,
          recognizedBy: {
            "@type": "Organization",
            name: certification.issuer,
          },
          url: `${SITE.url}${certification.pdfUrl}`,
        })),
      },
      {
        "@type": "ItemList",
        name: "Software engineering case files",
        itemListElement: PROJECTS.map((project, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "SoftwareSourceCode",
            name: project.name,
            description: project.summary,
            codeRepository: project.fullName
              ? `https://github.com/${project.fullName}`
              : undefined,
            programmingLanguage: project.techStack,
            url: `${SITE.url}/projects/${project.slug}`,
            author: {
              "@type": "Person",
              name: project.owner,
            },
          },
        })),
      },
      {
        "@type": "WebSite",
        "@id": `${SITE.url}/#website`,
        url: SITE.url,
        name: `${SITE.shortName} — ${SITE.name}`,
        description: SITE.description,
        inLanguage: "en",
        publisher: { "@id": personId },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // Escaping `<` prevents a `</script>` sequence from breaking the document.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(graph).replace(/</g, "\\u003c"),
      }}
    />
  );
}
