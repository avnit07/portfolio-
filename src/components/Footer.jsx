import { FaGithub, FaLinkedin, FaHeart, FaEnvelope } from "react-icons/fa";
import { Link } from "react-scroll";
import personal from "../data/personal";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-100/80 dark:bg-[#050810] border-t border-slate-200/80 dark:border-white/[0.06] py-8 sm:py-12">
      <div className="container-max px-4 sm:px-8 md:px-12 lg:px-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6 pb-6 sm:pb-8 border-b border-slate-200/80 dark:border-white/[0.08]">
          {/* Brand */}
          <div className="text-center md:text-left">
            <span className="text-base sm:text-lg font-extrabold gradient-text tracking-tight">
              &lt;Avnit.dev /&gt;
            </span>
            <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm">
              Full-Stack Software Engineer building high-concurrency SaaS features, telemetry pipelines, and scalable web apps.
            </p>
          </div>

          {/* Quick Nav */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-5 text-xs font-semibold text-slate-600 dark:text-slate-300">
            {["hero", "about", "experience", "projects", "skills", "contact"].map((section) => (
              <Link
                key={section}
                to={section}
                smooth={true}
                offset={-80}
                duration={500}
                className="capitalize hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors cursor-pointer"
              >
                {section}
              </Link>
            ))}
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-2.5">
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-2.5 rounded-xl bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
            >
              <FaGithub size={16} />
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-2.5 rounded-xl bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
            >
              <FaLinkedin size={16} />
            </a>
            <a
              href={`mailto:${personal.email}`}
              aria-label="Email"
              className="p-2.5 rounded-xl bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
            >
              <FaEnvelope size={16} />
            </a>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400 font-medium">
          <p className="flex items-center gap-1.5">
            Designed & Built with <FaHeart className="text-rose-500" size={11} /> by{" "}
            <span className="font-bold text-slate-800 dark:text-slate-200">{personal.name}</span>
          </p>
          <p>© {year} Avnit Singh. Engineered for production.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

