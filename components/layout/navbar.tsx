"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Badge } from "@/components/ui/badge"
import { navigationItems } from "@/lib/navigation"
import type { NavItem } from "@/lib/types"

export function Navbar({ className }: { className?: string }) {
  const raw = usePathname()
  const pathname = raw === "/" ? "/" : raw.replace(/\/$/, "")

  function getSectionPrefix(item: NavItem): string | null {
    const first = item.children?.[0]?.href
    if (!first) return null
    return first.split("/").slice(0, -1).join("/")
  }

  function isActive(item: NavItem): boolean {
    if (item.href && item.href === pathname) return true
    if (item.children?.some((c) => c.href === pathname)) return true
    const prefix = getSectionPrefix(item)
    if (prefix && pathname === prefix) return true
    return false
  }

  return (
    <NavigationMenu className={className} viewport={false}>
      <NavigationMenuList>
        {navigationItems.map((item, index) => (
          <NavigationMenuItem key={item.title}>
            {item.children ? (
              <>
                <NavigationMenuTrigger
                  className={cn(
                    "h-10 px-3 text-sm font-medium",
                    isActive(item) && "text-primary"
                  )}
                >
                  {item.title}
                </NavigationMenuTrigger>
                <NavigationMenuContent
                  className={
                    index >= navigationItems.length - 3
                      ? "right-0 left-auto"
                      : ""
                  }
                >
                  <ul
                    className={cn(
                      "grid gap-1 p-4 max-w-[90vw]",
                      item.children.length <= 4
                        ? "w-[400px] grid-cols-1"
                        : "w-[600px] grid-cols-2"
                    )}
                  >
                    {item.children.map((child) => {
                      const childActive = pathname === child.href
                      return (
                        <li key={child.href}>
                          <NavigationMenuLink asChild active={childActive}>
                            <Link
                              href={child.href}
                              className={cn(
                                "flex flex-col gap-1 rounded-lg p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                                childActive &&
                                  "bg-accent text-accent-foreground"
                              )}
                            >
                              <div className="flex items-center gap-2 text-sm font-medium">
                                {child.title}
                                {child.badge && (
                                  <Badge
                                    variant="outline"
                                    className="px-1 py-0 text-[10px]"
                                  >
                                    {child.badge}
                                  </Badge>
                                )}
                              </div>
                              {child.description && (
                                <p className="line-clamp-1 text-xs text-muted-foreground">
                                  {child.description}
                                </p>
                              )}
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      )
                    })}
                  </ul>
                </NavigationMenuContent>
              </>
            ) : (
              <NavigationMenuLink asChild active={pathname === item.href}>
                <Link
                  href={item.href!}
                  className={cn(
                    "h-10 px-3 text-sm font-medium",
                    pathname === item.href && "text-primary"
                  )}
                >
                  {item.title}
                </Link>
              </NavigationMenuLink>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
