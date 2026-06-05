"use client"

import { useRef, useEffect } from "react"

interface InfiniteScrollProps {
  onLoadMore: () => void
  hasMore: boolean
  loading?: boolean
  children: React.ReactNode
}

export function InfiniteScroll({ onLoadMore, hasMore, loading, children }: InfiniteScrollProps) {
  const sentinelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel || !hasMore) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          onLoadMore()
        }
      },
      { rootMargin: "200px" },
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [onLoadMore, hasMore, loading])

  return (
    <>
      {children}
      {hasMore && (
        <div ref={sentinelRef} className="flex justify-center py-4">
          {loading && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="size-4 animate-spin rounded-full border-2 border-muted-foreground/30 border-t-muted-foreground" />
              Loading more...
            </div>
          )}
        </div>
      )}
    </>
  )
}
