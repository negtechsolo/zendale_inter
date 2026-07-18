export type ResourceType =
  | "Article"
  | "Case Study"
  | "Professional Guide"
  | "Healthcare Insight"
  | "White Paper"
  | "Corporate Health Resource"
  | "Referral Guide";

export interface Resource {
  id: string;
  type: ResourceType;
  title: string;
  summary: string;
  /** Where the reader goes: an internal route (case studies, downloads) — never a dead link. */
  route: string;
  routeLabel: string;
}

export const resourceTypes: ResourceType[] = [
  "Article",
  "Case Study",
  "Professional Guide",
  "Healthcare Insight",
  "White Paper",
  "Corporate Health Resource",
  "Referral Guide",
];

/**
 * Every resource routes to a real destination that exists today.
 * Articles, insights and white papers are written in full on this page
 * (expandable reading), so nothing links to an unfinished article route.
 */
export const resources: Resource[] = [
  {
    id: "one-partner-model",
    type: "Article",
    title: "Why healthcare buyers are consolidating to single partners",
    summary:
      "Organisations that once managed a dozen provider relationships are consolidating to one accountable partner. The reasons are practical: one contract, one standard, one number to call when something goes wrong — and a partner with enough breadth that 'we don't do that' never ends the conversation. This piece explains how an integrated group model changes the buyer's job, and what to ask any provider claiming to be one.",
    route: "/partnerships",
    routeLabel: "Explore partnership models",
  },
  {
    id: "equipment-downtime",
    type: "Healthcare Insight",
    title: "The real cost of equipment downtime — and why it's a planning problem",
    summary:
      "When clinical equipment fails, the visible cost is the repair. The larger cost is everything around it: cancelled procedures, referred-away patients, staff improvising workarounds. Most downtime is not bad luck; it is the absence of planned maintenance and lifecycle thinking. This insight sets out the difference between reactive repair and lifecycle management, and how to move a facility from one to the other.",
    route: "/medical-technology",
    routeLabel: "See our lifecycle approach",
  },
  {
    id: "corporate-health-roi",
    type: "Corporate Health Resource",
    title: "What a corporate health programme should actually give HR",
    summary:
      "A corporate health arrangement is only useful if HR can run it without becoming a healthcare administrator. That means scheduling handled by the provider, one report format across all sites, screening that keeps pace with hiring, and a named contact who answers. This resource lists the concrete deliverables to require from any corporate health partner — and the warning signs of an arrangement that will become your job to manage.",
    route: "/corporate-health",
    routeLabel: "See the corporate programme",
  },
  {
    id: "ppp-whitepaper",
    type: "White Paper",
    title: "Making public-private partnership work in healthcare delivery",
    summary:
      "PPP arrangements fail for predictable reasons: unclear service scope, misaligned incentives, and private partners who have advised on hospitals but never run one. This paper outlines the structural decisions that determine whether a healthcare PPP delivers — scope definition, performance measures, governance — drawn from Zendale's position as both an operator of facilities and an adviser to public institutions.",
    route: "/consulting",
    routeLabel: "Talk to the consulting practice",
  },
  {
    id: "referral-endoscopy",
    type: "Referral Guide",
    title: "Referring into the Zendale Endoscopy Centre",
    summary:
      "A practical guide for clinicians: which procedures the centre performs, how to prepare patients, how urgent cases are prioritised, and how structured reports return to you as the referring clinician. Available as a downloadable PDF in the Professional Download Centre.",
    route: "/downloads",
    routeLabel: "Download the Endoscopy Guide",
  },
  {
    id: "guide-icu",
    type: "Professional Guide",
    title: "ICU admission and transfer coordination",
    summary:
      "For hospitals and clinicians coordinating critical-care transfers: admission criteria, escalation pathways and how transfer into the Sky High ICU / Dialysis Centre is coordinated between teams. Available as a downloadable PDF in the Professional Download Centre.",
    route: "/downloads",
    routeLabel: "Download the ICU Guide",
  },
  {
    id: "cs-transformation",
    type: "Case Study",
    title: "Turning a struggling private hospital into a functioning one",
    summary:
      "How an operational diagnostic, a maintenance programme and restructured rotas moved one private hospital from firefighting to routine. Read the full challenge–approach–outcome narrative in Success Stories.",
    route: "/case-studies",
    routeLabel: "Read the case study",
  },
  {
    id: "cs-corporate",
    type: "Case Study",
    title: "One health partner for a multi-site workforce",
    summary:
      "How a multi-location organisation consolidated separate clinic arrangements into one Zendale retainership with a single standard and a single point of contact. Read the full narrative in Success Stories.",
    route: "/case-studies",
    routeLabel: "Read the case study",
  },
];
