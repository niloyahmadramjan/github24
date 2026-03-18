"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  GitBranch,
  ArrowRight,
  Menu,
  X,
  Zap,
  GitPullRequest,
  DollarSign,
  HelpCircle,
  Mail,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

/* ─────────────────────────────────────────────
   NAV LINKS — with icons for mobile drawer
───────────────────────────────────────────── */
const NAV_LINKS = [
  { label: "Features",     href: "#features",      icon: Zap          },
  { label: "How It Works", href: "#how-it-works",  icon: GitPullRequest },
  { label: "Pricing",      href: "#pricing",       icon: DollarSign   },
  { label: "FAQ",          href: "#faq",           icon: HelpCircle   },
  { label: "Contact",      href: "#contact",       icon: Mail         },
];

/* ─────────────────────────────────────────────
   ANIMATION VARIANTS
───────────────────────────────────────────── */

// Backdrop overlay fade
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit:    { opacity: 0, transition: { duration: 0.2, delay: 0.1 } },
};

// Drawer slides in from the top
const drawerVariants = {
  hidden:  { opacity: 0, y: -16, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -12,
    scale: 0.98,
    transition: { duration: 0.22, ease: "easeIn" },
  },
};

// Each nav item staggers top → bottom
const itemVariants = {
  hidden:  { opacity: 0, x: -18 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.32, delay: 0.1 + i * 0.07, ease: "easeOut" },
  }),
  exit: (i: number) => ({
    opacity: 0,
    x: -14,
    transition: { duration: 0.18, delay: i * 0.03, ease: "easeIn" },
  }),
};

// CTA buttons at bottom of drawer
const ctaVariants = {
  hidden:  { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, delay: 0.45, ease: "easeOut" },
  },
  exit: { opacity: 0, y: 8, transition: { duration: 0.15 } },
};

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  const shadow = useTransform(
    scrollY,
    [0, 60],
    ["0 0 0 0 transparent", "0 1px 24px 0 rgba(15,23,42,0.08)"]
  );
  const bg = useTransform(
    scrollY,
    [0, 60],
    ["rgba(255,255,255,0)", "rgba(255,255,255,0.97)"]
  );

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* ══════════════════════════════════════
          HEADER BAR
      ══════════════════════════════════════ */}
      <motion.header
        style={{ boxShadow: shadow, backgroundColor: bg }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-transparent"
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

          {/* ── Logo ── */}
          <Link
            href="/"
            onClick={closeMenu}
            className="flex items-center gap-2.5 group flex-shrink-0"
          >
            {/* <div className="w-9 h-9 rounded-xl bg-[#0f172a] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200">
              <GitBranch className="w-[18px] h-[18px] text-white" strokeWidth={2.5} />
            </div>
            <span className="font-extrabold text-lg text-[#0f172a] tracking-tight">
              Git24
            </span> */}
           <Image
      src="/assest/logo/navbar.png"
      width={220}
      height={120}
      alt="Picture of the author"
    />
          </Link>

          {/* ── Desktop centre links ── */}
          <div className="hidden md:flex items-center gap-0.5">
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="px-4 py-2 rounded-lg text-sm font-medium text-[#475569] hover:text-[#0f172a] hover:bg-[#f1f5f9] transition-all duration-150"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* ── Desktop right CTAs ── */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-semibold text-[#475569] hover:text-[#0f172a] transition-colors px-3 py-2"
            >
              Sign In
            </Link>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/signup"
                className="inline-flex items-center gap-1.5 text-sm font-bold px-5 py-2.5 rounded-xl bg-[#0f172a] text-white hover:bg-[#1e293b] transition-colors duration-200 shadow-md"
              >
                Get Started
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>
          </div>

          {/* ── Mobile: Sign In + Hamburger ── */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              href="/login"
              className="text-sm font-semibold text-[#475569] hover:text-[#0f172a] transition-colors px-2 py-1.5"
            >
              Sign In
            </Link>

            <motion.button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              whileTap={{ scale: 0.9 }}
              className="w-9 h-9 rounded-lg flex items-center justify-center bg-[#f1f5f9] hover:bg-[#e2e8f0] border border-[#e5e7eb] transition-colors duration-150"
            >
              <AnimatePresence mode="wait" initial={false}>
                {menuOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -45, opacity: 0 }}
                    animate={{ rotate: 0,   opacity: 1 }}
                    exit={{   rotate:  45, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-4 h-4 text-[#0f172a]" strokeWidth={2.5} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ rotate: 45,  opacity: 0 }}
                    animate={{ rotate: 0,   opacity: 1 }}
                    exit={{   rotate: -45, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-4 h-4 text-[#0f172a]" strokeWidth={2.5} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* ══════════════════════════════════════
          MOBILE MENU
      ══════════════════════════════════════ */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={closeMenu}
              className="fixed inset-0 z-40 bg-[#0f172a]/20 backdrop-blur-sm md:hidden"
            />

            {/* Drawer panel */}
            <motion.div
              key="drawer"
              variants={drawerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-16 left-3 right-3 z-50 md:hidden rounded-2xl bg-white border border-[#e5e7eb] shadow-[0_16px_48px_-8px_rgba(15,23,42,0.18)] overflow-hidden"
            >
              {/* Nav links */}
              <div className="p-3">
                {NAV_LINKS.map(({ label, href, icon: Icon }, i) => (
                  <motion.div
                    key={label}
                    custom={i}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <Link
                      href={href}
                      onClick={closeMenu}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#475569] hover:text-[#0f172a] hover:bg-[#f8fafc] active:bg-[#f1f5f9] transition-all duration-150 group"
                    >
                      {/* Icon bubble */}
                      <div className="w-8 h-8 rounded-lg bg-[#f1f5f9] group-hover:bg-[#e2e8f0] flex items-center justify-center flex-shrink-0 transition-colors duration-150">
                        <Icon className="w-4 h-4 text-[#475569] group-hover:text-[#0f172a]" strokeWidth={1.8} />
                      </div>
                      <span className="font-semibold text-sm">{label}</span>
                      {/* Chevron */}
                      <ArrowRight className="w-3.5 h-3.5 ml-auto opacity-0 group-hover:opacity-100 text-[#94a3b8] group-hover:translate-x-0.5 transition-all duration-150" />
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Divider */}
              <motion.div
                custom={NAV_LINKS.length}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="mx-4 h-px bg-[#f1f5f9]"
              />

              {/* CTA buttons */}
              <motion.div
                variants={ctaVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="p-3 flex flex-col gap-2"
              >
                {/* Sign In */}
                <Link
                  href="/login"
                  onClick={closeMenu}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl border border-[#e5e7eb] bg-[#f8fafc] text-[#0f172a] font-semibold text-sm hover:bg-[#f1f5f9] active:bg-[#e2e8f0] transition-colors duration-150"
                >
                  Sign In
                </Link>

                {/* Get Started */}
                <motion.div whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/signup"
                    onClick={closeMenu}
                    className="flex items-center justify-center gap-2 py-3 rounded-xl bg-[#0f172a] text-white font-bold text-sm hover:bg-[#1e293b] active:bg-[#0f172a] transition-colors duration-200 shadow-md"
                  >
                    Get Started Free
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}