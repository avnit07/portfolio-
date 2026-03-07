import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { HiSun, HiMoon, HiMenuAlt3, HiX } from "react-icons/hi";
import { useTheme } from "../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";

// Navigation links for smooth scroll
const navLinks = [
  { label: "About", to: "about" },
  { label: "Skills", to: "skills" },
  { label: "Projects", to: "projects" },
  { label: "Contact", to: "contact" },
];

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Add shadow + blur on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 navbar-glass ${
        scrolled ? "shadow-lg shadow-cyan-500/5" : ""
      }`}
    >
      <div className="container-max flex items-center justify-between h-16 px-6 md:px-12 lg:px-24">
        {/* ─── Logo / Name ─── */}
        <Link
          to="hero"
          smooth={true}
          duration={500}
          className="cursor-pointer"
        >
          <span className="text-xl font-bold gradient-text tracking-tight">
            &lt;Avnit /&gt;
          </span>
        </Link>

        {/* ─── Desktop Nav Links ─── */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              smooth={true}
              offset={-64}
              duration={500}
              spy={true}
              activeClass="text-cyan-400"
              className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors duration-200 cursor-pointer relative group"
            >
              {link.label}
              {/* Underline on hover */}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-teal-400 group-hover:w-full transition-all duration-300" />
            </Link>
          ))}

          {/* ─── Theme Toggle ─── */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-white/10 transition-all duration-200"
          >
            {isDark ? <HiSun size={20} /> : <HiMoon size={20} />}
          </button>

          {/* ─── Resume CTA ─── */}
          <a
            href="/avnit_resume_MERN_5march%20(3).pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-xs px-4 py-2"
          >
            Resume
          </a>
        </div>

        {/* ─── Mobile: Theme + Hamburger ─── */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-cyan-400 transition-colors"
          >
            {isDark ? <HiSun size={20} /> : <HiMoon size={20} />}
          </button>
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-cyan-400 transition-colors"
          >
            {menuOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
          </button>
        </div>
      </div>

      {/* ─── Mobile Dropdown Menu ─── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden navbar-glass border-t border-white/10"
          >
            <div className="flex flex-col items-center gap-4 py-6 px-6">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  smooth={true}
                  offset={-64}
                  duration={500}
                  onClick={() => setMenuOpen(false)}
                  className="text-base font-medium text-slate-700 dark:text-slate-300 hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="/avnit_resume_MERN_5march%20(3).pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="btn-primary text-sm"
              >
                Download Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
