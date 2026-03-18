"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Lock, Eye, EyeOff, ArrowRight,
  AlertCircle, Loader2, CheckCircle2, Check,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useState } from "react";
import { resetPassword } from "@/hooks/useAuth";

/* ──────────────────────────────────────────────────────────
   PASSWORD STRENGTH
────────────────────────────────────────────────────────── */
const RULES = [
  { label: "At least 8 characters",  test: (p: string) => p.length >= 8           },
  { label: "One uppercase letter",   test: (p: string) => /[A-Z]/.test(p)         },
  { label: "One number",             test: (p: string) => /\d/.test(p)            },
  { label: "One special character",  test: (p: string) => /[^A-Za-z0-9]/.test(p) },
];

function PasswordStrength({ password }: { password: string }) {
  const passed = RULES.filter((r) => r.test(password)).length;
  const bar    = ["bg-rose-400", "bg-amber-400", "bg-amber-400", "bg-emerald-400", "bg-emerald-500"];
  return (
    <div className="mt-2 space-y-2">
      <div className="flex gap-1">
        {[0, 1, 2, 3].map((i) => (
          <div key={i}
            className={`flex-1 h-1 rounded-full transition-colors duration-300 ${i < passed ? bar[passed] : "bg-[#e5e7eb]"}`}
          />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-1">
        {RULES.map((r) => (
          <p key={r.label}
            className={`flex items-center gap-1.5 text-[11px] transition-colors duration-200 ${r.test(password) ? "text-emerald-600" : "text-[#94a3b8]"}`}
          >
            <Check className={`w-3 h-3 flex-shrink-0 ${r.test(password) ? "opacity-100" : "opacity-30"}`} strokeWidth={3} />
            {r.label}
          </p>
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   PAGE
   route: /reset-password/[token]
────────────────────────────────────────────────────────── */
export default function ResetPasswordPage() {
  const router        = useRouter();
  const params        = useParams();
  const token         = (params?.token as string) ?? "";

  const [password,    setPassword]    = useState("");
  const [confirm,     setConfirm]     = useState("");
  const [showPass,    setShowPass]    = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading,     setLoading]     = useState(false);
  const [success,     setSuccess]     = useState(false);
  const [errors,      setErrors]      = useState<{
    password?: string; confirm?: string; form?: string;
  }>({});

  function validate() {
    const e: typeof errors = {};
    if (!password)               e.password = "Password is required";
    else if (password.length < 8) e.password = "Minimum 8 characters";
    else if (password.length > 128) e.password = "Maximum 128 characters";
    if (password !== confirm)    e.confirm  = "Passwords do not match";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    if (!token) {
      setErrors({ form: "Invalid or missing reset token. Please request a new link." });
      return;
    }
    setLoading(true);
    setErrors({});

    const result = await resetPassword(token, { password });
    setLoading(false);

    if (result.success) {
      setSuccess(true);
      setTimeout(() => router.push("/login"), 2500);
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
          {success ? (
            /* ── Success ── */
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              </div>
              <h2 className="text-xl font-extrabold text-[#0f172a] mb-2">Password updated!</h2>
              <p className="text-[#475569] text-sm mb-6">
                Your password has been reset successfully. Redirecting you to sign in…
              </p>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0f172a] text-white font-bold text-sm hover:bg-[#1e293b] transition-colors shadow-md"
              >
                Go to Sign In <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ) : (
            /* ── Form ── */
            <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center mb-5">
                <Lock className="w-5 h-5 text-violet-600" />
              </div>

              <h1 className="text-2xl font-extrabold text-[#0f172a] tracking-tight mb-2">
                Set new password
              </h1>
              <p className="text-[#475569] text-sm leading-relaxed mb-7">
                Choose a strong password for your Github24 account.
              </p>

              {/* Token missing warning */}
              {!token && (
                <div className="mb-5 flex items-start gap-3 px-4 py-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 text-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  No reset token found. Please use the link from your email.
                </div>
              )}

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

              <form onSubmit={handleSubmit} noValidate className="space-y-4">

                {/* New password */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="password" className="text-sm font-semibold text-[#0f172a]">
                    New Password
                  </label>
                  <div className="relative">
                    {/* <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94a3b8] pointer-events-none"> */}
                      {/* <Lock className="w-4 h-4" />
                    </span> */}
                    <input
                      id="password" type={showPass ? "text" : "password"}
                      placeholder="Min. 8 characters" value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="new-password"
                      className={`w-full pl-10 pr-11 py-3 rounded-xl border text-sm text-[#0f172a] placeholder-[#94a3b8]
                        outline-none transition-all duration-200 bg-white
                        ${errors.password
                          ? "border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-100"
                          : "border-[#e5e7eb] focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                        }`}
                    />
                    <button type="button" onClick={() => setShowPass((v) => !v)} tabIndex={-1}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#94a3b8] hover:text-[#475569] transition-colors">
                      {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-xs text-rose-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 flex-shrink-0" />{errors.password}
                    </p>
                  )}
                  {password && <PasswordStrength password={password} />}
                </div>

                {/* Confirm password */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="confirm" className="text-sm font-semibold text-[#0f172a]">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    {/* <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94a3b8] pointer-events-none">
                      <Lock className="w-4 h-4" />
                    </span> */}
                    <input
                      id="confirm" type={showConfirm ? "text" : "password"}
                      placeholder="Re-enter your password" value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      autoComplete="new-password"
                      className={`w-full pl-10 pr-11 py-3 rounded-xl border text-sm text-[#0f172a] placeholder-[#94a3b8]
                        outline-none transition-all duration-200 bg-white
                        ${errors.confirm
                          ? "border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-100"
                          : "border-[#e5e7eb] focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                        }`}
                    />
                    <button type="button" onClick={() => setShowConfirm((v) => !v)} tabIndex={-1}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#94a3b8] hover:text-[#475569] transition-colors">
                      {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.confirm && (
                    <p className="text-xs text-rose-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 flex-shrink-0" />{errors.confirm}
                    </p>
                  )}
                  {/* Match indicator */}
                  {confirm && !errors.confirm && password === confirm && (
                    <p className="text-xs text-emerald-600 flex items-center gap-1 mt-0.5">
                      <CheckCircle2 className="w-3 h-3" /> Passwords match
                    </p>
                  )}
                </div>

                <motion.button
                  type="submit" disabled={loading || !token}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.97 }}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#0f172a] text-white font-bold text-sm
                             hover:bg-[#1e293b] disabled:opacity-60 disabled:cursor-not-allowed
                             transition-all duration-200 shadow-md mt-2"
                >
                  {loading
                    ? <><Loader2 className="w-4 h-4 animate-spin" /> Updating password…</>
                    : <>Update Password <ArrowRight className="w-4 h-4" /></>
                  }
                </motion.button>
              </form>

              <div className="mt-6 text-center">
                <Link
                  href="/login"
                  className="text-sm text-[#475569] hover:text-[#0f172a] font-semibold transition-colors"
                >
                  ← Back to Sign In
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