import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FaGithub, FaExternalLinkAlt, FaStar } from "react-icons/fa";
import projects from "../data/projects";

// ─── Tech Stack Badge ───────────────────────────────────────────────────────

const TechBadge = ({ tech }) => (
  <span className="px-2.5 py-1 text-xs font-medium rounded-md bg-slate-100 dark:bg-dark-600 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
    {tech}
  </span>
);

// ─── Highlight Item ─────────────────────────────────────────────────────────

const Highlight = ({ text }) => (
  <li className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
    {text}
  </li>
);

// ─── Project Card ───────────────────────────────────────────────────────────

const ProjectCard = ({ project, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, filter: "blur(6px)" }}
      animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ type: "spring", stiffness: 70, damping: 16, delay: index * 0.12 }}
      whileHover={{ y: -8, boxShadow: "0 0 0 1px rgba(34,211,238,0.35), 0 24px 48px rgba(34,211,238,0.12), 0 8px 24px rgba(0,0,0,0.15)" }}
      className="group relative glass-card p-6 flex flex-col gap-4 cursor-default"
      style={{ willChange: "transform, box-shadow" }}
    >
      {/* ─── Top accent stripe ─── */}
      <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-gradient-to-r ${project.color}`} />

      {/* ─── Featured badge ─── */}
      {project.featured && (
        <div className="absolute top-3 right-4">
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-500 border border-amber-400/20">
            <FaStar size={9} /> Featured
          </span>
        </div>
      )}

      {/* ─── Title & Subtitle ─── */}
      <div className="mt-2">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white group-hover:text-cyan-400 transition-colors duration-200">
          {project.title}
        </h3>
        <p className="text-xs font-medium text-cyan-500 dark:text-cyan-400 mt-0.5">
          {project.subtitle}
        </p>
      </div>

      {/* ─── Description ─── */}
      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
        {project.description}
      </p>

      {/* ─── Highlights ─── */}
      <ul className="space-y-1.5">
        {project.highlights.slice(0, 3).map((h) => (
          <Highlight key={h} text={h} />
        ))}
      </ul>

      {/* ─── Tech Stack ─── */}
      <div className="flex flex-wrap gap-1.5 pt-1">
        {project.techStack.map((tech) => (
          <TechBadge key={tech} tech={tech} />
        ))}
      </div>

      {/* ─── Links ─── */}
      <div className="flex items-center gap-4 pt-2 mt-auto border-t border-slate-100 dark:border-white/5">
        <motion.a
          href={project.githubLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} GitHub`}
          className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-cyan-400 dark:hover:text-cyan-400 transition-colors font-medium"
          whileHover={{ x: 2 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <FaGithub size={16} />
          Code
        </motion.a>
        {project.liveLink && (
          <motion.a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} Live Demo`}
            className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-emerald-400 transition-colors font-medium"
            whileHover={{ x: 2 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <FaExternalLinkAlt size={13} />
            Live Demo
          </motion.a>
        )}
      </div>
    </motion.div>
  );
};

// ─── Component ──────────────────────────────────────────────────────────────

const Projects = () => {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: false });

  return (
    <section
      id="projects"
      className="section-padding bg-slate-50 dark:bg-[#0d1424] border-t border-slate-100 dark:border-white/5"
    >
      <div className="container-max">
        {/* ─── Header ─── */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
          animate={headerInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ type: "spring", stiffness: 80, damping: 18 }}
          className="text-center mb-16"
        >
          <p className="text-cyan-500 dark:text-cyan-400 font-semibold text-sm uppercase tracking-widest mb-3">
            What I've built
          </p>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle mt-2">
            Production-grade applications demonstrating real-world engineering.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-teal-400 mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* ─── Cards Grid ─── */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* ─── View More GitHub CTA ─── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/avnit07"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex"
          >
            <FaGithub size={16} />
            View All on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
