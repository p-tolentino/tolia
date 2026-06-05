import { Skeleton } from "@/components/ui/skeleton"

export function ContentSkeleton() {
  return (
    <section
      role="region"
      aria-label="Page loading"
      aria-busy="true"
      className="py-12 md:py-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-4 flex items-center gap-1.5">
          <Skeleton className="h-3 w-16" />
          <span className="text-muted-foreground/50" aria-hidden="true">/</span>
          <Skeleton className="h-3 w-24" />
        </div>
        <Skeleton className="h-8 w-72 sm:h-9 lg:h-10" />
        <Skeleton className="mt-2 h-4 w-96 max-w-full" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-hidden="true">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-lg border bg-card p-4 shadow-sm">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="mt-3 h-3 w-1/2" />
              <Skeleton className="mt-4 h-20 w-full" />
              <div className="mt-3 flex items-center gap-2">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-3 w-12" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <span role="status" className="sr-only">Loading page content</span>
    </section>
  )
}
