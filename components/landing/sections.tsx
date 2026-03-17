// ─── PricingSection ───────────────────────────────────────────────────────────
'use client'
import { motion , useInView} from 'framer-motion'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
// ─── StatsSection ─────────────────────────────────────────────────────────────
import { useEffect, useRef } from 'react'
// ─── FAQSection ───────────────────────────────────────────────────────────────
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'



const FREE_FEATURES = [
  'Unlimited repos monitored',
  'All event types tracked',
  'Telegram realtime notifications',
  'Full analytics dashboard',
  'Contributor contact tools',
  'Webhook forwarding',
  'CSV data export',
  'Realtime event feed (WebSocket)',
  'GitHub App integration',
  'API access',
  'Community support',
  'Forever free — no hidden fees',
]

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 relative">
      <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#39d353]/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge variant="green" dot className="mb-4">Pricing</Badge>
          <h2 className="font-[Syne] font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#e6edf3] mb-4">
            100% free.{' '}
            <span className="gradient-text-green">No asterisks.</span>
          </h2>
          <p className="text-[#8b949e] text-lg max-w-xl mx-auto">
            Developer tools should be free. GitHub24 doesn't charge for any feature, ever.
          </p>
        </motion.div>

        <div className="max-w-lg mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
            className="relative rounded-2xl border border-[#39d353]/30 bg-[#0f1318] overflow-hidden shadow-[0_0_40px_rgba(57,211,83,0.1)]"
          >
            <div className="h-1 w-full bg-gradient-to-r from-[#39d353] via-[#00d4ff] to-[#39d353]" />
            <div className="p-8 sm:p-10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <Badge variant="green" dot className="mb-2">Forever Free</Badge>
                  <h3 className="font-[Syne] font-extrabold text-2xl text-[#e6edf3]">Full Access</h3>
                </div>
                <div className="text-right">
                  <div className="font-[Syne] font-black text-5xl text-[#39d353]">$0</div>
                  <div className="text-[#484f58] text-sm font-mono">/ month</div>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-3 mb-8">
                {FREE_FEATURES.map(f => (
                  <div key={f} className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-[#39d353]/15 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-[#39d353]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-[#8b949e]">{f}</span>
                  </div>
                ))}
              </div>
              <Link href="/register" className="block">
                <Button variant="primary" size="xl" className="w-full">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  Get started with GitHub — Free
                </Button>
              </Link>
              <p className="text-center text-xs text-[#484f58] font-mono mt-4">No credit card · No trial · All features included</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}



