"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Eye, EyeOff, ArrowRight, Mail, Lock, User,
  AlertCircle, Loader2, CheckCircle2, Check,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

/* ──────────────────────────────────────────────────────────
   PASSWORD STRENGTH
────────────────────────────────────────────────────────── */
const RULES = [
  { label: "At least 8 characters",        test: (p: string) => p.length >= 8         },
  { label: "One uppercase letter",          test: (p: string) => /[A-Z]/.test(p)       },
  { label: "One number",                    test: (p: string) => /\d/.test(p)          },
  { label: "One special character",         test: (p: string) => /[^A-Za-z0-9]/.test(p) },
];

function PasswordStrength({ password }: { password: string }) {
  const passed = RULES.filter((r) => r.test(password)).length;
  const colors = ["bg-rose-400", "bg-amber-400", "bg-amber-400", "bg-emerald-400", "bg-emerald-500"];
  return (
    <div className="mt-2 space-y-2">
      {/* Bar */}
      <div className="flex gap-1">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`flex-1 h-1 rounded-full transition-colors duration-300 ${
              i < passed ? colors[passed] : "bg-[#e5e7eb]"
            }`}
          />
        ))}
      </div>
      {/* Rules */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-1">
        {RULES.map((r) => (
          <p
            key={r.label}
            className={`flex items-center gap-1.5 text-[11px] transition-colors duration-200 ${
              r.test(password) ? "text-emerald-600" : "text-[#94a3b8]"
            }`}
          >
            <Check
              className={`w-3 h-3 flex-shrink-0 transition-opacity ${
                r.test(password) ? "opacity-100" : "opacity-30"
              }`}
              strokeWidth={3}
            />
            {r.label}
          </p>
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   FIELD
────────────────────────────────────────────────────────── */
interface FieldProps {
  id: string; label: string; type: string; placeholder: string;
  value: string; onChange: (v: string) => void;
  icon: React.ReactNode; error?: string; suffix?: React.ReactNode;
  autoComplete?: string;
}

function Field({ id, label, type, placeholder, value, onChange, icon, error, suffix, autoComplete }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-[#0f172a]">{label}</label>
      <div className="relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94a3b8] pointer-events-none">{icon}</span>
        <input
          id={id} type={type} placeholder={placeholder} value={value}
          onChange={(e) => onChange(e.target.value)} autoComplete={autoComplete}
          className={`w-full pl-10 pr-${suffix ? "11" : "4"} py-3 rounded-xl border text-sm text-[#0f172a] placeholder-[#94a3b8]
            outline-none transition-all duration-200 bg-white
            ${error
              ? "border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-100"
              : "border-[#e5e7eb] focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
            }`}
        />
        {suffix && <span className="absolute right-3.5 top-1/2 -translate-y-1/2">{suffix}</span>}
      </div>
      {error && (
        <p className="text-xs text-rose-500 flex items-center gap-1 mt-0.5">
          <AlertCircle className="w-3 h-3 flex-shrink-0" />{error}
        </p>
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   EMAIL SENT SCREEN
────────────────────────────────────────────────────────── */
function VerifyEmailScreen({ email }: { email: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto mb-5">
        <Mail className="w-7 h-7 text-emerald-600" />
      </div>
      <h2 className="text-2xl font-extrabold text-[#0f172a] mb-2">Check your inbox</h2>
      <p className="text-[#475569] text-sm leading-relaxed mb-1">
        We sent a verification link to
      </p>
      <p className="font-bold text-[#0f172a] text-sm mb-6">{email}</p>
      <p className="text-[#94a3b8] text-xs mb-8">
        Click the link in the email to activate your account.
        If you don't see it, check your spam folder.
      </p>
      <Link
        href="/login"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0f172a] text-white font-bold text-sm hover:bg-[#1e293b] transition-colors shadow-md"
      >
        Back to Sign In <ArrowRight className="w-4 h-4" />
      </Link>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────
   PAGE
────────────────────────────────────────────────────────── */
export default function RegisterPage() {
  const router = useRouter();
  const { signUp } = useAuth();

  const [name, setName]               = useState("");
  const [email, setEmail]             = useState("");
  const [password, setPassword]       = useState("");
  const [confirm, setConfirm]         = useState("");
  const [showPass, setShowPass]       = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading]         = useState(false);
  const [done, setDone]               = useState(false);
  const [errors, setErrors]           = useState<{
    name?: string; email?: string; password?: string; confirm?: string; form?: string;
  }>({});

  function validate() {
    const e: typeof errors = {};
    if (!name.trim())                      e.name     = "Name is required";
    if (!email)                            e.email    = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) e.email    = "Enter a valid email";
    if (!password)                         e.password = "Password is required";
    else if (password.length < 8)          e.password = "Minimum 8 characters";
    else if (password.length > 128)        e.password = "Maximum 128 characters";
    if (password !== confirm)              e.confirm  = "Passwords do not match";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setErrors({});

    const result = await signUp({ name, email, password });
    setLoading(false);

    if (result.success) {
      setDone(true);
    } else {
      setErrors({ form: result.error.message });
    }
  }

  return (
    <div className="min-h-screen w-full bg-white flex">

      {/* ── LEFT: decorative (hidden mobile) ── */}
      <div className="hidden lg:flex w-[420px] xl:w-[580px] flex-shrink-0 relative bg-[#0f172a] overflow-hidden flex-col items-start justify-center px-12 xl:px-16">
        {/* Blobs */}
        {[
          { s: 300, x: "-15%", y: "-10%", c: "bg-violet-500/20" },
          { s: 200, x: "60%",  y: "70%",  c: "bg-blue-500/20"   },
        ].map((b, i) => (
          <div
            key={i}
            className={`absolute rounded-full blur-3xl ${b.c}`}
            style={{ width: b.s, height: b.s, left: b.x, top: b.y }}
          />
        ))}

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-white/80 text-xs font-semibold mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Free forever plan available
          </div>
          <h2 className="text-3xl xl:text-4xl font-extrabold text-white tracking-tight leading-snug mb-5">
            Start monitoring
            <br />
            <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
              in 2 minutes.
            </span>
          </h2>
          <p className="text-white/50 text-sm leading-relaxed max-w-xs mb-10">
            Connect your GitHub repos, link Telegram, and get notified
            about every star, fork, issue and PR — for free.
          </p>
          {/* Steps */}
          <div className="space-y-4">
            {[
              "Create your free account",
              "Install the GitHub App",
              "Connect Telegram",
              "Get real-time alerts",
            ].map((step, i) => (
              <div key={step} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-violet-600 flex items-center justify-center flex-shrink-0 text-white text-xs font-black">
                  {i + 1}
                </div>
                <span className="text-white/70 text-sm">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── RIGHT: form ── */}
      <div className="flex-1 flex flex-col justify-between px-4 sm:px-8 lg:px-14 xl:px-20 py-8 relative overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 opacity-[0.25] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#cbd5e1 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-violet-50/60 to-transparent pointer-events-none" />

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10"
        >
          <Link href="/">
            <Image src="/assest/logo/navbar.png" width={160} height={48} alt="Git24 logo" priority />
          </Link>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 w-full max-w-md mx-auto"
        >
          <AnimatePresence mode="wait">
            {done ? (
              <VerifyEmailScreen key="done" email={email} />
            ) : (
              <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="mb-7">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] tracking-tight mb-2">
                    Create your account
                  </h1>
                  <p className="text-[#475569] text-sm sm:text-base">
                    Free forever · No credit card required
                  </p>
                </div>

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
                  <Field id="name" label="Full Name" type="text" placeholder="Your full name"
                    value={name} onChange={setName} icon={<User className="w-4 h-4" />}
                    error={errors.name} autoComplete="name" />

                  <Field id="email" label="Email address" type="email" placeholder="you@example.com"
                    value={email} onChange={setEmail} icon={<Mail className="w-4 h-4" />}
                    error={errors.email} autoComplete="email" />

                  <div>
                    <Field id="password" label="Password" type={showPass ? "text" : "password"}
                      placeholder="Min. 8 characters" value={password} onChange={setPassword}
                      icon={<Lock className="w-4 h-4" />} error={errors.password}
                      autoComplete="new-password"
                      suffix={
                        <button type="button" onClick={() => setShowPass((v) => !v)}
                          className="text-[#94a3b8] hover:text-[#475569] transition-colors" tabIndex={-1}>
                          {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      }
                    />
                    {password && <PasswordStrength password={password} />}
                  </div>

                  <Field id="confirm" label="Confirm Password" type={showConfirm ? "text" : "password"}
                    placeholder="Re-enter your password" value={confirm} onChange={setConfirm}
                    icon={<Lock className="w-4 h-4" />} error={errors.confirm}
                    autoComplete="new-password"
                    suffix={
                      <button type="button" onClick={() => setShowConfirm((v) => !v)}
                        className="text-[#94a3b8] hover:text-[#475569] transition-colors" tabIndex={-1}>
                        {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    }
                  />

                  <motion.button
                    type="submit" disabled={loading}
                    whileHover={{ scale: loading ? 1 : 1.02 }}
                    whileTap={{ scale: loading ? 1 : 0.97 }}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#0f172a] text-white font-bold text-sm
                               hover:bg-[#1e293b] disabled:opacity-60 disabled:cursor-not-allowed
                               transition-all duration-200 shadow-md mt-2"
                  >
                    {loading
                      ? <><Loader2 className="w-4 h-4 animate-spin" /> Creating account…</>
                      : <>Create Account <ArrowRight className="w-4 h-4" /></>
                    }
                  </motion.button>
                </form>

                <div className="flex items-center gap-3 my-6">
                  <div className="flex-1 h-px bg-[#f1f5f9]" />
                  <span className="text-xs text-[#94a3b8] font-medium">or</span>
                  <div className="flex-1 h-px bg-[#f1f5f9]" />
                </div>

                <p className="text-center text-sm text-[#475569]">
                  Already have an account?{" "}
                  <Link href="/login" className="text-violet-600 hover:text-violet-700 font-bold transition-colors">
                    Sign in →
                  </Link>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Footer note */}
        <p className="relative z-10 text-center text-xs text-[#94a3b8] mt-8">
          By signing up you agree to our{" "}
          <Link href="https://drakilo.com" target="_blank" rel="noopener noreferrer"
            className="text-violet-500 hover:text-violet-600 transition-colors underline underline-offset-2">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="https://drakilo.com" target="_blank" rel="noopener noreferrer"
            className="text-violet-500 hover:text-violet-600 transition-colors underline underline-offset-2">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}