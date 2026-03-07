import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  SiReact, SiRedux, SiTailwindcss, SiHtml5, SiCss, SiVite, SiAxios,
  SiNodedotjs, SiExpress, SiPostman, SiSocketdotio, SiCloudflare, SiLetsencrypt,
  SiMongodb, SiGit, SiGithub, SiVercel, SiCloudinary, SiSupabase, SiAppwrite,
  SiJavascript, SiCplusplus, SiC,
} from "react-icons/si";
import { FaReact, FaServer, FaDatabase, FaCode, FaCloud } from "react-icons/fa";
import { VscCode } from "react-icons/vsc";
import skills from "../data/skills";

// ─── Icon Map — maps string name to actual icon component ───────────────────

const IconMap = {
  SiReact, SiRedux, SiTailwindcss, SiHtml5, SiCss, SiVite, SiAxios,
  SiNodedotjs, SiExpress, SiPostman, SiSocketdotio, SiCloudflare, SiLetsencrypt,
  SiMongodb, SiGit, SiGithub, SiVercel, SiCloudinary, SiSupabase, SiAppwrite,
  SiJavascript, SiCplusplus, SiC,
  SiMongoose: SiMongodb, SiRender: SiVercel, SiReactrouter: SiReact,
  SiJsonwebtokens: SiLetsencrypt,
  SiCss3: SiCss,
  // VS Code icon from vsc package
  SiVisualstudiocode: VscCode,
  FaReact, FaServer, FaDatabase, FaCode, FaCloud,
};

const CategoryIconMap = {
  FaReact: FaReact, FaServer: FaServer, FaDatabase: FaDatabase, FaCode: FaCode, FaCloud: FaCloud,
};

// ─── Single Skill Badge ─────────────────────────────────────────────────────

const SkillBadge = ({ skill, index }) => {
  const Icon = IconMap[skill.icon] || FaCode;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 18, delay: index * 0.04 }}
      whileHover={{ scale: 1.05, y: -1 }}
      className="skill-badge"
    >
      <Icon size={14} className="text-cyan-500 dark:text-cyan-400 flex-shrink-0" />
      <span>{skill.name}</span>
    </motion.div>
  );
};

// ─── Category Card ──────────────────────────────────────────────────────────

const CategoryCard = ({ category, delay }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-60px" });
  const CatIcon = CategoryIconMap[category.icon] || FaCode;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36, filter: "blur(5px)" }}
      animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ type: "spring", stiffness: 75, damping: 17, delay }}
      whileHover={{ y: -6, boxShadow: "0 16px 40px rgba(34,211,238,0.10), 0 4px 16px rgba(0,0,0,0.12)" }}
      style={{ willChange: "transform, box-shadow" }}
      className={`glass-card p-6 bg-gradient-to-br ${category.color}`}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2.5 rounded-xl bg-cyan-400/10 text-cyan-400">
          <CatIcon size={20} />
        </div>
        <h3 className="font-bold text-slate-800 dark:text-white text-base">
          {category.category}
        </h3>
      </div>

      {/* Skill Badges */}
      <div className="flex flex-wrap gap-2">
        {category.items.map((skill, i) => (
          <SkillBadge key={skill.name} skill={skill} index={i} />
        ))}
      </div>
    </motion.div>
  );
};

// ─── Component ──────────────────────────────────────────────────────────────

const Skills = () => {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: false });

  return (
    <section
      id="skills"
      className="section-padding bg-white dark:bg-[#0a0f1e] border-t border-slate-100 dark:border-white/5"
    >
      <div className="container-max">
        {/* ─── Header ─── */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-cyan-500 dark:text-cyan-400 font-semibold text-sm uppercase tracking-widest mb-3">
            What I work with
          </p>
          <h2 className="section-title">Technical Skills</h2>
          <p className="section-subtitle mt-2">
            Technologies I use to bring ideas from concept to production.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-teal-400 mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* ─── Skill Categories Grid ─── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((category, i) => (
            <CategoryCard key={category.category} category={category} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
