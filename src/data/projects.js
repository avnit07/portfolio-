// ─── Projects Data ───────────────────────────────────────────────────────────

const projects = [
  {
    id: 1,
    title: "NextHire",
    subtitle: "Full-Stack Job Portal Platform",
    description:
      "A production-grade job portal with role-based dashboards for recruiters and job seekers. Features 15+ REST API endpoints with JWT auth via HTTP-only cookies, rate limiting, and 4-filter job search.",
    problemSolved:
      "Existing job portals are bloated and slow. NextHire reduces job search latency by 40%+ using MongoDB $regex full-collection scans with $text indexing.",
    highlights: [
      "15+ REST API endpoints with HTTP-only cookies & rate limiting",
      "40%+ faster job search via MongoDB $text indexing",
      "Role-gated dashboards with 4-filter search",
      "Cloudinary integration for resume & profile photo uploads",
    ],
    techStack: ["React.js", "Redux Toolkit", "Node.js", "Express.js", "MongoDB", "JWT", "Cloudinary"],
    githubLink: "https://github.com/avnit07/Next_Hire",
    liveLink: "https://next-hire-phi-ten.vercel.app/",
    featured: true,
    color: "from-cyan-500 to-blue-600",
  },
  {
    id: 2,
    title: "GitNest",
    subtitle: "Version Control System",
    description:
      "A full-stack Git-like version control system built from scratch — supporting staging, committing, pushing, pulling, and reverting. Cloud-backed file storage via Supabase.",
    problemSolved:
      "Understanding Git internals. Built a custom Node.js CLI that manages versioned file commits with cloud-persistent storage.",
    highlights: [
      "Git-like workflows: stage, commit, push, pull, revert",
      "Supabase Storage for versioned cloud file commits",
      "JWT auth + REST APIs via Express.js",
      "Real-time features with Socket.IO",
    ],
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "Supabase", "Socket.IO", "JWT"],
    githubLink: "https://github.com/avnit07/gitnest-version-control",
    liveLink: null,
    featured: true,
    color: "from-emerald-500 to-teal-600",
  },
  {
    id: 3,
    title: "InkFlow",
    subtitle: "Full-Stack Blog Platform",
    description:
      "A full-stack blog platform used by 20+ real users for creating, editing, and publishing posts — with secure authentication, Appwrite backend-as-a-service, and optimized Redux state management.",
    problemSolved:
      "Needed a lightweight, performant blog platform without a custom backend. Appwrite eliminated custom backend overhead while maintaining full CRUD functionality.",
    highlights: [
      "Used by 20+ real users in production",
      "Redux Toolkit slice-based state with memoization",
      "Appwrite BaaS for auth, database & file storage",
      "Improved UI responsiveness across low-bandwidth connections",
    ],
    techStack: ["React.js", "Redux Toolkit", "Appwrite", "Tailwind CSS"],
    githubLink: "https://github.com/avnit07/InkFlow-Blog-Platform",
    liveLink: "https://ink-flow-blog-platform.vercel.app/",
    featured: false,
    color: "from-violet-500 to-purple-600",
  },
];

export default projects;
