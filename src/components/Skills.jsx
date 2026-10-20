import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  SiReact, SiNextdotjs, SiTypescript, SiJavascript, SiRedux, SiTailwindcss, SiHtml5, SiCss, SiAxios,
  SiNodedotjs, SiExpress, SiPostman, SiCloudflare, SiLetsencrypt,
  SiPostgresql, SiPrisma, SiMongodb,
  SiGit, SiGithub, SiVercel, SiSentry,
  SiRedis, SiOpenai, SiDocker,
} from "react-icons/si";
import { FaReact, FaServer, FaDatabase, FaCode, FaCloud, FaSearch, FaChartBar, FaUserCheck, FaTimes } from "react-icons/fa";
import { VscCode } from "react-icons/vsc";
import skills from "../data/skills";

const IconMap = {
  SiReact, SiNextdotjs, SiTypescript, SiJavascript, SiRedux, SiTailwindcss, SiHtml5, SiCss, SiAxios,
  SiNodedotjs, SiExpress, SiPostman, SiCloudflare, SiLetsencrypt,
  SiPostgresql, SiPrisma, SiMongodb,
  SiGit, SiGithub, SiVercel, SiSentry,
  SiRedis, SiOpenai, SiDocker,
  SiMongoose: SiMongodb, SiRender: SiVercel,
  SiJsonwebtokens: SiLetsencrypt,
  SiCss3: SiCss,
  SiClerk: FaUserCheck,
  SiGooglecloud: FaCloud,
  SiGooglebigquery: FaChartBar,
  SiVisualstudiocode: VscCode,
  FaReact, FaServer, FaDatabase, FaCode, FaCloud, FaChartBar,
};

const CategoryIconMap = {
  FaReact, FaServer, FaDatabase, FaChartBar, FaCloud, FaCode,
};

const SkillBadgeItem = ({ skill, index }) => {
  const Icon = IconMap[skill.icon] || FaCode;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2, delay: index * 0.02 }}
      whileHover={{ scale: 1.04, y: -1 }}
      className="skill-badge"
    >
      <Icon size={15} className="text-cyan-600 dark:text-cyan-400 flex-shrink-0" />
      <span>{skill.name}</span>
    </motion.div>
  );
};

const CategoryCard = ({ category, delay }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-40px" });
  const CatIcon = CategoryIconMap[category.icon] || FaCode;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ type: "spring", stiffness: 80, damping: 18, delay }}
      className="glass-card p-4 sm:p-6 border-t-2 border-t-cyan-500 hover:border-cyan-500/50 dark:hover:border-cyan-400/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between gap-3 mb-5 pb-3 border-b border-slate-200/70 dark:border-white/[0.08]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/10 dark:bg-cyan-400/10 text-cyan-600 dark:text-cyan-400">
              <CatIcon size={20} />
            </div>
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
              {category.category}
            </h3>
          </div>
          <span className="text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-white/[0.05] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/[0.08]">
            {category.items.length} tools
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {category.items.map((skill, i) => (
            <SkillBadgeItem key={skill.name} skill={skill} index={i} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categoriesList = ["All", ...skills.map((s) => s.category)];

  const filteredSkills = skills
    .map((cat) => {
      if (selectedCategory !== "All" && cat.category !== selectedCategory) return null;

      const matchingItems = cat.items.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

      if (matchingItems.length === 0) return null;

      return {
        ...cat,
        items: matchingItems,
      };
    })
    .filter(Boolean);

  return (
    <section
      id="skills"
      className="section-padding bg-[#f8fafc] dark:bg-[#070b14] border-t border-slate-200/80 dark:border-white/[0.06] relative bg-grid-pattern overflow-hidden w-full max-w-full"
    >
      <div className="container-max w-full min-w-0">
        {/* ─── Header ─── */}
        <div className="text-center mb-12">
          <span className="text-cyan-600 dark:text-cyan-400 font-semibold text-xs uppercase tracking-widest px-3.5 py-1 rounded-full bg-cyan-500/10 dark:bg-cyan-400/10 border border-cyan-500/20 dark:border-cyan-400/20 inline-block mb-3">
            Technical Stack & Ecosystem
          </span>
          <h2 className="section-title">Skills & Technologies</h2>
          <p className="section-subtitle mt-2">
            Tools, languages, and frameworks I use to build production SaaS web applications.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* ─── Search & Category Filters Bar ─── */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3.5 sm:gap-4 mb-8 sm:mb-10">
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
            {categoriesList.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-xl text-[11px] sm:text-xs md:text-sm font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-cyan-600 dark:bg-cyan-500 text-white shadow-md shadow-cyan-500/25 border border-cyan-500"
                    : "bg-white dark:bg-white/[0.04] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.08] border border-slate-200 dark:border-white/[0.08]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
            <input
              type="text"
              placeholder="Search skill (e.g. Next.js)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 rounded-xl text-xs sm:text-sm bg-white dark:bg-white/[0.04] border border-slate-300/80 dark:border-white/[0.08] text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
              >
                <FaTimes size={11} />
              </button>
            )}
          </div>
        </div>

        {/* ─── Skills Grid ─── */}
        {filteredSkills.length === 0 ? (
          <div className="text-center py-12 text-slate-500 dark:text-slate-400 text-sm">
            No technologies matched "<span className="font-semibold text-slate-700 dark:text-slate-300">{searchQuery}</span>".
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence>
              {filteredSkills.map((category, i) => (
                <CategoryCard key={category.category} category={category} delay={i * 0.06} />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;

