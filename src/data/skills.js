// ─── Skills Data from New Resume ────────────────────────────────────────────

const skills = [
  {
    category: "Frontend & Languages",
    icon: "FaReact",
    color: "from-cyan-400/20 to-blue-400/20 border-cyan-400/30",
    items: [
      { name: "TypeScript", icon: "SiTypescript" },
      { name: "JavaScript", icon: "SiJavascript" },
      { name: "SQL", icon: "SiPostgresql" },
      { name: "React.js", icon: "SiReact" },
      { name: "Next.js", icon: "SiNextdotjs" },
      { name: "Redux", icon: "SiRedux" },
      { name: "Tailwind CSS", icon: "SiTailwindcss" },
      { name: "HTML5 / CSS3", icon: "SiHtml5" },
    ],
  },
  {
    category: "Backend & Architecture",
    icon: "FaServer",
    color: "from-emerald-400/20 to-teal-400/20 border-emerald-400/30",
    items: [
      { name: "Node.js", icon: "SiNodedotjs" },
      { name: "Express.js", icon: "SiExpress" },
      { name: "REST APIs", icon: "SiPostman" },
      { name: "Redis", icon: "SiRedis" },
      { name: "BullMQ", icon: "SiRedis" },
      { name: "JWT Auth", icon: "SiJsonwebtokens" },
      { name: "Clerk Auth", icon: "SiClerk" },
      { name: "Rate Limiting", icon: "SiCloudflare" },
    ],
  },
  {
    category: "Databases & ORM",
    icon: "FaDatabase",
    color: "from-violet-400/20 to-purple-400/20 border-violet-400/30",
    items: [
      { name: "PostgreSQL", icon: "SiPostgresql" },
      { name: "Prisma ORM", icon: "SiPrisma" },
      { name: "Google BigQuery", icon: "SiGooglecloud" },
      { name: "MongoDB", icon: "SiMongodb" },
      { name: "Mongoose ODM", icon: "SiMongoose" },
    ],
  },
  {
    category: "AI & Data Engineering",
    icon: "FaChartBar",
    color: "from-amber-400/20 to-orange-400/20 border-amber-400/30",
    items: [
      { name: "Google Gemini Integration", icon: "SiGooglecloud" },
      { name: "OpenAI LLM Integration", icon: "SiOpenai" },
      { name: "Autonomous AI Agents", icon: "FaCode" },
      { name: "BigQuery Ingestion Pipelines", icon: "SiGooglebigquery" },
      { name: "GCS Dead Letter Queues", icon: "FaCloud" },
    ],
  },
  {
    category: "Cloud, Tools & DevOps",
    icon: "FaCloud",
    color: "from-pink-400/20 to-rose-400/20 border-pink-400/30",
    items: [
      { name: "Docker", icon: "SiDocker" },
      { name: "Git / GitHub", icon: "SiGithub" },
      { name: "Vercel Deployments", icon: "SiVercel" },
      { name: "Sentry Monitoring", icon: "SiSentry" },
      { name: "Postman", icon: "SiPostman" },
    ],
  },
];

export default skills;

