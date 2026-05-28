import { redirect } from "next/navigation"
import { isUmRole } from "@/lib/auth/roles"
import { getCurrentAgentRole } from "@/app/actions/agents"

export default async function UmOnlyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const role = await getCurrentAgentRole()

  if (!role || !isUmRole(role)) {
    redirect("/unauthorized")
  }

  return <>{children}</>
}
