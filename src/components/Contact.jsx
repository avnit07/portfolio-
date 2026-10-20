import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import emailjs from "@emailjs/browser";
import { FaGithub, FaLinkedin, FaEnvelope, FaPaperPlane, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { HiCheckCircle, HiExclamationCircle, HiClipboardCopy, HiCheck, HiClock } from "react-icons/hi";
import personal from "../data/personal";

const EMAILJS_SERVICE_ID = "service_x8u3mxt";
const EMAILJS_TEMPLATE_ID = "template_yl65lod";
const EMAILJS_PUBLIC_KEY = "oO6Y1oB-XznyXdE4O";

const socials = [
  { icon: FaGithub, label: "GitHub", href: personal.github },
  { icon: FaLinkedin, label: "LinkedIn", href: personal.linkedin },
  { icon: FaEnvelope, label: "Email", href: `mailto:${personal.email}` },
];

const Field = ({ label, id, type = "text", rows, value, onChange, placeholder, required }) => (
  <div className="flex flex-col gap-1.5 text-left">
    <label htmlFor={id} className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
      {label}
    </label>
    {rows ? (
      <textarea
        id={id}
        name={id}
        rows={rows}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-3 rounded-xl text-xs sm:text-sm bg-white dark:bg-white/[0.04] border border-slate-300/80 dark:border-white/[0.08] text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 resize-none transition-all"
      />
    ) : (
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-white dark:bg-white/[0.04] border border-slate-300/80 dark:border-white/[0.08] text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
      />
    )}
  </div>
);

const Contact = () => {
  const formRef = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-40px" });

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(personal.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      );
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-padding bg-[#f8fafc] dark:bg-[#070b14] border-t border-slate-200/80 dark:border-white/[0.06]"
    >
      <div className="container-max">
        {/* ─── Header ─── */}
        <div className="text-center mb-12">
          <span className="text-cyan-600 dark:text-cyan-400 font-semibold text-xs uppercase tracking-widest px-3.5 py-1 rounded-full bg-cyan-500/10 dark:bg-cyan-400/10 border border-cyan-500/20 dark:border-cyan-400/20 inline-block mb-3">
            Get In Touch
          </span>
          <h2 className="section-title">Let's Connect & Work Together</h2>
          <p className="section-subtitle mt-2">
            Interested in discussing full-time software engineering roles or technical projects? Drop a direct message!
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* ─── Left Column: Direct Contact Info Cards ─── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-5 space-y-4"
          >
            {/* Email Card */}
            <div className="glass-card p-4 sm:p-5 flex items-center justify-between gap-4 border border-slate-200/90 dark:border-white/[0.08]">
              <div className="flex items-center gap-3.5">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                  <FaEnvelope size={18} />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Email Address</p>
                  <a href={`mailto:${personal.email}`} className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                    {personal.email}
                  </a>
                </div>
              </div>
              <button
                onClick={handleCopyEmail}
                className="p-2 rounded-lg bg-slate-100 dark:bg-white/[0.05] text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors cursor-pointer"
                title="Copy Email"
              >
                {copiedEmail ? <HiCheck size={16} className="text-emerald-500" /> : <HiClipboardCopy size={16} />}
              </button>
            </div>

            {/* Phone Card */}
            <div className="glass-card p-4 sm:p-5 flex items-center justify-between gap-4 border border-slate-200/90 dark:border-white/[0.08]">
              <div className="flex items-center gap-3.5">
                <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
                  <FaPhoneAlt size={16} />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Phone / WhatsApp</p>
                  <a href={`tel:${personal.phone}`} className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                    +91 {personal.phone}
                  </a>
                </div>
              </div>
              <button
                onClick={handleCopyPhone}
                className="p-2 rounded-lg bg-slate-100 dark:bg-white/[0.05] text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors cursor-pointer"
                title="Copy Phone"
              >
                {copiedPhone ? <HiCheck size={16} className="text-emerald-500" /> : <HiClipboardCopy size={16} />}
              </button>
            </div>

            {/* Location Card */}
            <div className="glass-card p-4 sm:p-5 flex items-center gap-3.5 border border-slate-200/90 dark:border-white/[0.08]">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <FaMapMarkerAlt size={18} />
              </div>
              <div>
                <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Location</p>
                <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">{personal.location}</p>
              </div>
            </div>

            {/* Quick Expectation Callout */}
            <div className="p-4 rounded-xl bg-cyan-500/[0.05] dark:bg-cyan-500/[0.08] border border-cyan-500/20 flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300">
              <HiClock size={16} className="text-cyan-600 dark:text-cyan-400 flex-shrink-0" />
              <span>Prompt Response: Guaranteed reply within 24 hours.</span>
            </div>

            {/* Social Channels */}
            <div className="glass-card p-5 text-left border border-slate-200/90 dark:border-white/[0.08]">
              <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3">
                Social Profiles
              </p>
              <div className="flex gap-2.5">
                {socials.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] flex items-center justify-center gap-2 text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-500/40 transition-all font-semibold text-xs"
                  >
                    <Icon size={15} />
                    <span>{label}</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ─── Right Column: Contact Form ─── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="lg:col-span-7"
          >
            <form ref={formRef} onSubmit={handleSubmit} className="glass-card p-6 sm:p-7 space-y-4 border border-slate-200/90 dark:border-white/[0.08]">
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white text-left">
                Send a Direct Message
              </h3>

              <div className="grid sm:grid-cols-2 gap-4">
                <Field
                  label="Your Name"
                  id="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Recruiters / Engineering Manager"
                  required
                />
                <Field
                  label="Email Address"
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="name@company.com"
                  required
                />
              </div>

              <Field
                label="Your Message"
                id="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder="Hi Avnit, we would love to connect with you regarding full-time Software Engineer opportunities..."
                required
              />

              {status === "success" && (
                <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3 text-left">
                  <HiCheckCircle size={18} className="text-emerald-500 flex-shrink-0" />
                  <span>Message sent successfully! I'll reply within 24 hours.</span>
                </div>
              )}
              {status === "error" && (
                <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-rose-600 dark:text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-xl px-4 py-3 text-left">
                  <HiExclamationCircle size={18} className="flex-shrink-0" />
                  <span>Message failed to send. Please email me directly at {personal.email}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed text-xs sm:text-sm font-bold py-3"
              >
                {status === "sending" ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    <span>Sending Message...</span>
                  </>
                ) : (
                  <>
                    <FaPaperPlane size={13} />
                    <span>Send Message Now</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

