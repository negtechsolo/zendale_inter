export interface Leader {
  id: string;
  name: string;
  title: string;
  image: string;
  credential?: string;
  postnominal?: string;
  linkedin?: string;
  biography: string[];
}

export const leadership: Leader[] = [
  {
    id: "rita-irurhe",
    name: "Dr. Rita Irurhe",
    title: "Chief Executive Officer (CEO)",
    image: "real/dr-rita-irurhe.webp",
    credential: "Medical Doctor",
    linkedin: "https://www.linkedin.com/in/rita-irurhe/",
    biography: [
      "Dr. Rita Irurhe is a medical doctor whose leadership focuses on strengthening healthcare institutions and improving healthcare delivery. She brings a clinical perspective to the work of building organisations that can deliver care consistently, connect their capabilities and respond to the needs of the people they serve.",
      "Her approach places importance on sustainable systems, stronger existing facilities and collaboration between healthcare providers. She advocates for timely referrals that help patients reach the specialist expertise, equipment and level of care they need. This perspective informs the group’s emphasis on institutional development and a more connected patient journey."
    ],
  },
  {
    id: "bukola-oladipupo",
    name: "Bukola Oladipupo",
    postnominal: "SPHRi",
    title: "Group Human Resources",
    image: "real/bukola-oladipupo.webp",
    linkedin: "https://www.linkedin.com/in/bukola-oladipupo-sphri-833853ab/",
    biography: [
      "Bukola Oladipupo is a strategic human resources professional with more than a decade of experience. A Senior Professional in Human Resources – International (SPHRi), she brings expertise in strategic HR business partnership, people and culture, human resources management, and compensation and benefits analysis.",
      "She leads human resources across the group’s subsidiaries, connecting people priorities with organisational direction and recognising that effective healthcare institutions depend on the professionals behind them. Her perspective on leadership also extends to mentoring entrepreneurs and supporting their development. She combines a business-focused approach to HR with an interest in helping people build the capability and confidence to contribute."
    ],
  },
  {
    id: "everester-oguh",
    name: "Everester Oguh",
    title: "Chief Business Strategy & Development Officer",
    image: "real/everester-oguh.webp",
    linkedin: "https://www.linkedin.com/in/everester-o-3811956b/",
    biography: [
      "Everester Oguh brings a background in public health and programme operations to business strategy and development. Her professional focus connects people, systems and projects, with an emphasis on making plans work in practice.",
      "As Chief Business Strategy & Development Officer, her remit connects the group’s direction with opportunities for growth and collaboration. Her public-health perspective provides a foundation for considering both organisational priorities and the people healthcare services are intended to reach. It is a practical approach to development: understanding the need, bringing the right capabilities together and keeping execution in view."
    ],
  },
  {
    id: "tunde-adribigbe",
    name: "Tunde Adribigbe",
    title: "Chief Financial Officer",
    image: "real/tunde-adribigbe.webp",
    biography: [
      "Tunde Adribigbe serves as Chief Financial Officer, representing the finance function within the group’s leadership team. His role brings a financial perspective to the decisions that support the organisation and its healthcare network.",
      "Financial stewardship is an important part of sustaining healthcare institutions. Planning resources, understanding costs and weighing investment priorities all sit alongside the clinical and operational decisions involved in delivering care. The finance function provides an essential point of connection between the group’s ambitions and the resources needed to support them."
    ],
  },
];
