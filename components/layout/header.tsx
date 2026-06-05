"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Navbar } from "./navbar"
import { MobileNav } from "./mobile-nav"
import { UserButton } from "./user-button"
import Image from "next/image"

export function Header() {
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 z-50 border-b transition-all duration-300",
        scrolled
          ? "bg-background/95 shadow-sm backdrop-blur-md"
          : "bg-background/80 backdrop-blur-md"
      )}
    >
      <div className="mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <Image
            src="/tolia-full.png"
            alt="TOLIA home"
            className="h-8 w-auto"
            height={1000}
            width={1000}
          />
        </Link>

        <Navbar className="hidden 2xl:flex" />

        <div className="flex shrink-0 items-center gap-2">
          <UserButton />
          <MobileNav />
        </div>
      </div>
    </header>
  )
}
