import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { HiChartBar, HiLightningBolt, HiShieldCheck, HiSparkles } from "react-icons/hi";

const stats = [
  {
    icon: HiChartBar,
    count: "25,000+",
    label: "Daily Telemetry Ingestion",
    detail: "BigQuery · GCS DLQ · 99.9% Durability",
    color: "text-cyan-600 dark:text-cyan-400 bg-cyan-500/10",
  },
  {
    icon: HiLightningBolt,
    count: "<200ms",
    label: "Dashboard P95 Latency",
    detail: "Postgres Cache over BigQuery (was 2.5s)",
    color: "text-amber-600 dark:text-amber-400 bg-amber-500/10",
  },
  {
    icon: HiShieldCheck,
    count: "<15s",
    label: "Automated Canary Rollback",
    detail: "Sliding-Window P99 & 5xx SLA Guardrails",
    color: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10",
  },
  {
    icon: HiSparkles,
    count: "-75%",
    label: "Review Turnaround Cut",
    detail: "Google Gemini Pre-Flight Policy AI",
    color: "text-violet-600 dark:text-violet-400 bg-violet-500/10",
  },
];

const StatCounter = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-40px" });

  return (
    <div ref={ref} className="grid grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5 mt-10 sm:mt-14 w-full">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: idx * 0.08, type: "spring", stiffness: 90 }}
            className="glass-card p-3.5 sm:p-5 flex flex-col items-center text-center group hover:border-cyan-500/40 transition-all duration-300"
          >
            <div className={`p-2 sm:p-2.5 rounded-xl ${stat.color} mb-2.5 sm:mb-3 group-hover:scale-110 transition-transform`}>
              <Icon size={18} className="sm:w-5 sm:h-5" />
            </div>
            <span className="text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {stat.count}
            </span>
            <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mt-1">
              {stat.label}
            </span>
            <span className="text-[10px] sm:text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              {stat.detail}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
};

export default StatCounter;

