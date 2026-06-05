import { createClient } from "@/lib/supabase/server"
import { canManage } from "./roles"

export async function requireManageRole(): Promise<{ userId: string } | { error: string }> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "Not authenticated" }
  const { data: agent } = await supabase
    .from("agents")
    .select("role")
    .eq("id", user.id)
    .single()
  if (!agent || !canManage(agent.role)) return { error: "Unauthorized" }
  return { userId: user.id }
}
