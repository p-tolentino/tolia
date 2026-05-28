import type { PageContent } from "../types"
import { STANDARD_BODY } from "./constants"

export const incentivesContent: PageContent = {
  title: "Incentives",
  description: "Current incentive programs, rewards, and recognition.",
  sections: [
    { heading: "Overview", body: STANDARD_BODY },
    { heading: "Downloads", documents: [{ name: "Incentive Program Guide (PDF)", type: "pdf" }, { name: "Incentive Tracker (XLS)", type: "xls" }] },
  ],
}
