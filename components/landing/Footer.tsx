"use client";

import { motion } from "framer-motion";
import {
 Github, MessageCircle, Mail,
  ArrowRight, GitBranch,
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] text-white">

      {/* CTA Banner */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-3xl font-extrabold tracking-tight mb-2">
              Start monitoring your repos today.{" "}
              <span className="bg-blue-400 bg-clip-text text-transparent">
                It's free.
              </span>
            </h3>
            <p className="text-white/50 text-base">
              Join thousands of developers already using github24.
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-[#0f172a] font-bold text-sm hover:bg-[#f1f5f9] transition-colors shadow-lg"
              >
                Get Started Free
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/20 text-white/80 font-semibold text-sm hover:border-white/40 hover:text-white transition-all duration-200"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>

      {/* Footer links */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                <GitBranch className="w-4 h-4 text-[#0f172a]" strokeWidth={2.5} />
              </div>
              <span className="font-extrabold text-lg tracking-tight">github24</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed">
              Real-time GitHub monitoring and Telegram alerts for developers who care about their projects.
            </p>
          </div>

          {[
            { title: "Product",  links: ["Features", "Pricing", "Changelog", "Roadmap"] },
            { title: "Company",  links: ["About", "Blog", "Careers", "Contact"] },
            { title: "Legal",    links: ["Privacy Policy", "Terms of Service", "Cookie Policy"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-white/30 mb-4">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-sm text-white/50 hover:text-white transition-colors duration-200">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-sm">
            © {new Date().getFullYear()} github24. Built with ❤️ for developers.
          </p>
          <div className="flex items-center gap-5">
            {[Github, MessageCircle, Mail].map((Icon, i) => (
              <Link key={i} href="#" className="text-white/30 hover:text-white transition-colors">
                <Icon className="w-4 h-4" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
