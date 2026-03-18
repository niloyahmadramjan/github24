"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Play,
  Star,
  GitFork,
  AlertCircle,
  GitPullRequest,
  GitMerge,
  Tag,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

/* ─────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────── */
const STATS = [
  { value: "1.3K+",  label: "Active Users"   },
  { value: "10k+", label: "Events Tracked" },
  { value: "99.9%", label: "Uptime"         },
  { value: "4.9/5", label: "Star Rating"    },
];

const STAT_CARDS = [
  { label: "Total Stars", value: "48,291", delta: "+23% this week",  up: true  },
  { label: "Forks",       value: "12,847", delta: "+18% this week",  up: true  },
  { label: "Open Issues", value: "143",    delta: "12 closed today", up: false },
  { label: "PRs Merged",  value: "2,104",  delta: "Auto-tracked",    up: true  },
];

const BAR_HEIGHTS = [22, 35, 28, 48, 42, 55, 50, 72, 66, 88, 80, 100];

const EVENT_POOL = [
  { icon: Star,           label: "New Star",      user: "torvalds",     repo: "linux",   color: "bg-amber-50 border-amber-200",   dot: "bg-amber-400",   text: "text-amber-600"   },
  { icon: GitFork,        label: "Forked",         user: "gvanrossum",   repo: "cpython", color: "bg-blue-50 border-blue-200",     dot: "bg-blue-400",    text: "text-blue-600"    },
  { icon: AlertCircle,    label: "Issue Opened",   user: "sindresorhus", repo: "awesome", color: "bg-rose-50 border-rose-200",     dot: "bg-rose-400",    text: "text-rose-600"    },
  { icon: GitPullRequest, label: "PR Opened",      user: "yyx990803",    repo: "vue",     color: "bg-violet-50 border-violet-200", dot: "bg-violet-400",  text: "text-violet-600"  },
  { icon: GitMerge,       label: "PR Merged",      user: "tj",           repo: "express", color: "bg-emerald-50 border-emerald-200",dot: "bg-emerald-400",text: "text-emerald-600" },
  { icon: Tag,            label: "Release v2.4.1", user: "facebook",     repo: "react",   color: "bg-sky-50 border-sky-200",       dot: "bg-sky-400",     text: "text-sky-600"     },
  { icon: Star,           label: "New Star",       user: "antirez",      repo: "redis",   color: "bg-amber-50 border-amber-200",   dot: "bg-amber-400",   text: "text-amber-600"   },
  { icon: AlertCircle,    label: "Issue Closed",   user: "nicolo-ribaudo",repo: "babel",  color: "bg-teal-50 border-teal-200",     dot: "bg-teal-400",    text: "text-teal-600"    },
  { icon: GitFork,        label: "Forked",         user: "denoland",     repo: "deno",    color: "bg-blue-50 border-blue-200",     dot: "bg-blue-400",    text: "text-blue-600"    },
  { icon: GitPullRequest, label: "PR Merged",      user: "vercel",       repo: "next.js", color: "bg-violet-50 border-violet-200", dot: "bg-violet-400",  text: "text-violet-600"  },
];

/* ─────────────────────────────────────────────
   LIVE FEED — auto-cycles top item every 2.2s
───────────────────────────────────────────── */
const VISIBLE_ROWS = 4;

