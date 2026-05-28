import type { PageContent } from "../types"
import { STANDARD_BODY } from "./constants"

export const assembliesContent: PageContent = {
  title: "Assemblies",
  description: "Branch assembly schedules, materials, and updates.",
  sections: [
    { heading: "Overview", body: STANDARD_BODY },
    { heading: "Downloads", documents: [{ name: "Assembly Schedule (PDF)", type: "pdf" }, { name: "Assembly Materials (PDF)", type: "pdf" }] },
  ],
}
