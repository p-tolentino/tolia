import { z } from "zod"

export const documentSchema = z.object({
  label: z.string().min(1, "Label is required").trim(),
})

export type DocumentFormValues = z.infer<typeof documentSchema>
