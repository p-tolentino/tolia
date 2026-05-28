"use client"

import { useAuth } from "./auth-provider"
import { isUmRole } from "@/lib/auth/roles"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export function RoleGate({ children }: { children: React.ReactNode }) {
  const { agent, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && agent && !isUmRole(agent.role)) {
      router.replace("/unauthorized")
    }
  }, [agent, loading, router])

  if (loading) return null
  if (!agent || !isUmRole(agent.role)) return null

  return <>{children}</>
}
