"use client";

import { motion } from "framer-motion";
import {
  GitBranch,
  ArrowLeft,
  Home,
  Search,
  GitFork,
  Star,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

/* ─────────────────────────────────────────────
   FLOATING PARTICLES — scattered git events
───────────────────────────────────────────── */
const PARTICLES = [
  {
    icon: Star,
    color: "text-amber-400",
    bg: "bg-amber-50  border-amber-200",
    x: "10%",
    y: "20%",
    delay: 0,
  },
  {
    icon: GitFork,
    color: "text-blue-400",
    bg: "bg-blue-50   border-blue-200",
    x: "80%",
    y: "15%",
    delay: 0.4,
  },
  {
    icon: AlertCircle,
    color: "text-rose-400",
    bg: "bg-rose-50   border-rose-200",
    x: "15%",
    y: "70%",
    delay: 0.8,
  },
  {
    icon: Star,
    color: "text-violet-400",
    bg: "bg-violet-50 border-violet-200",
    x: "85%",
    y: "65%",
    delay: 0.2,
  },
  {
    icon: GitFork,
    color: "text-emerald-400",
    bg: "bg-emerald-50 border-emerald-200",
    x: "70%",
    y: "80%",
    delay: 0.6,
  },
  {
    icon: AlertCircle,
    color: "text-sky-400",
    bg: "bg-sky-50    border-sky-200",
    x: "5%",
    y: "45%",
    delay: 1.0,
  },
];

/* ─────────────────────────────────────────────
   ANIMATED 404 DIGITS
───────────────────────────────────────────── */
function GlitchDigit({ char, delay }: { char: string; delay: number }) {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const run = () => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 140);
    };
    const id = setInterval(run, 2800 + delay * 400);
    const first = setTimeout(run, 600 + delay * 200);
    return () => {
      clearInterval(id);
      clearTimeout(first);
    };
  }, [delay]);

  return (
    <motion.span
      initial={{ opacity: 0, y: 40, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.7,
        delay: 0.2 + delay * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`relative inline-block font-extrabold select-none transition-all duration-75 ${
        glitch ? "translate-x-[3px] text-violet-400" : "text-[#0f172a]"
      }`}
      style={{
        fontSize: "clamp(7rem, 20vw, 11rem)",
        lineHeight: 1,
        letterSpacing: "-0.04em",
      }}
    >
      {/* Glitch shadow layers */}
      {glitch && (
        <>
          <span
            className="absolute inset-0 text-rose-400 pointer-events-none"
            style={{ transform: "translate(-4px, 2px)", opacity: 0.6 }}
            aria-hidden
          >
            {char}
          </span>
          <span
            className="absolute inset-0 text-cyan-400 pointer-events-none"
            style={{ transform: "translate(4px, -2px)", opacity: 0.5 }}
            aria-hidden
          >
            {char}
          </span>
        </>
      )}
      {char}
    </motion.span>
  );
}

