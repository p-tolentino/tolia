"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"

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

  const fetchAgent = async (userId: string) => {
    const supabase = createClient()
    const { data } = await supabase
      .from("agents")
      .select("agent_code, first_name, last_name, avatar_url, role")
      .eq("id", userId)
      .single()
    if (data) setAgent(data as Agent)
  }

  useEffect(() => {
    const supabase = createClient()

    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
      if (user) {
        fetchAgent(user.id)
      }
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchAgent(session.user.id)
      } else {
        setAgent(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <AuthContext.Provider
      value={{ user, agent, loading, refreshAgent: () => fetchAgent(user?.id ?? "") }}
    >
      {children}
    </AuthContext.Provider>
  )
}
