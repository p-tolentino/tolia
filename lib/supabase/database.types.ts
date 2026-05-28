export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      agents: {
        Row: {
          agent_code: string
          avatar_url: string | null
          coded_at: string | null
          created_at: string
          email: string
          first_name: string
          id: string | null
          is_active: boolean
          last_name: string
          middle_name: string | null
          phone: string | null
          role: string
          unit: string | null
          updated_at: string
        }
        Insert: {
          agent_code: string
          avatar_url?: string | null
          coded_at?: string | null
          created_at?: string
          email: string
          first_name: string
          id?: string | null
          is_active?: boolean
          last_name: string
          middle_name?: string | null
          phone?: string | null
          role: string
          unit?: string | null
          updated_at?: string
        }
        Update: {
          agent_code?: string
          avatar_url?: string | null
          coded_at?: string | null
          created_at?: string
          email?: string
          first_name?: string
          id?: string | null
          is_active?: boolean
          last_name?: string
          middle_name?: string | null
          phone?: string | null
          role?: string
          unit?: string | null
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
