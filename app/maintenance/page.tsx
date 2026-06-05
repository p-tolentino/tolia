import type { Metadata } from "next"
import Image from "next/image"
import { redirect } from "next/navigation"
import { TriangleAlert, Construction, Lock } from "lucide-react"

export const metadata: Metadata = {
  title: "Site Under Maintenance — TOLIA",
  robots: { index: false, follow: false },
}

const statusConfig: Record<
  string,
  { icon: React.ComponentType<{ className?: string }>; title: string; subtitle: string; message: string }
> = {
  dev_pending: {
    icon: Construction,
    title: "Under Construction",
    subtitle: "We're setting up your TOLIA Web Suite",
    message:
      "Please settle the development fee to continue. Reach out to TOLIA Support for details.",
  },
  maintenance_pending: {
    icon: TriangleAlert,
    title: "Site Under Maintenance",
    subtitle: "Your TOLIA Web Suite is temporarily unavailable",
    message:
      "Your maintenance fee is due for this period. Please coordinate with TOLIA Support to reactivate.",
  },
  overdue: {
    icon: Lock,
    title: "Site Temporarily Unavailable",
    subtitle: "Service has been paused",
    message:
      "Your account has a past-due balance. Please contact TOLIA Support to restore access.",
  },
}

export default function MaintenancePage() {
  const status = process.env.PAYMENT_STATUS ?? "paid"
  if (status === "paid") redirect("/")

  const config = statusConfig[status] ?? statusConfig.maintenance_pending
  const Icon = config.icon

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="flex flex-col items-center text-center max-w-md">
        <Image
          src="/tolia-full.png"
          alt="TOLIA"
          width={280}
          height={73}
          priority
          className="mb-8"
        />

        <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-muted">
          <Icon className="size-7 text-primary" />
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          {config.title}
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          {config.subtitle}
        </p>

        <div className="mt-6 rounded-lg bg-muted/50 px-4 py-3 text-sm text-foreground">
          {config.message}
        </div>

        <p className="mt-8 text-xs text-muted-foreground">
          Contact <span className="font-medium">TOLIA Support</span> for assistance
        </p>
      </div>
    </div>
  )
}
