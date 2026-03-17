'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Badge } from '@/components/ui/badge'

const STEPS = [
  {
    n: '01', color: 'text-[#39d353]', border: 'border-[#39d353]/30', bg: 'bg-[#39d353]/5',
    title: 'Sign up free',
    desc: 'Create an account with email or connect via GitHub OAuth. No credit card, no setup fee — free forever.',
    detail: 'Under 30 seconds',
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>,
  },
  {
    n: '02', color: 'text-[#00d4ff]', border: 'border-[#00d4ff]/30', bg: 'bg-[#00d4ff]/5',
    title: 'Connect GitHub repos',
    desc: 'Authorize with OAuth. Select which repos to monitor — public, private, or all. Webhooks install automatically.',
    detail: 'All repo types',
    icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>,
  },
  {
    n: '03', color: 'text-[#bc8cff]', border: 'border-[#bc8cff]/30', bg: 'bg-[#bc8cff]/5',
    title: 'Link Telegram',
    desc: 'Start our Telegram bot and connect your account. Choose which events trigger notifications — fully customizable per repo.',
    detail: 'Works with groups',
    icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-1.97 9.289c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.088 14.09l-2.95-.924c-.64-.203-.653-.64.136-.948l11.5-4.433c.534-.194 1.001.131.788.463z"/></svg>,
  },
  {
    n: '04', color: 'text-[#f78166]', border: 'border-[#f78166]/30', bg: 'bg-[#f78166]/5',
    title: 'Monitor & Analyze',
    desc: 'Dashboard fills in realtime. View trends, analyze contributors, export data, and contact users who engaged.',
    detail: 'Realtime, always',
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>,
  },
]

export default function HowItWorksSection() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#00d4ff]/4 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge variant="purple" className="mb-4">How it works</Badge>
          <h2 className="font-[Syne] font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#e6edf3] mb-4">
            Up and running in{' '}
            <span className="gradient-text-green">under 2 minutes</span>
          </h2>
          <p className="text-[#8b949e] text-lg max-w-xl mx-auto">
            No complex setup. No webhooks to configure manually. Just connect and watch the data flow.
          </p>
        </motion.div>

        {/* connector line */}
        <div className="relative" ref={ref}>
          <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-[#39d353]/20 via-[#00d4ff]/40 to-[#f78166]/20" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 32 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className={`flex flex-col gap-5 rounded-xl border ${s.border} ${s.bg} p-6`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl ${s.bg} border ${s.border} ${s.color} flex items-center justify-center`}>
                    {s.icon}
                  </div>
                  <span className={`font-mono text-2xl font-bold ${s.color} opacity-30`}>{s.n}</span>
                </div>
                <div>
                  <h3 className="font-[Syne] font-semibold text-[#e6edf3] text-lg mb-2">{s.title}</h3>
                  <p className="text-[#8b949e] text-sm leading-relaxed">{s.desc}</p>
                </div>
                <div className={`mt-auto flex items-center gap-1.5 text-xs font-mono ${s.color}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse-glow" />
                  {s.detail}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
