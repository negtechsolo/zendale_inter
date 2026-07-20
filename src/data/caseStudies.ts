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
 * Success stories are anonymised capability narratives.
 * No client identity or unverified performance figure is published.
 */
export const caseStudies: CaseStudy[] = [
  {
    id: "hospital-transformation",
    category: "Hospital Transformation",
    title: "Turning a struggling private hospital into a functioning one",
    challenge:
      "A privately owned hospital was losing patients and staff. Equipment sat idle for want of maintenance, clinical rotas were improvised week to week, and management had no reliable picture of what the facility was actually earning or spending.",
    approach:
      "Zendale's consulting team began with a full operational diagnostic covering clinical workflows, staffing, equipment condition and finances. The team then sequenced the improvements: a biomedical engineering maintenance programme, rotas built around actual patient flow, and straightforward management reports that the owners could use.",
    outcome:
      "The hospital moved from firefighting to routine: equipment back in clinical use, rotas planned in advance, and management decisions made on numbers rather than instinct. The owners retained Zendale for ongoing operational support.",
    image: "case-hospital-transformation.webp",
    imageAlt: "Hospital corridor during a Zendale operational review",
  },
  {
    id: "corporate-programme",
    category: "Corporate Health Programme",
    title: "One health partner for a multi-site workforce",
    challenge:
      "An organisation with staff across several locations was managing separate clinics in each city. Standards varied, invoicing was unpredictable and leadership had no consolidated view of workforce health.",
    approach:
      "Zendale consolidated the arrangement into a single retainership: annual medicals and pre-employment screening scheduled centrally, delivered through Zendale facilities and vetted partners in each location, with one report format and one accountable contact.",
    outcome:
      "HR now manages one relationship instead of many. Screening happens on hiring timelines, annual medicals run on schedule, and leadership receives a single consolidated picture of workforce health each cycle.",
    image: "case-corporate-health.webp",
    imageAlt: "Occupational health assessment during a corporate medical programme",
  },
  {
    id: "equipment-installation",
    category: "Equipment Installation",
    title: "Commissioning critical equipment without disrupting care",
    challenge:
      "A facility needed new clinical equipment installed and commissioned without disrupting the departments that depended on the same clinical spaces and utilities.",
    approach:
      "Zendale's medical technology team planned the installation around the clinical schedule: site preparation and utilities verified in advance, installation phased outside peak hours, and staff trained on the new equipment before handover rather than after.",
    outcome:
      "The equipment entered clinical service on the planned date. The receiving team had already been trained, and a maintenance schedule was agreed from the first day. This marked the beginning of a lifecycle relationship rather than the end of a delivery.",
    image: "case-equipment-installation.webp",
    imageAlt: "Biomedical engineer commissioning clinical equipment",
  },
  {
    id: "healthcare-partnership",
    category: "Healthcare Partnership",
    title: "Building a referral partnership that patients actually feel",
    challenge:
      "A clinic outside the network regularly saw patients who needed diagnostics and specialist care beyond its scope. It lacked a structured referral process that preserved continuity.",
    approach:
      "Zendale set up a formal referral partnership: agreed pathways into the Endoscopy Centre and specialist facilities, structured reporting back to the referring clinician, and a named coordinator on the Zendale side.",
    outcome:
      "Patients now move between the clinic and the network without repeating their story or their tests. The referring clinician stays informed at every step and remains the owner of the patient relationship.",
    image: "case-partnership.webp",
    imageAlt: "Clinicians reviewing a shared patient referral pathway",
  },
  {
    id: "community-outreach",
    category: "Community Outreach",
    title: "Taking screening to people who weren't coming to us",
    challenge:
      "Preventable conditions were being identified late because many people in the surrounding community sought hospital care only after symptoms had become serious.",
    approach:
      "Working with community organisations, Zendale ran outreach screening days staffed by network clinicians: basic health checks, risk screening and clear guidance on where and how to follow up, with follow-up pathways into network facilities for those who needed them.",
    outcome:
      "People who might not otherwise have visited a hospital received screening and practical health information. Those who needed further care were connected directly to appropriate services, while community organisations remained partners for future outreach.",
    image: "case-community-outreach.webp",
    imageAlt: "Community health screening session run by network clinicians",
  },
];
