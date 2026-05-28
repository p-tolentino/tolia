export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      agents: {
        Row: {
          agent_code: string
          id: string | null
          first_name: string
          middle_name: string | null
          last_name: string
          email: string
          phone: string | null
          role: string
          unit: string | null
          avatar_url: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          agent_code: string
          id?: string | null
          first_name: string
          middle_name?: string | null
          last_name: string
          email: string
          phone?: string | null
          role: string
          unit?: string | null
          avatar_url?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          agent_code?: string
          id?: string | null
          first_name?: string
          middle_name?: string | null
          last_name?: string
          email?: string
          phone?: string | null
          role?: string
          unit?: string | null
          avatar_url?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}