const FAQS = [
  { q: 'Is GitHub24 really free?', a: 'Yes, completely. No plans, no tiers, no paywalls. Every feature is available to all users at no cost, forever.' },
  { q: 'Does it work with private repos?', a: 'Yes. When you authorize GitHub24 via OAuth you can grant access to public and private repos. We only read what you allow and never store your code.' },
  { q: 'How do Telegram notifications work?', a: 'Connect GitHub, then start our Telegram bot and link it to your account. Choose which event types and repos trigger notifications. Works with personal chats and groups.' },
  { q: 'What events are tracked?', a: 'Stars, Forks, Issues (opened/closed/commented), Pull Requests (opened/merged/closed), Pushes, Releases, Deployments, and Discussions.' },
  { q: 'Can I contact users who starred my repo?', a: 'Yes. The contributor outreach feature lets you view profiles of users who interacted and initiate contact using their public GitHub profile info.' },
  { q: 'Is my GitHub token secure?', a: 'We use GitHub OAuth — we never see your password. OAuth tokens are encrypted at rest (AES-256). We follow security best practices and never expose tokens in logs.' },
  { q: 'Can I connect multiple repos?', a: 'Yes, unlimited repos. Set different notification rules per repo and see all events in a unified dashboard.' },
]

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.05 }}
      className="border border-[#21262d] rounded-xl overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left hover:bg-[#161b22]/50 transition-colors group"
      >
        <span className="font-[Syne] font-medium text-[#e6edf3] group-hover:text-[#39d353] transition-colors text-sm sm:text-base">{q}</span>
        <motion.div animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.2 }} className="flex-shrink-0 w-5 h-5 text-[#484f58] group-hover:text-[#39d353] transition-colors">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-4 pt-1">
              <p className="text-[#8b949e] text-sm leading-relaxed border-t border-[#21262d] pt-4">{a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function FAQSection() {
  return (
    <section id="faq" className="py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge variant="default" className="mb-4">FAQ</Badge>
          <h2 className="font-[Syne] font-extrabold text-3xl sm:text-4xl text-[#e6edf3] mb-4">
            Frequently asked <span className="gradient-text-green">questions</span>
          </h2>
        </motion.div>
        <div className="flex flex-col gap-3">
          {FAQS.map((f, i) => <FAQItem key={f.q} q={f.q} a={f.a} index={i} />)}
        </div>
      </div>
    </section>
  )
}


// ─── CTASection ───────────────────────────────────────────────────────────────
export function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#39d353]/6 blur-[120px] rounded-full pointer-events-none" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-8"
        >
          <div className="flex items-center gap-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#39d353]/50" />
            <div className="w-2 h-2 rounded-full bg-[#39d353] animate-pulse" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#39d353]/50" />
          </div>
          <div>
            <h2 className="font-[Syne] font-black text-4xl sm:text-5xl lg:text-6xl text-[#e6edf3] leading-[1.1] mb-6">
              Your GitHub activity,{' '}
              <br className="hidden sm:block" />
              <span className="gradient-text-green">finally visible.</span>
            </h2>
            <p className="text-[#8b949e] text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
              Join thousands of developers who use GitHub24 to stay on top of their repos, engage with contributors, and ship with confidence.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link href="/register" className="w-full sm:w-auto">
              <Button variant="primary" size="xl" className="w-full sm:w-auto">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                Start free — no card needed
              </Button>
            </Link>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[#484f58] font-mono">
            {['12,400+ active users', '48k+ repos monitored', 'Always free'].map(t => (
              <span key={t} className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#39d353]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}



const STATS = [
  { target: 12400,   suffix: '+', label: 'Active Users',     desc: 'Developers worldwide',      icon: '👥', color: 'text-[#39d353]' },
  { target: 48291,   suffix: '+', label: 'Repos Monitored',  desc: 'Public & private',           icon: '📦', color: 'text-[#00d4ff]' },
  { target: 2400000, suffix: '+', label: 'Events Tracked',   desc: 'Stars, forks & more',       icon: '⚡', color: 'text-[#bc8cff]' },
  { target: 890000,  suffix: '+', label: 'Alerts Sent',      desc: 'Via Telegram & webhooks',   icon: '🔔', color: 'text-[#f78166]' },
]

function fmt(n: number) {
  if (n >= 1e6) return `${(n / 1e6).toFixed(1)}M`
  if (n >= 1e3) return `${(n / 1e3).toFixed(0)}k`
  return n.toLocaleString()
}

function Counter({ target }: { target: number }) {
  const [count, setCount] = useState(0)
  const ref    = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    const dur   = 2000
    const step  = (now: number) => {
      const p = Math.min((now - start) / dur, 1)
      const e = 1 - Math.pow(1 - p, 3)
      setCount(Math.floor(e * target))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, target])
  return <span ref={ref}>{fmt(count)}</span>
}

export function StatsSection() {
  return (
    <section className="py-20 border-y border-[#21262d] bg-[#0d1117]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((s, i) => (
            <motion.div key={s.label}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center flex flex-col items-center gap-2"
            >
              <span className="text-3xl">{s.icon}</span>
              <div className={`font-[Syne] font-black text-3xl sm:text-4xl lg:text-5xl ${s.color}`}>
                <Counter target={s.target} />{s.suffix}
              </div>
              <div className="font-[Syne] font-semibold text-[#e6edf3] text-sm sm:text-base">{s.label}</div>
              <div className="text-[#484f58] text-xs sm:text-sm">{s.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}



const LINKS = {
  Product: ['#features', '#how-it-works', '#integrations', '#pricing', '#faq'].map((h, i) => ({ label: ['Features', 'How it works', 'Integrations', 'Pricing', 'FAQ'][i], href: h })),
  Platform: ['/dashboard', '/repos', '/analytics', '/notifications'].map((h, i) => ({ label: ['Dashboard', 'Repos', 'Analytics', 'Notifications'][i], href: h })),
  Account:  ['/register', '/login', '/reset-password'].map((h, i) => ({ label: ['Sign up', 'Sign in', 'Reset password'][i], href: h })),
  Legal:    ['/privacy', '/terms'].map((h, i) => ({ label: ['Privacy', 'Terms'][i], href: h })),
}

export function Footer() {
  return (
    <footer className="border-t border-[#21262d] bg-[#0d1117]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group w-fit">
              <div className="w-8 h-8 rounded-lg bg-[#39d353] flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-4 h-4 text-[#080b0f]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </div>
              <span className="font-[Syne] font-bold text-xl text-[#e6edf3]">GitHub<span className="text-[#39d353]">24</span></span>
            </Link>
            <p className="text-[#8b949e] text-sm leading-relaxed max-w-xs mb-5">Realtime GitHub monitoring with Telegram alerts and deep analytics. Free forever.</p>
            <div className="flex gap-2">
              {[
                { label: 'GitHub',   href: 'https://github.com',   icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg> },
                { label: 'Telegram', href: 'https://t.me',         icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-1.97 9.289c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.088 14.09l-2.95-.924c-.64-.203-.653-.64.136-.948l11.5-4.433c.534-.194 1.001.131.788.463z"/></svg> },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  className="w-9 h-9 rounded-lg bg-[#161b22] border border-[#21262d] flex items-center justify-center text-[#484f58] hover:text-[#e6edf3] hover:border-[#484f58] transition-all duration-200">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([cat, links]) => (
            <div key={cat}>
              <h4 className="font-[Syne] font-semibold text-[#e6edf3] text-sm mb-4">{cat}</h4>
              <ul className="space-y-2.5">
                {links.map(l => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm text-[#8b949e] hover:text-[#e6edf3] transition-colors">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-[#21262d] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#484f58] text-sm font-mono">© {new Date().getFullYear()} GitHub24. Open source. Made with ♥ for developers.</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#39d353] animate-pulse" />
            <span className="text-xs font-mono text-[#484f58]">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
