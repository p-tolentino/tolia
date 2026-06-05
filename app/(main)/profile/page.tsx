import { Suspense } from "react"
import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { ProfileSkeleton } from "@/components/shared/skeletons"
import { getAgentProfile } from "@/app/actions/agents"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Mail,
  Phone,
  Calendar,
  User,
  Hash,
  Building2,
  CheckCircle2,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Profile",
  description: "Your agent profile information.",
}

function formatDate(dateStr: string | null) {
  if (!dateStr) return "N/A"
  return new Date(dateStr).toLocaleDateString("en-PH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

async function ProfileContent() {
  const agent = await getAgentProfile()

  if (!agent) redirect("/login")

  const initials = `${agent.first_name[0]}${agent.last_name[0]}`.toUpperCase()
  const fullName = [
    agent.first_name,
    agent.middle_name[0] + ".",
    agent.last_name,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-6 sm:p-8">
      <Card>
        <CardHeader>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
            <Avatar className="size-20 sm:size-24">
              <AvatarImage src={agent.avatar_url ?? undefined} alt={fullName} />
              <AvatarFallback className="text-2xl font-medium sm:text-3xl">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center sm:text-left">
              <CardTitle className="text-xl sm:text-2xl">{fullName}</CardTitle>
              <p className="text-sm text-muted-foreground">{agent.role}</p>
              <p className="text-xs text-muted-foreground">
                Agent Code: {agent.agent_code}
              </p>
              <div className="mt-2 flex flex-wrap justify-center gap-2 sm:justify-start">
                <Badge
                  variant={agent.is_active ? "default" : "secondary"}
                  className="gap-1"
                >
                  <CheckCircle2 className="size-3" />
                  {agent.is_active ? "Active" : "Inactive"}
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <h3 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
              Contact
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-lg border p-3">
                <Mail className="size-4 shrink-0 text-muted-foreground" />
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="truncate text-sm font-medium">{agent.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg border p-3">
                <Phone className="size-4 shrink-0 text-muted-foreground" />
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="truncate text-sm font-medium">
                    {agent.phone || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
              Details
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-lg border p-3">
                <Hash className="size-4 shrink-0 text-muted-foreground" />
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">Agent Code</p>
                  <p className="truncate text-sm font-medium">
                    {agent.agent_code}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg border p-3">
                <User className="size-4 shrink-0 text-muted-foreground" />
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">Role</p>
                  <p className="truncate text-sm font-medium">{agent.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg border p-3">
                <Building2 className="size-4 shrink-0 text-muted-foreground" />
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">Unit</p>
                  <p className="truncate text-sm font-medium">
                    {agent.unit || "N/A"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg border p-3">
                <Calendar className="size-4 shrink-0 text-muted-foreground" />
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">Coded Since</p>
                  <p className="truncate text-sm font-medium">
                    {formatDate(agent.coded_at)}
                  </p>
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              TOLIA Web Suite Member since {formatDate(agent.created_at)}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function ProfilePage() {
  return (
    <Suspense fallback={<ProfileSkeleton />}>
      <ProfileContent />
    </Suspense>
  )
}
