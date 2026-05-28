import { createServerClient } from "@supabase/ssr"
import { createAdminClient } from "@/lib/supabase/admin"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")
  const type = searchParams.get("type")
  const next = searchParams.get("next") ?? "/"

  if (code) {
    const cookieStore = await cookies()

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll: async () => cookieStore.getAll(),
          setAll: async (cookiesToSet) => {
            try {
              cookiesToSet.forEach(({ name, value, options }) => {
                cookieStore.set(name, value, options)
              })
            } catch {
              // ignore
            }
          },
        },
      }
    )

    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user?.email) {
        try {
          const admin = createAdminClient()

          const { data: agent } = await admin
            .from("agents")
            .select("id")
            .eq("email", user.email)
            .single()

          if (!agent) {
            try {
              await supabase.auth.signOut()
            } catch {}
            return NextResponse.redirect(
              `${origin}/login?error=no_agent_found`
            )
          }

          if (!agent.id) {
            await admin
              .from("agents")
              .update({ id: user.id, avatar_url: user.user_metadata.avatar_url })
              .eq("email", user.email)
          }
        } catch {
          try {
            await supabase.auth.signOut()
          } catch {}
          return NextResponse.redirect(
            `${origin}/login?error=no_agent_found`
          )
        }
      }

      if (type === "recovery" || type === "invite") {
        return NextResponse.redirect(`${origin}/auth/update-password`)
      }

      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth_callback_error`)
}
