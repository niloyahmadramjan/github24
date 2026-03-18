"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { LogIn, Github, Bell, BarChart2 } from "lucide-react";

const STEPS = [
  {
    number: "01",
    icon: LogIn,
    title: "Sign Up & Authenticate",
    description:
      "Create your free account in seconds — no credit card required. Authenticate securely with your email or GitHub OAuth.",
    accent: "bg-violet-600",
    soft: "bg-violet-50",
    border: "border-violet-100",
    text: "text-violet-600",
  },
  {
    number: "02",
    icon: Github,
    title: "Connect Your GitHub",
    description:
      "Install our GitHub App with one click. Select specific repos or monitor your entire account — total control in your hands.",
    accent: "bg-blue-600",
    soft: "bg-blue-50",
    border: "border-blue-100",
    text: "text-blue-600",
  },
  {
    number: "03",
    icon: Bell,
    title: "Link Telegram",
    description:
      "Connect your Telegram account and start receiving real-time push alerts for every star, fork, issue, PR and release.",
    accent: "bg-emerald-600",
    soft: "bg-emerald-50",
    border: "border-emerald-100",
    text: "text-emerald-600",
  },
  {
    number: "04",
    icon: BarChart2,
    title: "Analyze & Engage",
    description:
      "Open your dashboard and dive into rich analytics. Track trends, contact contributors, and make smarter decisions.",
    accent: "bg-orange-500",
    soft: "bg-orange-50",
    border: "border-orange-100",
    text: "text-orange-600",
  },
];

export default function HowItWorks() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section id="how-it-works" className="py-20 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 28 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          className="text-center mb-20"
        >
          {/* <span className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-violet-600 bg-violet-50 border border-violet-100 px-3 py-1 rounded-full mb-4">
            How It Works
          </span> */}
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0f172a] tracking-tight leading-tight mb-4">
            Up and running in{" "}
            <span className="bg-[#3b82f6] bg-clip-text text-transparent">
              minutes
            </span>
          </h2>
          <p className="text-[#475569] text-lg max-w-xl mx-auto">
            Four simple steps to turn your GitHub activity into real-time intelligence.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, i) => {
            const ref = useRef(null);
            const inView = useInView(ref, { once: true, margin: "-60px" });
            const Icon = step.icon;

            return (
              <motion.div
                key={i}
                ref={ref}
                initial={{ opacity: 0, y: 32 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative bg-white rounded-2xl border border-[#e5e7eb] p-7 hover:border-[#d1d5db] hover:shadow-lg transition-all duration-300 group"
              >
                {/* Number */}
                <div className="absolute top-5 right-5">
                  <span className="text-xs font-black text-[#e5e7eb] tracking-tight">{step.number}</span>
                </div>

                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl ${step.soft} ${step.border} border flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-5 h-5 ${step.text}`} />
                </div>

                {/* Connector dot */}
                <div className={`absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full ${step.accent} flex items-center justify-center shadow-md lg:hidden`}>
                  <span className="w-2 h-2 rounded-full bg-white" />
                </div>

                <h3 className="text-[#0f172a] font-bold text-base mb-2 leading-snug">{step.title}</h3>
                <p className="text-[#475569] text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={headerInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="mt-14 text-center"
        >
          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-[#e5e7eb] shadow-sm text-sm text-[#475569] font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Average setup time:{" "}
            <span className="text-[#0f172a] font-bold">under 3 minutes</span>
          </span>
        </motion.div>
      </div>
    </section>
  );
}