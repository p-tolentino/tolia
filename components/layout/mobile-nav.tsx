"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/components/auth/auth-provider"
import { isUmRole } from "@/lib/auth/roles"
import { navigationItems } from "@/lib/navigation"
import Image from "next/image"

export function MobileNav() {
  const raw = usePathname()
  const pathname = raw === "/" ? "/" : raw.replace(/\/$/, "")
  const { agent } = useAuth()

  return (
    <Sheet key={raw}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="2xl:hidden"
          aria-label="Open menu"
        >
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[85vw] p-0 sm:max-w-sm">
        <SheetHeader className="flex flex-row items-center justify-between border-b px-4 py-3">
          <SheetTitle>
            <Image
              src="/tolia-full.png"
              alt="TOLIA navigation logo"
              className="h-7 w-auto"
              height={1000}
              width={1000}
            />
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-140px)] px-4 py-2">
          <nav aria-label="Main navigation" className="flex flex-col gap-1">
            {navigationItems
              .filter((item) => {
                if (item.umOnly && !isUmRole(agent?.role)) return false
                if (
                  item.children?.some((c) => c.umOnly && !isUmRole(agent?.role))
                )
                  return false
                return true
              })
              .map((item) => {
                const hasActiveChild = item.children?.some(
                  (c) => c.href === pathname
                )
                if (item.children) {
                  return (
                    <Accordion
                      type="single"
                      collapsible
                      key={item.title}
                      defaultValue={hasActiveChild ? item.title : undefined}
                    >
                      <AccordionItem value={item.title} className="border-none">
                        <AccordionTrigger
                          className={cn(
                            "rounded-md px-3 py-3 text-sm font-medium transition-colors hover:bg-accent hover:no-underline",
                            (pathname === item.href || hasActiveChild) &&
                              "text-primary"
                          )}
                        >
                          {item.title}
                        </AccordionTrigger>
                        <AccordionContent className="pb-2">
                          <div className="flex flex-col gap-1 pl-4">
                            {item.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                className={cn(
                                  "rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent",
                                  pathname === child.href
                                    ? "bg-accent font-medium text-accent-foreground"
                                    : "text-muted-foreground"
                                )}
                              >
                                {child.title}
                                {child.badge && (
                                  <span className="ml-2 text-[10px] text-primary">
                                    ({child.badge})
                                  </span>
                                )}
                              </Link>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  )
                }
                return (
                  <Link
                    key={item.title}
                    href={item.href!}
                    className={cn(
                      "rounded-md px-3 py-3 text-sm font-medium transition-colors hover:bg-accent",
                      pathname === item.href
                        ? "text-primary"
                        : "text-foreground"
                    )}
                  >
                    {item.title}
                  </Link>
                )
              })}
          </nav>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
