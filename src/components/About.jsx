import { motion } from "framer-motion";
import { HiAcademicCap, HiLightBulb, HiSparkles, HiLocationMarker } from "react-icons/hi";
import { useInView } from "framer-motion";
import { useRef } from "react";
import personal from "../data/personal";

// ─── Reusable animated section wrapper ─────────────────────────────────────

const FadeInSection = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

// ─── Info Card ──────────────────────────────────────────────────────────────

const InfoCard = ({ icon: Icon, label, value, delay }) => (
  <FadeInSection delay={delay}>
    <div className="glass-card p-4 flex items-start gap-3 hover-glow">
      <div className="mt-0.5 p-2 rounded-lg bg-cyan-400/10 text-cyan-400">
        <Icon size={18} />
      </div>
      <div>
        <p className="text-xs font-medium text-slate-500 dark:text-slate-500 uppercase tracking-wider">
          {label}
        </p>
        <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-0.5">{value}</p>
      </div>
    </div>
  </FadeInSection>
);

// ─── Component ──────────────────────────────────────────────────────────────

const About = () => {
  return (
    <section
      id="about"
      className="section-padding bg-slate-50 dark:bg-[#0d1424] border-t border-slate-100 dark:border-white/5"
    >
      <div className="container-max">
        {/* ─── Section Header ─── */}
        <FadeInSection>
          <div className="text-center mb-16">
            <p className="text-cyan-500 dark:text-cyan-400 font-semibold text-sm uppercase tracking-widest mb-3">
              Get to know me
            </p>
            <h2 className="section-title">About Me</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-teal-400 mx-auto mt-4 rounded-full" />
          </div>
        </FadeInSection>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* ─── Left: Bio ─── */}
          <div className="space-y-6">
            <FadeInSection delay={0.1}>
              <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
                {personal.bio}
              </p>
            </FadeInSection>

            <FadeInSection delay={0.2}>
              <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
                {personal.seeking}
              </p>
            </FadeInSection>

            {/* ─── Currently Learning ─── */}
            <FadeInSection delay={0.3}>
              <div className="glass-card p-5">
                <div className="flex items-center gap-2 mb-4">
                  <HiLightBulb className="text-cyan-400" size={20} />
                  <h3 className="font-semibold text-slate-800 dark:text-white text-sm uppercase tracking-wider">
                    Currently Exploring
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {personal.currentlyLearning.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1.5 text-xs font-medium rounded-lg bg-cyan-400/10 text-cyan-500 dark:text-cyan-400 border border-cyan-400/20"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </FadeInSection>
          </div>

          {/* ─── Right: Info Cards ─── */}
          <div className="grid sm:grid-cols-2 gap-4">
            <InfoCard
              icon={HiAcademicCap}
              label="Degree"
              value={personal.degree}
              delay={0.15}
            />
            <InfoCard
              icon={HiSparkles}
              label="University"
              value="UTU (VMSBUTU)"
              delay={0.2}
            />
            <InfoCard
              icon={HiAcademicCap}
              label="Graduating"
              value={personal.graduationYear}
              delay={0.25}
            />
            <InfoCard
              icon={HiLocationMarker}
              label="Location"
              value={personal.location}
              delay={0.3}
            />

            {/* ─── Availability Card (spanning 2 cols) ─── */}
            <FadeInSection delay={0.35}>
              <div className="sm:col-span-2 glass-card p-5 border border-emerald-400/20 bg-gradient-to-r from-emerald-400/5 to-teal-400/5">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-emerald-500 dark:text-emerald-400 uppercase tracking-wider">
                      Available for
                    </p>
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200 mt-0.5">
                      Full-time MERN Stack Developer roles · Off-campus 2025–26
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
