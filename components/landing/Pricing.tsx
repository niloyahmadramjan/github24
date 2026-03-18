"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, Zap, Star, Crown } from "lucide-react";
import Link from "next/link";

const PLANS = [
  {
    name: "Starter",
    icon: Zap,
    price: "$0",
    period: "forever",
    tagline: "Everything you need to get started.",
    cta: "Get Started Free",
    href: "/register",
    featured: false,
    iconBg: "bg-[#f1f5f9]",
    iconColor: "text-[#475569]",
    ctaClass:
      "bg-[#f1f5f9] text-[#0f172a] hover:bg-[#e2e8f0] border border-[#e5e7eb]",
    features: [
      "Up to 3 repos monitored",
      "Telegram real-time alerts",
      "Stars, forks & issues tracking",
      "Basic analytics dashboard",
      "GitHub App integration",
      "Community support",
    ],
  },
  {
    name: "Pro",
    icon: Star,
    price: "$7",
    period: "per month",
    tagline: "For developers who need deeper insights.",
    cta: "Start Pro — $7/mo",
    href: "/register?plan=pro",
    featured: true,
    iconBg: "bg-violet-600",
    iconColor: "text-white",
    ctaClass: "bg-[#0f172a] text-white hover:bg-[#1e293b] shadow-lg",
    features: [
      "Up to 25 repos monitored",
      "Everything in Starter",
      "Advanced analytics & charts",
      "Contributor engagement tools",
      "Priority Telegram delivery",
      "Email digest reports",
      "Priority support",
    ],
  },
  {
    name: "Team",
    icon: Crown,
    price: "$20",
    period: "per month",
    tagline: "For orgs and large-scale monitoring.",
    cta: "Start Team — $20/mo",
    href: "/register?plan=team",
    featured: false,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    ctaClass:
      "bg-[#f1f5f9] text-[#0f172a] hover:bg-[#e2e8f0] border border-[#e5e7eb]",
    features: [
      "Unlimited repos",
      "Everything in Pro",
      "5+ team member seats",
      "Custom webhook integrations",
      "Full API access",
      "White-label dashboard",
      "Dedicated support",
      "99.9% SLA guarantee",
    ],
  },
];

export default function Pricing() {
  const headerRef = useRef(null);
  const inView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          className="text-center mb-16"
        >
          {/* <span className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-violet-600 bg-violet-50 border border-violet-100 px-3 py-1 rounded-full mb-4">
            Pricing
          </span> */}
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0f172a] tracking-tight leading-tight mb-4">
            Simple transparent pricing
          </h2>
          <p className="text-[#475569] text-lg max-w-xl mx-auto">
            Start free forever. Upgrade only when you need more power.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {PLANS.map((plan, i) => {
            const ref = useRef(null);
            const cardInView = useInView(ref, { once: true, margin: "-60px" });
            const Icon = plan.icon;

            return (
              <motion.div
                key={plan.name}
                ref={ref}
                initial={{ opacity: 0, y: 36 }}
                animate={cardInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: i * 0.1 }}
                className={`relative flex flex-col rounded-2xl border p-8 transition-all duration-300 ${
                  plan.featured
                    ? "border-violet-200 shadow-[0_8px_40px_-4px_rgba(139,92,246,0.18)] scale-[1.03] bg-white"
                    : "border-[#e5e7eb] bg-[#f8fafc] hover:shadow-md"
                }`}
              >
                {plan.featured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-violet-600 text-white shadow-md">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Icon + Name */}
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className={`w-10 h-10 rounded-xl ${plan.iconBg} flex items-center justify-center`}
                  >
                    <Icon className={`w-5 h-5 ${plan.iconColor}`} />
                  </div>
                  <span className="font-bold text-lg text-[#0f172a]">
                    {plan.name}
                  </span>
                </div>

                {/* Price */}
                <div className="mb-2">
                  <span className="text-5xl font-extrabold text-[#0f172a] tracking-tight">
                    {plan.price}
                  </span>
                  <span className="text-[#94a3b8] text-sm font-medium ml-1">
                    /{plan.period}
                  </span>
                </div>
                <p className="text-[#475569] text-sm mb-8 leading-relaxed">
                  {plan.tagline}
                </p>

                {/* CTA */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mb-8"
                >
                  <Link
                    href={plan.href}
                    className={`w-full flex items-center justify-center py-3 rounded-xl font-bold text-sm transition-all duration-200 ${plan.ctaClass}`}
                  >
                    {plan.cta}
                  </Link>
                </motion.div>

                {/* Features */}
                <ul className="space-y-3 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <div
                        className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${plan.featured ? "bg-violet-600" : "bg-[#0f172a]"}`}
                      >
                        <Check
                          className="w-2.5 h-2.5 text-white"
                          strokeWidth={3}
                        />
                      </div>
                      <span className="text-[#475569] text-sm leading-snug">
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="text-center text-[#94a3b8] text-sm mt-10"
        >
          All plans include SSL, uptime monitoring, and a{" "}
          <span className="text-[#475569] font-medium">
            30-day money-back guarantee
          </span>
          . Cancel anytime.
        </motion.p>
      </div>
    </section>
  );
}
