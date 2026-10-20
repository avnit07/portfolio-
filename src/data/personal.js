// ─── Personal Info & Professional Experience Data ──────────────────────────────
const personal = {
  name: "Avnit Singh",
  role: "Full-Stack Software Engineer",
  tagline: "Shipping production features, high-volume BigQuery telemetry pipelines, and event-driven backends for US-based SaaS platforms",
  email: "avnitsingh58@gmail.com",
  phone: "8766576639",
  github: "https://github.com/avnit07",
  linkedin: "https://linkedin.com/in/avnit07",
  location: "Mohali, Punjab",
  degree: "Bachelor of Technology in Computer Science and Engineering",
  university: "Uttarakhand Technical University (VMSBUTU)",
  graduationYear: "Sept 2022 – June 2026",
  bio: "Full-Stack Software Engineer (Next.js, TypeScript, Node.js, PostgreSQL) shipping production features and high-volume BigQuery telemetry pipelines for US-based SaaS platforms. Skilled in low-latency REST APIs, event-driven backends (Redis, BullMQ), and AI-driven systems (LLMs, AI agents) alongside scalable React architectures.",
  seeking:
    "Open to full-time Software Engineer, Full-Stack, or Backend roles.",
  currentlyLearning: [
    "Event-Driven Architectures (Redis, BullMQ)",
    "BigQuery Telemetry & GCS Dead Letter Queues",
    "Autonomous AI Diagnostic Agents & LLM Pipelines",
    "High-Concurrency PostgreSQL & Caching Layers",
  ],
  experience: [
    {
      id: 1,
      role: "Software Engineer Intern",
      company: "Code Garage Tech",
      location: "Mohali, Punjab",
      period: "Mar 2026 – Present",
      type: "Internship",
      highlights: [
        "Creative Launch Engine: Engineered ad orchestration workflows in Next.js 15 & TypeScript, automating multi-variant launches across Meta/TikTok Ads and cutting campaign setup time by 40%.",
        "Telemetry & Data Resilience: Architected a BigQuery ingestion pipeline processing 25,000+ daily events, pairing sendBeacon with a GCS Dead Letter Queue (DLQ) and cron replay to achieve 99.9% data durability.",
        "AI Compliance Guardrails: Integrated Google Gemini to build an automated pre-flight policy verification pipeline, checking scripts against advertising guidelines to slash manual review turnaround by 75%.",
        "Performance & Multi-Tenant RBAC: Reduced dashboard P95 response times from 2.5s to <200ms via a PostgreSQL caching layer over BigQuery, while eliminating UI race conditions (AbortController) and enforcing Clerk RBAC.",
      ],
      techStack: ["Next.js 15", "TypeScript", "PostgreSQL", "Google BigQuery", "Google Gemini", "Clerk", "Sentry", "GCS", "Vercel"],
    },
    {
      id: 2,
      role: "MERN Stack Developer Trainee",
      company: "CertED Technologies",
      location: "Roorkee, Uttarakhand",
      period: "Jul 2025 – Dec 2025",
      type: "Training Program",
      highlights: [
        "Built a full-stack blogging platform from scratch to master core MERN principles, architecting modular REST APIs with Express.js, request validation, and clean MVC separation.",
        "Designed database models for posts and categories with parent-child relationships to render nested reply threads and manage real-time interactions like post likes.",
        "Secured workflows with dual-token JWT authentication and HTTP-only cookies, combining custom authorization middleware with a responsive React UI and image upload handling.",
      ],
      techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "Mongoose ODM", "JWT", "Tailwind CSS"],
    },
  ],
};

export default personal;

