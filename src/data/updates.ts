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
const eventStories: UpdateStory[] = [
  {
    slug: "lagos-state-blood-transfusion-partnership",
    path: "/news/lagos-state-blood-transfusion-partnership",
    category: "Partnerships",
    title: "Lagos State Blood Transfusion Partnership",
    image: "real/event-2.webp",
    imageAlt:
      "Representatives at the Lagos State Blood Transfusion Committee partnership gathering",
    summary:
      "Zendale entered into an official partnership with the Lagos State Blood Transfusion Committee. The collaboration reflects the importance of institutional relationships in supporting a more connected healthcare system.",
    sections: [
      {
        heading: "Institutional collaboration",
        text: "Zendale entered into an official partnership with the Lagos State Blood Transfusion Committee, bringing the group into a formal institutional collaboration. Representatives from both organisations gathered to mark the partnership.",
      },
      {
        heading: "Partnership enquiries",
        text: "Access to safe blood is an important part of healthcare delivery. This partnership sits within our wider commitment to building relationships between healthcare institutions. Contact our team to discuss institutional collaboration and the appropriate pathway for your enquiry.",
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
      "Dr. Rita Irurhe represented Zendale at the Healthcare Federation of Nigeria Private Sector Town Hall. Discussions explored stronger private-sector engagement, institutional capacity and collaboration across healthcare.",
    sections: [
      {
        heading: "Healthcare-sector dialogue",
        text: "Dr. Rita Irurhe represented Zendale at the Healthcare Federation of Nigeria Private Sector Town Hall Meeting. The gathering brought healthcare leaders together to discuss opportunities for stronger private-sector participation in healthcare delivery.",
      },
      {
        heading: "Connected healthcare institutions",
        text: "Conversations included engagement with Mrs. Clare Omatseye of JNC International Limited and Mr. Wale Olajubu of the Health Business Academy for Africa. Institutional capacity, operational resourcing and strategic partnerships remain central to our approach to strengthening healthcare organisations.",
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
      "Zendale joined the HEFAAMA World Patient Safety Day programme, themed “Safe Care for Life.” The event focused attention on quality, safety and the everyday systems that support better care.",
    sections: [
      {
        heading: "Safe Care for Life",
        text: "Dr. Rita Irurhe represented Zendale at the 2026 World Patient Safety Day programme organised by HEFAAMA, themed “Safe Care for Life.” The programme brought healthcare leaders together around the shared responsibility of making care safer.",
      },
      {
        heading: "Healthcare engagement",
        text: "Patient safety depends on how care is organised and delivered every day. Our participation reflects a focus on quality, coordination and continuous improvement across healthcare institutions. These conversations connect directly with the need for reliable systems and clear pathways between providers.",
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
      "Zendale participated in Eko Health Convention 2026 in Lagos, joining the wider healthcare community. The convention offered a setting to engage with sector perspectives and reflect on opportunities for more connected healthcare delivery.",
    sections: [
      {
        heading: "Convention participation",
        text: "Zendale participated in Eko Health Convention 2026 in Lagos as part of our engagement with the wider healthcare community. Bringing institutions into the same conversation creates space to consider the challenges and opportunities facing healthcare delivery.",
      },
      {
        heading: "A connected perspective",
        text: "For our group, engagement across the sector sits alongside the practical work of connecting specialist care, diagnostics and institutional support. We welcome conversations with organisations interested in building stronger healthcare relationships.",
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
    summary: "Zendale participated in the Business of Health Conference 2026, engaging with the wider conversation about sustainable healthcare institutions. The event connects with our focus on the leadership, operations and collaboration that support dependable care.",
    sections: [
      {
        heading: "The business of healthcare",
        text: "Zendale participated in the Business of Health Conference 2026, bringing our perspective as a connected healthcare group into the wider sector conversation. Healthcare delivery depends on both clinical capability and institutions that can sustain their services over time.",
      },
      {
        heading: "Building for continuity",
        text: "Our work brings together clinical services, business strategy and operational support. This gives the business of healthcare a practical meaning: strengthening the organisations behind care so they can serve patients consistently. Contact us to discuss institutional support or a potential partnership.",
      },
    ],
  },
];

// Explicit order supplied by Zendale; no event dates are inferred.
const newsOrder = [
  "business-of-health-conference-2026",
  "hfn-private-sector-town-hall",
  "world-patient-safety-day-2026",
  "eko-health-convention-2026",
  "lagos-state-blood-transfusion-partnership",
];
export const news: UpdateStory[] = newsOrder.map(
  (slug) => eventStories.find((story) => story.slug === slug)!,
);
