"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Bell,
  BarChart2,
  GitFork,
  Users,
  Zap,
  Shield,
  GitPullRequest,
  Star,
  MessageCircle,
  RefreshCw,
  Filter,
  Layout,
} from "lucide-react";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const MAIN_FEATURES = [
  {
    icon: Bell,
    title: "Instant Telegram Alerts",
    description:
      "Get push notifications delivered to your Telegram in under 3 seconds — for every star, fork, issue, PR, and release across all your monitored repos.",
    soft: "bg-blue-50",
    border: "border-blue-100",
    text: "text-blue-600",
    tag: "Core",
    tagColor: "bg-blue-50 text-blue-600 border-blue-100",
    preview: (
      <div className="mt-5 space-y-2">
        {[
          { emoji: "⭐", msg: "torvalds starred linux", time: "just now", dot: "bg-blue-400" },
          { emoji: "🍴", msg: "gvanrossum forked cpython", time: "4s ago", dot: "bg-indigo-400" },
          { emoji: "🔔", msg: "3 new issues on awesome", time: "12s ago", dot: "bg-sky-400" },
        ].map((n, i) => (
          <div key={i} className="flex items-center gap-2.5 bg-white rounded-lg border border-[#e5e7eb] px-3 py-2">
            <span className="text-sm">{n.emoji}</span>
            <span className="text-xs text-[#475569] flex-1 truncate font-medium">{n.msg}</span>
            <span className="text-[10px] text-[#94a3b8]">{n.time}</span>
            <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${n.dot}`} />
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: BarChart2,
    title: "Analytics Dashboard",
    description:
      "Visualize your repo growth with rich charts. Track stars over time, fork velocity, issue resolution rates, and contributor trends — all in one place.",
    soft: "bg-violet-50",
    border: "border-violet-100",
    text: "text-violet-600",
    tag: "Insights",
    tagColor: "bg-violet-50 text-violet-600 border-violet-100",
    preview: (
      <div className="mt-5">
        <div className="bg-white rounded-xl border border-[#e5e7eb] p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-[#0f172a]">Star Growth</span>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">+34% ↑</span>
          </div>
          {/* Mini bar chart */}
          <div className="flex items-end gap-1 h-16">
            {[30, 45, 38, 60, 52, 75, 68, 90, 82, 100, 88, 110].map((h, i) => (
              <div key={i} className="flex-1 rounded-t-sm" style={{
                height: `${h}%`,
                background: i >= 9
                  ? "linear-gradient(to top, #7f6aff, #8b5cf6)"
                  : "#f1f5f9",
              }} />
            ))}
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-[10px] text-[#94a3b8]">Jan</span>
            <span className="text-[10px] text-[#94a3b8]">Dec</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    icon: Users,
    title: "Contributor Engagement",
    description:
      "See exactly who starred, forked, or filed an issue. Browse contributor profiles and reach out directly — turn passive observers into active community members.",
    soft: "bg-emerald-50",
    border: "border-emerald-100",
    text: "text-emerald-600",
    tag: "Community",
    tagColor: "bg-emerald-50 text-emerald-600 border-emerald-100",
    preview: (
      <div className="mt-5 space-y-2">
        {[
          { name: "torvalds", action: "Starred",     avatar: "T",  color: "bg-amber-100 text-amber-700" },
          { name: "gvanrossum", action: "Forked",    avatar: "G",  color: "bg-blue-100 text-blue-700" },
          { name: "sindresorhus", action: "Opened issue", avatar: "S", color: "bg-rose-100 text-rose-700" },
        ].map((u, i) => (
          <div key={i} className="flex items-center gap-3 bg-white rounded-lg border border-[#e5e7eb] px-3 py-2">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 ${u.color}`}>
              {u.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-[#0f172a] truncate">@{u.name}</p>
              <p className="text-[10px] text-[#94a3b8]">{u.action}</p>
            </div>
            <button className="text-[10px] font-bold text-violet-600 bg-violet-50 border border-violet-100 px-2 py-0.5 rounded-md hover:bg-violet-100 transition-colors">
              Reach out
            </button>
          </div>
        ))}
      </div>
    ),
  },
];

const SECONDARY_FEATURES = [
  {
    icon: Zap,
    title: "Sub-3s Delivery",
    description: "Edge infrastructure globally distributed. Alerts reach you before the GitHub page even refreshes.",
    soft: "bg-amber-50", border: "border-amber-100", text: "text-amber-600",
  },
  {
    icon: Filter,
    title: "Smart Filtering",
    description: "Choose exactly which events trigger a notification per repo. Zero noise, all signal.",
    soft: "bg-sky-50", border: "border-sky-100", text: "text-sky-600",
  },
  {
    icon: GitPullRequest,
    title: "PR Tracking",
    description: "Monitor pull request lifecycle — opened, reviewed, merged, or closed — with full context.",
    soft: "bg-indigo-50", border: "border-indigo-100", text: "text-indigo-600",
  },
  {
    icon: Star,
    title: "Star History",
    description: "See when your repo went viral. Replay the exact timeline of every star event with timestamps.",
    soft: "bg-orange-50", border: "border-orange-100", text: "text-orange-600",
  },
  {
    icon: RefreshCw,
    title: "Auto-Sync",
    description: "New repos added to your GitHub account are detected and offered for monitoring automatically.",
    soft: "bg-teal-50", border: "border-teal-100", text: "text-teal-600",
  },
  {
    icon: Shield,
    title: "Secure by Design",
    description: "Official GitHub OAuth, read-only scopes, end-to-end encrypted data. Revoke access any time.",
    soft: "bg-rose-50", border: "border-rose-100", text: "text-rose-600",
  },
  {
    icon: MessageCircle,
    title: "Telegram Bot",
    description: "A dedicated Telegram bot per workspace. Interact, mute repos, or run quick queries from chat.",
    soft: "bg-cyan-50", border: "border-cyan-100", text: "text-cyan-600",
  },
  {
    icon: Layout,
    title: "Multi-Repo View",
    description: "Unified dashboard across all repos. Switch views, compare growth, and spot outliers instantly.",
    soft: "bg-fuchsia-50", border: "border-fuchsia-100", text: "text-fuchsia-600",
  },
  {
    icon: GitFork,
    title: "Fork Analytics",
    description: "Track which forks go active. See downstream contributors building on your work.",
    soft: "bg-lime-50", border: "border-lime-100", text: "text-lime-700",
  },
];

/* ─────────────────────────────────────────────
   MAIN FEATURE CARD (large, with preview)
───────────────────────────────────────────── */
function MainFeatureCard({
  feature,
  index,
}: {
  feature: (typeof MAIN_FEATURES)[0];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const Icon = feature.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.12, ease: "easeOut" }}
      className="bg-white rounded-2xl border border-[#e5e7eb] p-7 hover:border-[#d1d5db] hover:shadow-[0_8px_30px_-6px_rgba(15,23,42,0.1)] transition-all duration-300 group flex flex-col"
    >
      {/* Top row */}
      <div className="flex items-start justify-between mb-4">
        <div className={`w-11 h-11 rounded-xl ${feature.soft} ${feature.border} border flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
          <Icon className={`w-5 h-5 ${feature.text}`} />
        </div>
        <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${feature.tagColor}`}>
          {feature.tag}
        </span>
      </div>

      <h3 className="text-[#0f172a] font-bold text-lg leading-snug mb-2">
        {feature.title}
      </h3>
      <p className="text-[#475569] text-sm leading-relaxed">
        {feature.description}
      </p>

      {/* Inline preview */}
      {feature.preview}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   SECONDARY FEATURE CARD (small)
───────────────────────────────────────────── */
function SecondaryFeatureCard({
  feature,
  index,
}: {
  feature: (typeof SECONDARY_FEATURES)[0];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const Icon = feature.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07, ease: "easeOut" }}
      className="bg-[#f8fafc] rounded-xl border border-[#e5e7eb] p-5 hover:bg-white hover:border-[#d1d5db] hover:shadow-md transition-all duration-250 group"
    >
      <div className={`w-9 h-9 rounded-lg ${feature.soft} ${feature.border} border flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-250`}>
        <Icon className={`w-4 h-4 ${feature.text}`} />
      </div>
      <h4 className="text-[#0f172a] font-bold text-sm mb-1.5">{feature.title}</h4>
      <p className="text-[#94a3b8] text-xs leading-relaxed">{feature.description}</p>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   SECTION
───────────────────────────────────────────── */
export default function Features() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* ── Section header ── */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 28 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          className="text-center mb-20"
        >
          {/* <span className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-violet-600 bg-violet-50 border border-violet-100 px-3 py-1 rounded-full mb-4">
            Features
          </span> */}
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0f172a] tracking-tight leading-tight mb-4">
            Everything you need to{" "}
            <span className="bg-[#3b82f6] bg-clip-text text-transparent">
              scale
            </span>
          </h2>
          <p className="text-[#475569] text-lg max-w-xl mx-auto leading-relaxed">
            Powerful tools designed to give you full visibility into your GitHub
            activity — in real time, without the noise.
          </p>
        </motion.div>

        {/* ── 3 main feature cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {MAIN_FEATURES.map((f, i) => (
            <MainFeatureCard key={i} feature={f} index={i} />
          ))}
        </div>

        {/* ── 9 secondary feature cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SECONDARY_FEATURES.map((f, i) => (
            <SecondaryFeatureCard key={i} feature={f} index={i} />
          ))}
        </div>

        {/* ── Bottom CTA strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 rounded-2xl bg-[#f8fafc] border border-[#e5e7eb] px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div>
            <p className="text-[#0f172a] font-bold text-lg leading-snug mb-1">
              All features available on the free plan.
            </p>
            <p className="text-[#475569] text-sm">
              No credit card required. Upgrade only when you need more repos or advanced analytics.
            </p>
          </div>
          <motion.a
            href="/signup"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0f172a] text-white font-bold text-sm shadow-md hover:bg-[#1e293b] transition-colors duration-200"
          >
            Get Started Free →
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
}