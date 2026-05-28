import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/components/auth/auth-provider"
import { Toaster } from "@/components/ui/sonner"
import { OrganizationJsonLd } from "@/components/shared/json-ld"
import { cn } from "@/lib/utils"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tolia-pru.ph"

export const metadata: Metadata = {
  title: {
    default: "TOLIA (Tolentino Life Insurance Agency) \u2014 Pru Life UK",
    template: "%s | TOLIA \u2014 Pru Life UK",
  },
  description: "Empowering Pru Life UK agents to succeed with resources, training, and support.",
  metadataBase: new URL(siteUrl),
  icons: {
    icon: "/icon.png",
  },
  openGraph: {
    title: "TOLIA (Tolentino Life Insurance Agency) \u2014 Pru Life UK",
    description: "Empowering Pru Life UK agents to succeed with resources, training, and support.",
    url: siteUrl,
    siteName: "TOLIA",
    locale: "en_PH",
    type: "website",
    images: [
      {
        url: "/tolia-full.png",
        width: 1000,
        height: 262,
        alt: "TOLIA \u2014 Pru Life UK",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TOLIA (Tolentino Life Insurance Agency) \u2014 Pru Life UK",
    description: "Empowering Pru Life UK agents to succeed with resources, training, and support.",
    images: ["/tolia-full.png"],
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en-PH"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", geist.variable)}
    >
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-background focus:px-4 focus:py-2 focus:text-foreground focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary"
        >
          Skip to main content
        </a>
        <OrganizationJsonLd />
        <ThemeProvider>
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
