"use client";

import ConnectGithubButton from "@/components/githubinstall/ConnectGithubButton";
/**
 * app/dashboard/repositories/page.tsx
 * Shows the GitHub connect card when not connected,
 * or the list of monitored repos when connected.
 */

import { motion } from "framer-motion";
import {
  Star, GitFork, AlertCircle, GitPullRequest,
  Plus, Filter, MoreVertical, CheckCircle2,
} from "lucide-react";
import { useState } from "react";

/* ──────────────────────────────────────────────────────────
   MOCK DATA — replace with real API call
────────────────────────────────────────────────────────── */
const MOCK_REPOS = [
  { id: 1, name: "linux",   fullName: "torvalds/linux",   stars: "12.4K", forks: "3.2K", issues: 48,  prs: 12, language: "C",          dot: "bg-amber-400",   active: true  },
  { id: 2, name: "cpython", fullName: "gvanrossum/cpython",stars: "8.1K", forks: "1.9K", issues: 22,  prs: 6,  language: "Python",      dot: "bg-blue-400",    active: true  },
  { id: 3, name: "react",   fullName: "facebook/react",   stars: "6.7K",  forks: "1.1K", issues: 31,  prs: 9,  language: "TypeScript",  dot: "bg-sky-400",     active: false },
  { id: 4, name: "vue",     fullName: "yyx990803/vue",    stars: "4.2K",  forks: "890",  issues: 17,  prs: 4,  language: "TypeScript",  dot: "bg-emerald-400", active: true  },
];

/* ──────────────────────────────────────────────────────────
   SIMULATE: set to false to see the empty / connect state
────────────────────────────────────────────────────────── */
const IS_GITHUB_CONNECTED = true;

/* ──────────────────────────────────────────────────────────
   REPO ROW
────────────────────────────────────────────────────────── */
function RepoRow({ repo, index }: { repo: (typeof MOCK_REPOS)[0]; index: number }) {
  const [active, setActive] = useState(repo.active);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      className="flex items-center gap-3 sm:gap-4 p-4 rounded-xl border border-[#e5e7eb] bg-white hover:border-[#d1d5db] hover:shadow-sm transition-all duration-150 group"
    >
      {/* Language dot */}
      <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${repo.dot}`} />

      {/* Name + full name */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-[#0f172a] truncate">{repo.name}</p>
        <p className="text-[11px] text-[#94a3b8] truncate">{repo.fullName} · {repo.language}</p>
      </div>

      {/* Stats — hidden on xs */}
      <div className="hidden sm:flex items-center gap-4 text-xs text-[#94a3b8] flex-shrink-0">
        <span className="flex items-center gap-1"><Star className="w-3 h-3 text-amber-400" />{repo.stars}</span>
        <span className="flex items-center gap-1"><GitFork className="w-3 h-3 text-blue-400" />{repo.forks}</span>
        <span className="flex items-center gap-1"><AlertCircle className="w-3 h-3 text-rose-400" />{repo.issues}</span>
        <span className="flex items-center gap-1"><GitPullRequest className="w-3 h-3 text-violet-400" />{repo.prs}</span>
      </div>

      {/* Monitor toggle */}
      <button
        onClick={() => setActive((v) => !v)}
        className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${
          active
            ? "bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-100"
            : "bg-[#f1f5f9] border border-[#e5e7eb] text-[#94a3b8] hover:bg-[#e2e8f0] hover:text-[#475569]"
        }`}
      >
        {active ? (
          <><CheckCircle2 className="w-3 h-3" />Monitoring</>
        ) : (
          <>Enable</>
        )}
      </button>

      {/* More menu */}
      <button className="w-7 h-7 rounded-lg flex items-center justify-center text-[#94a3b8] hover:text-[#475569] hover:bg-[#f1f5f9] opacity-0 group-hover:opacity-100 transition-all duration-150 flex-shrink-0">
        <MoreVertical className="w-4 h-4" />
      </button>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────
   PAGE
────────────────────────────────────────────────────────── */
export default function RepositoriesPage() {
  const [search, setSearch] = useState("");

  const filtered = MOCK_REPOS.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.fullName.toLowerCase().includes(search.toLowerCase()),
  );

  /* ── NOT CONNECTED → show connect card ── */
  if (!IS_GITHUB_CONNECTED) {
    return (
      <div className="max-w-xl mx-auto pt-8">
        {/* Page header */}
        <div className="mb-8">
          <h2 className="text-xl font-extrabold text-[#0f172a] tracking-tight mb-1">Repositories</h2>
          <p className="text-[#475569] text-sm">Connect GitHub to start monitoring your repos.</p>
        </div>
        {/* Full connect card */}
        <ConnectGithubButton variant="card" />
      </div>
    );
  }

  /* ── CONNECTED → show repo list ── */
  return (
    <div className="space-y-6">

      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h2 className="text-xl font-extrabold text-[#0f172a] tracking-tight mb-1">Repositories</h2>
          <p className="text-[#475569] text-sm">
            {MOCK_REPOS.filter((r) => r.active).length} of {MOCK_REPOS.length} repos actively monitored.
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Reconnect / add more repos */}
          <ConnectGithubButton variant="outline" label="Add Repos" />
        </div>
      </motion.div>

      {/* Search + filter bar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          {/* <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8] pointer-events-none" /> */}
          <input
            type="text"
            placeholder="Search repositories…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#e5e7eb] bg-white text-sm text-[#0f172a] placeholder:text-[#94a3b8] outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition-all"
          />
        </div>
        <button className="w-10 h-10 rounded-xl border border-[#e5e7eb] bg-white flex items-center justify-center text-[#475569] hover:bg-[#f1f5f9] transition-colors flex-shrink-0">
          <Filter className="w-4 h-4" />
        </button>
      </div>

      {/* Repo list */}
      <div className="space-y-2.5">
        {filtered.length > 0 ? (
          filtered.map((repo, i) => (
            <RepoRow key={repo.id} repo={repo} index={i} />
          ))
        ) : (
          <div className="py-12 text-center text-[#94a3b8] text-sm">
            No repositories match &ldquo;{search}&rdquo;
          </div>
        )}
      </div>

      {/* Add more CTA banner */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-violet-50 to-blue-50 border border-violet-100"
      >
        <div>
          <p className="font-bold text-[#0f172a] text-sm mb-1">Missing a repo?</p>
          <p className="text-[#475569] text-xs">
            Click "Add Repos" to re-open the GitHub App and grant access to more repositories.
          </p>
        </div>
        <ConnectGithubButton variant="solid" label="Add More Repos" className="flex-shrink-0" />
      </motion.div>

      
    </div>
  );
}