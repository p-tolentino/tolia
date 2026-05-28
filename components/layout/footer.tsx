import Link from "next/link"
import Image from "next/image"
import { createClient } from "@/lib/supabase/server"
import { isUmRole } from "@/lib/auth/roles"
import { navigationItems } from "@/lib/navigation"

export async function Footer() {
  let isUm = false
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      const { data: agent } = await supabase
        .from("agents")
        .select("role")
        .eq("id", user.id)
        .single()
      if (agent) isUm = isUmRole(agent.role)
    }
  } catch {}

  const visibleItems = navigationItems.filter((item) => {
    if (item.umOnly && !isUm) return false
    if (item.children?.some((c) => c.umOnly && !isUm)) return false
    return true
  })

  return (
    <footer className="border-t bg-muted/50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Image
              src="/tolia-full.png"
              alt="TOLIA"
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
            <ul className="space-y-2 text-sm text-muted-foreground">
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
          <div>
            <h4 className="mb-3 text-sm font-semibold">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/agent-support"
                  className="transition-colors hover:text-foreground"
                >
                  Agent Support
                </Link>
              </li>
              <li>
                <Link
                  href="/rookie-support"
                  className="transition-colors hover:text-foreground"
                >
                  Rookie Support
                </Link>
              </li>
              <li>
                <Link
                  href="/social-media-materials"
                  className="transition-colors hover:text-foreground"
                >
                  Social Media Materials
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="transition-colors hover:text-foreground"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/pru-calendar"
                  className="transition-colors hover:text-foreground"
                >
                  Pru Calendar
                </Link>
              </li>
              <li>
                <Link
                  href="/recruitment"
                  className="transition-colors hover:text-foreground"
                >
                  Recruitment
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>ADDRESS?</li>
              <li>NUMBER?</li>
              <li>EMAIL?</li>
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
