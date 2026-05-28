import { ViewTransition } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <main className="pt-16">
        <ViewTransition enter="auto" default="none">
          {children}
        </ViewTransition>
      </main>
      <Footer />
    </>
  )
}
