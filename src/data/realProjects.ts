// Verified completed installations (source: leddisplaynepal.com/portfolio — Evolve Tech Nepal).
export type RealProject = {
  slug: string;
  title: string;
  sector: string;
  location: string;
  city: string;
  scope: string;
  img: string;
  caseStudy?: boolean;
};

export const REAL_PROJECTS: RealProject[] = [
  { slug: "siddhartha-bank-head-office", title: "Siddhartha Bank Head Office", sector: "Banking", location: "Naxal, Kathmandu", city: "Kathmandu Valley", scope: "COB LMini P1.25 fine-pitch LED display · 110 sq ft", img: "/images/projects-real/siddhartha-bank-head-office.webp", caseStudy: true },
  { slug: "jeevan-jyoti-school", title: "Jeevan Jyoti School", sector: "Education", location: "Kohalpur, Banke", city: "Kohalpur, Banke", scope: "LC P3 indoor large-format LED display · 266 sq ft", img: "/images/projects-real/jeevan-jyoti-school.webp", caseStudy: true },
  { slug: "fcube-cinemas", title: "FCube Cinemas", sector: "Entertainment", location: "Boudha, Kathmandu", city: "Kathmandu Valley", scope: "LC P2.5 indoor fine-pitch LED display · 26 sq ft", img: "/images/projects-real/fcube-cinemas.webp", caseStudy: true },
  { slug: "dibya-ratna-consultant", title: "Dibya Ratna Consultant", sector: "Corporate", location: "Battisputali, Kathmandu", city: "Kathmandu Valley", scope: "LDT COB P1.5 fine-pitch display · 33 sq ft", img: "/images/projects-real/dibya-ratna-consultant.webp" },
  { slug: "awarded-international-education", title: "Awarded International Education", sector: "Education", location: "Star Mall, Putalisadak", city: "Kathmandu Valley", scope: "LCM P2.5 indoor LED display · 30 sq ft", img: "/images/projects-real/awarded-international-education.webp" },
  { slug: "auranex-restaurant", title: "Auranex Restaurant", sector: "Hospitality", location: "Townplanning, Kathmandu", city: "Kathmandu Valley", scope: "LC P4 outdoor LED display · 50 sq ft", img: "/images/projects-real/auranex-restaurant.webp" },
  { slug: "inland-multi-cuisine-stay", title: "Inland Multi Cuisine & Stay", sector: "Hospitality", location: "Budhanilkantha, Kathmandu", city: "Kathmandu Valley", scope: "LC P2.5 outdoor LED display · 31 sq ft", img: "/images/projects-real/inland-multi-cuisine-stay.webp" },
  { slug: "anong-store", title: "Anong Store", sector: "Retail", location: "Jawalakhel, Lalitpur", city: "Kathmandu Valley", scope: "LC P2.5 indoor LED display · 17 sq ft", img: "/images/projects-real/anong-store.webp" },
  { slug: "shree-shiva-enterprises", title: "Shree Shiva Enterprises", sector: "Commercial", location: "Siddhipur, Lalitpur", city: "Kathmandu Valley", scope: "LC P5 outdoor LED display · 40 sq ft", img: "/images/projects-real/shree-shiva-enterprises.webp" },
];
