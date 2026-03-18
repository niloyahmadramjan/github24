"use client";

import { motion } from "framer-motion";
import { Github, MessageCircle, Mail, ArrowRight, GitBranch, Heart, Zap } from "lucide-react";
import Link from "next/link";

const FOOTER_COLS = [
  {
    title: "Product",
    links: [
      { label: "Features",   href: "https://drakilo.com" },
      { label: "Pricing",    href: "https://drakilo.com" },
      { label: "Changelog",  href: "https://drakilo.com" },
      { label: "Roadmap",    href: "https://drakilo.com" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About",    href: "https://drakilo.com" },
      { label: "Blog",     href: "https://drakilo.com" },
      { label: "Careers",  href: "https://drakilo.com" },
      { label: "Contact",  href: "https://drakilo.com" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy",    href: "https://drakilo.com" },
      { label: "Terms of Service",  href: "https://drakilo.com" },
      { label: "Cookie Policy",     href: "https://drakilo.com" },
    ],
  },
];

const SOCIAL = [
  { icon: Github,        href: "https://drakilo.com", label: "GitHub"    },
  { icon: MessageCircle, href: "https://drakilo.com", label: "Telegram"  },
  { icon: Mail,          href: "https://drakilo.com", label: "Email"     },
];

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] text-white">

      {/* ── CTA BANNER ─────────────────────────────────────────── */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16
                        flex flex-col lg:flex-row items-center justify-between gap-8">

          {/* Text */}
          <div className="text-center lg:text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2 leading-snug">
              Start monitoring your repos today.{" "}
              <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                It&apos;s free.
              </span>
            </h3>
            <p className="text-white/50 text-sm sm:text-base">
              Join thousands of developers already using github24.
            </p>
          </div>

          {/* Buttons — stacked on xs, row on sm+ */}
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto flex-shrink-0">
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto"
            >
              <Link
                href="/signup"
                className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-xl bg-white text-[#0f172a] font-bold text-sm hover:bg-[#f1f5f9] transition-colors shadow-lg"
              >
                Get Started Free
                <ArrowRight className="w-4 h-4 flex-shrink-0" />
              </Link>
            </motion.div>

            <Link
              href="/login"
              className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-xl border border-white/20 text-white/80 font-semibold text-sm hover:border-white/40 hover:text-white transition-all duration-200"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>

      {/* ── FOOTER BODY ────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12">

        {/* Grid:
              mobile  → 1 col brand full-width, then 2-col link grid
              md+     → 4 cols in one row
        */}
        <div className="mb-10">

          {/* Brand block — full width on all sizes */}
          <div className="mb-8 md:mb-0 md:hidden">
            <BrandBlock />
          </div>

          {/* 4-col desktop layout */}
          <div className="hidden md:grid md:grid-cols-4 gap-10">
            <BrandBlock />
            {FOOTER_COLS.map((col) => (
              <LinkCol key={col.title} col={col} />
            ))}
          </div>

          {/* 2-col mobile / tablet link grid */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:hidden">
            {FOOTER_COLS.map((col) => (
              <LinkCol key={col.title} col={col} />
            ))}
          </div>
        </div>

        {/* ── BOTTOM BAR ─────────────────────────────────────── */}
        <div className="border-t border-white/10 pt-8
                        flex flex-col sm:flex-row items-center justify-between gap-5">

          {/* Copyright + credits */}
          <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
            <p className="text-white/30 text-xs sm:text-sm">
              © {new Date().getFullYear()} github24. Built with{" "}
              <Heart className="w-3 h-3 inline text-rose-400 fill-rose-400" />{" "}
              by developer{" "}
              <Link
                href="https://drakilo.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white font-semibold underline underline-offset-2 transition-colors"
              >
                Arkan
              </Link>
            </p>

            {/* Divider dot — hidden on xs */}
            <span className="hidden sm:inline text-white/20">·</span>

            {/* Powered by */}
            <p className="text-white/30 text-xs sm:text-sm flex items-center gap-1">
              <Zap className="w-3 h-3 text-violet-400" />
              Powered by{" "}
              <Link
                href="https://drakilo.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-violet-400 hover:text-violet-300 font-bold transition-colors ml-0.5"
              >
                Drakilo Team
              </Link>
            </p>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            {SOCIAL.map(({ icon: Icon, href, label }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/25 flex items-center justify-center text-white/40 hover:text-white transition-all duration-200"
              >
                <Icon className="w-3.5 h-3.5" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ── Sub-components ──────────────────────────────────────── */

function BrandBlock() {
  return (
    <div>
      <Link
        href="https://drakilo.com"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 mb-4 group w-fit"
      >
        <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
          <GitBranch className="w-4 h-4 text-[#0f172a]" strokeWidth={2.5} />
        </div>
        <span className="font-extrabold text-lg tracking-tight">github24</span>
      </Link>
      <p className="text-white/40 text-sm leading-relaxed max-w-[220px]">
        Real-time GitHub monitoring and Telegram alerts for developers who care about their projects.
      </p>
    </div>
  );
}

function LinkCol({ col }: { col: (typeof FOOTER_COLS)[0] }) {
  return (
    <div>
      <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] text-white/30 mb-3 sm:mb-4">
        {col.title}
      </h4>
      <ul className="space-y-2.5 sm:space-y-3">
        {col.links.map(({ label, href }) => (
          <li key={label}>
            <Link
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs sm:text-sm text-white/50 hover:text-white transition-colors duration-200 leading-snug"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}