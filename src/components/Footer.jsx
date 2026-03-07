import { FaGithub, FaLinkedin, FaHeart } from "react-icons/fa";
import personal from "../data/personal";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 dark:bg-[#0d1424] border-t border-slate-100 dark:border-white/5">
      <div className="container-max px-6 md:px-12 lg:px-24 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* ─── Brand ─── */}
          <span className="text-lg font-bold gradient-text tracking-tight">
            &lt;Avnit /&gt;
          </span>

          {/* ─── Copyright ─── */}
          <p className="text-sm text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
            Made with <FaHeart className="text-rose-400 animate-pulse" size={12} /> by{" "}
            <span className="font-medium text-slate-600 dark:text-slate-400">{personal.name}</span>{" "}
            © {year}
          </p>

          {/* ─── Social Links ─── */}
          <div className="flex items-center gap-5">
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-slate-400 hover:text-cyan-400 transition-colors"
            >
              <FaGithub size={18} />
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-slate-400 hover:text-cyan-400 transition-colors"
            >
              <FaLinkedin size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
