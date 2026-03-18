"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Eye, EyeOff, ArrowRight, Mail, Lock,
  AlertCircle, Loader2, CheckCircle2, GitBranch,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

/* ──────────────────────────────────────────────────────────
   FIELD COMPONENT
   Fix: static pl-10 / pr-11 / pr-4 — no dynamic Tailwind strings
────────────────────────────────────────────────────────── */
interface FieldProps {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  icon: React.ReactNode;
  error?: string;
  suffix?: React.ReactNode;
  autoComplete?: string;
}

function Field({
  id, label, type, placeholder, value, onChange,
  icon, error, suffix, autoComplete,
}: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-[#0f172a] leading-none">
        {label}
      </label>

      <div className="relative flex items-center">
        {/* Left icon — pointer-events none so it never blocks clicks */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94a3b8] z-10"
        >
          {icon}
        </span>

        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete={autoComplete}
          className={[
            "w-full py-3 text-sm text-[#0f172a] bg-white rounded-xl border",
            "placeholder:text-[#94a3b8] outline-none transition-all duration-200",
            // Static padding — pl always 10 (for icon), pr depends on suffix
            "pl-10",
            suffix ? "pr-11" : "pr-4",
            error
              ? "border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-100"
              : "border-[#e5e7eb] focus:border-violet-500 focus:ring-2 focus:ring-violet-100",
          ].join(" ")}
        />

        {/* Right suffix */}
        {suffix && (
          <span className="absolute right-3.5 top-1/2 -translate-y-1/2 z-10">
            {suffix}
          </span>
        )}
      </div>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.p
            key="error"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-xs text-rose-500 flex items-center gap-1.5 mt-0.5"
          >
            <AlertCircle className="w-3 h-3 flex-shrink-0" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}


/* ──────────────────────────────────────────────────────────
   PAGE
────────────────────────────────────────────────────────── */
export default function LoginPage() {
  const router         = useRouter();
  const { signIn }     = useAuth();

  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [success,  setSuccess]  = useState(false);
  const [errors,   setErrors]   = useState<{
    email?: string; password?: string; form?: string;
  }>({});

  /* ── Validation ── */
  function validate() {
    const e: typeof errors = {};
    if (!email)                            e.email    = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) e.email    = "Enter a valid email address";
    if (!password)                         e.password = "Password is required";
    else if (password.length < 8)          e.password = "Password must be at least 8 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  /* ── Submit ── */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setErrors({});

    const result = await signIn({ email, password });
    setLoading(false);

    if (result.success) {
      setSuccess(true);
      setTimeout(() => router.push("/dashboard"), 1200);
    } else {
      setErrors({ form: result.error.message });
    }
  }

  return (
    <div className="min-h-screen w-full bg-white flex">

      {/* ── FORM PANEL ── */}
      <div className="flex-1 flex flex-col min-h-screen px-4 sm:px-8 lg:px-14 xl:px-20 py-8 relative overflow-hidden">

        {/* Dot grid */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.25] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#cbd5e1 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        {/* Colour wash top */}
        <div
          aria-hidden
          className="absolute top-0 inset-x-0 h-72 bg-gradient-to-b from-violet-50/70 to-transparent pointer-events-none"
        />

        {/* Logo — always visible on mobile, desktop shows in right panel */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="relative z-10 lg:hidden mb-2"
        >
          <Link href="/">
            <Image
              src="/assest/logo/navbar.png"
              width={150}
              height={45}
              alt="Git24 logo"
              priority
            />
          </Link>
        </motion.div>

        {/* Desktop logo (shown in form panel when right panel hidden) */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="relative z-10 hidden lg:block mb-2"
        >
          <Link href="/">
            <Image
              src="/assest/logo/navbar.png"
              width={150}
              height={45}
              alt="Git24 logo"
              priority
            />
          </Link>
        </motion.div>

        {/* Form — vertically centred */}
        <div className="flex-1 flex items-center justify-center py-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-md"
          >
            {/* Heading */}
            <div className="mb-8">
              <div className="flex items-center gap-2.5 mb-4 lg:hidden">
                <div className="w-9 h-9 rounded-xl bg-[#0f172a] flex items-center justify-center shadow-md">
                  <GitBranch className="w-[18px] h-[18px] text-white" strokeWidth={2.5} />
                </div>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] tracking-tight mb-2">
                Welcome back
              </h1>
              <p className="text-[#475569] text-sm sm:text-base">
                Sign in to your Github24 account to continue.
              </p>
            </div>

            {/* Global error banner */}
            <AnimatePresence>
              {errors.form && (
                <motion.div
                  key="form-error"
                  initial={{ opacity: 0, y: -8, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-5 flex items-start gap-3 px-4 py-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm overflow-hidden"
                >
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>{errors.form}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Success banner */}
            <AnimatePresence>
              {success && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: -8, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-5 flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-semibold overflow-hidden"
                >
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  Signed in! Redirecting to dashboard…
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate className="space-y-4">

              {/* Email */}
              <Field
                id="email"
                label="Email address"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={setEmail}
                error={errors.email}
                autoComplete="email"
              />

              {/* Password */}
              <Field
                id="password"
                label="Password"
                type={showPass ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={setPassword}
                error={errors.password}
                autoComplete="current-password"
                suffix={
                  <button
                    type="button"
                    onClick={() => setShowPass((v) => !v)}
                    className="text-[#94a3b8] hover:text-[#475569] transition-colors p-0.5"
                    tabIndex={-1}
                    aria-label={showPass ? "Hide password" : "Show password"}
                  >
                    {showPass
                      ? <EyeOff className="w-4 h-4" />
                      : <Eye className="w-4 h-4" />
                    }
                  </button>
                }
              />

              {/* Forgot password */}
              <div className="flex justify-end">
                <Link
                  href="/forgot-password"
                  className="text-xs text-violet-600 hover:text-violet-700 font-semibold transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={loading || success}
                whileHover={{ scale: loading || success ? 1 : 1.015 }}
                whileTap={{ scale: loading || success ? 1 : 0.97 }}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#0f172a] text-white font-bold text-sm
                           hover:bg-[#1e293b] disabled:opacity-60 disabled:cursor-not-allowed
                           transition-all duration-200 shadow-md"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Signing in…
                  </>
                ) : success ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    Signed in!
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-[#f1f5f9]" />
              <span className="text-xs text-[#94a3b8] font-medium">
                don&apos;t have an account?
              </span>
              <div className="flex-1 h-px bg-[#f1f5f9]" />
            </div>

            {/* Register CTA — full button for easy mobile tap */}
            <Link
              href="/register"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-[#e5e7eb] bg-[#f8fafc] text-[#0f172a] font-semibold text-sm hover:bg-[#f1f5f9] hover:border-[#d1d5db] transition-all duration-150"
            >
              Create a free account →
            </Link>
          </motion.div>
        </div>

        {/* Footer */}
        <p className="relative z-10 text-center text-xs text-[#94a3b8]">
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

    </div>
  );
}