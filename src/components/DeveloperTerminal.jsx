import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiCheck, HiClipboard, HiTerminal, HiCode, HiSparkles } from "react-icons/hi";

const tabs = [
  { id: "canary", label: "canary-proxy.ts", shortLabel: "canary.ts", icon: HiCode },
  { id: "telemetry", label: "telemetry-dlq.ts", shortLabel: "dlq.ts", icon: HiSparkles },
  { id: "terminal", label: "terminal.sh", shortLabel: "term.sh", icon: HiTerminal },
];

const DeveloperTerminal = () => {
  const [activeTab, setActiveTab] = useState("canary");
  const [copied, setCopied] = useState(false);

  const canaryCode = `// Canary verification reverse proxy with automated SLA rollbacks
import { Queue } from "bullmq";
import { metricsSlidingWindow } from "@/lib/metrics";

export async function routeCanaryTraffic(req: Request, stage: number) {
  const weights: Record<number, number> = { 1: 0.05, 2: 0.25, 3: 0.50, 4: 1.00 };
  const isCanary = Math.random() < (weights[stage] ?? 0.05);

  const target = isCanary ? process.env.CANARY_HOST : process.env.BASELINE_HOST;
  const { status, p99 } = await metricsSlidingWindow.evaluate(60);

  // Automated SLA rollback: restores baseline in <15s if P99 spikes
  if (status === "SLA_BREACH") {
    await rollbackQueue.add("TRIGGER_ROLLBACK", { stage, p99 });
    return forwardTraffic(req, process.env.BASELINE_HOST);
  }

  return forwardTraffic(req, target);
}`;

  const telemetryCode = `// High-durability BigQuery telemetry pipeline with GCS Dead Letter Queue
import { BigQuery } from "@google-cloud/bigquery";
import { Storage } from "@google-cloud/storage";

export async function ingestTelemetryBatch(events: TelemetryPayload[]) {
  try {
    // Streaming batch insert (25,000+ daily events)
    await bigquery.dataset("analytics").table("events").insert(events);
  } catch (err: any) {
    // GCS DLQ failover: guarantees 99.9% durability with cron replay
    const backupFile = storage.bucket("telemetry-dlq").file(\`dlq-\${Date.now()}.json\`);
    await backupFile.save(JSON.stringify({ events, error: err.message }));
    console.warn(\`[DLQ] Spilled \${events.length} events to GCS for cron replay\`);
  }
}`;

  const terminalOutput = [
    { type: "command", text: "$ canaryguard verify --stage 1 --target canary.prod.internal" },
    { type: "success", text: "✔ Traffic Weight: 5% | Baseline: 95% (blast radius <5%)" },
    { type: "info", text: "  • Sliding Window: 60s | P99 Latency: 142ms (SLA threshold <250ms)" },
    { type: "info", text: "  • 5xx Error Rate: 0.00% | Auto-Rollback armed (<15s SLA)" },
    { type: "command", text: "$ bigquery-telemetry status" },
    { type: "success", text: "✔ Ingestion: 25,000+ daily events | Durability: 99.9% via GCS DLQ" },
    { type: "info", text: "  • PostgreSQL caching layer P95: 184ms (reduced from 2.5s)" },
    { type: "command", text: "$ git status" },
    { type: "info", text: "On branch main. All systems operational." },
  ];

  const handleCopy = () => {
    const textToCopy =
      activeTab === "canary"
        ? canaryCode
        : activeTab === "telemetry"
        ? telemetryCode
        : terminalOutput.map((l) => l.text).join("\n");

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="terminal-card text-left max-w-full w-full mx-auto border border-slate-300 dark:border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl">
      {/* ─── Window Controls & Tabs Bar ─── */}
      <div className="terminal-header bg-[#080d19] border-b border-slate-800 dark:border-white/[0.08] px-2.5 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
          <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-rose-500/80 inline-block" />
          <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-500/80 inline-block" />
          <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500/80 inline-block" />
          <span className="ml-2 text-[11px] font-mono text-slate-400 hidden md:inline">
            workbench — avnit@code-garage
          </span>
        </div>

        {/* ─── IDE File Tabs ─── */}
        <div className="flex items-center gap-1 bg-[#101726] p-0.5 sm:p-1 rounded-lg border border-slate-800 overflow-x-auto no-scrollbar max-w-[200px] xs:max-w-none">
          {tabs.map((t) => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 rounded-md text-[10px] sm:text-[11px] font-mono transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? "bg-cyan-500/20 text-cyan-400 font-semibold border border-cyan-400/30"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                }`}
              >
                <Icon size={12} className="flex-shrink-0" />
                <span className="hidden sm:inline">{t.label}</span>
                <span className="sm:hidden">{t.shortLabel}</span>
              </button>
            );
          })}
        </div>

        {/* ─── Copy Button ─── */}
        <button
          onClick={handleCopy}
          aria-label="Copy code snippet"
          className="p-1 sm:p-1.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-white/5 transition-colors text-xs flex items-center gap-1 cursor-pointer flex-shrink-0"
        >
          {copied ? <HiCheck size={14} className="text-emerald-400" /> : <HiClipboard size={14} />}
          <span className="hidden sm:inline text-[11px]">{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>

      {/* ─── Editor Body Content ─── */}
      <div className="p-3 sm:p-5 font-mono text-[11px] sm:text-xs bg-[#060a14] min-h-[260px] sm:min-h-[300px] overflow-x-auto leading-relaxed select-text">
        <AnimatePresence mode="wait">
          {activeTab === "canary" && (
            <motion.div
              key="canary"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15 }}
              className="text-slate-300 flex gap-4"
            >
              <div className="select-none text-slate-600 text-right pr-2 border-r border-slate-800">
                {Array.from({ length: 19 }, (_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>
              <pre className="overflow-x-auto">
                <code>
                  <span className="text-slate-500">// Canary verification reverse proxy with automated SLA rollbacks</span>
                  {"\n"}
                  <span className="text-purple-400">import</span> &#123; <span className="text-yellow-300">Queue</span> &#125; <span className="text-purple-400">from</span> <span className="text-emerald-300">"bullmq"</span>;
                  {"\n"}
                  <span className="text-purple-400">import</span> &#123; <span className="text-yellow-300">metricsSlidingWindow</span> &#125; <span className="text-purple-400">from</span> <span className="text-emerald-300">"@/lib/metrics"</span>;
                  {"\n\n"}
                  <span className="text-purple-400">export async function</span> <span className="text-blue-400">routeCanaryTraffic</span>(req: Request, stage: number) &#123;
                  {"\n"}  <span className="text-purple-400">const</span> weights: Record&#60;number, number&#62; = &#123; <span className="text-amber-400">1</span>: <span className="text-amber-400">0.05</span>, <span className="text-amber-400">2</span>: <span className="text-amber-400">0.25</span>, <span className="text-amber-400">3</span>: <span className="text-amber-400">0.50</span>, <span className="text-amber-400">4</span>: <span className="text-amber-400">1.00</span> &#125;;
                  {"\n"}  <span className="text-purple-400">const</span> isCanary = Math.<span className="text-blue-400">random</span>() &#60; (weights[stage] ?? <span className="text-amber-400">0.05</span>);
                  {"\n\n"}  <span className="text-purple-400">const</span> target = isCanary ? process.env.CANARY_HOST : process.env.BASELINE_HOST;
                  {"\n"}  <span className="text-purple-400">const</span> &#123; status, p99 &#125; = <span className="text-purple-400">await</span> metricsSlidingWindow.<span className="text-blue-400">evaluate</span>(<span className="text-amber-400">60</span>);
                  {"\n\n"}  <span className="text-slate-500">// Automated SLA rollback: restores baseline in &lt;15s if P99 spikes</span>
                  {"\n"}  <span className="text-purple-400">if</span> (status === <span className="text-emerald-300">"SLA_BREACH"</span>) &#123;
                  {"\n"}    <span className="text-purple-400">await</span> rollbackQueue.<span className="text-blue-400">add</span>(<span className="text-emerald-300">"TRIGGER_ROLLBACK"</span>, &#123; stage, p99 &#125;);
                  {"\n"}    <span className="text-purple-400">return</span> <span className="text-blue-400">forwardTraffic</span>(req, process.env.BASELINE_HOST);
                  {"\n"}  &#125;
                  {"\n\n"}  <span className="text-purple-400">return</span> <span className="text-blue-400">forwardTraffic</span>(req, target);
                  {"\n"}&#125;
                </code>
              </pre>
            </motion.div>
          )}

          {activeTab === "telemetry" && (
            <motion.div
              key="telemetry"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15 }}
              className="text-slate-300 flex gap-4"
            >
              <div className="select-none text-slate-600 text-right pr-2 border-r border-slate-800">
                {Array.from({ length: 17 }, (_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>
              <pre className="overflow-x-auto">
                <code>
                  <span className="text-slate-500">// High-durability BigQuery telemetry pipeline with GCS Dead Letter Queue</span>
                  {"\n"}
                  <span className="text-purple-400">import</span> &#123; <span className="text-yellow-300">BigQuery</span> &#125; <span className="text-purple-400">from</span> <span className="text-emerald-300">"@google-cloud/bigquery"</span>;
                  {"\n"}
                  <span className="text-purple-400">import</span> &#123; <span className="text-yellow-300">Storage</span> &#125; <span className="text-purple-400">from</span> <span className="text-emerald-300">"@google-cloud/storage"</span>;
                  {"\n\n"}
                  <span className="text-purple-400">export async function</span> <span className="text-blue-400">ingestTelemetryBatch</span>(events: TelemetryPayload[]) &#123;
                  {"\n"}  <span className="text-purple-400">try</span> &#123;
                  {"\n"}    <span className="text-slate-500">// Streaming batch insert (25,000+ daily events)</span>
                  {"\n"}    <span className="text-purple-400">await</span> bigquery.<span className="text-blue-400">dataset</span>(<span className="text-emerald-300">"analytics"</span>).<span className="text-blue-400">table</span>(<span className="text-emerald-300">"events"</span>).<span className="text-blue-400">insert</span>(events);
                  {"\n"}  &#125; <span className="text-purple-400">catch</span> (err: any) &#123;
                  {"\n"}    <span className="text-slate-500">// GCS DLQ failover: guarantees 99.9% durability with cron replay</span>
                  {"\n"}    <span className="text-purple-400">const</span> backupFile = storage.<span className="text-blue-400">bucket</span>(<span className="text-emerald-300">"telemetry-dlq"</span>).<span className="text-blue-400">file</span>(`dlq-$&#123;Date.now()&#125;.json`);
                  {"\n"}    <span className="text-purple-400">await</span> backupFile.<span className="text-blue-400">save</span>(JSON.<span className="text-blue-400">stringify</span>(&#123; events, error: err.message &#125;));
                  {"\n"}    console.<span className="text-blue-400">warn</span>(`[DLQ] Spilled $&#123;events.length&#125; events to GCS for cron replay`);
                  {"\n"}  &#125;
                  {"\n"}&#125;
                </code>
              </pre>
            </motion.div>
          )}

          {activeTab === "terminal" && (
            <motion.div
              key="terminal"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15 }}
              className="space-y-2 text-xs"
            >
              {terminalOutput.map((item, idx) => (
                <div
                  key={idx}
                  className={
                    item.type === "command"
                      ? "text-cyan-400 font-semibold"
                      : item.type === "success"
                      ? "text-emerald-400"
                      : "text-slate-300 pl-2"
                  }
                >
                  {item.text}
                </div>
              ))}
              <div className="flex items-center gap-1.5 text-cyan-400 pt-3">
                <span>$</span>
                <span className="w-2 h-4 bg-cyan-400 animate-pulse inline-block" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ─── Bottom Status Bar ─── */}
      <div className="bg-[#080d19] border-t border-slate-800 dark:border-white/[0.08] px-3 sm:px-4 py-2 flex items-center justify-between gap-2 text-[10px] sm:text-[11px] text-slate-400">
        <span className="flex items-center gap-1.5 text-emerald-400 font-semibold flex-shrink-0">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Production
        </span>
        <span className="font-mono text-slate-500 truncate text-right">TypeScript · BullMQ · Redis · BigQuery</span>
      </div>
    </div>
  );
};

export default DeveloperTerminal;

