import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface AnnouncementCardProps {
  title: string
  content: string
  created_at: string
  author_id: string | null
}

export function AnnouncementCard({ title, content, created_at, author_id }: AnnouncementCardProps) {
  const date = new Date(created_at)
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })

  const isNew = Date.now() - date.getTime() < 3 * 24 * 60 * 60 * 1000

  return (
    <Card className="border-l-4 border-l-primary shadow-sm">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between gap-2">
          <time className="text-xs text-muted-foreground">{formattedDate}</time>
          {isNew && <Badge className="text-[10px]">New</Badge>}
        </div>
        <h3 className="mt-2 text-lg font-semibold">{title}</h3>
        <div className="mt-2 whitespace-pre-line text-sm text-muted-foreground">{content}</div>
        {/*
          To display the author's name, join the agents table on author_id:
            const { data } = await supabase
              .from("announcements")
              .select("*, agents!inner(first_name, last_name)")
              .eq("is_published", true)
              .order("created_at", { ascending: false })
          Then render: author.first_name + " " + author.last_name
          Currently hidden per product requirements — author is always the Branch Manager.
        */}
      </CardContent>
    </Card>
  )
}
