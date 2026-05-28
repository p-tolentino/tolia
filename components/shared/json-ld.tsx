export function OrganizationJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Tolentino Life Insurance Agency (TOLIA)",
    alternateName: "TOLIA",
    description:
      "A Pru Life UK branch. Empowering agents to succeed with resources, training, and support.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://tolia-pru.ph",
    logo:
      (process.env.NEXT_PUBLIC_SITE_URL || "https://tolia-pru.ph") +
      "/tolia-full.png",
    parentOrganization: {
      "@type": "Organization",
      name: "Pru Life UK",
      url: "https://www.prulifeuk.com.ph",
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "PH",
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
