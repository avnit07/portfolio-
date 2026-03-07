// ─── Skills Data ─────────────────────────────────────────────────────────────
// Each category has a label, an icon name (from react-icons/si or react-icons/di),
// and a list of skills. Colors are Tailwind CSS class strings for badge accents.

const skills = [
  {
    category: "Frontend",
    icon: "FaReact",
    color: "from-cyan-400/20 to-blue-400/20 border-cyan-400/30",
    items: [
      { name: "React.js", icon: "SiReact" },
      { name: "Redux Toolkit", icon: "SiRedux" },
      { name: "Tailwind CSS", icon: "SiTailwindcss" },
      { name: "HTML5", icon: "SiHtml5" },
      { name: "CSS3", icon: "SiCss3" },
      { name: "React Router", icon: "SiReactrouter" },
      { name: "Axios", icon: "SiAxios" },
      { name: "Vite", icon: "SiVite" },
    ],
  },
  {
    category: "Backend",
    icon: "FaServer",
    color: "from-emerald-400/20 to-teal-400/20 border-emerald-400/30",
    items: [
      { name: "Node.js", icon: "SiNodedotjs" },
      { name: "Express.js", icon: "SiExpress" },
      { name: "REST APIs", icon: "SiPostman" },
      { name: "JWT", icon: "SiJsonwebtokens" },
      { name: "bcrypt", icon: "SiLetsencrypt" },
      { name: "Socket.IO", icon: "SiSocketdotio" },
      { name: "Rate Limiting", icon: "SiCloudflare" },
    ],
  },
  {
    category: "Database",
    icon: "FaDatabase",
    color: "from-violet-400/20 to-purple-400/20 border-violet-400/30",
    items: [
      { name: "MongoDB", icon: "SiMongodb" },
      { name: "Mongoose ODM", icon: "SiMongoose" },
      { name: "Indexing", icon: "SiMongodb" },
      { name: "Query Optimization", icon: "SiMongodb" },
    ],
  },
  {
    category: "Languages",
    icon: "FaCode",
    color: "from-orange-400/20 to-yellow-400/20 border-orange-400/30",
    items: [
      { name: "JavaScript (ES6+)", icon: "SiJavascript" },
      { name: "C++", icon: "SiCplusplus" },
      { name: "C", icon: "SiC" },
    ],
  },
  {
    category: "Cloud & Tools",
    icon: "FaCloud",
    color: "from-pink-400/20 to-rose-400/20 border-pink-400/30",
    items: [
      { name: "Git", icon: "SiGit" },
      { name: "GitHub", icon: "SiGithub" },
      { name: "Vercel", icon: "SiVercel" },
      { name: "Render", icon: "SiRender" },
      { name: "Cloudinary", icon: "SiCloudinary" },
      { name: "Supabase", icon: "SiSupabase" },
      { name: "Appwrite", icon: "SiAppwrite" },
      { name: "Postman", icon: "SiPostman" },
      { name: "VS Code", icon: "SiVisualstudiocode" },
    ],
  },
];

export default skills;
