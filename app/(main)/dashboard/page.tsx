import { createClient } from "@/lib/supabase/server"
import { canManage } from "@/lib/auth/roles"
import { redirect } from "next/navigation"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect("/login")

  const { data: agent } = await supabase
    .from("agents")
    .select("role")
    .eq("id", user.id)
    .single()

  if (!agent || !canManage(agent.role)) redirect("/unauthorized")

  return <DashboardShell />
}
