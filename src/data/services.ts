export interface ServiceGroup {
  id: string;
  name: string;
  intro: string;
  services: { name: string; detail: string }[];
  route: string; // deep-dive page
}

export const serviceGroups: ServiceGroup[] = [
  {
    id: "clinical",
    name: "Clinical & Specialist Care",
    route: "/network",
    intro:
      "Direct patient care, delivered through the eight facilities of the Zendale Healthcare Network. One referral reaches every specialty in the group.",
    services: [
      { name: "Multi-specialist hospital care", detail: "Consultant-led outpatient, inpatient and surgical care at Sky High and Finnih Medical Centres." },
      { name: "Critical care & dialysis", detail: "Intensive care and haemodialysis programmes at the Sky High ICU / Dialysis Centre." },
      { name: "Fertility & reproductive care", detail: "Assessment, counselling and assisted reproductive treatment at Kindred Path Fertility Centre." },
      { name: "Endoscopy & diagnostics", detail: "Procedure-based diagnosis and gastrointestinal investigation at the Zendale Endoscopy Centre." },
      { name: "General medical services", detail: "First-line care and screening through Lifecentre Medical Services, with onward network referral." },
      { name: "Medical support services", detail: "Clinical supply, logistics and facility support through Lifecentre Med Support." },
    ],
  },
  {
    id: "corporate",
    name: "Corporate Healthcare",
    route: "/corporate-health",
    intro:
      "Health programmes that keep workforces well and organisations compliant — designed for HR leaders who need one accountable partner, not a directory of clinics.",
    services: [
      { name: "Healthcare retainership", detail: "An ongoing clinical partner for your organisation, with defined cover and a named point of contact." },
      { name: "Executive medicals", detail: "Comprehensive, discreet health assessments for senior leadership." },
      { name: "Annual staff medicals", detail: "Scheduled workforce health checks with clear, actionable reporting." },
      { name: "Pre-employment screening", detail: "Fitness-for-role screening delivered on hiring timelines." },
      { name: "Occupational health", detail: "Workplace health risk assessment and ongoing occupational health support." },
      { name: "Nationwide coverage", detail: "Delivery through Zendale facilities and vetted partner providers across locations." },
    ],
  },
  {
    id: "medtech",
    name: "Medical Technology",
    route: "/medical-technology",
    intro:
      "The engineering behind reliable care: sourcing, installing and maintaining the equipment hospitals depend on — across its whole working life.",
    services: [
      { name: "Equipment procurement", detail: "Specification, sourcing and supply of medical equipment matched to clinical need and budget." },
      { name: "Installation & commissioning", detail: "Site-ready installation, testing and clinical handover." },
      { name: "Planned maintenance", detail: "Scheduled preventive maintenance that protects uptime and asset value." },
      { name: "Biomedical engineering", detail: "In-house biomedical engineers supporting facilities across the network and beyond." },
      { name: "Repairs & fault response", detail: "Diagnosis and repair when equipment fails, prioritised by clinical impact." },
      { name: "Lifecycle management", detail: "Asset registers, replacement planning and end-of-life decisions made on evidence." },
    ],
  },
  {
    id: "consulting",
    name: "Healthcare Consulting",
    route: "/consulting",
    intro:
      "Advisory grounded in operations. Zendale runs hospitals, ICUs and diagnostic centres — our consultants advise from practice, not theory.",
    services: [
      { name: "Hospital planning", detail: "Feasibility, service design and planning for new or expanding facilities." },
      { name: "Operational improvement", detail: "Diagnosing and fixing the workflows, staffing and systems that hold facilities back." },
      { name: "Public-private partnerships", detail: "Structuring and supporting PPP arrangements between government and private providers." },
      { name: "Quality & compliance", detail: "Building the standards, audit and governance that regulators and patients expect." },
      { name: "Healthcare transformation", detail: "End-to-end change programmes for organisations repositioning how they deliver care." },
    ],
  },
  {
    id: "partnerships",
    name: "Hospital Partnerships",
    route: "/partnerships",
    intro:
      "Structured ways to work with the Zendale ecosystem — for hospitals, HMOs, government agencies, investors and international organisations.",
    services: [
      { name: "Hospital network partnerships", detail: "Referral, capacity-sharing and service partnerships with hospitals and clinics." },
      { name: "HMO & payer partnerships", detail: "Provider arrangements with health maintenance organisations and insurers." },
      { name: "Government & public health", detail: "Working with agencies on public health delivery and infrastructure." },
      { name: "Investor collaboration", detail: "Engaging healthcare investors on facility development and expansion." },
      { name: "International partnerships", detail: "Collaboration with development partners and international organisations." },
    ],
  },
];

export const industries = [
  "Corporate Organisations",
  "Hospitals",
  "Clinics",
  "HMOs",
  "Government",
  "NGOs",
  "Healthcare Investors",
  "Development Partners",
  "Manufacturers",
  "Universities",
  "International Organisations",
];
