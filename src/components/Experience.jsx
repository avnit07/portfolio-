import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { HiBriefcase, HiCheckCircle, HiCalendar, HiLocationMarker } from "react-icons/hi";
import personal from "../data/personal";

const ExperienceCard = ({ exp, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });
  const isCurrent = exp.period.includes("Present");

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -16 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ type: "spring", stiffness: 75, damping: 18, delay: index * 0.12 }}
      className="relative pl-5 sm:pl-10 pb-8 sm:pb-12 last:pb-2 group"
    >
      {/* ─── Timeline Stem Line ─── */}
      <div className="absolute left-[9px] sm:left-[15px] top-6 bottom-0 w-[2px] bg-slate-200 dark:bg-white/[0.08] group-last:hidden" />

      {/* ─── Timeline Node Beacon ─── */}
      <div className="absolute left-0 sm:left-[4px] top-4 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white dark:bg-[#080c16] border-2 border-cyan-500 flex items-center justify-center shadow-sm">
        {isCurrent ? (
          <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-cyan-500 animate-pulse" />
        ) : (
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-slate-400 dark:bg-slate-500" />
        )}
      </div>

      {/* ─── Content Card ─── */}
      <div className="glass-card p-4 sm:p-6 md:p-7 border border-slate-200/90 dark:border-white/[0.08] hover:border-cyan-500/50 dark:hover:border-cyan-400/50 hover:shadow-xl transition-all duration-300">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5 sm:gap-3 mb-4 sm:mb-5 pb-3 sm:pb-4 border-b border-slate-200/70 dark:border-white/[0.08]">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-base sm:text-xl font-extrabold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                {exp.role}
              </h3>
              <span className="text-[10px] sm:text-[11px] font-semibold px-2 sm:px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/20 uppercase tracking-wide">
                {exp.type}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-1.5 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
              <span className="text-cyan-700 dark:text-cyan-400 font-bold">{exp.company}</span>
              <span className="text-slate-400 dark:text-slate-500 flex items-center gap-1 font-normal text-[11px] sm:text-xs">
                <HiLocationMarker size={13} className="flex-shrink-0" /> {exp.location}
              </span>
            </div>
          </div>

          {/* Date Pill */}
          <div className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/[0.08] text-slate-700 dark:text-slate-300 text-[11px] sm:text-xs font-mono font-medium w-fit">
            <HiCalendar className="text-cyan-500 flex-shrink-0" size={13} />
            <span>{exp.period}</span>
          </div>
        </div>

        {/* Highlights List */}
        <ul className="space-y-2 sm:space-y-2.5 mb-4 sm:mb-5">
          {exp.highlights.map((h, i) => (
            <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              <HiCheckCircle className="text-cyan-500 dark:text-cyan-400 mt-1 flex-shrink-0" size={14} />
              <span>{h}</span>
            </li>
          ))}
        </ul>

        {/* Tech Stack Badges */}
        <div className="flex flex-wrap gap-1 sm:gap-1.5 pt-3 border-t border-slate-200/70 dark:border-white/[0.08]">
          {exp.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2 sm:px-2.5 py-0.5 text-[10px] sm:text-[11px] font-semibold rounded-lg bg-slate-100 dark:bg-white/[0.04] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/[0.08]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Experience = () => {
  return (
    <section
      id="experience"
      className="section-padding bg-white dark:bg-[#070b14] border-t border-slate-200/80 dark:border-white/[0.06] relative overflow-hidden w-full max-w-full"
    >
      <div className="container-max w-full min-w-0">
        {/* ─── Header ─── */}
        <div className="text-center mb-14">
          <span className="text-cyan-600 dark:text-cyan-400 font-semibold text-xs uppercase tracking-widest px-3.5 py-1 rounded-full bg-cyan-500/10 dark:bg-cyan-400/10 border border-cyan-500/20 dark:border-cyan-400/20 inline-flex items-center gap-1.5 mb-3">
            <HiBriefcase size={13} /> Professional Engineering Experience
          </span>
          <h2 className="section-title">Work Experience</h2>
          <p className="section-subtitle mt-2">
            Engineering production SaaS features, telemetry analytics pipelines, and full-stack MERN systems.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* ─── Timeline List ─── */}
        <div className="max-w-3xl mx-auto">
          {personal.experience.map((exp, i) => (
            <ExperienceCard key={exp.id} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;

