"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  EyeOff,
  ArrowRight,
  Mail,
  Lock,
  User,
  AlertCircle,
  Loader2,
  Check,
  GitBranch,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

/* ──────────────────────────────────────────────────────────
   PASSWORD STRENGTH
────────────────────────────────────────────────────────── */
const RULES = [
  { label: "8+ characters", test: (p: string) => p.length >= 8 },
  { label: "Uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
  { label: "One number", test: (p: string) => /\d/.test(p) },
  { label: "Special character", test: (p: string) => /[^A-Za-z0-9]/.test(p) },
];

const STRENGTH_COLOR = [
  "", // 0 — empty
  "bg-rose-400", // 1
  "bg-amber-400", // 2
  "bg-amber-400", // 3
  "bg-emerald-500", // 4
];

const STRENGTH_LABEL = ["", "Weak", "Fair", "Good", "Strong"];

function PasswordStrength({ password }: { password: string }) {
  const score = RULES.filter((r) => r.test(password)).length;

  return (
    <div className="mt-2.5 space-y-2">
      {/* Progress bars */}
      <div className="flex items-center gap-1.5">
        <div className="flex gap-1 flex-1">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`flex-1 h-1.5 rounded-full transition-all duration-400 ${
                i <= score ? STRENGTH_COLOR[score] : "bg-[#e5e7eb]"
              }`}
            />
          ))}
        </div>
        {score > 0 && (
          <span
            className={`text-[11px] font-bold flex-shrink-0 ${
              score <= 2 ? "text-amber-500" : "text-emerald-600"
            }`}
          >
            {STRENGTH_LABEL[score]}
          </span>
        )}
      </div>

      {/* Rule checklist */}
      <div className="grid grid-cols-2 gap-x-3 gap-y-0.5">
        {RULES.map((r) => {
          const ok = r.test(password);
          return (
            <p
              key={r.label}
              className={`flex items-center gap-1.5 text-[11px] font-medium transition-colors duration-200 ${
                ok ? "text-emerald-600" : "text-[#94a3b8]"
              }`}
            >
              <span
                className={`w-3.5 h-3.5 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                  ok ? "bg-emerald-100" : "bg-[#f1f5f9]"
                }`}
              >
                <Check
                  className={`w-2 h-2 transition-opacity duration-200 ${
                    ok
                      ? "opacity-100 text-emerald-600"
                      : "opacity-20 text-[#94a3b8]"
                  }`}
                  strokeWidth={3.5}
                />
              </span>
              {r.label}
            </p>
          );
        })}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   FIELD — fixed: static padding classes, no dynamic Tailwind
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
  hint?: string;
}

