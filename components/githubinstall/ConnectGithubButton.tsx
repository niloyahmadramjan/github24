"use client";

/**
 * components/ConnectGithubButton.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Drop this anywhere in the dashboard to let users connect their GitHub account.
 * Calls GET /github/connect → gets install URL → redirects to GitHub.
 *
 * Usage:
 *   <ConnectGithubButton />
 *   <ConnectGithubButton variant="outline" label="Link GitHub" />
 *   <ConnectGithubButton variant="card" />
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { motion, AnimatePresence } from "framer-motion";
import { Github, Loader2, AlertCircle, ArrowRight, GitBranch, Zap } from "lucide-react";
import { useGithub } from "@/hooks/useGithub";

/* ──────────────────────────────────────────────────────────
   PROPS
────────────────────────────────────────────────────────── */
interface ConnectGithubButtonProps {
  /**
   * "solid"   — dark filled button  (default, use in quick-actions / topbar)
   * "outline" — bordered button     (use inside cards)
   * "card"    — full onboarding card (use in empty states)
   */
  variant?: "solid" | "outline" | "card";
  label?:   string;
  className?: string;
}

/* ──────────────────────────────────────────────────────────
   SOLID / OUTLINE BUTTON
────────────────────────────────────────────────────────── */
function ButtonVariant({
  variant,
  label,
  connecting,
  error,
  onClick,
  className = "",
}: {
  variant: "solid" | "outline";
  label: string;
  connecting: boolean;
  error: string | null;
  onClick: () => void;
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 font-bold text-sm rounded-xl transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed";

  const styles = {
    solid:
      "px-5 py-2.5 bg-[#0f172a] text-white hover:bg-[#1e293b] shadow-md hover:shadow-lg",
    outline:
      "px-5 py-2.5 bg-white border border-[#e5e7eb] text-[#0f172a] hover:border-[#d1d5db] hover:bg-[#f8fafc] hover:shadow-sm",
  };

  return (
    <div className={`flex flex-col items-start gap-1.5 ${className}`}>
      <motion.button
        onClick={onClick}
        disabled={connecting}
        whileHover={{ scale: connecting ? 1 : 1.02 }}
        whileTap={{ scale: connecting ? 1 : 0.97 }}
        className={`${base} ${styles[variant]}`}
      >
        {connecting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin flex-shrink-0" />
            Connecting…
          </>
        ) : (
          <>
            <Github className="w-4 h-4 flex-shrink-0" />
            {label}
            <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" />
          </>
        )}
      </motion.button>

      {/* Inline error */}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-1.5 text-xs text-rose-600 font-medium"
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
   CARD VARIANT — full onboarding empty-state card
────────────────────────────────────────────────────────── */
function CardVariant({
  connecting,
  error,
  onClick,
  className = "",
}: {
  connecting: boolean;
  error: string | null;
  onClick: () => void;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`bg-white rounded-2xl border border-[#e5e7eb] p-8 sm:p-10 flex flex-col items-center text-center shadow-sm ${className}`}
    >
      {/* Icon */}
      <div className="w-16 h-16 rounded-2xl bg-[#0f172a] flex items-center justify-center mb-5 shadow-lg">
        <GitBranch className="w-7 h-7 text-white" strokeWidth={2.2} />
      </div>

      <h3 className="text-xl font-extrabold text-[#0f172a] tracking-tight mb-2">
        Connect your GitHub
      </h3>
      <p className="text-[#475569] text-sm leading-relaxed max-w-sm mb-6">
        Install the Github24 GitHub App to start monitoring your repositories.
        Select specific repos or your entire account — you decide.
      </p>

      {/* Steps */}
      <div className="flex flex-col sm:flex-row items-center gap-3 mb-8 text-xs text-[#94a3b8] font-medium">
        {[
          "Install GitHub App",
          "Select repos to monitor",
          "Get real-time alerts",
        ].map((step, i) => (
          <div key={step} className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-[#f1f5f9] border border-[#e5e7eb] text-[10px] font-black text-[#475569] flex items-center justify-center flex-shrink-0">
              {i + 1}
            </div>
            <span>{step}</span>
            {i < 2 && (
              <ArrowRight className="w-3 h-3 text-[#d1d5db] flex-shrink-0 hidden sm:block" />
            )}
          </div>
        ))}
      </div>

      {/* CTA */}
      <motion.button
        onClick={onClick}
        disabled={connecting}
        whileHover={{ scale: connecting ? 1 : 1.03 }}
        whileTap={{ scale: connecting ? 1 : 0.97 }}
        className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#0f172a] text-white font-bold text-sm hover:bg-[#1e293b] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
      >
        {connecting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Redirecting to GitHub…
          </>
        ) : (
          <>
            <Github className="w-4 h-4" />
            Connect GitHub Account
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </motion.button>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 flex items-start gap-2 px-4 py-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm text-left w-full max-w-sm"
          >
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footnote */}
      <p className="mt-5 text-xs text-[#94a3b8] flex items-center gap-1.5">
        <Zap className="w-3 h-3 text-violet-400" />
        Free forever · Read-only access · Revoke anytime from GitHub settings
      </p>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────
   MAIN EXPORT
────────────────────────────────────────────────────────── */
export default function ConnectGithubButton({
  variant  = "solid",
  label    = "Connect GitHub",
  className,
}: ConnectGithubButtonProps) {
  const { connectGithub, connecting, error } = useGithub();

  if (variant === "card") {
    return (
      <CardVariant
        connecting={connecting}
        error={error}
        onClick={connectGithub}
        className={className}
      />
    );
  }

  return (
    <ButtonVariant
      variant={variant}
      label={label}
      connecting={connecting}
      error={error}
      onClick={connectGithub}
      className={className}
    />
  );
}