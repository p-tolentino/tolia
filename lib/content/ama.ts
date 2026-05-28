import type { PageContent } from "../types"
import { STANDARD_BODY } from "./constants"

export const amaContent: PageContent = {
  title: "AMA (Ask Me Anything)",
  description: "Submit your questions and get answers from the leadership team.",
  sections: [
    { heading: "Ask a Question", body: STANDARD_BODY },
    { heading: "Previous AMA Sessions", documents: [{ name: "AMA Session Archive (PDF)", type: "pdf" }] },
  ],
}
