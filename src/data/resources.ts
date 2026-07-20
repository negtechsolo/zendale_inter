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
  /** Where the reader goes: an internal route (case studies, downloads), never a dead link. */
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
      "Organisations that once managed many provider relationships are consolidating them under one accountable partner. The reasons are practical: one contract, one standard and one point of contact when something goes wrong. This piece explains how an integrated group model changes the buyer's role and what to ask any provider that claims to offer one.",
    route: "/partnerships",
    routeLabel: "Explore partnership models",
  },
  {
    id: "equipment-downtime",
    type: "Healthcare Insight",
    title: "The real cost of equipment downtime and why planning matters",
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
      "A corporate health arrangement is useful only when HR can run it without becoming a healthcare administrator. The provider should manage scheduling, use one report format across all sites, keep screening aligned with hiring and provide a named contact. This resource sets out the practical deliverables to require from a corporate health partner and the warning signs of an arrangement that may create more work for HR.",
    route: "/corporate-health",
    routeLabel: "See the corporate programme",
  },
  {
    id: "ppp-whitepaper",
    type: "White Paper",
    title: "Making public-private partnership work in healthcare delivery",
    summary:
      "Public-private partnerships fail for predictable reasons, including unclear service scope, misaligned incentives and partners without operating experience. This paper examines the structural decisions that shape delivery, including scope definition, performance measures and governance. It draws on Zendale's experience as both a facility operator and an adviser to public institutions.",
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
      "How an operational diagnostic, a maintenance programme and restructured rotas helped one private hospital move from firefighting to routine operations. Read the full challenge, approach and outcome in Success Stories.",
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
