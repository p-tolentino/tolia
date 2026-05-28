"use server"

import { createClient as createServerClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function signInWithGoogle() {
  const supabase = await createServerClient()

  const { data } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  })

  return { url: data.url }
}

export async function signInWithAgentCode(formData: FormData) {
  const agentCode = (formData.get("agent_code") as string)?.toUpperCase()
  const password = formData.get("password") as string

  if (!agentCode || !password) {
    return { error: "Please fill in all fields." }
  }

  const supabase = await createServerClient()
  const admin = createAdminClient()

  const { data: agent, error: lookupError } = await admin
    .from("agents")
    .select("email")
    .eq("agent_code", agentCode)
    .single()

  if (lookupError || !agent) {
    return {
      error: "Agent code not found. Please contact the branch manager.",
    }
  }

  const { error } = await supabase.auth.signInWithPassword({
    email: agent.email,
    password,
  })

  if (error) {
    if (error.message === "Invalid login credentials") {
      return {
        error:
          "Incorrect password. Try again or use 'First time?' to set up your account.",
      }
    }
    return { error: error.message }
  }

  revalidatePath("/")
  return { success: true }
}

export async function linkCurrentAgent() {
  const supabase = await createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user?.email) {
    return { error: "No authenticated user found." }
  }

  const admin = createAdminClient()
  const { data: agent } = await admin
    .from("agents")
    .select("id")
    .eq("email", user.email)
    .single()

  if (!agent) {
    await supabase.auth.signOut()
    return { error: "no_agent_found" }
  }

  if (!agent.id) {
    const { error } = await admin
      .from("agents")
      .update({ id: user.id, avatar_url: user.user_metadata.avatar_url })
      .eq("email", user.email)

    if (error) return { error: error.message }
  }

  return { success: true }
}

export async function signOut() {
  const supabase = await createServerClient()
  await supabase.auth.signOut()
  revalidatePath("/")
  redirect("/login")
}

export async function getCurrentUser() {
  const supabase = await createServerClient()
  const { data } = await supabase.auth.getUser()
  return data.user
}

export async function getCurrentAgent() {
  const supabase = await createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return null

  const { data } = await supabase
    .from("agents")
    .select("*")
    .eq("id", user.id)
    .single()

  return data
}

export async function requestPasswordSetup(formData: FormData) {
  const agentCode = (formData.get("agent_code") as string)?.toUpperCase()

  if (!agentCode) {
    return { error: "Please enter your agent code." }
  }

  const supabase = await createServerClient()
  const admin = createAdminClient()

  const { data: agent, error: lookupError } = await admin
    .from("agents")
    .select("email, first_name, agent_code")
    .eq("agent_code", agentCode)
    .single()

  if (lookupError || !agent) {
    return { error: "Agent code not found. Please contact the branch manager." }
  }

  // Check if auth user already exists
  const { data: users } = await admin.auth.admin.listUsers()
  const existingUser = users?.users.find((u) => u.email === agent.email)

  if (!existingUser) {
    // Create auth user first, then invite
    const { error: createError } = await admin.auth.admin.inviteUserByEmail(
      agent.email,
      {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      }
    )

    if (createError) {
      if (createError.message?.toLowerCase().includes("rate_limit") || createError.message?.toLowerCase().includes("rate limit")) {
        return { error: "You've requested too many emails recently. For security purposes, please try again in an hour." }
      }
      return { error: createError.message }
    }
  } else {
    // User exists but needs password reset
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(
      agent.email,
      {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      }
    )

    if (resetError) {
      if (resetError.message?.toLowerCase().includes("rate_limit") || resetError.message?.toLowerCase().includes("rate limit")) {
        return { error: "You've requested too many password reset emails recently. For security purposes, please try again in an hour." }
      }
      return { error: resetError.message }
    }
  }

  return {
    success: `Password setup link sent to ${agent.email}. Please check your inbox.`,
  }
}
