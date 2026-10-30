export interface RelationshipLogo {
  name: string;
  image: string;
  via: string;
}

// Supplied logos, matched to the publicly displayed subsidiary relationships.
export const organisationLogos: RelationshipLogo[] = [
  ["Huawei", "huawei"],
  ["Sterling", "sterling"],
  ["Knight Frank", "knight-frank"],
  ["Wakanow", "wakanow"],
  ["ATPI Bon Voyage Travel", "atpi-bon-voyage-travel"],
  ["Airtel", "airtel"],
  ["Radisson Blu", "radisson-blu"],
  ["WellRight", "wellright"],
  ["International SOS", "international-sos"],
  ["Ultra Care Hospital and Clinics", "ultra-care-hospital-and-clinics"],
  ["BUA Group", "bua-group"],
  ["EbonyLife TV", "ebonylife-tv"],
  ["First Cardiology Consultants", "first-cardiology-consultants"],
  ["The Consultants Practice", "the-consultants-practice"],
  ["C&I Leasing Plc", "ci-leasing-plc"],
  ["Jomivic Travels", "jomivic-travels"],
  ["Waltersmith", "waltersmith"],
].map(([name, slug]) => ({ name, image: `relationships/${slug}.webp`, via: "Life Centre Medicals" }));

export const hmoLogos: RelationshipLogo[] = [
  ["Hygeia HMO", "hygeia-hmo"],
  ["Avon HMO", "avon-hmo"],
  ["Total Health Trust", "total-health-trust"],
  ["Leadway Health", "leadway-health"],
  ["Reliance HMO", "reliance-hmo"],
  ["Bastion Health", "bastion-health"],
  ["AXA Mansard", "axa-mansard"],
  ["Clearline HMO", "clearline-hmo"],
].map(([name, slug]) => ({ name, image: `relationships/${slug}.webp`, via: "SkyHigh Medical Centre" }));

export const bloodScreeningPartner = {
  name: "Lagos State Blood Transfusion Committee",
  image: "relationships/lsbtc.webp",
  path: "/news/lagos-state-blood-transfusion-partnership",
};
