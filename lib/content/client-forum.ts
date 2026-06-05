import type { PageContent } from "../types"
import { STANDARD_BODY } from "./constants"

export const clientForumContent: PageContent = {
  title: "Client Forum",
  description: "A space for client discussions, feedback, and engagement.",
  sections: [
    { heading: "Forum", body: STANDARD_BODY },
    { heading: "Guidelines", body: "Community guidelines for client forum participation." },
  ],
}
