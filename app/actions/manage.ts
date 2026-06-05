"use server"

import { createClient } from "@/lib/supabase/server"
import { requireManageRole } from "@/lib/auth/require-role"
import { revalidatePath } from "next/cache"

// ── Route Tree ──

export interface RouteNode {
  label: string
  path: string
  children: RouteNode[]
}

export async function getRouteTree(): Promise<RouteNode[]> {
  const routes: Record<string, RouteNode> = {
    "agent-support": { label: "Agent Support", path: "/agent-support", children: [] },
    assemblies: { label: "Assemblies", path: "/assemblies", children: [] },
    leap: { label: "LEAP", path: "/leap", children: [] },
    "from-bms-desk": { label: "From BM's Desk", path: "/from-bms-desk", children: [] },
    "new-recruits": { label: "New Recruits", path: "/new-recruits", children: [] },
    "for-unit-managers-only": { label: "For Unit Managers Only", path: "/for-unit-managers-only", children: [] },
    schedules: { label: "Schedules", path: "/schedules", children: [] },
    "rewards-and-incentives": { label: "Rewards & Incentives", path: "/rewards-and-incentives", children: [] },
    socials: { label: "Socials", path: "/socials", children: [] },
  }

  const subroutes: Record<string, { label: string; parent: string }[]> = {
    "agent-support": [
      { label: "Agency Handbook", parent: "agent-support/agency-handbook" },
      { label: "All About Digital", parent: "agent-support/all-about-digital" },
      { label: "Forms", parent: "agent-support/forms" },
      { label: "Investment", parent: "agent-support/investment" },
      { label: "Marketing Campaign", parent: "agent-support/marketing-campaign" },
      { label: "MDRT Materials", parent: "agent-support/mdrt-materials" },
      { label: "Product Primers", parent: "agent-support/product-primers" },
      { label: "Productivity Trainings", parent: "agent-support/productivity-trainings" },
      { label: "Underwriting", parent: "agent-support/underwriting" },
    ],
    "from-bms-desk": [
      { label: "Announcements", parent: "from-bms-desk/announcements" },
      { label: "Ask Me Anything", parent: "from-bms-desk/ask-me-anything" },
    ],
    "new-recruits": [
      { label: "BYB Schedule", parent: "new-recruits/byb-schedule" },
      { label: "Golden List", parent: "new-recruits/golden-list" },
      { label: "IC Exam Schedule", parent: "new-recruits/ic-exam-schedule" },
      { label: "Onboarding", parent: "new-recruits/onboarding" },
      { label: "Prospect List", parent: "new-recruits/prospect-list" },
      { label: "Recruitment Flowchart", parent: "new-recruits/recruitment-flowchart" },
      { label: "Reviewer", parent: "new-recruits/reviewer" },
      { label: "Rookie High Flyers Club", parent: "new-recruits/rookie-high-flyers-club" },
      { label: "ROP / ILT", parent: "new-recruits/rop-ilt" },
      { label: "Your First 90 Days", parent: "new-recruits/your-first-90-days" },
    ],
    "for-unit-managers-only": [
      { label: "Agents Directory", parent: "for-unit-managers-only/agents-directory" },
      { label: "MDRT Center of Field Leadership", parent: "for-unit-managers-only/mdrt-center-of-field-leadership" },
      { label: "Minutes of the Meeting", parent: "for-unit-managers-only/minutes-of-the-meeting" },
      { label: "Onboarding Materials", parent: "for-unit-managers-only/onboarding-materials" },
      { label: "One on One Engagement", parent: "for-unit-managers-only/one-on-one-engagement" },
      { label: "Promotion Parameters", parent: "for-unit-managers-only/promotion-parameters" },
      { label: "TAPP Materials", parent: "for-unit-managers-only/tapp-materials" },
      { label: "UM Welcome Kit", parent: "for-unit-managers-only/um-welcome-kit" },
      { label: "Unit Business Plan", parent: "for-unit-managers-only/unit-business-plan" },
    ],
    schedules: [
      { label: "Client Forum", parent: "schedules/client-forum" },
      { label: "PRU Calendar", parent: "schedules/pru-calendar" },
    ],
    "rewards-and-incentives": [
      { label: "Incentives", parent: "rewards-and-incentives/incentives" },
      { label: "Recognition", parent: "rewards-and-incentives/recognition" },
      { label: "Trackers", parent: "rewards-and-incentives/trackers" },
    ],
    socials: [
      { label: "Events", parent: "socials/events" },
      { label: "Greetings", parent: "socials/greetings" },
    ],
  }

  for (const [parentKey, subs] of Object.entries(subroutes)) {
    for (const sub of subs) {
      routes[parentKey].children.push({
        label: sub.label,
        path: "/" + sub.parent,
        children: [],
      })
    }
  }

  return Object.values(routes)
}

// ── Announcements ──

export interface Announcement {
  id: string
  title: string
  content: string
  author_id: string | null
  is_published: boolean
  created_at: string
  updated_at: string
}

export async function getAnnouncements(): Promise<{ data: Announcement[] | null; error: string | null }> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("announcements")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) return { data: null, error: error.message }
    return { data, error: null }
  } catch {
    return { data: null, error: "Failed to fetch announcements" }
  }
}

