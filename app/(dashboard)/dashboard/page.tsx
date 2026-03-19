"use client";

import { motion } from "framer-motion";
import {
  Star, GitFork, AlertCircle, GitPullRequest,
  GitMerge, Tag, TrendingUp, TrendingDown,
  ArrowRight, Plus, Github, Bell, BarChart2,
  Users, Zap, RefreshCw,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import ConnectGithubButton from "@/components/githubinstall/ConnectGithubButton";

/* ──────────────────────────────────────────────────────────
   DATA
────────────────────────────────────────────────────────── */
const STAT_CARDS = [
  {
    label: "Total Stars",
    value: "48,291",
    delta: "+1,204",
    deltaLabel: "this month",
    up: true,
    icon: Star,
    iconBg: "bg-amber-50",
    iconBorder: "border-amber-200",
    iconColor: "text-amber-600",
    href: "/dashboard/stars",
  },
  {
    label: "Total Forks",
    value: "12,847",
    delta: "+341",
    deltaLabel: "this month",
    up: true,
    icon: GitFork,
    iconBg: "bg-blue-50",
    iconBorder: "border-blue-200",
    iconColor: "text-blue-600",
    href: "/dashboard/forks",
  },
  {
    label: "Open Issues",
    value: "143",
    delta: "-12",
    deltaLabel: "since last week",
    up: false,
    icon: AlertCircle,
    iconBg: "bg-rose-50",
    iconBorder: "border-rose-200",
    iconColor: "text-rose-600",
    href: "/dashboard/issues",
  },
  {
    label: "PRs Merged",
    value: "2,104",
    delta: "+89",
    deltaLabel: "this month",
    up: true,
    icon: GitMerge,
    iconBg: "bg-violet-50",
    iconBorder: "border-violet-200",
    iconColor: "text-violet-600",
    href: "/dashboard/pull-requests",
  },
];

const BAR_DATA = [22, 35, 28, 48, 42, 55, 50, 72, 66, 88, 80, 100];
const MONTHS   = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const EVENT_POOL = [
  { icon: Star,           label: "New Star",       user: "torvalds",     repo: "linux",   time: "2s ago",   color: "bg-amber-50 border-amber-200",   dot: "bg-amber-400",   text: "text-amber-600"   },
  { icon: GitFork,        label: "Forked",          user: "gvanrossum",   repo: "cpython", time: "18s ago",  color: "bg-blue-50 border-blue-200",     dot: "bg-blue-400",    text: "text-blue-600"    },
  { icon: AlertCircle,    label: "Issue Opened",    user: "sindresorhus", repo: "awesome", time: "1m ago",   color: "bg-rose-50 border-rose-200",     dot: "bg-rose-400",    text: "text-rose-600"    },
  { icon: GitPullRequest, label: "PR Opened",       user: "yyx990803",    repo: "vue",     time: "3m ago",   color: "bg-violet-50 border-violet-200", dot: "bg-violet-400",  text: "text-violet-600"  },
  { icon: GitMerge,       label: "PR Merged",       user: "tj",           repo: "express", time: "5m ago",   color: "bg-emerald-50 border-emerald-200",dot: "bg-emerald-400",text: "text-emerald-600" },
  { icon: Tag,            label: "Release v2.4.1",  user: "facebook",     repo: "react",   time: "8m ago",   color: "bg-sky-50 border-sky-200",       dot: "bg-sky-400",     text: "text-sky-600"     },
  { icon: Star,           label: "New Star",        user: "antirez",      repo: "redis",   time: "12m ago",  color: "bg-amber-50 border-amber-200",   dot: "bg-amber-400",   text: "text-amber-600"   },
];

const REPOS = [
  { name: "linux",   stars: "12.4K", forks: "3.2K", issues: 48, language: "C",          color: "bg-amber-400"   },
  { name: "cpython", stars: "8.1K",  forks: "1.9K", issues: 22, language: "Python",     color: "bg-blue-400"    },
  { name: "react",   stars: "6.7K",  forks: "1.1K", issues: 31, language: "TypeScript", color: "bg-sky-400"     },
  { name: "vue",     stars: "4.2K",  forks: "890",  issues: 17, language: "TypeScript", color: "bg-emerald-400" },
];

const QUICK_ACTIONS = [
  { label: "Add Repository",     href: "/dashboard/repositories", icon: Plus,    color: "bg-violet-600 text-white"                   },
  { label: "Connect Telegram",   href: "/dashboard/notifications",icon: Bell,    color: "bg-[#229ED9] text-white"                    },
  { label: "View Analytics",     href: "/dashboard/analytics",    icon: BarChart2,color:"bg-[#0f172a] text-white"                    },
  { label: "Browse Contributors",href: "/dashboard/contributors", icon: Users,   color: "bg-emerald-600 text-white"                  },
];

/* ──────────────────────────────────────────────────────────
   LIVE FEED
────────────────────────────────────────────────────────── */
function LiveFeed() {
  const VISIBLE = 5;
  const [items,  setItems]  = useState(EVENT_POOL.slice(0, VISIBLE));
  const [cursor, setCursor] = useState(VISIBLE);

  useEffect(() => {
    const id = setInterval(() => {
      const next = EVENT_POOL[cursor % EVENT_POOL.length];
      setItems((prev) => [next, ...prev.slice(0, VISIBLE - 1)]);
      setCursor((c) => c + 1);
    }, 2400);
    return () => clearInterval(id);
  }, [cursor]);

  return (
    <div className="bg-white rounded-2xl border border-[#e5e7eb] p-5 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <h3 className="font-bold text-[#0f172a] text-sm">Live Activity</h3>
        <span className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Live
        </span>
      </div>
      <div className="space-y-2 flex-1 overflow-hidden">
        {items.map((e, i) => {
          const Icon = e.icon;
          return (
            <motion.div
              key={`${e.user}-${e.repo}-${i}`}
              layout
              initial={{ opacity: 0, y: -14, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-xl border ${e.color}`}
            >
              <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 ${e.color}`}>
                <Icon className={`w-3 h-3 ${e.text}`} />
              </div>
              <div className="flex-1 min-w-0">
                <span className={`text-[11px] font-bold ${e.text}`}>{e.label} </span>
                <span className="text-[11px] text-[#94a3b8] font-mono truncate">{e.user}/{e.repo}</span>
              </div>
              <span className="text-[10px] text-[#94a3b8] flex-shrink-0">{e.time}</span>
              <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${e.dot}`} />
            </motion.div>
          );
        })}
      </div>
      <Link
        href="/dashboard/notifications"
        className="mt-4 flex items-center justify-center gap-1.5 text-xs font-semibold text-violet-600 hover:text-violet-700 transition-colors flex-shrink-0"
      >
        View all notifications <ArrowRight className="w-3 h-3" />
      </Link>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   PAGE
────────────────────────────────────────────────────────── */
export default function DashboardPage() {
  const { user } = useAuth();
  const hour     = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="space-y-6">

      {/* ── Welcome banner ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#0f172a] tracking-tight">
            {greeting}, {user?.name?.split(" ")[0] ?? "there"} 👋
          </h2>
          <p className="text-[#475569] text-sm mt-1">
            Here&apos;s what&apos;s happening across your repositories.
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#e5e7eb] bg-white text-[#475569] text-xs font-semibold hover:bg-[#f8fafc] transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Refresh
          </motion.button>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
           <ConnectGithubButton variant="solid" label="Add Repos" className="flex-shrink-0" />
          </motion.div>
        </div>
      </motion.div>

      {/* ── Stat cards — 2 cols mobile, 4 cols desktop ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {STAT_CARDS.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Link
                href={card.href}
                className="block bg-white rounded-2xl border border-[#e5e7eb] p-4 sm:p-5 hover:border-[#d1d5db] hover:shadow-md transition-all duration-200 group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-9 h-9 rounded-xl ${card.iconBg} ${card.iconBorder} border flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200`}>
                    <Icon className={`w-4 h-4 ${card.iconColor}`} />
                  </div>
                  <div className={`flex items-center gap-1 text-[11px] font-bold ${card.up ? "text-emerald-600" : "text-rose-500"}`}>
                    {card.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {card.delta}
                  </div>
                </div>
                <p className="text-2xl font-extrabold text-[#0f172a] leading-none mb-1">{card.value}</p>
                <p className="text-xs text-[#94a3b8] font-medium">{card.label}</p>
                <p className="text-[10px] text-[#94a3b8] mt-0.5">{card.deltaLabel}</p>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* ── Chart + Live feed — stacked mobile, side by side desktop ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Star growth chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="bg-white rounded-2xl border border-[#e5e7eb] p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-[#0f172a] text-sm">Star Growth</h3>
              <p className="text-[11px] text-[#94a3b8] mt-0.5">Last 12 months</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full">
              <TrendingUp className="w-3 h-3" />
              +34%
            </div>
          </div>

          {/* Bar chart */}
          <div className="flex items-end gap-1.5 h-28 mb-2">
            {BAR_DATA.map((h, i) => (
              <motion.div
                key={i}
                className="flex-1 rounded-t-sm"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.04, ease: "easeOut" }}
                style={{
                  height: `${h}%`,
                  transformOrigin: "bottom", // use transformOrigin instead of originY
                  background: i >= 9
                    ? "linear-gradient(to top, #7f6aff, #8b5cf6)"
                    : "#f1f5f9",
                  borderRadius: "3px 3px 0 0",
                }}
              />
            ))}
          </div>
          <div className="flex justify-between">
            {MONTHS.map((m) => (
              <span key={m} className="text-[9px] sm:text-[10px] text-[#94a3b8] flex-1 text-center">{m}</span>
            ))}
          </div>
        </motion.div>

        {/* Live feed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.42 }}
        >
          <LiveFeed />
        </motion.div>
      </div>

      {/* ── Repos + Quick actions — stacked mobile, side by side desktop ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Top repos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="lg:col-span-2 bg-white rounded-2xl border border-[#e5e7eb] p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-[#0f172a] text-sm">Top Repositories</h3>
            <Link href="/dashboard/repositories" className="text-xs text-violet-600 hover:text-violet-700 font-semibold flex items-center gap-1 transition-colors">
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-2">
            {REPOS.map((repo, i) => (
              <motion.div
                key={repo.name}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.55 + i * 0.07 }}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#f8fafc] border border-transparent hover:border-[#e5e7eb] transition-all duration-150 group"
              >
                {/* Language dot */}
                <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${repo.color}`} />

                {/* Repo name */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-[#0f172a] truncate">{repo.name}</p>
                  <p className="text-[10px] text-[#94a3b8]">{repo.language}</p>
                </div>

                {/* Stats */}
                <div className="hidden sm:flex items-center gap-4 text-xs text-[#94a3b8]">
                  <span className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-amber-400" />
                    {repo.stars}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork className="w-3 h-3 text-blue-400" />
                    {repo.forks}
                  </span>
                  <span className="flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 text-rose-400" />
                    {repo.issues}
                  </span>
                </div>

                <ArrowRight className="w-3.5 h-3.5 text-[#d1d5db] opacity-0 group-hover:opacity-100 flex-shrink-0 transition-opacity" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.56 }}
          className="bg-white rounded-2xl border border-[#e5e7eb] p-5"
        >
          <h3 className="font-bold text-[#0f172a] text-sm mb-4">Quick Actions</h3>
          <div className="space-y-2">
            {QUICK_ACTIONS.map((action, i) => {
              const Icon = action.icon;
              return (
                <motion.div
                  key={action.label}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.07 }}
                >
                  <Link
                    href={action.href}
                    className="flex items-center gap-3 p-3 rounded-xl border border-[#e5e7eb] hover:border-[#d1d5db] hover:shadow-sm transition-all duration-150 group"
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${action.color} group-hover:scale-110 transition-transform duration-150`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-semibold text-[#475569] group-hover:text-[#0f172a] transition-colors flex-1">
                      {action.label}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#d1d5db] group-hover:text-[#94a3b8] flex-shrink-0 transition-colors" />
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Telegram connect CTA */}
          <div className="mt-4 p-3 rounded-xl bg-gradient-to-br from-violet-50 to-blue-50 border border-violet-100">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-3.5 h-3.5 text-violet-600 flex-shrink-0" />
              <p className="text-xs font-bold text-violet-700">Pro tip</p>
            </div>
            <p className="text-[11px] text-[#475569] leading-relaxed mb-2.5">
              Connect Telegram to get instant push alerts for every event.
            </p>
            <Link
              href="/dashboard/notifications"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-violet-600 hover:text-violet-700 transition-colors"
            >
              Connect now <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}