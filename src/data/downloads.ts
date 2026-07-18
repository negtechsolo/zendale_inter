export type Audience = "Healthcare Professionals" | "HMOs" | "Hospitals" | "Corporate Partners";

export interface DownloadItem {
  id: string;
  title: string;
  description: string;
  file: string; // served from /downloads-files/ — see IMAGE-MANIFEST.md (Documents section)
  fileType: "PDF";
  audiences: Audience[];
}

export const audiences: Audience[] = [
  "Healthcare Professionals",
  "HMOs",
  "Hospitals",
  "Corporate Partners",
];

export const downloadItems: DownloadItem[] = [
  {
    id: "endoscopy-guide",
    title: "Endoscopy Referral Guide",
    description:
      "How to refer patients to the Zendale Endoscopy Centre: procedures offered, preparation requirements and how reporting reaches you.",
    file: "zendale-endoscopy-guide.pdf",
    fileType: "PDF",
    audiences: ["Healthcare Professionals", "Hospitals", "HMOs"],
  },
  {
    id: "icu-guide",
    title: "ICU & Critical Care Guide",
    description:
      "Admission criteria, escalation pathways and transfer coordination for the Sky High ICU / Dialysis Centre.",
    file: "zendale-icu-guide.pdf",
    fileType: "PDF",
    audiences: ["Healthcare Professionals", "Hospitals", "HMOs"],
  },
  {
    id: "fertility-guide",
    title: "Fertility Services Guide",
    description:
      "The assessment and treatment pathway at Kindred Path Fertility Centre, for referring clinicians and payer organisations.",
    file: "zendale-fertility-guide.pdf",
    fileType: "PDF",
    audiences: ["Healthcare Professionals", "HMOs"],
  },
  {
    id: "equipment-guide",
    title: "Medical Equipment & Lifecycle Guide",
    description:
      "Zendale's approach to procurement, installation, maintenance and lifecycle management — for hospitals planning equipment decisions.",
    file: "zendale-equipment-guide.pdf",
    fileType: "PDF",
    audiences: ["Hospitals", "Healthcare Professionals"],
  },
  {
    id: "corporate-guide",
    title: "Corporate Health Programme Guide",
    description:
      "Retainership, medicals, screening and occupational health — how a Zendale corporate programme is structured and what HR receives.",
    file: "zendale-corporate-health-guide.pdf",
    fileType: "PDF",
    audiences: ["Corporate Partners", "HMOs"],
  },
  {
    id: "company-profile",
    title: "Zendale Company Profile",
    description:
      "The full picture of the group: the healthcare network, the five capability pillars and how to work with us.",
    file: "zendale-company-profile.pdf",
    fileType: "PDF",
    audiences: ["Healthcare Professionals", "HMOs", "Hospitals", "Corporate Partners"],
  },
];
