'use client'

import { useRef } from 'react'
import { motion, useInView, cubicBezier } from 'framer-motion';
import { Card, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const FEATURES = [
  {
    icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>,
    iconColor: 'text-[#39d353]', iconBg: 'bg-[#39d353]/10',
    badge: { label: 'Core', variant: 'green' as const },
    title: 'GitHub Integration',
    description: 'Connect any public or private repo with one click. Track all branches, monitor everything from stars to deployment events.',
    tags: ['Stars', 'Forks', 'Issues', 'PRs', 'Pushes'],
  },
  {
    icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-1.97 9.289c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.088 14.09l-2.95-.924c-.64-.203-.653-.64.136-.948l11.5-4.433c.534-.194 1.001.131.788.463z"/></svg>,
    iconColor: 'text-[#00d4ff]', iconBg: 'bg-[#00d4ff]/10',
    badge: { label: 'Realtime', variant: 'cyan' as const },
    title: 'Telegram Alerts',
    description: 'Instant Telegram messages the moment something happens on your repos. Rich formatted messages with full context and contributor info.',
    tags: ['Instant', 'Rich format', 'Filters', 'Groups'],
  },
  {
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>,
    iconColor: 'text-[#bc8cff]', iconBg: 'bg-[#bc8cff]/10',
    badge: { label: 'Analytics', variant: 'purple' as const },
    title: 'Deep Analytics',
    description: 'Visual dashboards with trend charts, contributor leaderboards, activity heatmaps, and growth metrics. Understand your repo at a glance.',
    tags: ['Charts', 'Heatmaps', 'Leaderboards', 'CSV'],
  },
  {
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>,
    iconColor: 'text-[#f78166]', iconBg: 'bg-[#f78166]/10',
    badge: { label: 'Outreach', variant: 'orange' as const },
    title: 'Contact Contributors',
    description: 'Reach users who starred, forked, or opened issues on your repos. Build community with built-in outreach tools — no third-party CRM needed.',
    tags: ['Star outreach', 'Fork contact', 'Bulk message'],
  },
  {
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>,
    iconColor: 'text-[#39d353]', iconBg: 'bg-[#39d353]/10',
    badge: { label: 'Live', variant: 'green' as const },
    title: 'Realtime Dashboard',
    description: 'Your command center. Events flowing in live — every push, comment, review, and deployment. Filter, search, and export any data.',
    tags: ['Live feed', 'Search', 'History', 'WebSocket'],
  },
  {
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>,
    iconColor: 'text-[#00d4ff]', iconBg: 'bg-[#00d4ff]/10',
    badge: { label: 'Security', variant: 'cyan' as const },
    title: 'Secure & Private',
    description: 'OAuth-only GitHub login. Tokens encrypted at rest. Webhook secrets secured. GDPR-compliant data handling by default.',
    tags: ['OAuth 2.0', 'Encrypted', 'GDPR', 'No plaintext'],
  },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}
const item = {
  hidden:  { opacity: 0, y: 32 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.5, 
      ease: cubicBezier(0.22, 1, 0.36, 1) // ✅ wrap your array here
    } 
  },
}
export default function FeaturesSection() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="features" className="py-24 relative">
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge variant="cyan" className="mb-4">Features</Badge>
          <h2 className="font-[Syne] font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#e6edf3] mb-4">
            Everything you need to{' '}
            <span className="gradient-text-green">own your GitHub</span>
          </h2>
          <p className="text-[#8b949e] text-lg max-w-2xl mx-auto">
            From realtime event tracking to deep contributor analytics — full visibility without complexity.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {FEATURES.map(f => (
            <motion.div key={f.title} variants={item}>
              <Card hover className="h-full flex flex-col gap-4 group">
                <div className="flex items-start justify-between">
                  <div className={`w-12 h-12 rounded-xl ${f.iconBg} ${f.iconColor} flex items-center justify-center`}>
                    {f.icon}
                  </div>
                  <Badge variant={f.badge.variant}>{f.badge.label}</Badge>
                </div>
                <div>
                  <CardTitle className="mb-2 group-hover:text-[#39d353] transition-colors">{f.title}</CardTitle>
                  <CardDescription>{f.description}</CardDescription>
                </div>
                <div className="flex flex-wrap gap-2 mt-auto pt-2">
                  {f.tags.map(tag => (
                    <span key={tag} className="text-xs font-mono text-[#484f58] bg-[#161b22] border border-[#21262d] rounded-md px-2 py-0.5">
                      {tag}
                    </span>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