function Field({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
  icon,
  error,
  suffix,
  autoComplete,
  hint,
}: FieldProps) {
  const hasError = Boolean(error);
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-sm font-semibold text-[#0f172a] leading-none"
      >
        {label}
      </label>

      <div className="relative flex items-center">
        {/* Left icon — positioned absolutely, pointer-events none */}
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
            // base
            "w-full py-3 text-sm text-[#0f172a] bg-white rounded-xl border outline-none",
            "placeholder:text-[#94a3b8] transition-all duration-200",
            // fixed left padding (accounts for icon) — fixed right padding
            "pl-10",
            suffix ? "pr-11" : "pr-4",
            // border / ring state
            hasError
              ? "border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-100"
              : "border-[#e5e7eb] focus:border-violet-500 focus:ring-2 focus:ring-violet-100",
          ].join(" ")}
        />

        {/* Right suffix (show/hide button) */}
        {suffix && (
          <span className="absolute right-3.5 top-1/2 -translate-y-1/2 z-10">
            {suffix}
          </span>
        )}
      </div>

      {/* Error message */}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-rose-500 flex items-center gap-1.5 mt-0.5"
        >
          <AlertCircle className="w-3 h-3 flex-shrink-0" />
          {error}
        </motion.p>
      )}

      {/* Hint (no error) */}
      {hint && !error && (
        <p className="text-xs text-[#94a3b8] mt-0.5">{hint}</p>
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   VERIFY EMAIL SCREEN
────────────────────────────────────────────────────────── */
function VerifyEmailScreen({ email }: { email: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center text-center py-4"
    >
      {/* Animated envelope icon */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-20 h-20 rounded-3xl bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center mb-6"
      >
        <Mail className="w-9 h-9 text-emerald-600" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] mb-3 tracking-tight">
          Check your inbox
        </h2>
        <p className="text-[#475569] text-sm leading-relaxed mb-1">
          We sent a verification link to
        </p>
        <p className="font-bold text-[#0f172a] text-base mb-5 px-4 py-2 bg-[#f8fafc] border border-[#e5e7eb] rounded-xl inline-block">
          {email}
        </p>
        <p className="text-[#94a3b8] text-xs leading-relaxed mb-8 max-w-xs mx-auto">
          Click the link in the email to activate your account. Didn&apos;t get
          it? Check your spam folder.
        </p>

        <Link
          href="/login"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#0f172a] text-white font-bold text-sm hover:bg-[#1e293b] transition-colors shadow-md"
        >
          Back to Sign In
          <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────
   PAGE
────────────────────────────────────────────────────────── */
export default function RegisterPage() {
  const { signUp } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirm?: string;
    form?: string;
  }>({});

  /* ── validation ── */
  function validate() {
    const e: typeof errors = {};
    if (!name.trim()) e.name = "Full name is required";
    if (!email) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email))
      e.email = "Enter a valid email address";
    if (!password) e.password = "Password is required";
    else if (password.length < 8) e.password = "Minimum 8 characters";
    else if (password.length > 128) e.password = "Maximum 128 characters";
    if (!confirm) e.confirm = "Please confirm your password";
    else if (password !== confirm) e.confirm = "Passwords do not match";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  /* ── submit ── */
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

  const passwordsMatch = confirm.length > 0 && password === confirm;

  return (
    <div className="min-h-screen w-full bg-white flex">
      {/* ── Form panel ── */}
      <div className="flex-1 flex flex-col min-h-screen px-4 sm:px-8 lg:px-14 xl:px-20 py-8 relative overflow-hidden">
        {/* Dot grid background */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.25] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#cbd5e1 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        {/* Top gradient wash */}
        <div
          aria-hidden
          className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-violet-50/60 to-transparent pointer-events-none"
        />

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

        {/* Form / success — centred vertically */}
        <div className="flex-1 flex items-center justify-center py-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-md"
          >
            <AnimatePresence mode="wait">
              {/* ── EMAIL VERIFICATION SCREEN ── */}
              {done ? (
                <VerifyEmailScreen key="done" email={email} />
              ) : (
                /* ── REGISTER FORM ── */
                <motion.div
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Heading */}
                  <div className="mb-7">
                    <div className="flex items-center gap-2.5 mb-4">
                      <div className="w-9 h-9 rounded-xl bg-[#0f172a] flex items-center justify-center shadow-md lg:hidden">
                        <GitBranch
                          className="w-[18px] h-[18px] text-white"
                          strokeWidth={2.5}
                        />
                      </div>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] tracking-tight mb-1.5">
                      Create your account
                    </h1>
                    <p className="text-[#475569] text-sm sm:text-base">
                      Free forever · No credit card required
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

                  <form
                    onSubmit={handleSubmit}
                    noValidate
                    className="space-y-4"
                  >
                    {/* Full Name */}
                    <Field
                      id="name"
                      label="Full Name"
                      type="text"
                      placeholder="Your full name"
                      value={name}
                      onChange={setName}
                      error={errors.name}
                      autoComplete="name"
                    />

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
                    <div>
                      <Field
                        id="password"
                        label="Password"
                        type={showPass ? "text" : "password"}
                        placeholder="Min. 8 characters"
                        value={password}
                        onChange={setPassword}
                        error={errors.password}
                        autoComplete="new-password"
                        suffix={
                          <button
                            type="button"
                            onClick={() => setShowPass((v) => !v)}
                            className="text-[#94a3b8] hover:text-[#475569] transition-colors p-0.5"
                            tabIndex={-1}
                            aria-label={
                              showPass ? "Hide password" : "Show password"
                            }
                          >
                            {showPass ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </button>
                        }
                      />
                      {/* Strength meter — shows only when typing */}
                      <AnimatePresence>
                        {password.length > 0 && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <PasswordStrength password={password} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Confirm password */}
                    <div>
                      <Field
                        id="confirm"
                        label="Confirm Password"
                        type={showConfirm ? "text" : "password"}
                        placeholder="Re-enter your password"
                        value={confirm}
                        onChange={setConfirm}
                        // icon={<Lock className="w-4 h-4" />}
                        error={errors.confirm}
                        autoComplete="new-password"
                        suffix={
                          <button
                            type="button"
                            onClick={() => setShowConfirm((v) => !v)}
                            className="text-[#94a3b8] hover:text-[#475569] transition-colors p-0.5"
                            tabIndex={-1}
                            aria-label={
                              showConfirm ? "Hide password" : "Show password"
                            }
                          >
                            {showConfirm ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </button>
                        }
                      />
                      {/* Passwords match indicator */}
                      <AnimatePresence>
                        {passwordsMatch && (
                          <motion.p
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="text-xs text-emerald-600 flex items-center gap-1.5 mt-1.5 font-medium"
                          >
                            <span className="w-3.5 h-3.5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                              <Check
                                className="w-2 h-2 text-emerald-600"
                                strokeWidth={3.5}
                              />
                            </span>
                            Passwords match
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Submit button */}
                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={{ scale: loading ? 1 : 1.015 }}
                      whileTap={{ scale: loading ? 1 : 0.97 }}
                      className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#0f172a] text-white font-bold text-sm
                                 hover:bg-[#1e293b] disabled:opacity-60 disabled:cursor-not-allowed
                                 transition-all duration-200 shadow-md mt-1"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Creating account…
                        </>
                      ) : (
                        <>
                          Create Account
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </motion.button>
                  </form>

                  {/* Divider */}
                  <div className="flex items-center gap-3 my-6">
                    <div className="flex-1 h-px bg-[#f1f5f9]" />
                    <span className="text-xs text-[#94a3b8] font-medium">
                      already have an account?
                    </span>
                    <div className="flex-1 h-px bg-[#f1f5f9]" />
                  </div>

                  {/* Sign in link */}
                  <Link
                    href="/login"
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-[#e5e7eb] bg-[#f8fafc] text-[#0f172a] font-semibold text-sm hover:bg-[#f1f5f9] hover:border-[#d1d5db] transition-all duration-150"
                  >
                    Sign in instead →
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* ── Footer ── */}
        <p className="relative z-10 text-center text-xs text-[#94a3b8]">
          By signing up you agree to our{" "}
          <Link
            href="https://drakilo.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-violet-500 hover:text-violet-600 font-semibold transition-colors underline underline-offset-2"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="https://drakilo.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-violet-500 hover:text-violet-600 font-semibold transition-colors underline underline-offset-2"
          >
            Privacy Policy
          </Link>
          . © {new Date().getFullYear()} Github24 · Powered by{" "}
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
