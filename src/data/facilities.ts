export interface Facility {
  id: string;
  code: string; // mono facility code used in labels and the 3D scene
  name: string;
  focus: string;
  description: string;
  services: string[];
  url: string;        // live external site
  internal?: string;  // internal route override (VHELAR → /consulting)
  image: string;      // /src/assets/images filename, see IMAGE-MANIFEST.md
  imageAlt: string;
}

/**
 * The eight members of the Zendale Healthcare Network.
 * Service lists describe each facility's stated focus area only -
 * no volumes, outcomes or capacity figures are claimed anywhere.
 */
export const facilities: Facility[] = [
  {
    id: "sky-high",
    code: "ZN-01",
    name: "Sky High Medical Centre",
    focus: "Multi-specialist hospital care",
    description:
      "A multi-specialist hospital providing coordinated care across several disciplines in one place, from the first consultation through diagnosis, treatment and follow-up.",
    services: [
      "Specialist outpatient consultations",
      "Inpatient and surgical care",
      "Diagnostics and laboratory services",
      "Coordinated multi-specialty referrals",
    ],
    url: "https://skyhighmedicalcentre.com/",
    image: "network-skyhigh.webp",
    imageAlt: "Clinical team at work inside Sky High Medical Centre",
  },
  {
    id: "sky-high-icu",
    code: "ZN-02",
    name: "Sky High ICU / Dialysis Centre",
    focus: "Critical care & dialysis",
    description:
      "Dedicated critical care and renal support for patients who need continuous monitoring, intensive intervention or regular dialysis. Its connection to Sky High Medical Centre supports immediate escalation when required.",
    services: [
      "Intensive care and continuous monitoring",
      "Haemodialysis programmes",
      "Critical-care nursing",
      "Direct escalation from ward to ICU",
    ],
    url: "https://skyhighmedicalcentre.com/sky-high-dialysis/",
    image: "network-skyhigh-icu.webp",
    imageAlt: "ICU monitoring equipment at the Sky High ICU and Dialysis Centre",
  },
  {
    id: "finnih",
    code: "ZN-03",
    name: "Finnih Medical Centre",
    focus: "Clinical & specialist services",
    description:
      "A clinical and specialist centre offering consultant-led care to patients referred through the network or presenting directly, with access to the wider Zendale ecosystem when required.",
    services: [
      "Consultant-led clinics",
      "Specialist clinical services",
      "Diagnostic work-up",
      "Network referrals when cases need escalation",
    ],
    url: "https://finnihmedicalcentre.com/",
    image: "network-finnih.webp",
    imageAlt: "Consultation room at Finnih Medical Centre",
  },
  {
    id: "lifecentre",
    code: "ZN-04",
    name: "Lifecentre Medical Services",
    focus: "Medical services",
    description:
      "General and supporting medical services for individuals and organisations. The centre serves as a first point of care and connects patients to the appropriate specialist facility when further intervention is required.",
    services: [
      "General medical services",
      "Screening and check-ups",
      "Organisational health support",
      "Onward referral within the network",
    ],
    url: "https://lifecentremedicals.com/",
    image: "network-lifecentre.webp",
    imageAlt: "Nurse preparing a patient assessment at Lifecentre Medical Services",
  },
  {
    id: "kindred-path",
    code: "ZN-05",
    name: "Kindred Path Fertility Centre",
    focus: "Fertility & reproductive care",
    description:
      "Fertility and reproductive care delivered with clinical rigour and sensitivity, supporting individuals and couples through assessment, treatment and ongoing care.",
    services: [
      "Fertility assessment and counselling",
      "Assisted reproductive treatment",
      "Reproductive health services",
      "Ongoing patient support",
    ],
    url: "https://www.ifmkindredpathfertilitycentre.com/",
    image: "network-kindredpath.webp",
    imageAlt: "Embryology laboratory at Kindred Path Fertility Centre",
  },
  {
    id: "zendale-endoscopy",
    code: "ZN-06",
    name: "Zendale Endoscopy Centre",
    focus: "Endoscopy & diagnostics",
    description:
      "A dedicated endoscopy and diagnostics centre equipped for gastrointestinal investigation and procedure-based diagnosis, with structured reporting for referring clinicians.",
    services: [
      "Diagnostic and therapeutic endoscopy",
      "Gastrointestinal investigation",
      "Procedure-based diagnostics",
      "Structured reporting to referrers",
    ],
    url: "https://zendaleendoscopy.com/",
    image: "network-endoscopy.webp",
    imageAlt: "Endoscopy suite at the Zendale Endoscopy Centre",
  },
  {
    id: "lifecentre-support",
    code: "ZN-07",
    name: "Lifecentre Med Support",
    focus: "Medical support services",
    description:
      "The support arm of the network provides logistics, supply and the practical infrastructure that helps clinical care run reliably across facilities.",
    services: [
      "Medical support services",
      "Clinical supply and logistics",
      "Facility support operations",
      "Service continuity for network partners",
    ],
    url: "https://www.lifecentermedsupport.com/",
    image: "network-medsupport.webp",
    imageAlt: "Medical supply and logistics operations at Lifecentre Med Support",
  },
  {
    id: "vhelar",
    code: "ZN-08",
    name: "VHELAR Consulting",
    focus: "Healthcare consulting",
    description:
      "The consulting practice of the Zendale group advises hospitals, investors and public institutions on planning, operations and transformation. Its recommendations are grounded in the experience of operating healthcare facilities.",
    services: [
      "Hospital planning and feasibility",
      "Operational improvement",
      "Public-private partnership advisory",
      "Quality, compliance and transformation",
    ],
    url: "",
    internal: "/consulting",
    image: "network-vhelar.webp",
    imageAlt: "VHELAR consultants reviewing a hospital operations plan",
  },
];
