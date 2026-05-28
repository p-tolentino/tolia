import type { Metadata } from "next"
import Link from "next/link"
import { SearchX } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "404: Page Not Found",
  description: "The page you're looking for doesn't exist or has been moved.",
}

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8 text-center">
      <span className="mb-8 text-xs font-semibold uppercase tracking-widest text-primary sm:text-sm">TOLIA — Pru Life UK</span>
      <div className="flex size-24 items-center justify-center rounded-full bg-muted sm:size-28">
        <SearchX className="size-10 text-muted-foreground sm:size-12" />
      </div>
      <h1 className="mt-6 text-5xl font-bold text-primary sm:text-6xl">404</h1>
      <h2 className="mt-4 text-xl font-semibold sm:text-2xl">Page Not Found</h2>
      <p className="mt-2 text-sm text-muted-foreground sm:text-base">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Button className="mt-6" asChild>
        <Link href="/">Back to Home</Link>
      </Button>
    </div>
  )
}
