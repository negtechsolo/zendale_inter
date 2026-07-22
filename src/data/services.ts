export interface ServiceGroup {
  id: string;
  name: string;
  intro: string;
  services: { name: string; detail: string }[];
  route: string;
}

/** Partnership is listed first because institutional collaboration is a
 * primary commercial pathway for Zendale Limited. The remaining capability
 * pillars retain their existing content and routes. */
export const serviceGroups: ServiceGroup[] = [
  {
    id: "partnerships",
    name: "Healthcare Partnerships",
    route: "/partnerships",
    intro:
      "Structured pathways for corporate organisations, hospitals and clinics, government and non-government agencies, HMOs, healthcare investors and international organisations to work with Zendale Limited.",
    services: [
      { name: "Corporate health partnerships", detail: "Retainership, medicals, screening, occupational health and coordinated referral arrangements for organisations." },
      { name: "Hospital and clinic partnerships", detail: "Referral, capacity-sharing, specialist support and institutional collaboration with healthcare providers." },
      { name: "Government and agency partnerships", detail: "Programme delivery, public-private partnerships, institutional development and health-system strengthening." },
      { name: "HMO partnerships", detail: "Provider arrangements and coordinated access to specialist services across the network." },
      { name: "Healthcare investment", detail: "Facility development, operational partnerships, expansion and institution-building opportunities." },
      { name: "International collaboration", detail: "Programme delivery, technical collaboration and institutional support for international organisations." },
    ],
  },
  {
    id: "clinical",
    name: "Clinical & Specialist Care",
    route: "/network",
    intro:
      "Direct patient care delivered through the current institutions in the growing Zendale Healthcare Network, with coordinated access to specialist capabilities across the ecosystem.",
    services: [
      { name: "Multi-specialist hospital care", detail: "Consultant-led clinical care through Sky High Medical Centre and Finnih Medical Centre." },
      { name: "Critical care and dialysis", detail: "Intensive care and dialysis services through the Sky High ICU / Dialysis Centre." },
      { name: "Fertility and reproductive care", detail: "Assessment, assisted reproduction and patient support through Kindred Path Fertility Centre." },
      { name: "Endoscopy and gastroenterology", detail: "Diagnostic and therapeutic endoscopy through Zendale Endoscopy Centre." },
      { name: "Diagnostics and occupational health", detail: "Pathology, wellness, radiology and occupational health through LifeCentre Medical Services." },
      { name: "Biomedical equipment support", detail: "Procurement, repair, maintenance and technical support through LifeCentre Med Support." },
    ],
  },
  {
    id: "corporate",
    name: "Corporate Healthcare",
    route: "/corporate-health",
    intro:
      "Health programmes that support workforce wellbeing and organisational compliance, designed for HR leaders who need one accountable partner rather than a directory of clinics.",
    services: [
      { name: "Healthcare retainership", detail: "An ongoing clinical partner for your organisation, with defined cover and a named point of contact." },
      { name: "Executive medicals", detail: "Comprehensive, discreet health assessments for senior leadership." },
      { name: "Annual staff medicals", detail: "Scheduled workforce health checks with clear, actionable reporting." },
      { name: "Pre-employment screening", detail: "Fitness-for-role screening delivered on hiring timelines." },
      { name: "Occupational health", detail: "Workplace health risk assessment and ongoing occupational health support." },
      { name: "Multi-location delivery", detail: "Programmes coordinated through Zendale institutions and approved delivery partners across locations." },
    ],
  },
  {
    id: "medtech",
    name: "Medical Technology",
    route: "/medical-technology",
    intro:
      "The engineering behind reliable care, covering the sourcing, installation and maintenance of the equipment healthcare institutions depend on throughout its working life.",
    services: [
      { name: "Equipment procurement", detail: "Specification, sourcing and supply of medical equipment matched to clinical need and budget." },
      { name: "Installation and commissioning", detail: "Site-ready installation, testing and clinical handover." },
      { name: "Planned maintenance", detail: "Scheduled preventive maintenance that protects uptime and asset value." },
      { name: "Biomedical engineering", detail: "Biomedical engineering support for facilities within and beyond the Zendale network." },
      { name: "Repairs and fault response", detail: "Diagnosis and repair when equipment fails, prioritised by clinical impact." },
      { name: "Lifecycle management", detail: "Asset registers, replacement planning and evidence-led end-of-life decisions." },
    ],
  },
  {
    id: "consulting",
    name: "Healthcare Consulting",
    route: "/consulting",
    intro:
      "Advisory grounded in operations. Zendale's consulting work draws on practical healthcare delivery, institutional management and transformation experience.",
    services: [
      { name: "Hospital planning", detail: "Feasibility, service design and planning for new or expanding facilities." },
      { name: "Operational improvement", detail: "Diagnosing and improving workflows, staffing and systems that limit performance." },
      { name: "Public-private partnerships", detail: "Structuring and supporting arrangements between government and private healthcare providers." },
      { name: "Quality and compliance", detail: "Building standards, audit processes and governance for safer, more accountable delivery." },
      { name: "Healthcare transformation", detail: "End-to-end change programmes for institutions repositioning how they deliver care." },
    ],
  },
];

export const industries = [
  "Corporate Organisations",
  "Hospitals",
  "Clinics",
  "HMOs",
  "Government",
  "Non-Government Agencies",
  "Healthcare Investors",
  "Development Partners",
  "Manufacturers",
  "Universities",
  "International Organisations",
];
