import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  HiAcademicCap,
  HiLightBulb,
  HiSparkles,
  HiLocationMarker,
  HiCheck,
  HiClipboardCopy,
  HiUserGroup,
  HiBadgeCheck,
} from "react-icons/hi";
import personal from "../data/personal";

const FadeInSection = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

const InfoCard = ({ icon: Icon, label, value, delay }) => (
  <FadeInSection delay={delay}>
    <div className="glass-card p-4 sm:p-5 flex items-start gap-3.5 border border-slate-200/90 dark:border-white/[0.08] hover:border-cyan-500/40 transition-all">
      <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex-shrink-0">
        <Icon size={18} />
      </div>
      <div>
        <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          {label}
        </p>
        <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 mt-0.5">{value}</p>
      </div>
    </div>
  </FadeInSection>
);

const About = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section
      id="about"
      className="section-padding bg-white dark:bg-[#060913] border-t border-slate-200/80 dark:border-white/[0.06] relative"
    >
      <div className="container-max space-y-12">
        {/* ─── Header ─── */}
        <FadeInSection>
          <div className="text-center">
            <span className="text-cyan-600 dark:text-cyan-400 font-semibold text-xs uppercase tracking-widest px-3.5 py-1 rounded-full bg-cyan-500/10 dark:bg-cyan-400/10 border border-cyan-500/20 dark:border-cyan-400/20 inline-block mb-3">
              Background & Education
            </span>
            <h2 className="section-title">About Me</h2>
            <p className="section-subtitle mt-2">
              B.Tech Computer Science graduate combining strong computer science fundamentals with live production SaaS experience.
            </p>
            <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 mx-auto mt-4 rounded-full" />
          </div>
        </FadeInSection>

        {/* ─── Bento Grid ─── */}
        <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Left Column: Summary Bio & Core Focus */}
          <div className="lg:col-span-7 space-y-6">
            <FadeInSection delay={0.1}>
              <div className="glass-card p-6 sm:p-7 space-y-4 border border-slate-200/90 dark:border-white/[0.08]">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
                    <HiUserGroup size={20} />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
                      Professional Background
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">B.Tech Computer Science (2022 – 2026)</p>
                  </div>
                </div>

                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {personal.bio}
                </p>

                <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
                  {personal.seeking}
                </p>

                <div className="pt-3 border-t border-slate-200/70 dark:border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
                  <span className="text-xs text-slate-600 dark:text-slate-400">
                    Direct Email: <span className="font-semibold text-slate-900 dark:text-slate-200">{personal.email}</span>
                  </span>

                  <button
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 hover:bg-cyan-500/20 transition-all border border-cyan-500/30 active:scale-95 cursor-pointer"
                  >
                    {copiedEmail ? <HiCheck size={14} className="text-emerald-500" /> : <HiClipboardCopy size={14} />}
                    <span>{copiedEmail ? "Copied!" : "Copy Email"}</span>
                  </button>
                </div>
              </div>
            </FadeInSection>

            {/* Core Technical Focus */}
            <FadeInSection delay={0.15}>
              <div className="glass-card p-6 border border-slate-200/90 dark:border-white/[0.08]">
                <div className="flex items-center gap-2 mb-3.5">
                  <HiLightBulb className="text-amber-500" size={18} />
                  <h3 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider">
                    Core Engineering Priorities
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {personal.currentlyLearning.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-white/[0.04] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/[0.08] flex items-center gap-1.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </FadeInSection>
          </div>

          {/* Right Column: Academic & Availability Cards */}
          <div className="lg:col-span-5 grid sm:grid-cols-2 gap-4">
            <InfoCard
              icon={HiAcademicCap}
              label="Degree"
              value={personal.degree}
              delay={0.12}
            />
            <InfoCard
              icon={HiSparkles}
              label="University"
              value={personal.university}
              delay={0.16}
            />
            <InfoCard
              icon={HiBadgeCheck}
              label="Graduation"
              value={personal.graduationYear}
              delay={0.2}
            />
            <InfoCard
              icon={HiLocationMarker}
              label="Location"
              value={personal.location}
              delay={0.24}
            />

            {/* Role Availability Banner */}
            <FadeInSection delay={0.28}>
              <div className="sm:col-span-2 glass-card p-5 border border-emerald-500/30 bg-emerald-500/[0.05] dark:bg-emerald-500/[0.08]">
                <div className="flex items-start gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest">
                      Role Availability
                    </p>
                    <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-100 mt-0.5 leading-snug">
                      Open to full-time Full-Stack, Frontend, or Backend Software Engineer roles.
                    </p>
                  </div>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

