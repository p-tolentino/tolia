import type { Metadata } from "next"
import { Check } from "lucide-react"
import { PageHeader } from "@/components/shared/page-header"
import { SectionWrapper } from "@/components/shared/section-wrapper"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { umWelcomeKit } from "@/lib/content/um-welcome-kit"

export const metadata: Metadata = {
  title: "UM Welcome Kit",
  description: "Premium starter package for new Unit Managers.",
}

export default function UmWelcomeKitPage() {
  return (
    <SectionWrapper>
      <PageHeader title={umWelcomeKit.title} description={umWelcomeKit.subtitle} />
      <div className="mt-10 space-y-12">
        {umWelcomeKit.categories.map((category) => (
          <section key={category.heading}>
            <div className="mb-4 flex items-center gap-3">
              <h2 className="text-2xl font-bold">{category.heading}</h2>
              <Badge variant="secondary" className="text-xs">{category.tag}</Badge>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {category.items.map((item) => (
                <Card key={item.name} className="flex flex-col">
                  <CardHeader>
                    <CardTitle className="text-base">{item.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="mb-4 text-sm text-muted-foreground">{item.description}</p>
                    <ul className="space-y-1.5">
                      {item.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-sm">
                          <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        ))}
      </div>
    </SectionWrapper>
  )
}
