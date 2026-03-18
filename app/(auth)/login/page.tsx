"use client";

import { motion } from "framer-motion";
import {
  Eye, EyeOff, ArrowRight, Mail, Lock,
  AlertCircle, Loader2, CheckCircle2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

/* ──────────────────────────────────────────────────────────
   FLOATING DECORATION — subtle git-branch dots
────────────────────────────────────────────────────────── */
const DOTS = [
  { size: 280, x: "-10%", y: "-10%", color: "bg-violet-100", delay: 0    },
  { size: 200, x: "80%",  y: "60%",  color: "bg-blue-100",   delay: 0.3  },
  { size: 140, x: "60%",  y: "-5%",  color: "bg-indigo-100", delay: 0.6  },
];

/* ──────────────────────────────────────────────────────────
   INPUT COMPONENT
────────────────────────────────────────────────────────── */
interface InputProps {
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
}: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-[#0f172a]">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94a3b8] pointer-events-none">
          {icon}
        </span>
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete={autoComplete}
          className={`w-full pl-10 pr-${suffix ? "11" : "4"} py-3 rounded-xl border text-sm text-[#0f172a] placeholder-[#94a3b8]
            outline-none transition-all duration-200 bg-white
            ${error
              ? "border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-100"
              : "border-[#e5e7eb] focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
            }`}
        />
        {suffix && (
          <span className="absolute right-3.5 top-1/2 -translate-y-1/2">
            {suffix}
          </span>
        )}
      </div>
      {error && (
        <p className="text-xs text-rose-500 flex items-center gap-1 mt-0.5">
          <AlertCircle className="w-3 h-3 flex-shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   PAGE
────────────────────────────────────────────────────────── */
export default function LoginPage() {
  const router = useRouter();
  const { signIn } = useAuth();

  const [email, setEmail]         = useState("");
  const [password, setPassword]   = useState("");
  const [showPass, setShowPass]   = useState(false);
  const [loading, setLoading]     = useState(false);
  const [success, setSuccess]     = useState(false);
  const [errors, setErrors]       = useState<{ email?: string; password?: string; form?: string }>({});

  /* ── validation ── */
  function validate() {
    const e: typeof errors = {};
    if (!email)                     e.email    = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = "Enter a valid email";
    if (!password)                  e.password = "Password is required";
    else if (password.length < 8)   e.password = "Password must be at least 8 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  /* ── submit ── */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setErrors({});

    const result = await signIn({ email, password });
    setLoading(false);

    if (result.success) {
      setSuccess(true);
      setTimeout(() => router.push("/dashboard"), 1000);
    } else {
      setErrors({ form: result.error.message });
    }
  }

  return (
    <div className="min-h-screen w-full bg-white flex">

      {/* ── LEFT PANEL — form ── */}
      <div className="flex-1 flex flex-col justify-between px-4 sm:px-8 lg:px-16 xl:px-24 py-8 relative overflow-hidden">

        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.28] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#cbd5e1 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        {/* Colour wash */}
        <div className="absolute top-0 inset-x-0 h-72 bg-gradient-to-b from-violet-50/70 to-transparent pointer-events-none" />

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10"
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

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 w-full max-w-md mx-auto"
        >
          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] tracking-tight mb-2">
              Welcome back
            </h1>
            <p className="text-[#475569] text-sm sm:text-base">
              Sign in to your Github24 account to continue.
            </p>
          </div>

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

          {/* Success */}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-semibold"
            >
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              Signed in! Redirecting…
            </motion.div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <Field
              id="email"
              label="Email address"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={setEmail}
              icon={<Mail className="w-4 h-4" />}
              error={errors.email}
              autoComplete="email"
            />

            <Field
              id="password"
              label="Password"
              type={showPass ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={setPassword}
              icon={<Lock className="w-4 h-4" />}
              error={errors.password}
              autoComplete="current-password"
              suffix={
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  className="text-[#94a3b8] hover:text-[#475569] transition-colors"
                  tabIndex={-1}
                >
                  {showPass
                    ? <EyeOff className="w-4 h-4" />
                    : <Eye className="w-4 h-4" />}
                </button>
              }
            />

            {/* Forgot password */}
            <div className="flex justify-end -mt-1">
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
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.97 }}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#0f172a] text-white font-bold text-sm
                         hover:bg-[#1e293b] disabled:opacity-60 disabled:cursor-not-allowed
                         transition-all duration-200 shadow-md mt-2"
            >
              {loading
                ? <><Loader2 className="w-4 h-4 animate-spin" /> Signing in…</>
                : success
                ? <><CheckCircle2 className="w-4 h-4" /> Signed in!</>
                : <>Sign In <ArrowRight className="w-4 h-4" /></>
              }
            </motion.button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-[#f1f5f9]" />
            <span className="text-xs text-[#94a3b8] font-medium">or</span>
            <div className="flex-1 h-px bg-[#f1f5f9]" />
          </div>

          {/* Sign up */}
          <p className="text-center text-sm text-[#475569]">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-violet-600 hover:text-violet-700 font-bold transition-colors"
            >
              Create one free →
            </Link>
          </p>
        </motion.div>

        {/* Footer */}
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

      {/* ── RIGHT PANEL — decorative (hidden on mobile) ── */}
      <div className="hidden lg:flex flex-1 relative bg-[#0f172a] overflow-hidden">
        {/* Ambient blobs */}
        {DOTS.map((d, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: d.delay }}
            className={`absolute rounded-full blur-3xl ${d.color} opacity-30`}
            style={{ width: d.size, height: d.size, left: d.x, top: d.y }}
          />
        ))}

        {/* Content */}
        <div className="relative z-10 flex flex-col items-start justify-center px-14 xl:px-20">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-white/80 text-xs font-semibold mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Real-time GitHub monitoring
          </div>

          <h2 className="text-3xl xl:text-4xl font-extrabold text-white tracking-tight leading-snug mb-5">
            Your GitHub repos,
            <br />
            <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
              always in sight.
            </span>
          </h2>

          <p className="text-white/50 text-base leading-relaxed max-w-sm mb-10">
            Monitor stars, forks, issues and PRs in real time. Get instant
            Telegram alerts and analyse contributor trends — all from one dashboard.
          </p>

          {/* Mini stat cards */}
          <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
            {[
              { value: "12K+",  label: "Active Users"   },
              { value: "8.4M+", label: "Events Tracked" },
              { value: "<3s",   label: "Alert Latency"  },
              { value: "Free",  label: "To Start"       },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3"
              >
                <p className="text-white font-extrabold text-lg leading-none">{s.value}</p>
                <p className="text-white/40 text-xs mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}