import Link from "next/link"
import Image from "next/image"
import { isUmRole } from "@/lib/auth/roles"
import { getCurrentAgentRole } from "@/app/actions/agents"
import { navigationItems } from "@/lib/navigation"

export async function Footer() {
  const role = await getCurrentAgentRole()
  const isUm = isUmRole(role)

  const visibleItems = navigationItems.filter((item) => {
    if (item.umOnly && !isUm) return false
    if (item.children?.some((c) => c.umOnly && !isUm)) return false
    return true
  })

  return (
    <footer className="border-t bg-muted/50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <Image
              src="/tolia-full.png"
              alt="TOLIA footer logo"
              className="mb-3 h-10 w-auto"
              height={1000}
              width={1000}
            />
            <p className="text-sm text-muted-foreground">
              Tolentino Life Insurance Agency (TOLIA)
              <br />A Pru Life UK Branch. Empowering agents to succeed.
            </p>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold">Quick Links</h4>
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
          </div>

          <div className="lg:ml-6">
            <h4 className="mb-3 text-sm font-semibold">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Contact your Unit Manager for details</li>
              <li>support@tolia-pru.ph</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} TOLIA &mdash; Pru Life UK. All
          rights reserved.
        </div>
      </div>
    </footer>
  )
}
