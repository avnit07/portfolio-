import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import emailjs from "@emailjs/browser";
import { FaGithub, FaLinkedin, FaEnvelope, FaPaperPlane } from "react-icons/fa";
import { HiCheckCircle, HiExclamationCircle } from "react-icons/hi";
import personal from "../data/personal";

// ─── EmailJS Config ─────────────────────────────────────────────────────────
// TODO: Replace these with your actual EmailJS credentials
// 1. Sign up free at https://www.emailjs.com/
// 2. Create a service, email template, and get your public key
const EMAILJS_SERVICE_ID = "service_x8u3mxt";
const EMAILJS_TEMPLATE_ID = "template_yl65lod";
const EMAILJS_PUBLIC_KEY = "oO6Y1oB-XznyXdE4O";

// ─── Social Links ───────────────────────────────────────────────────────────

const socials = [
  { icon: FaGithub, label: "GitHub", href: personal.github, color: "hover:text-white hover:bg-slate-800" },
  { icon: FaLinkedin, label: "LinkedIn", href: personal.linkedin, color: "hover:text-white hover:bg-blue-600" },
  { icon: FaEnvelope, label: "Email", href: `mailto:${personal.email}`, color: "hover:text-white hover:bg-cyan-500" },
];

// ─── Input / Textarea Field ─────────────────────────────────────────────────

const Field = ({ label, id, type = "text", rows, value, onChange, placeholder, required }) => (
  <div className="flex flex-col gap-1.5">
    <label htmlFor={id} className="text-sm font-medium text-slate-700 dark:text-slate-300">
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
        className="w-full px-4 py-3 rounded-xl text-sm bg-slate-50 dark:bg-dark-600 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 resize-none transition-all"
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
        className="w-full px-4 py-3 rounded-xl text-sm bg-slate-50 dark:bg-dark-600 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 transition-all"
      />
    )}
  </div>
);

// ─── Component ──────────────────────────────────────────────────────────────

const Contact = () => {
  const formRef = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-60px" });

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null); // null | "sending" | "success" | "error"

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

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
      className="section-padding bg-white dark:bg-[#0a0f1e] border-t border-slate-100 dark:border-white/5"
    >
      <div className="container-max">
        {/* ─── Header ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-cyan-500 dark:text-cyan-400 font-semibold text-sm uppercase tracking-widest mb-3">
            Let's connect
          </p>
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle mt-2">
            Whether it's a job opportunity, a project, or just a hello — I'd love to hear from you.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-teal-400 mx-auto mt-4 rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* ─── Left: Info + Socials ─── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: "spring", stiffness: 80, damping: 18, delay: 0.1 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Contact info */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                Reach out directly
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                I'm currently open to <span className="text-cyan-500 font-medium">full-time MERN Stack Developer</span> roles. Hit me up via the form or through any of the channels below.
              </p>
              <a
                href={`mailto:${personal.email}`}
                className="block text-sm font-medium text-cyan-500 dark:text-cyan-400 hover:underline"
              >
                {personal.email}
              </a>
            </div>

            {/* Social links */}
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-500 uppercase tracking-widest mb-4">
                Find me on
              </p>
              <div className="flex gap-3">
                {socials.map(({ icon: Icon, label, href, color }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={`w-11 h-11 flex items-center justify-center rounded-xl glass-card text-slate-500 dark:text-slate-400 ${color} transition-all duration-200`}
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ─── Right: Contact Form ─── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: "spring", stiffness: 80, damping: 18, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <form ref={formRef} onSubmit={handleSubmit} className="glass-card p-5 sm:p-8 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <Field
                  label="Your Name"
                  id="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Avnit Singh"
                  required
                />
                <Field
                  label="Email Address"
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="hello@example.com"
                  required
                />
              </div>

              <Field
                label="Message"
                id="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder="Hey Avnit, I'd love to chat about..."
                required
              />

              {/* ─── Status Messages ─── */}
              {status === "success" && (
                <div className="flex items-center gap-2 text-sm text-emerald-500 bg-emerald-50 dark:bg-emerald-400/10 border border-emerald-200 dark:border-emerald-400/20 rounded-xl px-4 py-3">
                  <HiCheckCircle size={18} />
                  Message sent! I'll get back to you shortly.
                </div>
              )}
              {status === "error" && (
                <div className="flex items-center gap-2 text-sm text-red-500 bg-red-50 dark:bg-red-400/10 border border-red-200 dark:border-red-400/20 rounded-xl px-4 py-3">
                  <HiExclamationCircle size={18} />
                  Something went wrong. Please email me directly at {personal.email}
                </div>
              )}

              {/* ─── Submit Button ─── */}
              <button
                type="submit"
                disabled={status === "sending"}
                className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "sending" ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <FaPaperPlane size={14} />
                    Send Message
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
