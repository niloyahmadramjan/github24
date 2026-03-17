'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

/* ── Live ticker data ─────────────────────────────────────── */
const EVENTS = [
  { icon: '⭐', user: 'torvalds',    repo: 'linux',    action: 'starred' },
  { icon: '🍴', user: 'gvanrossum', repo: 'cpython',  action: 'forked' },
  { icon: '🐛', user: 'tj',         repo: 'express',  action: 'opened issue' },
  { icon: '🔀', user: 'sindresorhus',repo: 'awesome', action: 'pull request' },
  { icon: '⭐', user: 'yyx990803',  repo: 'vue',      action: 'starred' },
  { icon: '📦', user: 'addyosmani', repo: 'critical', action: 'pushed to' },
]

/* ── Terminal animation ───────────────────────────────────── */
const TERMINAL_LINES = [
  { text: '$ github24 connect --repo torvalds/linux', color: 'text-[#8b949e]' },
  { text: '✓ Connected to torvalds/linux',            color: 'text-[#39d353]' },
  { text: '✓ Webhook registered',                     color: 'text-[#39d353]' },
  { text: '⚡ Telegram alerts enabled',               color: 'text-[#00d4ff]' },
  { text: '→ Monitoring 6 event types...',            color: 'text-[#bc8cff]' },
  { text: '★ New star from @dhh  •  just now',        color: 'text-[#f78166]' },
]

const STATS = [
  { value: '48k+',  label: 'Repos' },
  { value: '2.4M',  label: 'Events' },
  { value: '890k',  label: 'Alerts' },
  { value: '12.4k', label: 'Users' },
]

function Terminal() {
  const [line, setLine] = useState(0)
  useEffect(() => {
    if (line < TERMINAL_LINES.length) {
      const t = setTimeout(() => setLine(l => l + 1), 650)
      return () => clearTimeout(t)
    }
  }, [line])

  return (
    <div className="rounded-xl border border-[#21262d] bg-[#0f1318] overflow-hidden shadow-[0_4px_32px_rgba(0,0,0,0.5)]">
      {/* title bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-[#21262d] bg-[#161b22]">
        <span className="w-3 h-3 rounded-full bg-[#f78166]/60" />
        <span className="w-3 h-3 rounded-full bg-[#39d353]/60" />
        <span className="w-3 h-3 rounded-full bg-[#00d4ff]/60" />
        <span className="ml-2 text-xs text-[#484f58] font-mono">github24 — terminal</span>
      </div>
      {/* body */}
      <div className="p-5 space-y-2 min-h-[200px]">
        {TERMINAL_LINES.slice(0, line).map((l, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className={`text-sm font-mono ${l.color}`}
          >
            {l.text}
          </motion.p>
        ))}
        {line < TERMINAL_LINES.length && (
          <span className="text-[#39d353] font-mono text-sm animate-blink">▋</span>
        )}
      </div>
    </div>
  )
}

function LiveTicker() {
  return (
    <div className="relative overflow-hidden border border-[#21262d] rounded-xl bg-[#0f1318]">
      <div className="absolute left-0 inset-y-0 w-12 bg-gradient-to-r from-[#0f1318] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 inset-y-0 w-12 bg-gradient-to-l from-[#0f1318] to-transparent z-10 pointer-events-none" />
      <div className="flex animate-ticker whitespace-nowrap py-3 gap-10 px-4">
        {[...EVENTS, ...EVENTS].map((e, i) => (
          <span key={i} className="inline-flex items-center gap-2 text-xs font-mono text-[#8b949e]">
            <span>{e.icon}</span>
            <span className="text-[#39d353]">{e.user}</span>
            <span className="text-[#484f58]">{e.action}</span>
            <span className="text-[#e6edf3]">{e.repo}</span>
            <span className="text-[#21262d] mx-1">•</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-24 pb-16 overflow-hidden">
      {/* bg */}
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#39d353]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-[#00d4ff]/4 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT */}
          <div className="flex flex-col gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Badge variant="green" dot>Free forever · No credit card</Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-[Syne] font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-[1.1] tracking-tight text-[#e6edf3]"
            >
              Monitor GitHub.{' '}
              <br className="hidden sm:block" />
              <span className="gradient-text-green">Get Alerted.</span>
              <br className="hidden sm:block" />
              Ship Faster.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-[#8b949e] leading-relaxed max-w-lg"
            >
              Track every star, fork, issue, and PR. Get instant{' '}
              <span className="text-[#00d4ff] font-medium">Telegram notifications</span> and{' '}
              <span className="text-[#39d353] font-medium">deep analytics</span> — all for free.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Link href="/register">
                <Button variant="primary" size="lg" className="w-full sm:w-auto">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  Connect GitHub — Free
                </Button>
              </Link>
              <a href="#how-it-works">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  How it works
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </Button>
              </a>
            </motion.div>

            {/* mini stats */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="grid grid-cols-4 gap-4 pt-2"
            >
              {STATS.map(s => (
                <div key={s.label} className="text-center sm:text-left">
                  <div className="font-[Syne] font-bold text-xl text-[#e6edf3]">{s.value}</div>
                  <div className="text-xs text-[#484f58] font-mono mt-0.5">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-4"
          >
            <Terminal />
            <LiveTicker />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
