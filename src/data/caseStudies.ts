export type CaseStudy = {
  slug: string;
  title: string;
  sector: string;
  location: string;
  hero: string;
  solutionHref: string;
  summary: string;
  challenge: string;
  solution: string;
  equipment: { name: string; href: string }[];
  results: { label: string; value: string }[];
};

// Verified completed installations by Evolve Tech Nepal / AudioVisual Nepal.
export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "siddhartha-bank-head-office",
    title: "Siddhartha Bank Head Office",
    sector: "Banking",
    location: "Naxal, Kathmandu",
    hero: "/images/projects-real/siddhartha-bank-head-office.webp",
    solutionHref: "/solutions/corporate",
    summary: "A 110 sq ft COB fine-pitch LED display for the head office of one of Nepal's leading commercial banks.",
    challenge: "A bank head office needs a display that looks flawless at close range in a premium interior, runs all day every day, and survives the inevitable knocks of a busy corporate space — standard SMD fine-pitch panels are fragile exactly where banks need durability.",
    solution: "We installed a Lampro LMini COB display at P1.25 pixel pitch across 110 sq ft. COB encapsulation seals every pixel against impact and dust while delivering the seamless, high-density image quality the viewing distance demands. The display was calibrated on site and handed over with staff training.",
    equipment: [
      { name: "Lampro LMini COB fine-pitch series", href: "/products/led-displays/lampro-lmini" },
      { name: "Lampro LC COB series", href: "/brands/lampro/p/lc-cob" },
    ],
    results: [
      { label: "Display area", value: "110 sq ft" },
      { label: "Pixel pitch", value: "P1.25 COB" },
      { label: "Environment", value: "Corporate head office" },
    ],
  },
  {
    slug: "jeevan-jyoti-school",
    title: "Jeevan Jyoti School",
    sector: "Education",
    location: "Kohalpur, Banke",
    hero: "/images/projects-real/jeevan-jyoti-school.webp",
    solutionHref: "/solutions/education",
    summary: "A 266 sq ft indoor LED display for a school in Kohalpur — one of the largest indoor school installations outside the Kathmandu Valley.",
    challenge: "A large school hall needs a display every student can read from the back row, installed far from Kathmandu where service visits are expensive — reliability and serviceability matter as much as image quality.",
    solution: "We delivered and installed a Lampro LC P3 indoor display across 266 sq ft, sized so assembly presentations, exam notices and event content are legible throughout the hall. Module-level serviceability means most maintenance needs no panel removal, and our team handles support outside the valley.",
    equipment: [
      { name: "Lampro LC series indoor LED", href: "/brands/lampro/p/lc" },
    ],
    results: [
      { label: "Display area", value: "266 sq ft" },
      { label: "Pixel pitch", value: "P3 indoor" },
      { label: "Location", value: "Banke — outside-valley delivery" },
    ],
  },
  {
    slug: "fcube-cinemas",
    title: "FCube Cinemas",
    sector: "Entertainment",
    location: "Boudha, Kathmandu",
    hero: "/images/projects-real/fcube-cinemas.webp",
    solutionHref: "/solutions/hotels",
    summary: "A P2.5 fine-pitch indoor LED display for a multiplex cinema in Boudha, Kathmandu.",
    challenge: "Cinema foyers sell with visuals: trailers, showtimes and promotions need a bright, sharp display that reads clearly in low lobby light and runs reliably through long operating hours, seven days a week.",
    solution: "We installed a Lampro LC P2.5 indoor display in the foyer, colour-calibrated for trailer content and configured for scheduled playback, with front-serviceable modules so any maintenance happens without disrupting the lobby.",
    equipment: [
      { name: "Lampro LC series indoor LED", href: "/brands/lampro/p/lc" },
    ],
    results: [
      { label: "Display area", value: "26 sq ft" },
      { label: "Pixel pitch", value: "P2.5 indoor" },
      { label: "Operation", value: "Daily long-hours playback" },
    ],
  },
];
