export interface UpdateStory {
  slug: string;
  category: string;
  title: string;
  image: string;
  imageAlt: string;
  imageFit?: "cover" | "contain";
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
    "slug": "business-of-health-conference-2026",
    "path": "/news/business-of-health-conference-2026",
    "category": "Sector Engagement",
    "title": "Business of Health Conference 2026",
    "image": "real/event-3.webp",
    "imageAlt": "Panel discussion at the Business of Health Conference 2026",
    "imageFit": "contain",
    "summary": "At the Business of Health Conference 2026, we joined the conversation about building healthcare institutions that people can trust and continue to use. The programme’s focus on reversing medical tourism connects with a practical question: what makes care closer to home a dependable choice?",
    "sections": [
      {
        "heading": "A conversation about care closer to home",
        "text": "We participated in the Business of Health Conference 2026, where the programme placed the reversal of medical tourism in view. Our photograph captures a panel discussion at the conference, bringing the conversation back to the people and institutions shaping healthcare delivery.\n\nFor us, this is a question about confidence as much as capability. Patients need to understand which services are available, how to access them and what support they can expect throughout their care. Strengthening local healthcare means paying attention to each of those experiences."
      },
      {
        "heading": "The institution behind the clinical service",
        "text": "A healthcare service relies on more than a consultation room or a piece of equipment. It also depends on the organisation around it: the people, processes, maintenance, information and financial planning that allow care to continue.\n\nThis is why the business of healthcare matters to our group. Clinical capability and sound operations need to develop together. A service becomes more useful when the institution behind it can support patients reliably and help its professionals do their work well."
      },
      {
        "heading": "Connecting capability across the network",
        "text": "Our network brings together complementary clinical, diagnostic, specialist and institutional capabilities. The value of that connection is in helping the right service become easier to identify and reach.\n\nA referral, a diagnostic investigation or a conversation about operational support should lead somewhere clear. That is the perspective we bring to sector engagement: how the different parts of healthcare can work together more effectively, with a patient or an institution’s actual need guiding the next step."
      },
      {
        "heading": "From sector dialogue to practical work",
        "text": "Conference participation provides space to listen, exchange perspectives and examine the issues facing healthcare organisations. The work continues in the decisions institutions make about their services, teams and partnerships.\n\nWe welcome conversations with healthcare providers, employers and institutional partners who want to explore how our capabilities could support their priorities. Our team can help identify the relevant service or begin a more detailed discussion about the organisation’s needs."
      }
    ]
  },
  {
    "slug": "hfn-private-sector-town-hall",
    "path": "/news/hfn-private-sector-town-hall",
    "category": "Sector Engagement",
    "title": "HFN Private Sector Town Hall",
    "image": "real/event-5.webp",
    "imageAlt": "Healthcare leaders at the Healthcare Federation of Nigeria Private Sector Town Hall",
    "imageFit": "contain",
    "summary": "Dr. Rita Irurhe represented our group at the Healthcare Federation of Nigeria Private Sector Town Hall. The gathering created a setting for healthcare leaders to engage on private-sector participation, institutional capacity and the relationships needed to strengthen healthcare delivery.",
    "sections": [
      {
        "heading": "Representing a connected healthcare group",
        "text": "Dr. Rita Irurhe represented our group at the Healthcare Federation of Nigeria Private Sector Town Hall Meeting. The event brought healthcare stakeholders into a shared setting to discuss opportunities for stronger private-sector engagement.\n\nOur participation reflects the importance we place on looking beyond the boundaries of an individual facility. Healthcare organisations face interconnected questions about capacity, resources, operations and access. Engaging with others in the sector helps keep those wider relationships in view."
      },
      {
        "heading": "Relationships that support stronger institutions",
        "text": "Engagement at the gathering included conversations with Mrs. Clare Omatseye of JNC International Limited and Mr. Wale Olajubu of the Health Business Academy for Africa. Institutional capacity, operational resourcing and strategic partnerships were part of the wider conversation.\n\nThese areas matter because an institution’s ability to deliver care depends on how its capabilities are supported. Equipment, professional development and organisational systems each have a part to play alongside clinical expertise."
      },
      {
        "heading": "A private-sector perspective on coordination",
        "text": "Private healthcare providers contribute different strengths to the healthcare system. Some offer specialist expertise; others bring diagnostic capacity, critical care, technical services or institutional support. The challenge is to make those capabilities easier to connect when they are needed.\n\nOur group’s perspective is rooted in that connection. Clearer referral pathways and relationships between institutions can help the sector make better use of the expertise and resources already available, while recognising where further investment and development are needed."
      },
      {
        "heading": "Continuing the conversation",
        "text": "Sector gatherings provide an opportunity to hear different perspectives and build professional relationships. Their importance extends beyond attendance to the questions healthcare leaders take back into their organisations.\n\nWe continue to welcome dialogue with providers, professional organisations and prospective partners about stronger institutions and more coordinated services. If your organisation is exploring a healthcare collaboration, our team can help begin the conversation and identify the relevant capabilities across our network."
      }
    ]
  },
  {
    "slug": "world-patient-safety-day-2026",
    "path": "/news/world-patient-safety-day-2026",
    "category": "Patient Safety",
    "title": "World Patient Safety Day 2026",
    "image": "real/event-1.webp",
    "imageAlt": "Dr. Rita Irurhe at the HEFAAMA World Patient Safety Day programme",
    "imageFit": "contain",
    "summary": "“Safe Care for Life” was the theme of the HEFAAMA World Patient Safety Day 2026 programme attended by Dr. Rita Irurhe. For our group, the occasion reinforced the importance of quality, coordination and reliable everyday systems in the delivery of care.",
    "sections": [
      {
        "heading": "Safe Care for Life",
        "text": "Dr. Rita Irurhe represented our group at the 2026 World Patient Safety Day programme organised by HEFAAMA. Under the theme “Safe Care for Life,” the event brought healthcare leaders together around a responsibility shared across institutions and professions.\n\nThe programme included Dr. (Mrs.) Olukemi Ogunyemi, Dr. Oludayo Lajide and Dr. Victoria Egunjobi. Our participation placed us within a wider conversation about quality and safety in the healthcare environments that patients and families depend on."
      },
      {
        "heading": "Safety is part of everyday delivery",
        "text": "Patient safety is closely connected with how an organisation works each day. Clear communication, dependable processes and an understanding of responsibilities all shape the conditions in which care is delivered.\n\nFor healthcare leaders, this makes safety an institutional priority. It requires attention to the environment around clinical decisions and to the systems professionals rely on. A theme such as “Safe Care for Life” is a useful reminder that quality needs sustained attention beyond an individual event or campaign."
      },
      {
        "heading": "Paying attention to the handover",
        "text": "In a connected healthcare network, a patient’s journey may involve more than one team or facility. Information needs to move clearly between consultation, investigation, specialist review and follow-up.\n\nOur interest in coordination comes from recognising the importance of these transitions. When one stage of care leads into another, the next step should be understandable to the patient and the teams involved. Stronger institutions pay attention to what happens between services as well as within them."
      },
      {
        "heading": "A continuing responsibility",
        "text": "Participation in World Patient Safety Day is one part of an ongoing conversation about better healthcare delivery. The larger task is to keep quality and safety visible in organisational decisions, professional practice and collaboration.\n\nWe remain committed to engaging with healthcare institutions and partners around these priorities. Organisations interested in our clinical, diagnostic or institutional capabilities can speak with our team about the support relevant to their needs."
      }
    ]
  },
  {
    "slug": "eko-health-convention-2026",
    "path": "/news/eko-health-convention-2026",
    "category": "Sector Engagement",
    "title": "Eko Health Convention 2026",
    "image": "real/event-4.webp",
    "imageAlt": "Zendale representation at Eko Health Convention 2026 in Lagos",
    "imageFit": "contain",
    "summary": "We participated in Eko Health Convention 2026 in Lagos as part of our engagement with the wider healthcare community. The occasion offered a setting to connect sector perspectives with our work in clinical services, diagnostics, specialist care and institutional support.",
    "sections": [
      {
        "heading": "Taking part in the wider healthcare conversation",
        "text": "Our participation in Eko Health Convention 2026 in Lagos formed part of our engagement with the healthcare sector beyond our own facilities. The photograph from the convention records our representation at the event.\n\nHealthcare organisations operate within a wider system of providers, professionals, employers and public institutions. Taking part in sector gatherings creates room to consider those relationships and the different perspectives that shape how care is organised and experienced."
      },
      {
        "heading": "Bringing complementary capabilities into view",
        "text": "Our group brings together services that address different points in the healthcare journey. Clinical care, diagnostics and specialist services sit alongside technical and institutional capabilities that support the organisations delivering care.\n\nFor us, the connection between these services is central. A healthcare network becomes more useful when the different capabilities are understood and the route between them is clearer. That applies to an individual seeking care as well as an organisation planning a programme or exploring institutional support."
      },
      {
        "heading": "The value of looking beyond one facility",
        "text": "No single institution can represent every healthcare need. Understanding where complementary expertise and resources sit is therefore an important part of building professional relationships across the sector.\n\nConvention participation creates a setting for that wider perspective. It also offers an opportunity to reflect on how our own network can be more accessible to the people and organisations it serves. The focus remains practical: making capabilities understandable and helping enquiries reach the team best placed to respond."
      },
      {
        "heading": "Keeping engagement connected to our work",
        "text": "We see sector engagement as a complement to the day-to-day work of strengthening healthcare institutions and connecting services. The conversations matter when they help organisations think more clearly about their priorities and the relationships they need.\n\nHealthcare providers, employers and prospective partners can contact our team to explore relevant services across the network. We can help identify an appropriate starting point, whether the enquiry concerns care, diagnostics, a corporate health programme or institutional collaboration."
      }
    ]
  },
  {
    "slug": "lagos-state-blood-transfusion-partnership",
    "path": "/news/lagos-state-blood-transfusion-partnership",
    "category": "Partnerships",
    "title": "Lagos State Blood Transfusion Partnership",
    "image": "real/event-2.webp",
    "imageAlt": "Representatives marking the partnership with the Lagos State Blood Transfusion Committee",
    "imageFit": "contain",
    "summary": "Our official partnership with the Lagos State Blood Transfusion Committee reflects the importance of institutional collaboration in healthcare. Representatives gathered to mark a relationship connected to a vital part of the wider care system: blood access and coordination.",
    "sections": [
      {
        "heading": "Marking an institutional partnership",
        "text": "We entered into an official partnership with the Lagos State Blood Transfusion Committee. Representatives from the organisations gathered to mark the relationship, as shown in the photographs from the occasion.\n\nThe partnership forms part of our wider approach to working with institutions across the healthcare system. We recognise that the services a patient may need often depend on relationships extending beyond a single facility, clinical team or organisation."
      },
      {
        "heading": "Why blood access belongs in the conversation",
        "text": "Blood access is an important consideration within healthcare delivery. It brings questions of availability and coordination into view, alongside the responsibilities of the institutions involved.\n\nFor our group, this reinforces the need to understand the wider systems supporting care. Strong clinical institutions also need working relationships with the organisations that provide complementary expertise and services. Institutional collaboration is one way of giving those connections a clearer place in the healthcare conversation."
      },
      {
        "heading": "A relationship within a wider network",
        "text": "Our healthcare network connects clinical, diagnostic, specialist and institutional capabilities. Partnerships with organisations beyond the network complement that structure by bringing different responsibilities and perspectives into a shared relationship.\n\nWe approach these relationships with an emphasis on clarity: understanding the purpose of the collaboration, the organisations involved and the appropriate route for engagement. The announcement records the partnership itself; enquiries about its arrangements should be directed to our team for accurate, current information."
      },
      {
        "heading": "Starting the right conversation",
        "text": "An institutional partnership begins with an understanding of the need and the contribution each organisation can make. We welcome conversations with healthcare providers and other organisations exploring how their work could connect with our capabilities.\n\nOur team can help route a partnership enquiry and identify who should be involved in the discussion. If your interest relates specifically to this relationship, please mention the Lagos State Blood Transfusion Committee partnership when contacting us so the enquiry reaches the appropriate team."
      }
    ]
  }
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
