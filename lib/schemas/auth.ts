import { z } from "zod"

export const loginSchema = z.object({
  agentCode: z.string().min(1, "Agent code is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export const firstTimeSchema = z.object({
  agentCode: z.string().min(1, "Agent code is required"),
})

export const passwordSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirm: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords do not match",
    path: ["confirm"],
  })

export type LoginFormValues = z.infer<typeof loginSchema>
export type FirstTimeFormValues = z.infer<typeof firstTimeSchema>
export type PasswordFormValues = z.infer<typeof passwordSchema>
