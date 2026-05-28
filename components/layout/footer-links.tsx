"use client"

import Link from "next/link"
import { useAuth } from "@/components/auth/auth-provider"
import { isUmRole } from "@/lib/auth/roles"
import { navigationItems } from "@/lib/navigation"

export function FooterLinks() {
  const { agent } = useAuth()
  const isUm = isUmRole(agent?.role)

  const visibleItems = navigationItems.filter((item) => {
    if (item.umOnly && !isUm) return false
    if (item.children?.some((c) => c.umOnly && !isUm)) return false
    return true
  })

  return (
    <ul className="grid grid-cols-1 gap-2 text-sm text-muted-foreground sm:grid-cols-2">
      {visibleItems.map((item) => (
        <li key={item.title}>
          <Link
            href={item.href || "#"}
            className="transition-colors hover:text-foreground"
          >
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  )
}
