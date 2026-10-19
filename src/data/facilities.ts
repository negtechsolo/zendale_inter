export interface Facility {
  id: string;
  code: string;
  name: string;
  focus: string;
  description: string;
  services: string[];
  url: string;
  internal?: string;
  image: string;
  imageAlt: string;
  logo?: string;
  logoAlt?: string;
  location?: string;
  profileNote?: string;
  logoOnly?: boolean;
  gallery?: { src: string; alt: string }[];
}

/**
 * The current members of the Zendale Healthcare Network.
 * The data structure is deliberately scalable: new institutions can be added
 * without changing the Network page, facility profile template or footer.
 */
const existingFacilities: Facility[] = [
  {
    id: "sky-high",
    code: "ZN-01",
    name: "Sky High Medical Centre",
    focus: "Multi-specialist hospital care",
    description:
      "A multi-specialist hospital providing coordinated clinical care across several disciplines, supported by diagnostics, pharmacy, home care and organisational health services.",
    services: [
      "Specialist consultations across multiple disciplines",
      "General surgery and obstetric services",
      "Diagnostics and pharmacy",
      "Home care, retainership and pre-employment services",
    ],
    url: "https://skyhighmedicalcentre.com/",
    image: "network-skyhigh.webp",
    imageAlt: "Clinical team at work inside Sky High Medical Centre",
    logo: "/images/facility-logos/sky-high-medical-centre.webp",
    logoAlt: "Sky High Medical Centre logo",
    location: "Magodo, Lagos",
  },
  {
    id: "sky-high-icu",
    code: "ZN-02",
    name: "Sky High ICU / Dialysis Centre",
    focus: "Critical care and dialysis",
    description:
      "An extension of Sky High Medical Centre located within Mainland Hospital, Yaba, providing dialysis and intensive care for patients who require specialist monitoring and support.",
    services: [
      "Dialysis services",
      "Intensive care",
      "Specialist monitoring and clinical support",
      "24-hour service availability",
    ],
    url: "https://skyhighmedicalcentre.com/sky-high-dialysis/",
    image: "network-skyhigh-icu.webp",
    imageAlt: "ICU monitoring equipment at the Sky High ICU and Dialysis Centre",
    logo: "/images/facility-logos/sky-high-medical-centre.webp",
    logoAlt: "Sky High Medical Centre logo",
    location: "Mainland Hospital, Yaba, Lagos",
  },
  {
    id: "finnih",
    code: "ZN-03",
    name: "Finnih Medical Centre",
    focus: "Clinical and specialist services",
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
    logo: "/images/facility-logos/finnih-medical-centre.webp",
    logoAlt: "Finnih Medical Centre logo",
    location: "Ikeja GRA, Lagos",
    profileNote:
      "This profile intentionally uses conservative service language pending a complete, approved facility information schedule.",
  },
  {
    id: "lifecentre",
    code: "ZN-04",
    name: "LifeCentre Medical Services",
    focus: "Diagnostics, wellness and occupational health",
    description:
      "A diagnostic services provider offering pathology testing, wellness packages, occupational health solutions, radiology and value-added services for individuals and organisations.",
    services: [
      "Pathology and laboratory investigations",
      "Wellness and screening packages",
      "Occupational health services",
      "Radiology and home sample collection",
    ],
    url: "https://lifecentremedicals.com/",
    image: "network-lifecentre.webp",
    imageAlt: "Clinical assessment at LifeCentre Medical Services",
    logo: "/images/facility-logos/lifecentre-medical-services.webp",
    logoAlt: "LifeCentre Medical Services logo",
    location: "Multiple locations across Lagos",
  },
  {
    id: "kindred-path",
    code: "ZN-05",
    name: "Kindred Path Fertility Centre",
    focus: "Fertility and reproductive care",
    description:
      "A fertility centre supporting individuals and couples through personalised reproductive care, combining specialist expertise, assisted reproduction and patient-centred support.",
    services: [
      "Fertility assessment and counselling",
      "In vitro fertilisation and intrauterine insemination",
      "Cryopreservation",
      "Ongoing patient support",
    ],
    url: "https://www.ifmkindredpathfertilitycentre.com/",
    image: "network-kindredpath.webp",
    imageAlt: "Embryology laboratory at Kindred Path Fertility Centre",
    logo: "/images/facility-logos/kindred-path-fertility-centre.webp",
    logoAlt: "Kindred Path Fertility Centre symbol",
  },
  {
    id: "zendale-endoscopy",
    code: "ZN-06",
    name: "Zendale Endoscopy Centre",
    focus: "Endoscopy and gastroenterology",
    description:
      "A dedicated endoscopy centre at LASUTH providing diagnostic and therapeutic procedures, supported by pre-procedure counselling, sedation and recovery monitoring.",
    services: [
      "Diagnostic and therapeutic endoscopy",
      "Gastrointestinal investigation",
      "Pre-procedure counselling",
      "Sedation and recovery monitoring",
    ],
    url: "https://zendaleendoscopy.com/",
    image: "network-endoscopy.webp",
    imageAlt: "Endoscopy suite at the Zendale Endoscopy Centre",
    logo: "/images/facility-logos/zendale-endoscopy-centre.webp",
    logoAlt: "Zendale Endoscopy LASUTH logo",
    location: "Ayinke House, LASUTH, Lagos",
  },
  {
    id: "lifecentre-support",
    code: "ZN-07",
    name: "LifeCentre Med Support",
    focus: "Biomedical equipment and engineering support",
    description:
      "A biomedical engineering services company supporting healthcare institutions, laboratories and research facilities through equipment procurement, repair, maintenance and technical advisory.",
    services: [
      "Biomedical equipment repair",
      "Maintenance and preventive care",
      "Equipment procurement",
      "Consultation, training and regulatory support",
    ],
    url: "https://www.lifecentermedsupport.com/",
    image: "network-medsupport.webp",
    imageAlt: "Biomedical equipment support operations at LifeCentre Med Support",
    logo: "/images/facility-logos/lifecentre-med-support.webp",
    logoAlt: "LifeCentre Med Support logo",
    location: "Opebi, Ikeja, Lagos",
  },
  {
    id: "vhelar",
    code: "ZN-08",
    name: "VHELAR Consulting",
    focus: "Healthcare consulting",
    description:
      "The consulting practice of the Zendale group advises hospitals, investors and public institutions on planning, operations and transformation, drawing on the practical experience of healthcare delivery.",
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

export function facilityProfilePath(id: string): string {
  return `/network/${id}`;
}

// Approved real photography and official transparent logos supplied for the October update.
const visualUpdates: Record<string, Partial<Facility>> = {
  "sky-high": {
    "image": "real/skyhigh-medical-centre-1.webp",
    "imageAlt": "Exterior of Sky High Medical Centre",
    "logo": "/images/real/logo-skyhigh-medical-centre.webp",
    "gallery": [
      {
        "src": "real/skyhigh-medical-centre-10.webp",
        "alt": "Skyhigh Medical Centre \u2014 facility view 10"
      },
      {
        "src": "real/skyhigh-medical-centre-9.webp",
        "alt": "Skyhigh Medical Centre \u2014 facility view 9"
      },
      {
        "src": "real/skyhigh-medical-centre-8.webp",
        "alt": "Skyhigh Medical Centre \u2014 facility view 8"
      },
      {
        "src": "real/skyhigh-medical-centre-7.webp",
        "alt": "Skyhigh Medical Centre \u2014 facility view 7"
      },
      {
        "src": "real/skyhigh-medical-centre-6.webp",
        "alt": "Skyhigh Medical Centre \u2014 facility view 6"
      },
      {
        "src": "real/skyhigh-medical-centre-5.webp",
        "alt": "Skyhigh Medical Centre \u2014 facility view 5"
      },
      {
        "src": "real/skyhigh-medical-centre-4.webp",
        "alt": "Skyhigh Medical Centre \u2014 facility view 4"
      },
      {
        "src": "real/skyhigh-medical-centre-3.webp",
        "alt": "Skyhigh Medical Centre \u2014 facility view 3"
      },
      {
        "src": "real/skyhigh-medical-centre-2.webp",
        "alt": "Skyhigh Medical Centre \u2014 facility view 2"
      },
      {
        "src": "real/skyhigh-medical-centre-1.webp",
        "alt": "Skyhigh Medical Centre \u2014 facility view 1"
      }
    ]
  },
  "sky-high-icu": {
    "image": "real/skyhigh-icu-and-dialysis-centre-5.webp",
    "imageAlt": "Dialysis machines and treatment chairs at Sky High ICU and Dialysis Centre",
    "logo": "/images/real/logo-dialysis-and-icu-centre-original-colour.webp",
    "gallery": [
      {
        "src": "real/skyhigh-icu-and-dialysis-centre-9.webp",
        "alt": "SkyHigh ICU and Dialysis Centre \u2014 facility view 9"
      },
      {
        "src": "real/skyhigh-icu-and-dialysis-centre-8.webp",
        "alt": "SkyHigh ICU and Dialysis Centre \u2014 facility view 8"
      },
      {
        "src": "real/skyhigh-icu-and-dialysis-centre-7.webp",
        "alt": "SkyHigh ICU and Dialysis Centre \u2014 facility view 7"
      },
      {
        "src": "real/skyhigh-icu-and-dialysis-centre-5.webp",
        "alt": "SkyHigh ICU and Dialysis Centre \u2014 facility view 5"
      },
      {
        "src": "real/skyhigh-icu-and-dialysis-centre-6.webp",
        "alt": "SkyHigh ICU and Dialysis Centre \u2014 facility view 6"
      },
      {
        "src": "real/skyhigh-icu-and-dialysis-centre-4.webp",
        "alt": "SkyHigh ICU and Dialysis Centre \u2014 facility view 4"
      },
      {
        "src": "real/skyhigh-icu-and-dialysis-centre-3.webp",
        "alt": "SkyHigh ICU and Dialysis Centre \u2014 facility view 3"
      },
      {
        "src": "real/skyhigh-icu-and-dialysis-centre-2.webp",
        "alt": "SkyHigh ICU and Dialysis Centre \u2014 facility view 2"
      },
      {
        "src": "real/skyhigh-icu-and-dialysis-centre-1.webp",
        "alt": "SkyHigh ICU and Dialysis Centre \u2014 facility view 1"
      }
    ]
  },
  "lifecentre": {
    "image": "real/life-centre-medicals-1.webp",
    "imageAlt": "Exterior of Life Centre Medicals",
    "logo": "/images/real/logo-life-centre-medicals.webp",
    "gallery": [
      {
        "src": "real/life-centre-medicals-6.webp",
        "alt": "Life Centre Medicals \u2014 facility view 6"
      },
      {
        "src": "real/life-centre-medicals-5.webp",
        "alt": "Life Centre Medicals \u2014 facility view 5"
      },
      {
        "src": "real/life-centre-medicals-4.webp",
        "alt": "Life Centre Medicals \u2014 facility view 4"
      },
      {
        "src": "real/life-centre-medicals-3.webp",
        "alt": "Life Centre Medicals \u2014 facility view 3"
      },
      {
        "src": "real/life-centre-medicals-2.webp",
        "alt": "Life Centre Medicals \u2014 facility view 2"
      },
      {
        "src": "real/life-centre-medicals-1.webp",
        "alt": "Life Centre Medicals \u2014 facility view 1"
      }
    ]
  },
  "kindred-path": {
    "image": "real/kindred-path-1.webp",
    "imageAlt": "Kindred Path Fertility Centre team",
    "logo": "/images/real/logo-kindredpath-logo.webp",
    "gallery": [
      {
        "src": "real/kindred-path-1.webp",
        "alt": "Kindred Path \u2014 team photograph"
      },
      {
        "src": "real/kindred-path-2.webp",
        "alt": "Kindred Path \u2014 facility view 2"
      },
      {
        "src": "real/kindred-path-3.webp",
        "alt": "Kindred Path \u2014 facility view 3"
      },
      {
        "src": "real/kindred-path-4.webp",
        "alt": "Kindred Path \u2014 facility view 4"
      }
    ]
  },
  "zendale-endoscopy": {
    "image": "real/endoscopy-1.webp",
    "imageAlt": "The Zendale Endoscopy Centre team at LASUTH",
    "logo": "/images/real/logo-zendale-endoscopy-lasuth.webp",
    "gallery": [
      {
        "src": "real/endoscopy-3.webp",
        "alt": "endoscopy \u2014 facility view 3"
      },
      {
        "src": "real/endoscopy-5.webp",
        "alt": "endoscopy \u2014 facility view 5"
      },
      {
        "src": "real/endoscopy-6.webp",
        "alt": "endoscopy \u2014 facility view 6"
      },
      {
        "src": "real/endoscopy-1.webp",
        "alt": "endoscopy \u2014 facility view 1"
      },
      {
        "src": "real/endoscopy-2.webp",
        "alt": "endoscopy \u2014 facility view 2"
      },
      {
        "src": "real/endoscopy-4.webp",
        "alt": "endoscopy \u2014 facility view 4"
      }
    ]
  },
  "finnih": {
    "image": "real/finnih-medical-centre-exterior-1.webp",
    "imageAlt": "Exterior of Finnih Medical Centre",
    "logo": "/images/real/logo-finnih-medical-centre-true-transparent.webp",
    "gallery": [
      {
        "src": "real/finnnih-medical-centre-staff-portrait-1.webp",
        "alt": "Finnih Medical Centre team outside the facility"
      }
    ]
  },
  "lifecentre-support": {
    "image": "medtech-hero.webp",
    "imageAlt": "Representative biomedical equipment maintenance",
    "logo": "/images/real/logo-life-centre-medical-logo.webp",
    "logoOnly": false
  },
  "vhelar": {
    "image": "network-vhelar.webp",
    "imageAlt": "Representative healthcare advisory discussion",
    "logo": "/images/real/logo-vhelar-consulting-corporate-logo.webp",
    "logoOnly": false
  }
};

export const facilities: Facility[] = [
  ...existingFacilities.map(facility => ({ ...facility, ...visualUpdates[facility.id] })),
  ...[
  {
    "id": "zendale-consulting",
    "code": "ZN-09",
    "name": "Zendale Consulting",
    "focus": "Healthcare consulting and institutional development",
    "description": "The healthcare consulting and institutional-development arm of Zendale Limited, helping healthcare organisations plan, build, optimise and transform the systems, facilities and operations required to deliver sustainable quality care.",
    "services": [
      "Healthcare strategy and hospital planning",
      "Hospital operations and performance improvement",
      "Medical technology and procurement advisory",
      "Acquisition, turnaround and public\u2013private partnership advisory"
    ],
    "url": "https://www.zendaleconsulting.com/",
    "image": "consulting-hero.webp",
    "imageAlt": "Representative healthcare consulting presentation",
    "logo": "/images/real/logo-zendale-consulting.webp",
    "logoOnly": false
  },
  {
    "id": "zendale-central-store",
    "code": "ZN-10",
    "name": "Zendale Central Store",
    "focus": "Bulk pharmaceutical supply",
    "description": "Zendale Central Store supplies competitively priced medicines in bulk to pharmacies and hospitals, supporting pharmaceutical purchasing and stock replenishment. Contact our team to confirm product availability, pricing and delivery arrangements.",
    "services": [
      "Bulk medicine supply for pharmacies",
      "Pharmaceutical supply for hospitals",
      "Purchasing-list and stock-replenishment enquiries",
      "Supply quotations and delivery coordination"
    ],
    "url": "",
    "internal": "/supply-quote",
    "image": "service-central-store.webp",
    "imageAlt": "Representative bulk pharmaceutical supply illustration",
    "logo": "/images/real/logo-zendale-central-store.webp",
    "logoOnly": false
  }
]
];
