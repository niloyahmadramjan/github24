"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  XCircle,
  Loader2,
  ArrowRight,
  Mail,
  RefreshCw,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { verifyEmail } from "@/hooks/useAuth";

/* ──────────────────────────────────────────────────────────
   TYPES
────────────────────────────────────────────────────────── */
type Status = "loading" | "success" | "error" | "no-token";

/* ──────────────────────────────────────────────────────────
   STATE CONFIGS
────────────────────────────────────────────────────────── */
const STATE_CONFIG: Record<
  Status,
  {
    icon: React.ElementType;
    iconBg: string;
    iconBorder: string;
    iconColor: string;
    title: string;
    description: string;
    ringColor: string;
  }
> = {
  loading: {
    icon: Loader2,
    iconBg: "bg-violet-50",
    iconBorder: "border-violet-200",
    iconColor: "text-violet-600",
    title: "Verifying your email…",
    description: "Please wait while we confirm your email address.",
    ringColor: "ring-violet-100",
  },
  success: {
    icon: CheckCircle2,
    iconBg: "bg-emerald-50",
    iconBorder: "border-emerald-200",
    iconColor: "text-emerald-600",
    title: "Email verified!",
    description:
      "Your email has been verified successfully. You can now sign in to your Github24 account.",
    ringColor: "ring-emerald-100",
  },
  error: {
    icon: XCircle,
    iconBg: "bg-rose-50",
    iconBorder: "border-rose-200",
    iconColor: "text-rose-600",
    title: "Verification failed",
    description:
      "We couldn't verify your email. The link may have expired or already been used.",
    ringColor: "ring-rose-100",
  },
  "no-token": {
    icon: Mail,
    iconBg: "bg-amber-50",
    iconBorder: "border-amber-200",
    iconColor: "text-amber-600",
    title: "No token found",
    description:
      "This link is invalid or incomplete. Please use the verification link from your email.",
    ringColor: "ring-amber-100",
  },
};