export async function createAnnouncement(
  title: string,
  content: string,
  isPublished?: boolean,
): Promise<{ data: Announcement | null; error: string | null }> {
  try {
    const auth = await requireManageRole()
    if ("error" in auth) return { data: null, error: auth.error }
    const supabase = await createClient()

    const { data, error } = await supabase
      .from("announcements")
      .insert({ title, content, author_id: auth.userId, is_published: isPublished ?? false })
      .select()
      .single()

    if (error) return { data: null, error: error.message }
    revalidatePath("/")
    return { data, error: null }
  } catch {
    return { data: null, error: "Failed to create announcement" }
  }
}

export async function updateAnnouncement(
  id: string,
  updates: { title?: string; content?: string; is_published?: boolean },
): Promise<{ data: Announcement | null; error: string | null }> {
  try {
    const auth = await requireManageRole()
    if ("error" in auth) return { data: null, error: auth.error }
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("announcements")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single()

    if (error) return { data: null, error: error.message }
    revalidatePath("/")
    return { data, error: null }
  } catch {
    return { data: null, error: "Failed to update announcement" }
  }
}

export async function deleteAnnouncement(
  id: string,
): Promise<{ success: boolean; error: string | null }> {
  try {
    const auth = await requireManageRole()
    if ("error" in auth) return { success: false, error: auth.error }
    const supabase = await createClient()
    const { error } = await supabase.from("announcements").delete().eq("id", id)
    if (error) return { success: false, error: error.message }
    revalidatePath("/")
    return { success: true, error: null }
  } catch {
    return { success: false, error: "Failed to delete announcement" }
  }
}

// ── Route Documents ──

export interface RouteDocument {
  id: string
  route_path: string
  label: string
  file_name: string | null
  file_type: string
  file_url: string | null
  storage_path: string | null
  uploaded_by: string | null
  created_at: string
}

export async function getRouteDocuments(
  routePath: string,
): Promise<{ data: RouteDocument[] | null; error: string | null }> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("route_documents")
      .select("*")
      .eq("route_path", routePath)
      .order("created_at", { ascending: false })

    if (error) return { data: null, error: error.message }
    return { data, error: null }
  } catch {
    return { data: null, error: "Failed to fetch documents" }
  }
}

export async function createRouteDocument(
  routePath: string,
  label: string,
): Promise<{ data: RouteDocument | null; error: string | null }> {
  try {
    const auth = await requireManageRole()
    if ("error" in auth) return { data: null, error: auth.error }
    const supabase = await createClient()

    const { data, error } = await supabase
      .from("route_documents")
      .insert({ route_path: routePath, label, uploaded_by: auth.userId })
      .select()
      .single()

    if (error) return { data: null, error: error.message }
    revalidatePath("/")
    return { data, error: null }
  } catch {
    return { data: null, error: "Failed to create document label" }
  }
}

export async function uploadRouteDocument(
  documentId: string,
  formData: FormData,
): Promise<{ data: RouteDocument | null; error: string | null }> {
  try {
    const auth = await requireManageRole()
    if ("error" in auth) return { data: null, error: auth.error }
    const supabase = await createClient()
    const file = formData.get("file") as File
    if (!file) return { data: null, error: "No file provided" }

    const fileExt = file.name.split(".").pop() ?? "pdf"
    const filePath = `route-documents/${documentId}/${documentId}.${fileExt}`

    const { data: existing } = await supabase
      .from("route_documents")
      .select("storage_path")
      .eq("id", documentId)
      .single()

    if (existing?.storage_path) {
      await supabase.storage.from("tolia-files").remove([existing.storage_path])
    }

    const { error: uploadError } = await supabase.storage
      .from("tolia-files")
      .upload(filePath, file, { upsert: true })
    if (uploadError) return { data: null, error: uploadError.message }

    const { data: urlData } = supabase.storage
      .from("tolia-files")
      .getPublicUrl(filePath)

    const { data, error } = await supabase
      .from("route_documents")
      .update({
        file_name: file.name,
        file_type: fileExt,
        file_url: urlData.publicUrl,
        storage_path: filePath,
        updated_at: new Date().toISOString(),
      })
      .eq("id", documentId)
      .select()
      .single()

    if (error) return { data: null, error: error.message }
    revalidatePath("/")
    return { data, error: null }
  } catch {
    return { data: null, error: "Failed to upload file" }
  }
}

export async function getAgentStats(): Promise<{
  data: { active: number; total: number } | null
  error: string | null
}> {
  try {
    const supabase = await createClient()
    const { count: total, error: totalErr } = await supabase
      .from("agents")
      .select("*", { count: "exact", head: true })
    if (totalErr) return { data: null, error: totalErr.message }

    const { count: active, error: activeErr } = await supabase
      .from("agents")
      .select("*", { count: "exact", head: true })
      .eq("is_active", true)
    if (activeErr) return { data: null, error: activeErr.message }

    return { data: { active: active ?? 0, total: total ?? 0 }, error: null }
  } catch {
    return { data: null, error: "Failed to fetch agent stats" }
  }
}

export async function deleteRouteDocument(
  id: string,
): Promise<{ success: boolean; error: string | null }> {
  try {
    const auth = await requireManageRole()
    if ("error" in auth) return { success: false, error: auth.error }
    const supabase = await createClient()

    const { data: doc } = await supabase
      .from("route_documents")
      .select("storage_path")
      .eq("id", id)
      .single()

    if (doc?.storage_path) {
      await supabase.storage.from("tolia-files").remove([doc.storage_path])
    }

    const { error } = await supabase.from("route_documents").delete().eq("id", id)
    if (error) return { success: false, error: error.message }
    revalidatePath("/")
    return { success: true, error: null }
  } catch {
    return { success: false, error: "Failed to delete document" }
  }
}
