export const UM_ROLES = [
  "Unit Manager",
  "Branch Manager",
  "Database Admin",
] as const

export function isUmRole(role: string | null | undefined): boolean {
  if (!role) return false
  return UM_ROLES.includes(role as (typeof UM_ROLES)[number])
}
