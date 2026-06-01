import { createAdminClient } from "@/lib/supabase/admin"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const token_hash = searchParams.get("token_hash")
  const type = searchParams.get("type")
  const next = searchParams.get("next") ?? "/auth/update-password"

  if (token_hash && type) {
    const supabase = await createClient()

    const { error } = await supabase.auth.verifyOtp({
      token_hash,
      type,
    })

    if (!error) {
      // Link agent identity
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user?.email) {
        const admin = createAdminClient()

        const { data: agent } = await admin
          .from("agents")
          .select("id")
          .eq("email", user.email)
          .single()

        if (agent && !agent.id) {
          await admin
            .from("agents")
            .update({ id: user.id })
            .eq("email", user.email)
        }
      }

      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  return NextResponse.redirect(`${origin}/login?error=verification_failed`)
}
