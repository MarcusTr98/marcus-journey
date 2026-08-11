import type { JourneyStage, Milestone } from "@/types";
const milestoneCatalog: Omit<Milestone, "stage">[] = [
  {
    id: "toyota",
    shortTitle: "01 · Foundation",
    title: "Toyota Boshoku Hai Phong",
    period: "12/2016 — 09/2023",
    role: "Production & Quality Operations Management",
    summary:
      "Managed and coordinated factory production and quality operations covering approximately 40 Laser Cutting CNC machines and a workforce of around 200 people.",
    highlights: [
      "Standardized Work, Check Sheets, Pareto and Q-Point → serious defects below 1%",
      "Led QCC/Kaizen and 5W1H–5 Whys analysis → approximately 30% less operational waste",
      "TPM, 5S and Safety Dojo → 50% fewer equipment incidents and 35% faster onboarding",
      "Production scheduling through Plan/Kanban, manpower–material balancing and KPI reporting",
    ],
    accent: "#F46300",
    position: [0, 0, -6],
    upgrade: "Standard Work · QCC · Pareto · Q-Point · TPM · Kanban · Safety Dojo",
  },
  {
    id: "fpt",
    shortTitle: "02 · Transformation",
    title: "FPT Polytechnic Hai Phong",
    period: "09/2023 — 09/2026",
    role: "Software Development · GPA 3.9/4.0",
    summary:
      "A three-year transformation from factory operations to digital product development—combining formal study with school projects, independent R&D, real deployments, leadership and continuous learning.",
    highlights: [
      "Transitioned from manufacturing into software development",
      "Started a structured foundation in Java, databases and web engineering",
      "Applied Kaizen thinking to digital workflows and software products",
      "Combined formal study with practical projects from the first year",
    ],
    accent: "#005EB8",
    position: [4, 0, -17],
    upgrade: "Java · Spring Boot · SQL · Software Engineering",
  },
  {
    id: "vhunter",
    shortTitle: "Field Experience",
    title: "VHunter Event Company",
    period: "09/2024 — 09/2025",
    role: "Event Organization & Management Specialist",
    summary:
      "Strengthened commercial awareness and leadership beyond the classroom by winning and delivering a 2,000-guest conference and gala from supplier negotiation to live execution.",
    highlights: [
      "Managed a budget of ~VND 800 million",
      "98% attendee satisfaction",
      "Reduced organization costs by 20%",
      "Cross-functional coordination under pressure",
    ],
    accent: "#F46300",
    position: [-4, 0, -29],
    upgrade: "Leadership · Negotiation · Event Operations",
  },
  {
    id: "video",
    shortTitle: "Personal Project",
    title: "Marcus Video",
    period: "12/2025 — 04/2026",
    role: "Full-stack Java Developer",
    summary:
      "Built a Jakarta Servlet/JSP video platform with a layered DAO-service-controller architecture, covering content discovery, user interaction, administration and real-time communication without a full-stack framework.",
    highlights: [
      "Java 21 · Servlet 6 · JPA 3.1 · Hibernate 6.4 · SQL Server",
      "WebSocket chat · favorites · watch history · sharing",
      "BCrypt authentication filter · password recovery email",
      "JSP/JSTL admin dashboard, charts and content management",
    ],
    accent: "#005EB8",
    position: [4, 0, -41],
    upgrade: "Java Web · Hibernate · WebSocket · Application Security",
    projectUrl: "https://github.com/MarcusTr98/Marcus-video",
  },
  {
    id: "solutions",
    shortTitle: "Military Command Digitalization",
    title: "Operational & Endpoint Security Solutions",
    period: "02/2026 — 04/2026",
    role: "Solution Architect · Full-stack & Security Developer",
    summary:
      "Designed, delivered and commissioned two internal solutions for the Hong Bang Ward Military Command: a role-based LAN task-management workflow and USB Sentry, a portable Windows endpoint-protection utility. Both products were formally accepted with 100% client satisfaction.",
    highlights: [
      "Task lifecycle: assignment, acknowledgement, completion reporting and live visibility",
      "USB/mobile detection through drive polling and WMI/WPD monitoring",
      "Portable LAN-first deployment with SQLite and a standalone Windows JAR",
      "Military-command requirements validated, users trained and both solutions formally accepted",
    ],
    accent: "#00A859",
    position: [-4, 0, -53],
    upgrade: "Client Discovery · Solution Architecture · LAN Delivery · Endpoint Security",
    projectLinks: [
      {
        label: "Task Management",
        url: "https://github.com/MarcusTr98/quan-ly-cong-viec-bchqs-hong-bang",
      },
      { label: "USB Sentry", url: "https://github.com/MarcusTr98/USB-Sentry" },
    ],
  },
  {
    id: "electronics",
    shortTitle: "Personal Project",
    title: "Marcus Electronics",
    period: "01/2026 — 04/2026",
    role: "Full-stack Product Developer",
    summary:
      "Developed a full-stack electronics commerce system spanning catalog, SKU inventory, customer checkout, order operations, reporting and COD/VNPAY payment flows.",
    highlights: [
      "Java 21 · Spring Boot 4.0.1 · SQL Server",
      "Vue 3.5 · Vite 7 · Axios · Chart.js",
      "JWT/Spring Security · customer and admin workflows",
      "SKU/options, inventory, price history, COD and VNPAY",
    ],
    accent: "#F46300",
    position: [-4, 0, -77],
    upgrade: "REST API · Spring Security · VNPAY · Database 3NF",
    projectUrl: "https://github.com/MarcusTr98/Marcus-electronics",
  },
  {
    id: "workshop",
    shortTitle: "Community",
    title: "IT Club, Workshops & Mini Projects",
    period: "2024 — 09/2026",
    role: "IT Club Chairman · Mentor · Builder",
    summary:
      "Turned learning into shared capability through club leadership, technical workshops, workshop projects and interactive tools such as the SQL Quiz game for peer practice.",
    highlights: [
      "Led and coordinated IT Club activities",
      "Built a Vue 3 SQL Quiz game",
      "Mentored practical programming projects",
      "Shared structured learning with peers",
    ],
    accent: "#005EB8",
    position: [4, 0, -89],
    upgrade: "IT Club Leadership · Mentoring · Vue 3",
  },
  {
    id: "store",
    shortTitle: "Graduation Project",
    title: "Marcus Store",
    period: "05/2026 — 09/2026",
    role: "Team Leader · Solution Architect",
    summary:
      "Originated the product direction and led a five-person team while personally delivering roughly 60% of the work—from solution architecture and core engineering to an evolving AI-powered commerce experience.",
    highlights: [
      "Product vision, technical leadership and end-to-end architecture",
      "Grounded Gemini sales advisor, streaming responses and AI business intelligence",
      "Dynamic storefront/admin CMS, real-time support and configurable experiences",
      "Transaction-safe checkout, VNPAY, GHN automation, refunds and warranty workflows",
    ],
    accent: "#F46300",
    position: [-4, 0, -101],
    upgrade: "AI Commerce Architecture · Gemini · Transaction Integrity · Analytics",
    projectUrl:
      "https://github.com/MarcusTr98/DATN-MarcusStore/tree/feat/marcus/upgrade-full-website",
  },
  {
    id: "graduation",
    shortTitle: "Graduation Milestone",
    title: "FPT Polytechnic Graduation",
    period: "09/2026",
    role: "Software Development Graduate · GPA 3.9/4.0",
    summary:
      "Completed a three-year transformation from manufacturing operations to software engineering, combining academic excellence with leadership, deployed products and disciplined AI-assisted learning.",
    highlights: [
      "GPA 3.9/4.0",
      "Golden Bee SP26 — Top 1 FPT Polytechnic Hai Phong",
      "Excellent Student across semesters",
      "IT Club Chairman · Gemini Certified Educator",
    ],
    accent: "#FFC629",
    position: [2.6, 0, -112],
    upgrade: "Academic Excellence · Leadership · Lifelong Learning",
  },
  {
    id: "teaching",
    shortTitle: "03 · Present",
    title: "Technology Instructor & Freelance Developer",
    period: "During FPT — Present",
    role: "Instructor · AI-enabled Educator · Developer",
    summary:
      "Teaching Robocon, programming and workplace technology while building client software and websites. Generative AI is used as a disciplined co-pilot for lesson research, curriculum design, exercise generation, differentiation and personalized learner feedback.",
    highlights: [
      "Robocon, programming and digital literacy",
      "Microsoft Office & Google Workspace",
      "AI-assisted lesson design and personalization",
      "Freelance software and website delivery",
    ],
    accent: "#005EB8",
    position: [3, 0, -113],
    upgrade: "AI-assisted Education · Robocon · Freelance Delivery",
  },
  {
    id: "future",
    shortTitle: "04 · Destination",
    title: "Smart Factory",
    period: "2026 — The road ahead",
    role: "Production × Quality × Software × AI",
    summary:
      "The long-term direction is to unite factory-floor understanding, Kaizen, quality data, software automation and responsible AI into systems that improve operations—and empower people to use them confidently.",
    highlights: [
      "Digitized production & quality workflows",
      "Data-driven Kaizen and automation",
      "Responsible AI for operations and training",
      "Human-centered technology adoption",
    ],
    accent: "#F46300",
    position: [0, 0, -127],
    upgrade: "Smart Factory · Automation · Data · Responsible AI",
  },
];
const chronologicalOrder = [
  "toyota",
  "fpt",
  "vhunter",
  "workshop",
  "video",
  "electronics",
  "solutions",
  "store",
  "graduation",
  "teaching",
  "future",
];
const lane = [0, 4, -4, 4, -4, 4, -4, 4, 2.6, 3, 0];
const distance = [-7, -27, -47, -67, -87, -107, -127, -147, -167, -187, -207];
export const milestones = chronologicalOrder.map((id, index) => ({
  ...(milestoneCatalog.find((item) => item.id === id) as Milestone),
  position: [lane[index], 0, distance[index]] as [number, number, number],
  stage: (id === "toyota"
    ? "foundation"
    : id === "teaching"
      ? "present"
      : id === "future"
        ? "destination"
        : "transformation") as JourneyStage,
}));
