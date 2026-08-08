import type { JourneyStage, Milestone } from "@/types";
const milestoneCatalog: Omit<Milestone, "stage">[] = [
  {
    id: "toyota",
    shortTitle: "01 · Foundation",
    title: "Toyota Boshoku Hai Phong",
    period: "12/2016 — 09/2023",
    role: "Production & Quality Management",
    summary:
      "Nearly seven years on the factory floor built a disciplined foundation in production, quality, people development and continuous improvement within a Japanese manufacturing environment.",
    highlights: [
      "35% faster employee onboarding",
      "~30% reduction in operational waste",
      "Critical defect rate maintained below 1%",
      "50% fewer equipment incidents",
    ],
    accent: "#F46300",
    position: [0, 0, -6],
    upgrade: "Production Management · Quality · Kaizen · 5S",
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
    id: "task",
    shortTitle: "Real Deployment",
    title: "Internal Task Management System",
    period: "02/2026 — 04/2026",
    role: "Solution Designer & Full-stack Developer",
    summary:
      "Designed a role-specific LAN workflow for the Hong Bang Ward Military Command, connecting commander task assignment with soldier acknowledgement, completion reporting and live status visibility.",
    highlights: [
      "Java 21 · Spring Boot 4.0.2 · Thymeleaf · SQLite",
      "Commander assignment, deadlines, editing and cancellation",
      "Soldier acknowledgement → completion status workflow",
      "AJAX polling alerts · portable local database · LAN operation",
    ],
    accent: "#00A859",
    position: [-4, 0, -53],
    upgrade: "Solution Design · AJAX · LAN Deployment",
    projectUrl: "https://github.com/MarcusTr98/quan-ly-cong-viec-bchqs-hong-bang",
  },
  {
    id: "security",
    shortTitle: "Real Deployment",
    title: "USB Sentry",
    period: "02/2026 — 04/2026",
    role: "Desktop Security Developer",
    summary:
      "Built a portable Windows desktop guard that detects newly connected storage and mobile devices, then executes a defensive response to reduce internal data-exfiltration risk.",
    highlights: [
      "Java 21 · Swing dashboard · shaded portable JAR",
      "1.5-second drive monitoring · WMI/WPD mobile detection",
      "Netsh outbound firewall isolation · 15-second shutdown",
      "Administrator recovery: cancel shutdown and restore network",
    ],
    accent: "#00A859",
    position: [4, 0, -65],
    upgrade: "Windows Monitoring · Firewall Automation · Incident Response",
    projectUrl: "https://github.com/MarcusTr98/USB-Sentry",
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
      "Leading a broad, production-minded graduation platform that combines dynamic commerce, AI-assisted sales and business intelligence, transaction-safe checkout, shipping automation and configurable client/admin experiences.",
    highlights: [
      "430 Java files · Spring Boot 3.2.5 · SQL Server · 25 tests",
      "132 Vue files · Vue 3.5 · Vite 8 · Pinia 3 · responsive dynamic UI",
      "Grounded Gemini advisor, SSE, AI analytics, safety guards and telemetry",
      "VNPAY lifecycle · GHN shipping · checkout locking · refund/warranty · WebSocket",
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
  "task",
  "security",
  "store",
  "graduation",
  "teaching",
  "future",
];
const lane = [0, 4, -4, 4, -4, 4, -4, 4, -4, 2.6, 3, 0];
const distance = [-7, -25, -43, -61, -79, -97, -115, -133, -151, -169, -187, -205];
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