/* ─────────────────────────────────────────────
   QUICK LINKS
───────────────────────────────────────────── */
const QUICK_LINKS = [
  { label: "Go Home", href: "/", icon: Home, primary: true },
  {
    label: "Go Back",
    href: "javascript:history.back()",
    icon: ArrowLeft,
    primary: false,
  },
  { label: "Search Docs", href: "/docs", icon: Search, primary: false },
];

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
export default function NotFound() {
  return (
    <div className="relative min-h-screen w-full bg-white overflow-hidden flex flex-col">
      {/* ── Dot grid ── */}
      <div
        className="absolute inset-0 opacity-[0.32] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#cbd5e1 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* ── Colour wash ── */}
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-violet-50/70 via-blue-50/20 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-slate-50/60 to-transparent pointer-events-none" />

      {/* ── Floating particles ── */}
      {PARTICLES.map(({ icon: Icon, color, bg, x, y, delay }, i) => (
        <motion.div
          key={i}
          className={`absolute hidden sm:flex w-10 h-10 rounded-xl border items-center justify-center ${bg}`}
          style={{ left: x, top: y }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: [0, 1, 1, 0.8, 1],
            scale: 1,
            y: [0, -10, 0, -6, 0],
          }}
          transition={{
            opacity: { delay, duration: 0.5 },
            scale: { delay, duration: 0.5 },
            y: {
              delay: delay + 0.5,
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          <Icon className={`w-4 h-4 ${color}`} strokeWidth={1.8} />
        </motion.div>
      ))}

      {/* ── Navbar ── */}
      <header className="relative z-10 w-full border-b border-[#f1f5f9] bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-[#0f172a] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200">
              <GitBranch
                className="w-[18px] h-[18px] text-white"
                strokeWidth={2.5}
              />
            </div>
            <span className="font-extrabold text-lg text-[#0f172a] tracking-tight">
              Git24
            </span>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-bold px-4 py-2 rounded-xl bg-[#0f172a] text-white hover:bg-[#1e293b] transition-colors shadow-md"
          >
            <Home className="w-3.5 h-3.5" />
            Back to Home
          </Link>
        </div>
      </header>

      {/* ── Main content ── */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-16 text-center">
        {/* 404 digits */}
        <div className="flex items-center justify-center gap-1 sm:gap-2 mb-6 leading-none">
          <GlitchDigit char="4" delay={0} />
          {/* Animated dot between digits */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: [0, 1.3, 1] }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col gap-2 mx-1 sm:mx-2"
          >
            {[0, 1].map((i) => (
              <motion.div
                key={i}
                className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-violet-500"
                animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 1,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>
          <GlitchDigit char="4" delay={1} />
        </div>

        {/* Label above heading */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-5"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-600 text-sm font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
            Page not found
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.68 }}
          className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0f172a] tracking-tight mb-4 max-w-xl"
        >
          Looks like this repo{" "}
          <span className="bg-gradient-to-r from-[#7f6aff] via-[#8b5cf6] to-[#3b82f6] bg-clip-text text-transparent">
            doesn't exist.
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.76 }}
          className="text-[#475569] text-base sm:text-lg leading-relaxed max-w-md mb-10"
        >
          The page you're looking for may have been moved, deleted, or never
          existed. Let's get you back on track.
        </motion.p>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.84 }}
          className="flex flex-col sm:flex-row items-center gap-3 mb-14"
        >
          {QUICK_LINKS.map(({ label, href, icon: Icon, primary }) => (
            <motion.div
              key={label}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Link
                href={href}
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 ${
                  primary
                    ? "bg-[#0f172a] text-white hover:bg-[#1e293b] shadow-lg"
                    : "bg-white border border-[#e5e7eb] text-[#475569] hover:text-[#0f172a] hover:border-[#d1d5db] hover:shadow-sm"
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {label}
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Terminal-style error card */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md rounded-2xl border border-[#e5e7eb] overflow-hidden shadow-[0_8px_32px_-8px_rgba(15,23,42,0.1)]"
        >
          {/* Terminal title bar */}
          <div className="flex items-center gap-2 px-4 py-3 bg-[#f8fafc] border-b border-[#e5e7eb]">
            <span className="w-3 h-3 rounded-full bg-rose-400" />
            <span className="w-3 h-3 rounded-full bg-amber-400" />
            <span className="w-3 h-3 rounded-full bg-emerald-400" />
            <span className="ml-2 text-xs text-[#94a3b8] font-mono">
              bash — git24
            </span>
          </div>

          {/* Terminal body */}
          <div className="bg-[#0f172a] px-5 py-4 font-mono text-xs sm:text-sm text-left space-y-1.5">
            <p className="text-[#94a3b8]">
              <span className="text-emerald-400">git24</span>
              <span className="text-[#475569]"> ~ </span>
              <span className="text-white">GET /this-page</span>
            </p>
            <p className="text-rose-400">Error 404: Resource not found</p>
            <p className="text-[#475569]">
              › The requested path could not be resolved.
            </p>
            <p className="text-[#475569]">
              › Try navigating back to{" "}
              <span className="text-violet-400 underline underline-offset-2 cursor-pointer">
                /home
              </span>
            </p>
            {/* Blinking cursor */}
            <p className="text-[#94a3b8] flex items-center gap-1">
              <span className="text-emerald-400">git24</span>
              <span className="text-[#475569]"> ~ </span>
              <motion.span
                className="inline-block w-2 h-4 bg-white rounded-[1px] ml-0.5"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </p>
          </div>
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="mt-10 text-sm text-[#94a3b8]"
        >
          Still lost?{" "}
          <Link
            href="#contact"
            className="text-[#475569] font-semibold hover:text-violet-600 transition-colors underline underline-offset-2"
          >
            Contact our team
          </Link>{" "}
          and we'll help you find your way.
        </motion.p>
      </main>
    </div>
  );
}
