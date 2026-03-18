"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Plus, Minus } from "lucide-react";

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
    a: "Yes — you can view the profiles of users who interacted with your repo and reach out to them via GitHub, or track them in your dashboard for engagement analysis.",
  },
  {
    q: "Does it support multiple GitHub organizations?",
    a: "Pro plan supports one organization. The Team plan supports unlimited organizations and team members. All plans support personal GitHub accounts.",
  },
  {
    q: "Is my GitHub data secure?",
    a: "Absolutely. We use GitHub's official OAuth and App integration — we never store your credentials. All data is encrypted in transit and at rest. You can revoke access at any time from your GitHub settings.",
  },
];

function FAQItem({ item, index }: { item: (typeof FAQS)[0]; index: number }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="border-b border-[#f1f5f9] last:border-0"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-4 group"
      >
        <span className="text-[#0f172a] font-semibold text-base group-hover:text-violet-600 transition-colors duration-200 leading-snug">
          {item.q}
        </span>
        <div
          className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
            open
              ? "bg-violet-600 text-white"
              : "bg-[#f1f5f9] text-[#475569] group-hover:bg-violet-50 group-hover:text-violet-600"
          }`}
        >
          {open ? (
            <Minus className="w-3.5 h-3.5" strokeWidth={2.5} />
          ) : (
            <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
          )}
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="text-[#475569] text-sm leading-relaxed pb-5 pr-12">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const headerRef = useRef(null);
  const inView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section id="faq" className="py-20 bg-[#f8fafc]">
      <div className="max-w-3xl mx-auto px-6">

        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          className="text-center mb-14"
        >
          {/* <span className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-violet-600 bg-violet-50 border border-violet-100 px-3 py-1 rounded-full mb-4">
            FAQ
          </span> */}
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0f172a] tracking-tight leading-tight mb-4">
            Common questions,{" "}
            <br/>
            <span className="bg-[#3b82f6] bg-clip-text text-transparent ">
              honest answers
            </span>
          </h2>
          <p className="text-[#475569] text-lg">
            Everything you need to know before getting started.
          </p>
        </motion.div>

        {/* Accordion */}
        <div className="bg-white rounded-2xl border border-[#e5e7eb] shadow-sm px-8 divide-y divide-[#f1f5f9]">
          {FAQS.map((faq, i) => (
            <FAQItem key={i} item={faq} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}