export interface CaseStudy {
  id: string;
  category: string;
  title: string;
  challenge: string;
  approach: string;
  outcome: string;
  image: string;
  imageAlt: string;
}

/**
 * Success stories are written as anonymised capability narratives:
 * client identities are confidential and no figures are published
 * unless verified. This note also appears on the page itself.
 */
export const caseStudies: CaseStudy[] = [
  {
    id: "hospital-transformation",
    category: "Hospital Transformation",
    title: "Turning a struggling private hospital into a functioning one",
    challenge:
      "A privately owned hospital was losing patients and staff. Equipment sat idle for want of maintenance, clinical rotas were improvised week to week, and management had no reliable picture of what the facility was actually earning or spending.",
    approach:
      "Zendale's consulting team began with a full operational diagnostic — clinical workflows, staffing, equipment condition and finances — then sequenced the fixes: a maintenance programme delivered by our biomedical engineering team, restructured rotas built around real patient flow, and simple management reporting the owners could actually read.",
    outcome:
      "The hospital moved from firefighting to routine: equipment back in clinical use, rotas planned in advance, and management decisions made on numbers rather than instinct. The owners retained Zendale for ongoing operational support.",
    image: "case-hospital-transformation.jpg",
    imageAlt: "Hospital corridor during a Zendale operational review",
  },
  {
    id: "corporate-programme",
    category: "Corporate Health Programme",
    title: "One health partner for a multi-site workforce",
    challenge:
      "An organisation with staff spread across several locations was juggling separate clinics in each city — inconsistent standards, unpredictable invoicing, and no single view of workforce health.",
    approach:
      "Zendale consolidated the arrangement into a single retainership: annual medicals and pre-employment screening scheduled centrally, delivered through Zendale facilities and vetted partners in each location, with one report format and one accountable contact.",
    outcome:
      "HR now manages one relationship instead of many. Screening happens on hiring timelines, annual medicals run on schedule, and leadership receives a single consolidated picture of workforce health each cycle.",
    image: "case-corporate-health.jpg",
    imageAlt: "Occupational health assessment during a corporate medical programme",
  },
  {
    id: "equipment-installation",
    category: "Equipment Installation",
    title: "Commissioning critical equipment without disrupting care",
    challenge:
      "A facility needed new clinical equipment installed and commissioned — but could not afford downtime in the departments the installation would touch.",
    approach:
      "Zendale's medical technology team planned the installation around the clinical schedule: site preparation and utilities verified in advance, installation phased outside peak hours, and staff trained on the new equipment before handover rather than after.",
    outcome:
      "The equipment entered clinical service on the planned date, with the receiving team already trained and a maintenance schedule agreed from day one — the beginning of a lifecycle relationship, not the end of a delivery.",
    image: "case-equipment-installation.jpg",
    imageAlt: "Biomedical engineer commissioning clinical equipment",
  },
  {
    id: "healthcare-partnership",
    category: "Healthcare Partnership",
    title: "Building a referral partnership that patients actually feel",
    challenge:
      "A clinic outside the network regularly saw patients who needed diagnostics and specialist care it could not provide — and had no structured way to refer them without losing continuity.",
    approach:
      "Zendale set up a formal referral partnership: agreed pathways into the Endoscopy Centre and specialist facilities, structured reporting back to the referring clinician, and a named coordinator on the Zendale side.",
    outcome:
      "Patients now move between the clinic and the network without repeating their story or their tests. The referring clinician stays informed at every step and remains the owner of the patient relationship.",
    image: "case-partnership.jpg",
    imageAlt: "Clinicians reviewing a shared patient referral pathway",
  },
  {
    id: "community-outreach",
    category: "Community Outreach",
    title: "Taking screening to people who weren't coming to us",
    challenge:
      "Preventable conditions were presenting late — because for many people in the surrounding community, a hospital visit only happens when something is already seriously wrong.",
    approach:
      "Working with community organisations, Zendale ran outreach screening days staffed by network clinicians: basic health checks, risk screening and clear guidance on where and how to follow up, with follow-up pathways into network facilities for those who needed them.",
    outcome:
      "People who would not have presented to a hospital were screened, informed and — where needed — connected directly into care, with the community organisations as ongoing partners for future outreach.",
    image: "case-community-outreach.jpg",
    imageAlt: "Community health screening session run by network clinicians",
  },
];
