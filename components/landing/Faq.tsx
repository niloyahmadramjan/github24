"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const FAQS = [
  {
    q: "Is Github24 really free?",
    a: "Yes — the Starter plan is genuinely free, forever. No credit card required. You can monitor up to 3 repos and receive unlimited Telegram notifications at no cost.",
  },
  {
    q: "How do I connect my GitHub repos?",
    a: "After signing up, you install our GitHub App on your account or organization. You then choose which repos to monitor — specific ones or all of them. Setup takes under 2 minutes.",
  },
  {
    q: "Which GitHub events can I track?",
    a: "You can monitor stars, forks, issues (opened, closed, commented), pull requests, releases, commits, and branch activity. Each event type can be individually toggled per repo.",
  },
  {
    q: "How fast are Telegram notifications delivered?",
    a: "Typically under 3 seconds from when the GitHub event fires. Our edge infrastructure runs globally to minimize latency. Pro and Team users get priority queue access.",
  },
  {
    q: "Can I contact users who starred or forked my repo?",
    a: "Yes — you can view profiles of users who interacted with your repo and reach out via GitHub, or track them in your dashboard for engagement analysis.",
  },
  {
    q: "Does it support multiple GitHub organizations?",
    a: "Pro plan supports one organization. The Team plan supports unlimited organizations and team members. All plans support personal GitHub accounts.",
  },
  {
    q: "Is my GitHub data secure?",
    a: "Absolutely. We use GitHub's official OAuth and App integration — we never store your credentials. All data is encrypted in transit and at rest. You can revoke access at any time.",
  },
  {
    q: "Can I use Github24 without Telegram?",
    a: "Yes — the analytics dashboard works independently. Telegram is optional but recommended for real-time alerts. Email digests are available on Pro and Team plans.",
  },
];

/* ─────────────────────────────────────────────
   SINGLE FAQ ITEM
───────────────────────────────────────────── */
function FAQItem({
  item,
  index,
}: {
  item: (typeof FAQS)[0];
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.05 }}
      className="border-b border-[#f1f5f9] last:border-0"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between py-5 text-left gap-4 group"
      >
        <span
          className={`font-semibold text-sm sm:text-base leading-snug transition-colors duration-200 ${
            open ? "text-violet-600" : "text-[#0f172a] group-hover:text-violet-600"
          }`}
        >
          {item.q}
        </span>

        <div
          className={`flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-all duration-300 mt-0.5 ${
            open
              ? "bg-violet-600 text-white rotate-0"
              : "bg-[#f1f5f9] text-[#475569] group-hover:bg-violet-50 group-hover:text-violet-600"
          }`}
        >
          {open ? (
            <Minus className="w-3 h-3 sm:w-3.5 sm:h-3.5" strokeWidth={2.5} />
          ) : (
            <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5" strokeWidth={2.5} />
          )}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="text-[#475569] text-sm leading-relaxed pb-5 pr-6 sm:pr-12">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   SECTION
───────────────────────────────────────────── */
export default function FAQ() {
  const headerRef = useRef(null);
  const inView = useInView(headerRef, { once: true, margin: "-80px" });

  // Split into two columns for desktop
  const half = Math.ceil(FAQS.length / 2);
  const colA = FAQS.slice(0, half);
  const colB = FAQS.slice(half);

  return (
    <section id="faq" className="py-20 sm:py-28 bg-[#f8fafc] w-full">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          className="text-center mb-12 sm:mb-16"
        >
          {/* <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-violet-600 bg-violet-50 border border-violet-100 px-3 py-1 rounded-full mb-5">
            <HelpCircle className="w-3.5 h-3.5" />
            FAQ
          </span> */}

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0f172a] tracking-tight leading-tight mb-4">
            Common questions,{" "}
            <span className="bg-gradient-to-r from-[#7f6aff] via-[#8b5cf6] to-[#3b82f6] bg-clip-text text-transparent">
              honest answers
            </span>
          </h2>
          <p className="text-[#475569] text-base sm:text-lg max-w-xl mx-auto">
            Everything you need to know before getting started.
          </p>
        </motion.div>

        {/* ── FAQ layout ──
              mobile/tablet : single full-width card
              lg+           : two-column side-by-side cards
        ── */}

        {/* Single column — mobile & tablet */}
        <div className="lg:hidden bg-white rounded-2xl border border-[#e5e7eb] shadow-sm px-4 sm:px-8 divide-y divide-[#f1f5f9]">
          {FAQS.map((faq, i) => (
            <FAQItem key={i} item={faq} index={i} />
          ))}
        </div>

        {/* Two columns — desktop */}
        <div className="hidden lg:grid grid-cols-2 gap-6">
          {/* Col A */}
          <div className="bg-white rounded-2xl border border-[#e5e7eb] shadow-sm px-8 divide-y divide-[#f1f5f9]">
            {colA.map((faq, i) => (
              <FAQItem key={i} item={faq} index={i} />
            ))}
          </div>
          {/* Col B */}
          <div className="bg-white rounded-2xl border border-[#e5e7eb] shadow-sm px-8 divide-y divide-[#f1f5f9]">
            {colB.map((faq, i) => (
              <FAQItem key={i} item={faq} index={i + half} />
            ))}
          </div>
        </div>

        {/* ── Bottom note ── */}
        {/* <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-10 sm:mt-14 text-center"
        >
          <p className="text-[#94a3b8] text-sm">
            Still have questions?{" "}
            <a
              href="#contact"
              className="text-violet-600 font-semibold hover:text-violet-700 transition-colors underline underline-offset-2"
            >
              Contact our team →
            </a>
          </p>
        </motion.div> */}
      </div>
    </section>
  );
}