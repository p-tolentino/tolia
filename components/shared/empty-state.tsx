import { Construction, ArrowLeft } from "lucide-react"
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface EmptyStateProps {
  title?: string
  description?: string
  parentHref?: string
  parentLabel?: string
}

export function EmptyStatePlaceholder({
  title = "Coming Soon",
  description = "Resources and content are being prepared. Check back soon!",
  parentHref,
  parentLabel = "Back",
}: EmptyStateProps) {
  return (
    <Card className="border-dashed border-muted-foreground/30">
      <div className="flex flex-col items-center px-6 pb-2 pt-6 text-center">
        <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-muted">
          <Construction className="size-8 text-muted-foreground" />
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription className="max-w-md">{description}</CardDescription>
      </div>
      {parentHref && (
        <CardContent className="flex justify-center pb-6">
          <Button variant="outline" size="sm" asChild>
            <Link href={parentHref}>
              <ArrowLeft className="mr-1 size-4" />
              {parentLabel}
            </Link>
          </Button>
        </CardContent>
      )}
    </Card>
  )
}
