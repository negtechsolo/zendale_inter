export interface UpdateStory {
  slug: string;
  category: string;
  title: string;
  image: string;
  imageAlt: string;
  summary: string;
  sections: { heading: string; text: string }[];
  path: string;
}
export const projects: UpdateStory[] = [
  {
    slug: "bua-corporate-health",
    path: "/impact/bua-corporate-health",
    category: "Corporate Healthcare",
    title: "BUA Corporate Health Programme",
    image: "real/project-1.webp",
    imageAlt: "Health education session during the BUA programme",
    summary:
      "Workplace health education and screening, supported by coordinated clinical and diagnostic services.",
    sections: [
      {
        heading: "The need",
        text: "Corporate health programmes bring health education, screening and clinical guidance into the workplace, helping employees understand their health and the next steps available to them.",
      },
      {
        heading: "Zendale’s role",
        text: "The programme brought together clinical and diagnostic capabilities from Life Centre Medicals and SkyHigh Medical Centre, with a coordinated screening journey.",
      },
      {
        heading: "The screening journey",
        text: "Registration and identification supported the movement through blood pressure, blood sugar, urinalysis and body mass index checks. Clinical review, results and referral guidance connected screening with follow-up care where needed.",
      },
      {
        heading: "Beyond the screening day",
        text: "Health education and clear next steps are central to the programme. Speak with our team about planning a corporate health programme for your organisation.",
      },
    ],
  },
  {
    slug: "womens-health-access-bank",
    path: "/impact/womens-health-access-bank",
    category: "Women’s Health",
    title: "Women’s Health and Fibroid Outreach",
    image: "real/project-3.webp",
    imageAlt: "Women’s health education session at the Access Bank programme",
    summary:
      "Women’s health education and outreach, bringing together clinical and diagnostic capabilities.",
    sections: [
      {
        heading: "Programme focus",
        text: "The Access Bank women’s health and fibroid programme provided a setting for health education and engagement around women’s health.",
      },
      {
        heading: "Clinical and diagnostic contribution",
        text: "Finnih Medical Centre and Life Centre Medicals contributed clinical and diagnostic capabilities to the programme.",
      },
      {
        heading: "Connecting people with care",
        text: "The programme reflects how the Zendale network can bring complementary healthcare services together for an organisation or community.",
      },
    ],
  },
  {
    slug: "community-health-outreach",
    path: "/impact/community-health-outreach",
    category: "Community Healthcare",
    title: "Healthcare Within the Community",
    image: "real/project-4.webp",
    imageAlt: "A consultation during the community health outreach",
    summary:
      "Community screening, health education and individual conversations about care.",
    sections: [
      {
        heading: "Meeting people in their community",
        text: "Life Centre’s community outreach programmes bring health conversations and screening closer to the people they serve.",
      },
      {
        heading: "Care in action",
        text: "The photographs show face-to-face consultations and screening activity during the community programme.",
      },
      {
        heading: "Discuss an outreach programme",
        text: "Community organisations and programme partners can contact Zendale to discuss the healthcare needs, intended audience and arrangements for a future programme.",
      },
    ],
  },
  {
    slug: "chdf-outreach",
    path: "/impact/chdf-outreach",
    category: "Community Outreach",
    title: "CHDF Healthcare Outreach",
    image: "real/project-2.webp",
    imageAlt: "Screening activity during the CHDF outreach",
    summary:
      "Healthcare screening and engagement during the CHDF outreach programme.",
    sections: [
      {
        heading: "Programme activity",
        text: "The CHDF outreach photographs document screening activity and the healthcare team’s participation in the programme.",
      },
      {
        heading: "Working together",
        text: "Outreach programmes create opportunities for healthcare teams and community organisations to bring screening and health information closer to participants.",
      },
    ],
  },
  {
    slug: "special-health-outreach",
    path: "/impact/special-health-outreach",
    category: "Health Outreach",
    title: "Special Health Outreach",
    image: "real/project-5.webp",
    imageAlt: "Participants at the special health outreach programme",
    summary:
      "Healthcare engagement and education through a dedicated outreach programme.",
    sections: [
      {
        heading: "Programme gathering",
        text: "The special health outreach brought participants together for healthcare engagement and education.",
      },
      {
        heading: "Planning healthcare engagement",
        text: "Contact Zendale to discuss health education, screening and coordinated healthcare support for a similar programme.",
      },
    ],
  },
];
export const news: UpdateStory[] = [
  {
    slug: "lagos-state-blood-transfusion-partnership",
    path: "/news/lagos-state-blood-transfusion-partnership",
    category: "Partnerships",
    title: "Lagos State Blood Transfusion Partnership",
    image: "real/event-2.webp",
    imageAlt:
      "Representatives at the Lagos State Blood Transfusion Committee partnership gathering",
    summary:
      "An institutional partnership with the Lagos State Blood Transfusion Committee.",
    sections: [
      {
        heading: "Institutional collaboration",
        text: "Zendale entered into an official partnership with the Lagos State Blood Transfusion Committee. Representatives gathered to mark the partnership.",
      },
      {
        heading: "Partnership enquiries",
        text: "Contact our team to discuss Zendale’s healthcare partnership capabilities and institutional collaborations.",
      },
    ],
  },
  {
    slug: "hfn-private-sector-town-hall",
    path: "/news/hfn-private-sector-town-hall",
    category: "Sector Engagement",
    title: "HFN Private Sector Town Hall",
    image: "real/event-5.webp",
    imageAlt:
      "Participants at the Healthcare Federation of Nigeria Private Sector Town Hall",
    summary:
      "Zendale’s participation in the Healthcare Federation of Nigeria Private Sector Town Hall Meeting.",
    sections: [
      {
        heading: "Healthcare-sector dialogue",
        text: "Zendale participated in the Healthcare Federation of Nigeria Private Sector Town Hall Meeting. The gathering provided a setting for engagement with healthcare stakeholders.",
      },
      {
        heading: "Connected healthcare institutions",
        text: "Sector participation complements Zendale’s focus on institutional collaboration and stronger healthcare delivery.",
      },
    ],
  },
  {
    slug: "world-patient-safety-day-2026",
    path: "/news/world-patient-safety-day-2026",
    category: "Patient Safety",
    title: "World Patient Safety Day 2026",
    image: "real/event-1.webp",
    imageAlt:
      "Zendale representation at the HEFAAMA World Patient Safety Day programme",
    summary:
      "Participation in the HEFAAMA programme themed “Safe Care for Life.”",
    sections: [
      {
        heading: "Safe Care for Life",
        text: "Zendale was represented at the 2026 World Patient Safety Day programme organised by HEFAAMA, themed “Safe Care for Life.”",
      },
      {
        heading: "Healthcare engagement",
        text: "The programme forms part of Zendale’s participation in conversations about quality and safety in healthcare.",
      },
    ],
  },
  {
    slug: "eko-health-convention-2026",
    path: "/news/eko-health-convention-2026",
    category: "Sector Engagement",
    title: "Eko Health Convention 2026",
    image: "real/event-4.webp",
    imageAlt: "Zendale representation at Eko Health Convention 2026 in Lagos",
    summary:
      "Healthcare-sector engagement at Eko Health Convention 2026 in Lagos.",
    sections: [
      {
        heading: "Convention participation",
        text: "Zendale participated at Eko Health Convention 2026 in Lagos, connecting the group with the wider healthcare-sector conversation.",
      },
    ],
  },
  {
    slug: "business-of-health-conference-2026",
    path: "/news/business-of-health-conference-2026",
    category: "Sector Engagement",
    title: "Business of Health Conference 2026",
    image: "real/event-3.webp",
    imageAlt: "Conference proceedings at Business of Health Conference 2026",
    summary: "Participation in the Business of Health Conference 2026.",
    sections: [
      {
        heading: "The business of healthcare",
        text: "Zendale participated in the Business of Health Conference 2026, bringing institutional healthcare into the wider discussion of the sector.",
      },
    ],
  },
];
