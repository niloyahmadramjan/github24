"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Send, Github, MessageCircle, Mail, ExternalLink,
} from "lucide-react";
import Link from "next/link";

/* ─────────────────────────────────────────────
   CONTACT SECTION
───────────────────────────────────────────── */
export default function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  }

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* ── Left col ── */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            {/* <span className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-violet-600 bg-violet-50 border border-violet-100 px-3 py-1 rounded-full mb-5">
              Contact
            </span> */}
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#0f172a] tracking-tight leading-tight mb-4">
              Got questions?
              <br />
              <span className="bg-[#3b82f6] bg-clip-text text-transparent">
                We're here for you.
              </span>
            </h2>
            <p className="text-[#475569] text-lg leading-relaxed mb-10">
              Have a question, idea, or need help setting up? Send us a message and
              we'll respond within 24 hours.
            </p>

            {/* Quick links */}
            <div className="space-y-3">
              {[
                {
                  icon: Github,
                  label: "GitHub Issues",
                  sub: "Open a bug report or feature request",
                  href: "#",
                },
                {
                  icon: MessageCircle,
                  label: "Telegram Community",
                  sub: "Join our developer community chat",
                  href: "#",
                },
                {
                  icon: Mail,
                  label: "Email Us",
                  sub: "hello@github24.dev",
                  href: "mailto:hello@github24.dev",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-4 p-4 rounded-xl border border-[#e5e7eb] bg-[#f8fafc] hover:border-violet-200 hover:bg-violet-50 hover:shadow-sm transition-all duration-200 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-white border border-[#e5e7eb] flex items-center justify-center flex-shrink-0 group-hover:border-violet-200 transition-colors">
                      <Icon className="w-5 h-5 text-[#475569] group-hover:text-violet-600 transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[#0f172a] font-semibold text-sm">{item.label}</p>
                      <p className="text-[#94a3b8] text-xs mt-0.5">{item.sub}</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-[#d1d5db] group-hover:text-violet-400 transition-colors" />
                  </Link>
                );
              })}
            </div>
          </motion.div>

          {/* ── Right col — form ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.12 }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-[#f8fafc] rounded-2xl border border-[#e5e7eb] p-8 space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-[#475569] uppercase tracking-wider mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#e5e7eb] text-[#0f172a] text-sm placeholder-[#94a3b8] focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#475569] uppercase tracking-wider mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#e5e7eb] text-[#0f172a] text-sm placeholder-[#94a3b8] focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#475569] uppercase tracking-wider mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="What's it about?"
                  className="w-full px-4 py-3 rounded-xl bg-white border border-[#e5e7eb] text-[#0f172a] text-sm placeholder-[#94a3b8] focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#475569] uppercase tracking-wider mb-2">
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us what's on your mind..."
                  className="w-full px-4 py-3 rounded-xl bg-white border border-[#e5e7eb] text-[#0f172a] text-sm placeholder-[#94a3b8] focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all resize-none"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 ${
                  sent
                    ? "bg-emerald-600 text-white"
                    : "bg-[#0f172a] text-white hover:bg-[#1e293b] shadow-md"
                }`}
              >
                {sent ? (
                  "Message Sent ✓"
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </motion.button>

              <p className="text-center text-[#94a3b8] text-xs">
                By sending, you agree to our{" "}
                <Link href="/privacy" className="text-[#475569] hover:text-[#0f172a] underline underline-offset-2">
                  Privacy Policy
                </Link>
                . We respond within 24 hours.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}