function LiveFeed() {
  const [items, setItems] = useState(EVENT_POOL.slice(0, VISIBLE_ROWS));
  const [cursor, setCursor] = useState(VISIBLE_ROWS);

  useEffect(() => {
    const id = setInterval(() => {
      setItems((prev) => {
        const next = EVENT_POOL[cursor % EVENT_POOL.length];
        return [next, ...prev.slice(0, VISIBLE_ROWS - 1)];
      });
      setCursor((c) => c + 1);
    }, 2200);
    return () => clearInterval(id);
  }, [cursor]);

  return (
    <div className="bg-white rounded-xl border border-[#e5e7eb] p-4 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 flex-shrink-0">
        <span className="text-xs font-bold text-[#0f172a]">Live Activity Feed</span>
        <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Live
        </span>
      </div>

      {/* Rows */}
      <div className="space-y-1.5 flex-1 overflow-hidden">
        <AnimatePresence initial={false} mode="popLayout">
          {items.map((e, i) => {
            const Icon = e.icon;
            return (
              <motion.div
                key={`${e.user}-${e.repo}-${e.label}-${i}`}
                layout
                initial={{ opacity: 0, y: -20, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.32, ease: "easeOut" }}
                className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg border ${e.color}`}
              >
                <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 ${e.color}`}>
                  <Icon className={`w-3 h-3 ${e.text}`} />
                </div>
                <div className="flex-1 min-w-0 flex items-baseline gap-1">
                  <span className={`text-[10px] font-bold whitespace-nowrap ${e.text}`}>
                    {e.label}
                  </span>
                  <span className="text-[10px] text-[#94a3b8] font-mono truncate">
                    {e.user}/{e.repo}
                  </span>
                </div>
                <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${e.dot}`} />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MOCK DASHBOARD
───────────────────────────────────────────── */
function MockDashboard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 44 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.95, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full"
    >
      {/* Ambient glow */}
      <div className="absolute -inset-6 rounded-3xl bg-gradient-to-b from-violet-100/50 via-blue-50/30 to-transparent blur-3xl pointer-events-none" />

      {/* ── Browser shell ── */}
      <div className="relative rounded-2xl border border-[#e5e7eb] shadow-[0_28px_72px_-14px_rgba(15,23,42,0.15)] overflow-hidden bg-white">

        {/* Title bar */}
        <div className="flex items-center gap-3 px-5 py-3 bg-[#f8fafc] border-b border-[#e5e7eb]">
          <div className="flex gap-1.5 flex-shrink-0">
            <span className="w-3 h-3 rounded-full bg-rose-400" />
            <span className="w-3 h-3 rounded-full bg-amber-400" />
            <span className="w-3 h-3 rounded-full bg-emerald-400" />
          </div>
          <div className="flex-1 flex justify-center min-w-0">
            <div className="bg-white border border-[#e5e7eb] rounded-lg px-4 py-1 text-xs text-[#94a3b8] font-medium w-full max-w-[280px] text-center truncate">
              github24.dev/dashboard
            </div>
          </div>
          <div className="hidden sm:flex gap-2 flex-shrink-0">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-4 h-4 rounded bg-[#e5e7eb]" />
            ))}
          </div>
        </div>

        {/* Dashboard body */}
        <div className="p-4 sm:p-6 bg-[#f8fafc]">

          {/* Stat cards — 2 cols on mobile, 4 on md+ */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 mb-3 sm:mb-4">
            {STAT_CARDS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.75 + i * 0.07 }}
                className="bg-white rounded-xl border border-[#e5e7eb] p-3 sm:p-4"
              >
                <p className="text-[10px] sm:text-[11px] text-[#94a3b8] font-medium mb-1 leading-tight">{s.label}</p>
                <p className="text-base sm:text-xl font-extrabold text-[#0f172a]">{s.value}</p>
                <p className={`text-[10px] sm:text-[11px] font-semibold mt-0.5 ${s.up ? "text-emerald-600" : "text-[#94a3b8]"}`}>
                  {s.delta}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Chart + Live feed — stacked on mobile, side by side on lg */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">

            {/* Bar chart */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.05 }}
              className="bg-white rounded-xl border border-[#e5e7eb] p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-[#0f172a]">Star Growth</span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">
                  +34% ↑
                </span>
              </div>
              <div className="flex items-end gap-[3px] h-16">
                {BAR_HEIGHTS.map((h, i) => (
                 <motion.div
  key={i}
  className="flex-1 rounded-t-[3px]"
  initial={{ scaleY: 0 }}
  animate={{ scaleY: 1 }}
  transition={{ duration: 0.45, delay: 1.1 + i * 0.04, ease: "easeOut" }}
  style={{
    height: `${h}%`,
    transformOrigin: "bottom",   // merged and correct
    background:
      i >= 9
        ? "linear-gradient(to top, #7f6aff, #8b5cf6)"
        : "#f1f5f9",
  }}
/>
                ))}
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-[10px] text-[#94a3b8]">Jan</span>
                <span className="text-[10px] text-[#94a3b8]">Dec</span>
              </div>
            </motion.div>

            {/* Live feed */}
            <LiveFeed />
          </div>
        </div>
      </div>

      {/* ── Floating badge: Telegram ── */}
      <motion.div
        initial={{ opacity: 0, x: 16, scale: 0.8 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ delay: 1.55, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -right-2 sm:-right-5 top-12 sm:top-16 bg-white rounded-2xl border border-[#e5e7eb] shadow-xl px-3 py-2.5 flex items-center gap-2.5 z-10"
        style={{ minWidth: 168 }}
      >
        <div className="w-8 h-8 rounded-xl bg-[#229ED9] flex items-center justify-center flex-shrink-0 shadow-sm">
          {/* Telegram logo */}
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
          </svg>
        </div>
        <div>
          <p className="text-xs font-bold text-[#0f172a] leading-tight">Telegram Alert</p>
          <p className="text-[10px] text-[#475569] leading-tight mt-0.5">⭐ linux got 47 new stars</p>
        </div>
      </motion.div>

      {/* ── Floating badge: Stars ── */}
      <motion.div
        initial={{ opacity: 0, x: -16, scale: 0.8 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ delay: 1.75, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -left-2 sm:-left-5 bottom-10 bg-white rounded-2xl border border-[#e5e7eb] shadow-xl px-3 py-2.5 flex items-center gap-2.5 z-10"
        style={{ minWidth: 160 }}
      >
        <div className="w-8 h-8 rounded-xl bg-violet-600 flex items-center justify-center flex-shrink-0 shadow-sm">
          <Star className="w-4 h-4 text-white fill-white" />
        </div>
        <div>
          <p className="text-xs font-bold text-[#0f172a] leading-tight">48,291 Stars</p>
          <p className="text-[10px] text-emerald-600 font-semibold leading-tight mt-0.5">+1,204 this month</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   HERO SECTION
───────────────────────────────────────────── */
export default function HeroSection() {
  return (
    <section className="relative w-full bg-white overflow-hidden">

      {/* Full-bleed dot grid */}
      <div
        className="absolute inset-0 opacity-[0.32] pointer-events-none select-none"
        style={{
          backgroundImage: "radial-gradient(#cbd5e1 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Colour wash top */}
      <div className="absolute top-0 inset-x-0 h-[420px] bg-gradient-to-b from-violet-50/80 via-blue-50/30 to-transparent pointer-events-none" />

      {/* ── Main content ── */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-20 sm:pb-28">

        {/* ── TEXT BLOCK — perfectly centred ── */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            {/* <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#e5e7eb] shadow-sm text-sm font-semibold text-[#475569]"> */}
              {/* <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
              Real-time GitHub Monitoring Platform
            </span> */}
          </motion.div>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="text-[2.5rem] sm:text-5xl md:text-6xl lg:text-[4.25rem] font-extrabold text-[#0f172a] leading-[1.07] tracking-tight mb-5 max-w-4xl"
          >
            Real-Time GitHub Monitoring
            <br />
            <span className="text-shadow-black text-[1.5rem] sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold  text-[#0f172a]  ">
            Analyze Everything with AI
            </span>
          </motion.h1>

          {/* Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16 }}
            className="text-[#475569] text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mb-9"
          >
            Connect your GitHub repos and get instant Telegram alerts for every star,
            fork, issue&nbsp;&amp;&nbsp;PR — plus a powerful analytics dashboard to
            track growth and engage contributors.{" "}
            <span className="font-semibold text-[#0f172a]">Free to start, forever.</span>
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full"
          >
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto"
            >
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#0f172a] text-white font-bold text-base shadow-lg hover:bg-[#1e293b] transition-colors duration-200"
              >
                Get Started Free
                <ArrowRight className="w-4 h-4 flex-shrink-0" />
              </Link>
            </motion.div>

            <Link
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 rounded-xl border border-[#e5e7eb] bg-white text-[#0f172a] font-semibold text-base hover:border-[#d1d5db] hover:shadow-sm transition-all duration-200"
            >
              <Play className="w-4 h-4 text-[#475569] flex-shrink-0" />
              See How It Works
            </Link>
          </motion.div>

          {/* Trust line */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.52, duration: 0.6 }}
            className="mt-5 text-sm text-[#94a3b8] font-medium"
          >
            Trusted by{" "}
            <span className="text-[#475569] font-semibold">1.3k+</span> developers
            &nbsp;·&nbsp; No credit card required
          </motion.p>
        </div>

        {/* ── DASHBOARD — full width with generous side padding ── */}
        <div className="w-full px-0 sm:px-2 lg:px-8 xl:px-12">
          <MockDashboard />
        </div>

        {/* ── STATS ROW ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.85 }}
          className="mt-16 sm:mt-20 grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-0 sm:divide-x sm:divide-[#e5e7eb]"
        >
          {STATS.map((s) => (
            <div key={s.label} className="flex flex-col items-center text-center sm:px-6 lg:px-10">
              <p className="text-2xl sm:text-3xl font-extrabold text-[#0f172a]">{s.value}</p>
              <p className="text-xs text-[#94a3b8] font-medium mt-1.5 uppercase tracking-widest">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}