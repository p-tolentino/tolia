"use server"

import { createClient } from "@/lib/supabase/server"

export async function getCurrentAgentRole(): Promise<string | null> {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return null
    const { data: agent } = await supabase
      .from("agents")
      .select("role")
      .eq("id", user.id)
      .single()
    return agent?.role ?? null
  } catch {
    return null
  }
}

export async function getAgentProfile() {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return null
    const { data: agent } = await supabase
      .from("agents")
      .select("*")
      .eq("id", user.id)
      .single()
    return agent
  } catch {
    return null
  }
}