/* ──────────────────────────────────────────────────────────
   PAGE
────────────────────────────────────────────────────────── */
export default function VerifyEmailPage() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const t = searchParams.get("token");
    setToken(t);
  }, []);

  const [status, setStatus] = useState<Status>("loading");
  const [message, setMessage] = useState<string>("");

 useEffect(() => {
  if (!token) {
    setStatus("no-token");
    return;
  }

  const run = async () => {
    try {
      const res = await verifyEmail(token);
      if (res?.success) {
        setStatus("success");
        setMessage("");
      } else {
        setStatus("error");
        setMessage(
          (res as { success: false; error: { message: string } }).error
            ?.message ?? "Email verification failed.",
        );
      }
    } catch (err: unknown) {
      setStatus("error");
      setMessage(
        err instanceof Error
          ? err.message
          : "Something went wrong during verification.",
      );
    }
  };

  run();
}, [token]);

  const cfg = STATE_CONFIG[status];
  const Icon = cfg.icon;

  return (
    <div className="min-h-screen w-full bg-white flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* ── Dot grid background ── */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.25] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#cbd5e1 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* ── Top colour wash ── */}
      <div
        aria-hidden
        className="absolute top-0 inset-x-0 h-80 bg-gradient-to-b from-violet-50/70 to-transparent pointer-events-none"
      />

      {/* ── Bottom colour wash ── */}
      <div
        aria-hidden
        className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-slate-50/50 to-transparent pointer-events-none"
      />

      {/* ── Logo ── */}
      <motion.div
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative z-10 mb-10"
      >
        <Link href="/">
          <Image
            src="/assest/logo/navbar.png"
            width={160}
            height={48}
            alt="Git24 logo"
            priority
          />
        </Link>
      </motion.div>

      {/* ── Card ── */}
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-md bg-white rounded-2xl border border-[#e5e7eb] shadow-[0_8px_48px_-8px_rgba(15,23,42,0.12)] p-8 sm:p-10"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={status}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex flex-col items-center text-center"
          >
            {/* ── Icon ── */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: 0.1,
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`
                relative w-20 h-20 rounded-3xl flex items-center justify-center mb-6
                ${cfg.iconBg} border-2 ${cfg.iconBorder}
                ring-8 ${cfg.ringColor}
              `}
            >
              <Icon
                className={`w-9 h-9 ${cfg.iconColor} ${
                  status === "loading" ? "animate-spin" : ""
                }`}
                strokeWidth={1.8}
              />

              {/* Success pulse ring */}
              {status === "success" && (
                <span className="absolute inset-0 rounded-3xl border-2 border-emerald-400 animate-ping opacity-30" />
              )}
            </motion.div>

            {/* ── Title ── */}
            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.4 }}
              className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] tracking-tight mb-3"
            >
              {cfg.title}
            </motion.h1>

            {/* ── Description ── */}
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24, duration: 0.4 }}
              className="text-[#475569] text-sm sm:text-base leading-relaxed mb-2 max-w-sm"
            >
              {cfg.description}
            </motion.p>

            {/* ── Server error message (if any) ── */}
            {message && status === "error" && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-rose-500 text-xs font-medium px-4 py-2 bg-rose-50 border border-rose-200 rounded-lg mt-1 mb-3"
              >
                {message}
              </motion.p>
            )}

            {/* ── CTAs ── */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32, duration: 0.4 }}
              className="flex flex-col sm:flex-row items-center gap-3 mt-6 w-full"
            >
              {/* Success — go to dashboard */}
              {status === "success" && (
                <>
                  <Link
                    href="/dashboard"
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#0f172a] text-white font-bold text-sm hover:bg-[#1e293b] transition-colors shadow-md"
                  >
                    Go to Dashboard
                    <ArrowRight className="w-4 h-4 flex-shrink-0" />
                  </Link>
                  <Link
                    href="/login"
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-[#e5e7eb] bg-[#f8fafc] text-[#475569] font-semibold text-sm hover:bg-[#f1f5f9] hover:border-[#d1d5db] transition-all duration-150"
                  >
                    Sign In
                  </Link>
                </>
              )}

              {/* Error — try again or resend */}
              {(status === "error" || status === "no-token") && (
                <>
                  <Link
                    href="/register"
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#0f172a] text-white font-bold text-sm hover:bg-[#1e293b] transition-colors shadow-md"
                  >
                    <RefreshCw className="w-4 h-4 flex-shrink-0" />
                    Register Again
                  </Link>
                  <Link
                    href="/login"
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-[#e5e7eb] bg-[#f8fafc] text-[#475569] font-semibold text-sm hover:bg-[#f1f5f9] hover:border-[#d1d5db] transition-all duration-150"
                  >
                    Back to Sign In
                  </Link>
                </>
              )}

              {/* Loading — no CTAs */}
              {status === "loading" && (
                <p className="text-xs text-[#94a3b8] font-medium">
                  This usually takes just a moment…
                </p>
              )}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* ── Step indicator strip ── */}
      {status !== "loading" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="relative z-10 mt-8 flex items-center gap-2"
        >
          {[
            { label: "Sign Up", done: true },
            { label: "Verify Email", done: status === "success" },
            { label: "Dashboard", done: false },
          ].map((step, i, arr) => (
            <div key={step.label} className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black flex-shrink-0 ${
                    step.done
                      ? "bg-emerald-500 text-white"
                      : "bg-[#f1f5f9] border border-[#e5e7eb] text-[#94a3b8]"
                  }`}
                >
                  {step.done ? <CheckCircle2 className="w-3 h-3" /> : i + 1}
                </div>
                <span
                  className={`text-xs font-semibold hidden sm:inline ${
                    step.done ? "text-[#475569]" : "text-[#94a3b8]"
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {i < arr.length - 1 && (
                <div className="w-6 sm:w-10 h-px bg-[#e5e7eb]" />
              )}
            </div>
          ))}
        </motion.div>
      )}

      {/* ── Footer ── */}
      <p className="relative z-10 text-center text-xs text-[#94a3b8] mt-8">
        © {new Date().getFullYear()} Github24 · Powered by{" "}
        <a
          href="https://drakilo.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-violet-500 hover:text-violet-600 font-semibold transition-colors"
        >
          Drakilo Team
        </a>
      </p>
    </div>
  );
}
