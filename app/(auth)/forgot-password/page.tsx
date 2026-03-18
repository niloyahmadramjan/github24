"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Mail, ArrowRight, AlertCircle,
  Loader2, CheckCircle2, ArrowLeft, Lock, Eye, EyeOff,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { requestPasswordReset } from "@/hooks/useAuth";

/* ──────────────────────────────────────────────────────────
   FORGOT PASSWORD PAGE
   route: /forgot-password
────────────────────────────────────────────────────────── */
export function ForgotPasswordPage() {
  const [email, setEmail]     = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent]       = useState(false);
  const [errors, setErrors]   = useState<{ email?: string; form?: string }>({});

  function validate() {
    const e: typeof errors = {};
    if (!email)                            e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = "Enter a valid email address";
    setErrors(e);
    return !e.email;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setErrors({});

    const result = await requestPasswordReset({ email });
    setLoading(false);

    if (result.success) {
      setSent(true);
    } else {
      setErrors({ form: result.error.message });
    }
  }

  return (
    <div className="min-h-screen w-full bg-white flex flex-col items-center justify-center px-4 relative overflow-hidden">

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.28] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#cbd5e1 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="absolute top-0 inset-x-0 h-80 bg-gradient-to-b from-violet-50/70 to-transparent pointer-events-none" />

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 mb-10"
      >
        <Link href="/">
          <Image src="/assest/logo/navbar.png" width={160} height={48} alt="Git24 logo" priority />
        </Link>
      </motion.div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-md bg-white rounded-2xl border border-[#e5e7eb] shadow-[0_8px_40px_-8px_rgba(15,23,42,0.12)] p-7 sm:p-9"
      >
        <AnimatePresence mode="wait">
          {sent ? (
            /* ── Success state ── */
            <motion.div
              key="sent"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              </div>
              <h2 className="text-xl font-extrabold text-[#0f172a] mb-2">Check your email</h2>
              <p className="text-[#475569] text-sm leading-relaxed mb-1">
                We sent a password reset link to
              </p>
              <p className="font-bold text-[#0f172a] text-sm mb-6">{email}</p>
              <p className="text-[#94a3b8] text-xs mb-8">
                The link expires in 30 minutes. Check your spam folder if you don't see it.
              </p>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0f172a] text-white font-bold text-sm hover:bg-[#1e293b] transition-colors shadow-md"
              >
                Back to Sign In <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ) : (
            /* ── Form state ── */
            <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center mb-5">
                <Mail className="w-5 h-5 text-violet-600" />
              </div>

              <h1 className="text-2xl font-extrabold text-[#0f172a] tracking-tight mb-2">
                Forgot password?
              </h1>
              <p className="text-[#475569] text-sm leading-relaxed mb-7">
                Enter your email address and we&apos;ll send you a link to reset your password.
              </p>

              {/* Global error */}
              {errors.form && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-5 flex items-start gap-3 px-4 py-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm"
                >
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  {errors.form}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-sm font-semibold text-[#0f172a]">
                    Email address
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94a3b8] pointer-events-none">
                      <Mail className="w-4 h-4" />
                    </span>
                    <input
                      id="email" type="email" placeholder="you@example.com"
                      value={email} onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm text-[#0f172a] placeholder-[#94a3b8]
                        outline-none transition-all duration-200 bg-white
                        ${errors.email
                          ? "border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-100"
                          : "border-[#e5e7eb] focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                        }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-rose-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 flex-shrink-0" />{errors.email}
                    </p>
                  )}
                </div>

                <motion.button
                  type="submit" disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.97 }}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#0f172a] text-white font-bold text-sm
                             hover:bg-[#1e293b] disabled:opacity-60 disabled:cursor-not-allowed
                             transition-all duration-200 shadow-md"
                >
                  {loading
                    ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending link…</>
                    : <>Send Reset Link <ArrowRight className="w-4 h-4" /></>
                  }
                </motion.button>
              </form>

              <div className="mt-6 text-center">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 text-sm text-[#475569] hover:text-[#0f172a] font-semibold transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Footer */}
      <p className="relative z-10 text-center text-xs text-[#94a3b8] mt-8">
        © {new Date().getFullYear()} Github24 · Powered by{" "}
        <a href="https://drakilo.com" target="_blank" rel="noopener noreferrer"
          className="text-violet-500 hover:text-violet-600 font-semibold transition-colors">
          Drakilo Team
        </a>
      </p>
    </div>
  );
}

export default ForgotPasswordPage;