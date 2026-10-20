import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { HiArrowDown, HiDownload, HiBriefcase } from "react-icons/hi";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { Link } from "react-scroll";
import personal from "../data/personal";
import DeveloperTerminal from "./DeveloperTerminal";
import StatCounter from "./StatCounter";

const spring = { type: "spring", stiffness: 80, damping: 18, mass: 0.8 };
const springFast = { type: "spring", stiffness: 120, damping: 20, mass: 0.6 };

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { ...spring },
  },
};

const Hero = () => {
  const { scrollY } = useScroll();
  const rawY = useTransform(scrollY, [0, 600], [0, -50]);
  const rawOpacity = useTransform(scrollY, [0, 480], [1, 0]);

  const parallaxY = useSpring(rawY, { stiffness: 60, damping: 20, mass: 1 });
  const parallaxOpacity = useSpring(rawOpacity, { stiffness: 60, damping: 20 });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden hero-subtle-glow bg-grid-pattern section-padding pt-28 pb-16"
    >
      <motion.div
        className="container-max relative z-10 w-full"
        style={{ y: parallaxY, opacity: parallaxOpacity }}
      >
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* ─── Left Column: Hero Copy & CTA ─── */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="lg:col-span-7 flex flex-col items-start text-left gap-5"
          >
            {/* Status Pill Badge */}
            <motion.div variants={item}>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 tracking-wide shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Software Engineer Intern @ Code Garage Tech
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={item}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] text-slate-900 dark:text-white"
            >
              Hi, I'm <span className="gradient-text">Avnit Singh</span>
            </motion.h1>

            {/* Subtitle / Role */}
            <motion.div
              variants={item}
              className="text-lg sm:text-2xl font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2"
            >
              <HiBriefcase className="text-cyan-600 dark:text-cyan-400" />
              <span>Full-Stack Software Engineer</span>
            </motion.div>

            {/* Engineering Elevator Pitch */}
            <motion.p
              variants={item}
              className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl font-normal"
            >
              Full-Stack Software Engineer shipping high-volume <strong className="text-slate-900 dark:text-slate-200 font-semibold">BigQuery telemetry pipelines</strong> (25,000+ daily events), event-driven backends with <strong className="text-slate-900 dark:text-slate-200 font-semibold">Redis & BullMQ</strong>, and production SaaS features with <strong className="text-slate-900 dark:text-slate-200 font-semibold">Next.js 15, TypeScript & PostgreSQL</strong>.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={item} className="flex flex-wrap items-center gap-3.5 pt-1 w-full sm:w-auto">
              <Link to="projects" smooth={true} offset={-80} duration={600}>
                <motion.button
                  className="btn-primary"
                  whileTap={{ scale: 0.97 }}
                  transition={springFast}
                >
                  <span>Explore Case Studies</span>
                  <HiArrowDown size={14} className="animate-bounce" />
                </motion.button>
              </Link>

              <a href="/Avnit_Singh_Resume.pdf" target="_blank" rel="noopener noreferrer">
                <motion.button
                  className="btn-secondary"
                  whileTap={{ scale: 0.97 }}
                  transition={springFast}
                >
                  <HiDownload size={14} />
                  <span>Download Resume</span>
                </motion.button>
              </a>
            </motion.div>

            {/* Verified Social Profile Links */}
            <motion.div variants={item} className="flex items-center gap-3 pt-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Connect:
              </span>
              {[
                { href: personal.github, Icon: FaGithub, label: "GitHub Profile" },
                { href: personal.linkedin, Icon: FaLinkedin, label: "LinkedIn Profile" },
                { href: `mailto:${personal.email}`, Icon: FaEnvelope, label: "Direct Email" },
              ].map(({ href, Icon, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2.5 rounded-xl bg-white dark:bg-white/[0.05] border border-slate-200 dark:border-white/[0.08] text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-500/40 transition-all shadow-sm"
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.94 }}
                  transition={springFast}
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* ─── Right Column: Interactive Code Workbench ─── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, type: "spring", stiffness: 75 }}
            className="lg:col-span-5 w-full"
          >
            <DeveloperTerminal />
          </motion.div>
        </div>

        {/* ─── Engineering Statistics Row ─── */}
        <StatCounter />
      </motion.div>
    </section>
  );
};

export default Hero;

