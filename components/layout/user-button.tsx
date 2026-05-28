"use client"

import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth/auth-provider"
import { signOut } from "@/app/actions/auth"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut } from "lucide-react"
import { toast } from "sonner"

export function UserButton() {
  const router = useRouter()
  const { user, agent, loading } = useAuth()

  if (loading || !user || !agent) return null

  const initials = `${agent.first_name[0]}${agent.last_name[0]}`.toUpperCase()

  async function handleSignOut() {
    const result = await signOut()
    if (result?.success) {
      toast.success("Signed out successfully")
      router.push("/login")
      router.refresh()
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="size-8 rounded-full">
          <Avatar className="size-8">
            <AvatarImage
              src={agent.avatar_url ?? undefined}
              alt={`${agent.first_name} ${agent.last_name}`}
            />
            <AvatarFallback className="text-xs font-medium">
              {initials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 max-w-[calc(100vw-2rem)]">
        <DropdownMenuLabel>
          <div className="flex flex-col">
            <span className="font-medium">
              {agent.first_name} {agent.last_name}
            </span>
            <span className="text-xs font-normal text-muted-foreground">
              {agent.agent_code} &middot; {agent.role}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut className="mr-2 size-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
