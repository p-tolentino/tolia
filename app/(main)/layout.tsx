import { Suspense } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ContentSkeleton } from "@/components/shared/skeletons"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-16">
        <Suspense fallback={<ContentSkeleton />}>{children}</Suspense>
      </main>
      <Footer />
    </>
  )
}
