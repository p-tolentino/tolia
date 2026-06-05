export const UM_ROLES = [
  "Unit Manager",
  "Branch Manager",
  "System Admin",
] as const

export const MANAGE_ROLES = [
  "Branch Manager",
  "BM Assistant",
  "System Admin",
] as const

export function isUmRole(role: string | null | undefined): boolean {
  if (!role) return false
  return UM_ROLES.includes(role as (typeof UM_ROLES)[number])
}

export function canManage(role: string | null | undefined): boolean {
  if (!role) return false
  return MANAGE_ROLES.includes(role as (typeof MANAGE_ROLES)[number])
}
