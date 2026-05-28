import Link from "next/link"
import type { BreadcrumbItem } from "@/lib/types"

interface PageHeaderProps {
  title: string
  description?: string
  breadcrumbs?: BreadcrumbItem[]
  className?: string
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tolia-pru.ph"

export function PageHeader({ title, description, breadcrumbs, className }: PageHeaderProps) {
  return (
    <div className={className}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                itemListElement: breadcrumbs.map((crumb, i) => ({
                  "@type": "ListItem",
                  position: i + 1,
                  name: crumb.label,
                  item: `${siteUrl}${crumb.href}`,
                })),
              }),
            }}
          />
          <nav aria-label="Breadcrumb" className="mb-4 text-sm text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-1.5">
            {breadcrumbs.map((crumb, i) => (
              <li key={crumb.href} className="flex items-center gap-1.5">
                {i > 0 && <span aria-hidden="true">/</span>}
                {i === breadcrumbs.length - 1 ? (
                  <span aria-current="page" className="text-foreground">
                    {crumb.label}
                  </span>
                ) : (
                  <Link href={crumb.href} className="hover:text-foreground transition-colors">
                    {crumb.label}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
        </>
      )}
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">{title}</h1>
      {description && (
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base lg:text-lg">{description}</p>
      )}
    </div>
  )
}
