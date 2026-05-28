import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { isUmRole } from "@/lib/auth/roles"

export default async function UmOnlyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const { data: agent } = await supabase
    .from("agents")
    .select("role")
    .eq("id", user.id)
    .single()

  if (!agent || !isUmRole(agent.role)) {
    redirect("/unauthorized")
  }

  return <>{children}</>
}
