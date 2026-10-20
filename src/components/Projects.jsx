import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaTimes,
  FaLayerGroup,
  FaCheckCircle,
  FaRocket,
  FaCogs,
  FaShieldAlt,
} from "react-icons/fa";
import { HiSparkles, HiCode, HiChip } from "react-icons/hi";
import projects from "../data/projects";

const TechBadge = ({ tech, theme = "cyan" }) => {
  const themeClasses =
    theme === "emerald"
      ? "bg-emerald-500/10 dark:bg-emerald-400/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20"
      : theme === "violet"
      ? "bg-violet-500/10 dark:bg-violet-400/10 text-violet-700 dark:text-violet-300 border-violet-500/20"
      : "bg-cyan-500/10 dark:bg-cyan-400/10 text-cyan-700 dark:text-cyan-300 border-cyan-500/20";

  return (
    <span className={`px-2.5 py-1 text-xs font-semibold rounded-lg border ${themeClasses}`}>
      {tech}
    </span>
  );
};

// ─── Project Details Architecture Modal ───────────────────────────────────────
const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-950/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 16 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto glass-card p-4 sm:p-6 md:p-8 bg-[#090e1a] border border-cyan-500/30 text-left shadow-2xl rounded-2xl"
      >
        {/* Accent Stripe */}
        <div className={`absolute top-0 left-0 right-0 h-1.5 rounded-t-2xl bg-gradient-to-r ${project.color}`} />

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-3 right-3 sm:top-5 sm:right-5 p-2 rounded-xl text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors cursor-pointer z-10"
        >
          <FaTimes size={15} />
        </button>

        {/* Modal Top Header */}
        <div className="pr-8 sm:pr-10 mt-1 sm:mt-2">
          <span className={`inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border uppercase tracking-wider mb-2 ${project.badgeBg}`}>
            <FaRocket size={10} /> {project.subtitle}
          </span>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            {project.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 font-medium">{project.tagline}</p>
        </div>

        {/* Verified Metrics Banner */}
        {project.metrics && (
          <div className="grid grid-cols-1 min-[420px]:grid-cols-3 gap-2 sm:gap-3 my-4 sm:my-6">
            {project.metrics.map((m) => (
              <div key={m.label} className="p-2.5 sm:p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-center">
                <span className="block text-sm sm:text-base md:text-lg font-extrabold text-cyan-400 font-mono">
                  {m.value}
                </span>
                <span className="text-[10px] sm:text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Problem Statement */}
        <div className="mb-4 sm:mb-6 p-3.5 sm:p-4 rounded-xl bg-[#0f172a]/80 border border-slate-800">
          <h4 className="text-[11px] sm:text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1.5 flex items-center gap-2">
            <HiSparkles size={14} /> Problem Solved & Engineering Rationale
          </h4>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            {project.problemSolved}
          </p>
        </div>

        {/* System Architecture Grid */}
        {project.architecture && (
          <div className="mb-4 sm:mb-6">
            <h4 className="text-[11px] sm:text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5 sm:mb-3 flex items-center gap-2">
              <FaLayerGroup size={13} className="text-cyan-400" /> Architectural Breakdown
            </h4>
            <div className="grid sm:grid-cols-2 gap-2.5 sm:gap-3">
              {project.architecture.map((layer) => (
                <div key={layer.layer} className="p-3 sm:p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                  <span className="text-[11px] sm:text-xs font-bold text-cyan-300 uppercase tracking-wider block mb-1">
                    {layer.layer}
                  </span>
                  <p className="text-xs text-slate-300 leading-snug">{layer.details}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Key Engineering Challenges */}
        {project.challenges && (
          <div className="mb-4 sm:mb-6 space-y-2.5 sm:space-y-3">
            <h4 className="text-[11px] sm:text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-2">
              <FaCogs size={13} className="text-teal-400" /> Key Technical Challenges & Solutions
            </h4>
            {project.challenges.map((c, i) => (
              <div key={i} className="p-3 sm:p-3.5 rounded-xl bg-[#0d1527] border border-slate-800 space-y-1.5">
                <p className="text-[11px] sm:text-xs font-bold text-rose-300 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 flex-shrink-0" />
                  Challenge: {c.challenge}
                </p>
                <p className="text-xs text-slate-300 leading-relaxed pl-2.5 sm:pl-3 border-l-2 border-emerald-500/40">
                  <strong className="text-emerald-400 font-semibold">Solution:</strong> {c.solution}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Tech Stack Breakdown */}
        <div className="mb-5 sm:mb-6">
          <h4 className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
            <HiChip size={14} className="text-cyan-400" /> Technology Stack
          </h4>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {project.techStack.map((t) => (
              <TechBadge key={t} tech={t} theme={project.theme} />
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 sm:pt-5 border-t border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 w-full sm:w-auto">
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-xs px-4 py-2.5 w-full sm:w-auto justify-center"
            >
              <FaGithub size={14} /> Source Code
            </a>
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-xs px-4 py-2.5 w-full sm:w-auto justify-center"
              >
                <FaExternalLinkAlt size={12} /> Live Application
              </a>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-xs font-semibold text-slate-400 hover:text-white underline cursor-pointer py-1.5 text-center sm:text-right"
          >
            Close Details
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// ─── Project Card ───────────────────────────────────────────────────────────
const ProjectCard = ({ project, index, onSelect }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ type: "spring", stiffness: 80, damping: 18, delay: index * 0.1 }}
      className="group relative glass-card p-4 sm:p-6 md:p-7 flex flex-col justify-between overflow-hidden border border-slate-200/90 dark:border-white/[0.08] hover:border-cyan-500/50 dark:hover:border-cyan-400/50 hover:shadow-xl transition-all duration-300"
    >
      {/* Top Accent Stripe */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${project.color}`} />

      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-3 pt-1">
          <span className={`text-[10px] sm:text-[11px] font-mono font-semibold px-2 sm:px-2.5 py-0.5 rounded-full border ${project.badgeBg}`}>
            {project.subtitle}
          </span>
          <span className="text-[10px] sm:text-[11px] font-medium text-slate-500 dark:text-slate-400">
            {project.category}
          </span>
        </div>

        {/* Title & Tagline */}
        <h3 className="text-lg sm:text-2xl font-extrabold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors tracking-tight">
          {project.title}
        </h3>
        <p className="text-[11px] sm:text-xs font-medium text-slate-500 dark:text-slate-400 mt-1 leading-snug">
          {project.tagline}
        </p>

        {/* Metrics Row */}
        {project.metrics && (
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2 my-3.5 p-2 sm:p-2.5 rounded-xl bg-slate-100/80 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.06]">
            {project.metrics.map((m) => (
              <div key={m.label} className="text-center overflow-hidden">
                <span className="block text-[11px] sm:text-xs font-bold text-cyan-600 dark:text-cyan-400 font-mono truncate">
                  {m.value}
                </span>
                <span className="text-[9px] sm:text-[10px] text-slate-500 dark:text-slate-400 font-medium truncate block">
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Problem Solved Summary */}
        <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm mt-3 leading-relaxed">
          {project.description}
        </p>

        {/* Key Highlights */}
        <ul className="mt-3.5 space-y-1.5 sm:space-y-2">
          {project.highlights.slice(0, 3).map((h, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300 leading-snug">
              <FaCheckCircle className="mt-0.5 text-cyan-600 dark:text-cyan-400 flex-shrink-0" size={13} />
              <span>{h}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1 sm:gap-1.5 pt-3.5 border-t border-slate-200/70 dark:border-white/[0.08] mt-4 sm:mt-5">
          {project.techStack.map((tech) => (
            <TechBadge key={tech} tech={tech} theme={project.theme} />
          ))}
        </div>

        {/* Actions Bar */}
        <div className="flex items-center justify-between pt-4 mt-3">
          <button
            onClick={() => onSelect(project)}
            className="text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:underline inline-flex items-center gap-1.5 cursor-pointer"
          >
            <FaLayerGroup size={12} />
            <span>Architecture Case Study</span>
          </button>

          <div className="flex items-center gap-2">
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Repository"
              className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-white/[0.08] transition-colors"
              title="View Source Code"
            >
              <FaGithub size={17} />
            </a>
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Live Demo"
                className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-white/[0.08] transition-colors"
                title="Live Application"
              >
                <FaExternalLinkAlt size={14} />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ─── Component ──────────────────────────────────────────────────────────────
const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const filterOptions = ["All", "Distributed Systems & AI", "Full-Stack Web App"];

  const filteredProjects = projects.filter((p) => {
    if (activeFilter === "All") return true;
    return p.category === activeFilter;
  });

  return (
    <section
      id="projects"
      className="section-padding bg-[#f8fafc] dark:bg-[#060913] border-t border-slate-200/80 dark:border-white/[0.06] relative bg-grid-pattern"
    >
      <div className="container-max">
        {/* ─── Header ─── */}
        <div className="text-center mb-12">
          <span className="text-cyan-600 dark:text-cyan-400 font-semibold text-xs uppercase tracking-widest px-3.5 py-1 rounded-full bg-cyan-500/10 dark:bg-cyan-400/10 border border-cyan-500/20 dark:border-cyan-400/20 inline-block mb-3">
            Featured Engineering Projects
          </span>
          <h2 className="section-title">Production Case Studies</h2>
          <p className="section-subtitle mt-2">
            Detailed architectures, query latency optimizations, versioning algorithms, and real-world outcomes.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* ─── Filter Pills ─── */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-8 sm:mb-10">
          {filterOptions.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeFilter === f
                  ? "bg-cyan-600 dark:bg-cyan-500 text-white shadow-md shadow-cyan-500/25 border border-cyan-500"
                  : "bg-white dark:bg-white/[0.04] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.08] border border-slate-200 dark:border-white/[0.08]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* ─── Projects Grid ─── */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onSelect={setSelectedProject}
            />
          ))}
        </div>

        {/* ─── GitHub CTA ─── */}
        <div className="text-center mt-12">
          <a
            href="https://github.com/avnit07"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            <FaGithub size={16} />
            <span>Explore All Repositories on GitHub</span>
          </a>
        </div>
      </div>

      {/* ─── Project Architecture Case Study Modal ─── */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;

