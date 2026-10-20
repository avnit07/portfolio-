// ─── Projects Data (Comprehensive Engineering Case Studies from Resume) ─────────

const projects = [
  {
    id: 1,
    title: "CanaryGuard",
    subtitle: "Canary Verification Rollback Platform",
    tagline: "Dynamic reverse proxy & BullMQ worker pipeline with automated SLA sliding-window rollbacks & AI diagnosis",
    description:
      "Engineered an automated canary deployment verification platform that routes live HTTP traffic across graduated release stages with <2ms overhead and executes sub-15s rollbacks upon SLA breach.",
    problemSolved:
      "Production releases frequently risk 100% blast-radius downtime and prolonged post-mortem debugging. Built an SLA evaluation engine using a 60-second in-memory sliding window for P99 latency and 5xx error spikes, executing automated rollbacks in <15s and restoring 100% traffic to baseline.",
    architecture: [
      { layer: "Traffic Routing & Proxy", details: "Node.js, Express, dynamic reverse proxy routing live HTTP requests with <2ms overhead" },
      { layer: "Asynchronous Queue", details: "BullMQ & Redis worker pipeline scaling releases across 4 stages (5% → 25% → 50% → 100%)" },
      { layer: "SLA Evaluation Engine", details: "60-second in-memory sliding window monitoring P99 latency & 5xx error spikes with <15s rollback" },
      { layer: "AI Diagnostic Agent", details: "Autonomous Node.js agent ingesting stderr logs, metrics & git diffs with <10s detection latency & 85%+ confidence" },
    ],
    challenges: [
      {
        challenge: "Sub-2ms Reverse Proxy Routing Overhead",
        solution: "Implemented lightweight in-memory traffic weighting across 4 graduated stages (5% → 25% → 50% → 100%), limiting defect blast radius to <5% of users."
      },
      {
        challenge: "Automated SLA Breach Rollback & Root-Cause Analysis",
        solution: "Constructed an automated rollback trigger restoring 100% traffic in <15 seconds, integrated with an AI agent that analyzes metric snapshots and git commit diffs in <10 seconds."
      }
    ],
    highlights: [
      "Dynamic reverse proxy & BullMQ/Redis worker pipeline routing live HTTP traffic with <2ms overhead",
      "Scaled releases across 4 stages (5% → 25% → 50% → 100%) while limiting defect blast radius to <5% of users",
      "SLA evaluation engine using a 60-second in-memory sliding window for P99 latency and 5xx error spikes",
      "Automated rollbacks in <15 seconds, restoring 100% traffic to baseline upon metric anomaly",
      "Autonomous Node.js AI diagnostic agent diagnosing defects with <10s latency and 85%+ root-cause confidence",
    ],
    metrics: [
      { label: "Routing Overhead", value: "<2ms" },
      { label: "Auto Rollback", value: "<15s" },
      { label: "Blast Radius", value: "<5% users" },
    ],
    techStack: ["Node.js", "TypeScript", "BullMQ", "Redis", "Express", "PostgreSQL", "Prisma", "Docker"],
    githubLink: "https://github.com/avnit07",
    liveLink: null,
    featured: true,
    category: "Distributed Systems & AI",
    theme: "cyan",
    color: "from-cyan-500 via-teal-500 to-blue-600",
    badgeBg: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30",
  },
  {
    id: 2,
    title: "Writely",
    subtitle: "Full-Stack Content Publishing Platform",
    tagline: "High-performance discussion platform with O(n) nested comment trees, dual-token JWT, and Zod validation",
    description:
      "Architected a full-stack content publishing platform with optimized relational data models, schema-driven form validation, and hardened session security.",
    problemSolved:
      "Nested discussion threads in content platforms suffer from severe N+1 database queries. Designed a normalized PostgreSQL schema with Sequelize ORM that cut discussion thread query latency by 45% using a single-fetch adjacency hash map that parses nested replies in O(n) time.",
    architecture: [
      { layer: "Frontend Application", details: "Next.js, React, Tailwind CSS, schema-driven Zod forms, centralized Axios interceptors" },
      { layer: "Backend REST APIs", details: "Node.js, Express.js modular architecture, Multer image upload handling, rate limiting" },
      { layer: "Relational Database", details: "PostgreSQL, Sequelize ORM, single-fetch adjacency hash map eliminating N+1 queries" },
      { layer: "Auth & Concurrency", details: "Dual-token JWT auth, silent token refresh, HTTP-only cookies, composite unique constraints" },
    ],
    challenges: [
      {
        challenge: "Eliminating N+1 Queries on Deeply Nested Comment Trees",
        solution: "Replaced recursive database queries with a single-fetch SQL query parsed into an in-memory adjacency list hash map, cutting query latency by 45% in O(n) time."
      },
      {
        challenge: "Preventing Duplicate Reactions Under Concurrent Requests",
        solution: "Enforced database-level composite unique constraints and atomic operations to guarantee zero duplicate likes under concurrent traffic."
      }
    ],
    highlights: [
      "Normalized PostgreSQL schema with Sequelize ORM; cut discussion thread query latency by 45%",
      "Single-fetch adjacency hash map that parses nested replies in O(n) time without N+1 queries",
      "Dual-token JWT auth with silent token refresh, HTTP-only secure cookies & centralized Axios interceptors",
      "Schema-driven Zod forms and Multer image uploads with composite unique constraints for concurrent requests",
    ],
    metrics: [
      { label: "Query Latency", value: "-45% faster" },
      { label: "Comment Parser", value: "O(n) single-fetch" },
      { label: "Security", value: "Dual-Token JWT" },
    ],
    techStack: ["Next.js", "Node.js", "Express", "PostgreSQL", "Sequelize", "JWT", "Zod"],
    githubLink: "https://github.com/avnit07",
    liveLink: null,
    featured: true,
    category: "Full-Stack Web App",
    theme: "emerald",
    color: "from-emerald-500 via-teal-500 to-cyan-600",
    badgeBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
  },
  {
    id: 3,
    title: "NextHire",
    subtitle: "Role-Gated Job Portal Platform",
    tagline: "Role-gated job application platform with MongoDB $text indexing and debounced Redux query search",
    description:
      "Engineered 15+ REST API endpoints with Node.js/Express, JWT auth via HTTP-only cookies, role-based access control, Helmet security headers, and rate-limited auth routes.",
    problemSolved:
      "Recruiters and applicants faced slow query times during keyword searches and vulnerable auth workflows. Replaced unindexed regex collection scans with compound text indexing, cutting search latency by 40%+.",
    architecture: [
      { layer: "Frontend State", details: "React.js, Redux Toolkit, Tailwind CSS, Recruiter & Candidate dashboards" },
      { layer: "Backend REST APIs", details: "Node.js, Express.js, 15+ REST endpoints, Helmet security, Rate limiting" },
      { layer: "Database & Indexing", details: "MongoDB with Mongoose ODM, compound text indexing & schema validation" },
      { layer: "Storage & Deploy", details: "Cloudinary upload pipeline, deployed on Render (backend) & Vercel (frontend)" },
    ],
    challenges: [
      {
        challenge: "High Search Latency on Full-Collection Regex Queries",
        solution: "Replaced unindexed regex scans with MongoDB $text indexes and debounced Redux dispatch (300ms), cutting search query latency by 40%+."
      },
      {
        challenge: "Securing Token Storage Against XSS / CSRF",
        solution: "Moved authentication tokens from client localStorage to HTTP-only SameSite cookies with 15 req/15 min rate-limiting."
      }
    ],
    highlights: [
      "15+ REST API endpoints with HTTP-only cookies, Helmet & rate limiting (15 req/15 min)",
      "Reduced job search latency by 40%+ via MongoDB $text indexing & debounced Redux",
      "Role-gated React UI with Redux Toolkit for separate Recruiter & Candidate dashboards",
      "Cloudinary integration for uploads; deployed on Render (backend) & Vercel (frontend)",
    ],
    metrics: [
      { label: "Search Latency", value: "-40% faster" },
      { label: "API Endpoints", value: "15+ REST" },
      { label: "Security", value: "Rate-limited JWT" },
    ],
    techStack: ["MongoDB", "Express.js", "React.js", "Node.js", "JWT", "Redux Toolkit", "Cloudinary"],
    githubLink: "https://github.com/avnit07/Next_Hire",
    liveLink: "https://next-hire-phi-ten.vercel.app/",
    featured: true,
    category: "Full-Stack Web App",
    theme: "violet",
    color: "from-violet-500 via-purple-500 to-indigo-600",
    badgeBg: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/30",
  },
];

export default projects;


