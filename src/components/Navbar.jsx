import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { HiCode, HiDownload, HiMenuAlt3, HiX, HiSun, HiMoon } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const navLinks = [
  { label: "About", to: "about" },
  { label: "Experience", to: "experience" },
  { label: "Projects", to: "projects" },
  { label: "Skills", to: "skills" },
  { label: "Contact", to: "contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-2.5 sm:px-4 pt-2.5 sm:pt-4 transition-all duration-300">
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-5xl mx-auto rounded-full floating-navbar px-3.5 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between transition-all"
      >
        {/* ─── Logo ─── */}
        <Link
          to="hero"
          smooth={true}
          duration={500}
          className="cursor-pointer flex items-center gap-2 group"
        >
          <div className="w-8 h-8 rounded-full bg-cyan-500/10 dark:bg-cyan-400/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
            <HiCode size={18} />
          </div>
          <span className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white tracking-tight group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
            &lt;<span className="gradient-text">Avnit.dev</span> /&gt;
          </span>
        </Link>

        {/* ─── Desktop Links ─── */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              smooth={true}
              offset={-80}
              duration={500}
              spy={true}
              activeClass="!text-cyan-600 dark:!text-cyan-400 font-bold"
              className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors cursor-pointer relative group py-1"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-cyan-500 group-hover:w-full transition-all duration-200" />
            </Link>
          ))}
        </div>

        {/* ─── Right Controls: Theme Toggle & Resume CTA ─── */}
        <div className="hidden md:flex items-center gap-3">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="w-9 h-9 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-white/[0.08] transition-all cursor-pointer"
            title={isDark ? "Light Mode" : "Dark Mode"}
          >
            {isDark ? <HiSun size={19} className="text-amber-400" /> : <HiMoon size={18} />}
          </button>

          {/* Status Badge */}
          <span className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Open for Roles
          </span>

          {/* Resume Download CTA */}
          <a
            href="/Avnit_Singh_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-xs px-4 py-2 rounded-full"
          >
            <HiDownload size={13} />
            <span>Resume</span>
          </a>
        </div>

        {/* ─── Mobile Actions: Theme Toggle + Menu Hamburger ─── */}
        <div className="flex md:hidden items-center gap-1.5">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:text-cyan-500 transition-colors"
          >
            {isDark ? <HiSun size={18} className="text-amber-400" /> : <HiMoon size={18} />}
          </button>

          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            className="p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:text-cyan-500 transition-colors"
          >
            {menuOpen ? <HiX size={22} /> : <HiMenuAlt3 size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* ─── Mobile Menu Dropdown ─── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.18 }}
            className="md:hidden max-w-sm mx-auto mt-2 glass-card p-4 sm:p-5 border border-slate-200/90 dark:border-white/10 text-center space-y-3 shadow-2xl"
          >
            <div className="flex flex-col gap-1.5">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  smooth={true}
                  offset={-80}
                  duration={500}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm font-bold text-slate-700 dark:text-slate-200 hover:text-cyan-500 hover:bg-slate-100 dark:hover:bg-white/5 active:scale-95 transition-all cursor-pointer py-2 px-3 rounded-xl"
                >
                  {link.label}
                </Link>
              ))}

              <a
                href="/Avnit_Singh_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="btn-primary text-xs py-3 w-full text-center justify-center mt-2 rounded-xl"
              >
                Download Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;

