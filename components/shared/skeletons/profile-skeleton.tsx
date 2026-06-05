import { Skeleton } from "@/components/ui/skeleton"

export function ProfileSkeleton() {
  return (
    <div
      role="region"
      aria-label="Profile loading"
      aria-busy="true"
      className="mx-auto max-w-2xl space-y-6 p-6 sm:p-8"
    >
      <div className="rounded-xl border">
        <div className="flex flex-col items-center gap-4 p-6 sm:flex-row sm:items-start">
          <Skeleton className="size-20 rounded-full sm:size-24" />
          <div className="flex-1 space-y-2 text-center sm:text-left">
            <Skeleton className="mx-auto h-6 w-48 sm:mx-0" />
            <Skeleton className="mx-auto h-4 w-24 sm:mx-0" />
            <Skeleton className="mx-auto h-3 w-32 sm:mx-0" />
          </div>
        </div>
        <div className="space-y-6 p-6 pt-0" aria-hidden="true">
          <div className="space-y-3">
            <Skeleton className="h-4 w-16" />
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-lg border p-3">
                <Skeleton className="size-4 shrink-0" />
                <div className="w-full space-y-1">
                  <Skeleton className="h-3 w-12" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg border p-3">
                <Skeleton className="size-4 shrink-0" />
                <div className="w-full space-y-1">
                  <Skeleton className="h-3 w-12" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <Skeleton className="h-4 w-16" />
            <div className="grid gap-3 sm:grid-cols-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 rounded-lg border p-3">
                  <Skeleton className="size-4 shrink-0" />
                  <div className="w-full space-y-1">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <span role="status" className="sr-only">Loading profile</span>
    </div>
  )
}
