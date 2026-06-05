"use client"

import { useState } from "react"
import { DashboardSidebar } from "./dashboard-sidebar"
import { DashboardStats } from "./dashboard-stats"
import { EventsSection } from "./events-section"
import { AnnouncementsSection } from "./announcements-section"

import { FilesSection } from "./files-section"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { PanelLeft, FileText } from "lucide-react"

const tabs = [
  { value: "events", label: "Calendar Events" },
  { value: "announcements", label: "Announcements" },
  { value: "files", label: "Route Files" },
] as const

export function DashboardShell() {
  const [activeTab, setActiveTab] = useState("events")
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null)
  const [selectedRouteLabel, setSelectedRouteLabel] = useState<string | null>(
    null
  )
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleSelectRoute = (path: string, label: string) => {
    setSelectedRoute(path)
    setSelectedRouteLabel(label)
    setActiveTab("files")
  }

  const sidebar = (
    <DashboardSidebar
      activeTab={activeTab}
      onTabChange={(v) => {
        setActiveTab(v)
        if (v !== "files") setSelectedRoute(null)
      }}
      selectedRoute={selectedRoute}
      onSelectRoute={handleSelectRoute}
      variant="desktop"
    />
  )

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex">{sidebar}</div>

      {/* Mobile sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="fixed bottom-4 left-4 z-50 size-10 rounded-full shadow-lg lg:hidden"
          >
            <PanelLeft className="size-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 p-0">
          <SheetTitle className="sr-only">Management Sidebar</SheetTitle>
          <DashboardSidebar
            activeTab={activeTab}
            onTabChange={(v) => {
              setActiveTab(v)
              if (v !== "files") setSelectedRoute(null)
            }}
            selectedRoute={selectedRoute}
            onSelectRoute={handleSelectRoute}
            variant="sheet"
          />
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <main className="flex-1 overflow-auto bg-muted/30">
        <div className="mx-auto w-full max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
          <DashboardStats />

          <Card className="border shadow-sm">
            <Tabs
              value={activeTab}
              onValueChange={(v) => {
                setActiveTab(v)
                if (v !== "files") setSelectedRoute(null)
              }}
            >
              <CardHeader className="border-b bg-card">
                <TabsList className="overflow-hidden bg-muted/50">
                  {tabs.map((tab) => (
                    <TabsTrigger
                      key={tab.value}
                      value={tab.value}
                      className="gap-2 px-3 text-sm data-[state=active]:bg-background data-[state=active]:shadow-sm"
                    >
                      {tab.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <TabsContent value="events">
                  <EventsSection />
                </TabsContent>
                <TabsContent value="announcements">
                  <AnnouncementsSection />
                </TabsContent>
                <TabsContent value="files">
                  {selectedRoute ? (
                    <FilesSection
                      routePath={selectedRoute}
                      routeLabel={selectedRouteLabel ?? selectedRoute}
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
                      <div className="flex size-12 items-center justify-center rounded-full bg-muted">
                        <FileText className="size-6 text-muted-foreground" />
                      </div>
                      <p className="text-sm font-medium text-foreground">
                        Select a route
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Choose a route from the sidebar to manage its files
                      </p>
                    </div>
                  )}
                </TabsContent>
              </CardContent>
            </Tabs>
          </Card>
        </div>
      </main>
    </div>
  )
}
