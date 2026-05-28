import Link from "next/link"
import { Construction } from "lucide-react"
import { Button } from "@/components/ui/button"

interface UnderConstructionProps {
  title?: string
  message?: string
  showHomeButton?: boolean
  secondaryHref?: string
  secondaryLabel?: string
}

export function UnderConstruction({
  title = "Coming Soon",
  message = "This section is under construction. Resources and content are being prepared. Please check back later.",
  showHomeButton = true,
  secondaryHref,
  secondaryLabel,
}: UnderConstructionProps) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center p-8 text-center">
      <div className="flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Construction className="size-8" />
      </div>
      <h1 className="mt-6 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
        {title}
      </h1>
      <p className="mt-3 max-w-md text-sm text-muted-foreground sm:text-base">
        {message}
      </p>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        {showHomeButton && (
          <Button asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        )}
        {secondaryHref && secondaryLabel && (
          <Button variant="outline" asChild>
            <Link href={secondaryHref}>{secondaryLabel}</Link>
          </Button>
        )}
      </div>
    </div>
  )
}
