"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"
import { getAgentProfile } from "@/app/actions/agents"

interface Agent {
  agent_code: string
  first_name: string
  last_name: string
  avatar_url: string | null
  role: string
}

interface AuthContext {
  user: User | null
  agent: Agent | null
  loading: boolean
  refreshAgent: () => Promise<void>
}

const AuthContext = createContext<AuthContext>({
  user: null,
  agent: null,
  loading: true,
  refreshAgent: async () => {},
})

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [agent, setAgent] = useState<Agent | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchAgent = async () => {
    const profile: Agent | null = await getAgentProfile()
    if (profile) {
      setAgent(profile)
    }
  }

  useEffect(() => {
    const supabase = createClient()

    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
      if (user) {
        fetchAgent()
      }
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchAgent()
      } else {
        setAgent(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <AuthContext.Provider
      value={{ user, agent, loading, refreshAgent: () => fetchAgent() }}
    >
      {children}
    </AuthContext.Provider>
  )
}
