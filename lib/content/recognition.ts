import type { PageContent } from "../types"
import { STANDARD_BODY } from "./constants"

export const recognitionContent: PageContent = {
  title: "Recognition",
  description: "Posters and announcements celebrating agent achievements.",
  sections: [
    { heading: "Recognition Posters", body: STANDARD_BODY },
    { heading: "Downloads", documents: [{ name: "Recognition Poster Template (PDF)", type: "pdf" }] },
  ],
}
