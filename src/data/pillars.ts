export interface Pillar {
  id: string;
  code: string;
  name: string;
  route: string;
  summary: string;
  /** Geometry motif used for the ecosystem node emblem (2D + 3D). */
  motif: "lattice" | "briefcase" | "circuit" | "compass" | "rings";
}

/** The five capability pillars of the Zendale ecosystem. */
export const pillars: Pillar[] = [
  {
    id: "clinical",
    code: "ZP-01",
    name: "Clinical & Specialist Care",
    route: "/network",
    summary: "Specialist treatment delivered through eight coordinated facilities.",
    motif: "lattice",
  },
  {
    id: "corporate",
    code: "ZP-02",
    name: "Corporate Healthcare",
    route: "/corporate-health",
    summary: "Employee health programmes for organisations of every size.",
    motif: "briefcase",
  },
  {
    id: "medtech",
    code: "ZP-03",
    name: "Medical Technology",
    route: "/medical-technology",
    summary: "Equipment procurement, biomedical engineering and lifecycle care.",
    motif: "circuit",
  },
  {
    id: "consulting",
    code: "ZP-04",
    name: "Healthcare Consulting",
    route: "/consulting",
    summary: "Planning, improvement and transformation for healthcare organisations.",
    motif: "compass",
  },
  {
    id: "partnerships",
    code: "ZP-05",
    name: "Hospital Partnerships",
    route: "/partnerships",
    summary: "Structured collaboration with hospitals, HMOs, government and investors.",
    motif: "rings",
  },
];
