import { cn } from "@/lib/utils"

interface CardGridProps {
  children: React.ReactNode
  columns?: 2 | 3 | 4
  className?: string
}

export function CardGrid({ children, columns = 3, className }: CardGridProps) {
  return (
    <div
      className={cn(
        "grid gap-6",
        {
          "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4": columns === 4,
          "sm:grid-cols-2 lg:grid-cols-3": columns === 3,
          "sm:grid-cols-2": columns === 2,
        },
        className,
      )}
    >
      {children}
    </div>
  )
}
