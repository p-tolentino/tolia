import type { PageContent } from "../types"
import { STANDARD_BODY } from "./constants"

export const leapContent: PageContent = {
  title: "LEAP: Next TOLIA Leader",
  description: "Leadership development program for aspiring TOLIA leaders.",
  sections: [
    { heading: "Program Overview", body: STANDARD_BODY },
    { heading: "Downloads", documents: [{ name: "LEAP Program Brochure (PDF)", type: "pdf" }, { name: "Application Form (PDF)", type: "pdf" }] },
  ],
}
