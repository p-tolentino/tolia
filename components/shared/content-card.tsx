import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, FileText, Video, FileSpreadsheet, FileImage, Link as LinkIcon } from "lucide-react"
import type { ResourceItem } from "@/lib/types"

const fileTypeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  pdf: FileText,
  doc: FileText,
  xls: FileSpreadsheet,
  ppt: FileText,
  link: LinkIcon,
  video: Video,
  image: FileImage,
}

interface ContentCardProps {
  title: string
  description: string
  href?: string
  icon?: React.ReactNode
  resource?: ResourceItem
}

export function ContentCard({ title, description, href, icon, resource }: ContentCardProps) {
  const IconComponent = resource?.fileType ? fileTypeIcons[resource.fileType] : null
  const displayIcon = icon || (IconComponent && <IconComponent className="size-5" />)
  const isPlaceholder = href === "#"

  const Wrapper = href && !isPlaceholder
    ? ({ children }: { children: React.ReactNode }) => (
        <Link href={href} className="block">
          {children}
        </Link>
      )
    : ({ children }: { children: React.ReactNode }) => <>{children}</>

  return (
    <Wrapper>
      {/* Mobile: compact inline row */}
      <div className="flex sm:hidden items-center gap-3 rounded-lg border bg-card p-3 transition-all duration-300 hover:bg-primary hover:border-primary cursor-pointer group">
        {displayIcon && (
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all duration-300 group-hover:bg-white/20 group-hover:text-white">
            <span className="transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
              {displayIcon}
            </span>
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-foreground transition-colors duration-300 group-hover:text-white truncate">{title}</div>
          <div className="text-xs text-muted-foreground transition-colors duration-300 group-hover:text-white/80 truncate">{description}</div>
        </div>
        {href && <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-colors duration-300 group-hover:text-white" />}
      </div>
      {/* Desktop: full card */}
      <Card className="hidden sm:block group h-full transition-all duration-300 hover:bg-primary hover:border-primary cursor-pointer">
        <CardHeader>
          {displayIcon && (
            <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all duration-300 group-hover:bg-white/20 group-hover:text-white">
              <span className="transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                {displayIcon}
              </span>
            </div>
          )}
          <CardTitle className="text-base transition-colors duration-300 group-hover:text-white">{title}</CardTitle>
          <CardDescription className="line-clamp-2 transition-colors duration-300 group-hover:text-white/80">{description}</CardDescription>
        </CardHeader>
        {href && (
          <CardContent>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors duration-300 group-hover:text-white">
              View <ArrowRight className="size-3 transition-all duration-300 group-hover:translate-x-0.5" />
            </span>
          </CardContent>
        )}
      </Card>
    </Wrapper>
  )
}
