import type { Metadata } from "next"
import Link from "next/link"
import { Construction } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Coming Soon",
  description: "This page is under construction. Resources and content are being prepared.",
}

export default function ComingSoonPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center p-8 text-center">
      <div className="flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Construction className="size-8" />
      </div>
      <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">Coming Soon</h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        This page is under construction. Resources and content are being prepared.
        Please check back later.
      </p>
      <div className="mt-8 flex gap-4">
        <Button asChild>
          <Link href="/">Back to Home</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/pru-calendar">View Calendar</Link>
        </Button>
      </div>
    </div>
  )
}
