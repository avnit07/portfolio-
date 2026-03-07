import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { HiArrowDown, HiDownload } from "react-icons/hi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-scroll";
import personal from "../data/personal";

// ─── Spring config ───────────────────────────────────────────────────────────

const spring = { type: "spring", stiffness: 80, damping: 18, mass: 0.8 };
const springFast = { type: "spring", stiffness: 120, damping: 20, mass: 0.6 };

// ─── Floating Background Blobs (parallax-aware) ──────────────────────────────

const FloatingBlob = ({ className, delay = 0 }) => (
  <motion.div
    className={`absolute rounded-full blur-3xl opacity-20 dark:opacity-15 pointer-events-none ${className}`}
    animate={{ y: [0, -28, 0], scale: [1, 1.07, 1], rotate: [0, 5, 0] }}
    transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay }}
    style={{ willChange: "transform" }}
  />
);

// ─── Animated Text Variants — spring physics ─────────────────────────────────

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 28, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { ...spring },
  },
};

// ─── Component ──────────────────────────────────────────────────────────────

const Hero = () => {
  // Scroll-linked parallax
  const { scrollY } = useScroll();
  const rawY = useTransform(scrollY, [0, 500], [0, -80]);
  const rawOpacity = useTransform(scrollY, [0, 350], [1, 0]);

  // Smooth the parallax values with springs
  const parallaxY = useSpring(rawY, { stiffness: 60, damping: 20, mass: 1 });
  const parallaxOpacity = useSpring(rawOpacity, { stiffness: 60, damping: 20 });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden hero-gradient bg-dot-pattern section-padding pt-24"
    >
      {/* ─── Background blobs ─── */}
      <FloatingBlob className="w-96 h-96 bg-cyan-400 -top-20 -left-20" delay={0} />
      <FloatingBlob className="w-72 h-72 bg-teal-400 bottom-20 right-10" delay={2.5} />
      <FloatingBlob className="w-64 h-64 bg-violet-500 top-1/2 left-1/2 -translate-x-1/2" delay={5} />

      {/* ─── Parallax content wrapper ─── */}
      <motion.div
        className="container-max relative z-10 text-center"
        style={{ y: parallaxY, opacity: parallaxOpacity }}
      >
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center gap-6"
        >
          {/* ─── Eyebrow label ─── */}
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-cyan-400/10 border border-cyan-400/30 text-cyan-500 dark:text-cyan-400 uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Open to full-time MERN Stack roles
            </span>
          </motion.div>

          {/* ─── Name ─── */}
          <motion.h1
            variants={item}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight"
          >
            <span className="text-slate-800 dark:text-white">Hi, I'm </span>
            <span className="gradient-text">Avnit</span>
          </motion.h1>

          {/* ─── Role ─── */}
          <motion.p
            variants={item}
            className="text-xl md:text-2xl font-semibold text-slate-500 dark:text-slate-400"
          >
            {personal.role}
          </motion.p>

          {/* ─── Tagline ─── */}
          <motion.p
            variants={item}
            className="text-base md:text-lg text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed"
          >
            {personal.tagline}
          </motion.p>

          {/* ─── CTA Buttons ─── */}
          <motion.div variants={item} className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-2 w-full px-4 sm:px-0">
            <Link to="projects" smooth={true} offset={-64} duration={700}>
              <motion.button
                className="btn-primary"
                whileTap={{ scale: 0.96 }}
                transition={springFast}
              >
                View My Work
                <HiArrowDown size={16} className="animate-bounce" />
              </motion.button>
            </Link>

            <a href="/avnit_resume_MERN_5march%20(3).pdf" target="_blank" rel="noopener noreferrer">
              <motion.button
                className="btn-secondary"
                whileTap={{ scale: 0.96 }}
                transition={springFast}
              >
                <HiDownload size={16} />
                Download Resume
              </motion.button>
            </a>
          </motion.div>

          {/* ─── Social Icons ─── */}
          <motion.div variants={item} className="flex items-center gap-6 mt-4">
            {[
              { href: personal.github,   Icon: FaGithub,   label: "GitHub" },
              { href: personal.linkedin, Icon: FaLinkedin, label: "LinkedIn" },
            ].map(({ href, Icon, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-slate-400 hover:text-cyan-400 transition-colors duration-200"
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.92 }}
                transition={springFast}
              >
                <Icon size={24} />
              </motion.a>
            ))}
          </motion.div>

          {/* ─── Scroll indicator ─── */}
          <motion.div
            variants={item}
            className="mt-10 flex flex-col items-center gap-1 text-slate-400 dark:text-slate-600"
          >
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            >
              <HiArrowDown size={18} />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
