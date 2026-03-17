// ─────────────────────────────────────────────────────────────────────────────
// IntegrationsSection.tsx
// src/components/landing/IntegrationsSection.tsx
// ─────────────────────────────────────────────────────────────────────────────
'use client'

import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'

const INTEGRATIONS = [
  {
    name: 'GitHub', status: 'live', color: 'text-[#e6edf3]', bg: 'bg-[#161b22]',
    icon: <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>,
    desc: 'Repos & webhooks',
  },
  {
    name: 'Telegram', status: 'live', color: 'text-[#00d4ff]', bg: 'bg-[#00d4ff]/10',
    icon: <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-1.97 9.289c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.088 14.09l-2.95-.924c-.64-.203-.653-.64.136-.948l11.5-4.433c.534-.194 1.001.131.788.463z"/></svg>,
    desc: 'Realtime alerts',
  },
  {
    name: 'Webhooks', status: 'live', color: 'text-[#bc8cff]', bg: 'bg-[#bc8cff]/10',
    icon: <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>,
    desc: 'Forward anywhere',
  },
  {
    name: 'Slack', status: 'soon', color: 'text-[#f78166]', bg: 'bg-[#f78166]/10',
    icon: <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/></svg>,
    desc: 'Workspace alerts',
  },
  {
    name: 'Discord', status: 'soon', color: 'text-[#bc8cff]', bg: 'bg-[#bc8cff]/10',
    icon: <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.031.056a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg>,
    desc: 'Channel routing',
  },
  {
    name: 'Email', status: 'soon', color: 'text-[#39d353]', bg: 'bg-[#39d353]/10',
    icon: <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>,
    desc: 'Weekly digests',
  },
]

export function IntegrationsSection() {
  return (
    <section id="integrations" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge variant="orange" className="mb-4">Integrations</Badge>
          <h2 className="font-[Syne] font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#e6edf3] mb-4">
            Works with your{' '}
            <span className="gradient-text-warm">favorite tools</span>
          </h2>
          <p className="text-[#8b949e] text-lg max-w-xl mx-auto">More integrations shipping soon.</p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {INTEGRATIONS.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              whileHover={{ y: -4 }}
              className="relative flex flex-col items-center gap-3 p-5 rounded-xl bg-[#0f1318] border border-[#21262d] hover:border-[#484f58] transition-all duration-300 group"
            >
              {item.status === 'soon'
                ? <span className="absolute top-2 right-2 text-[10px] font-mono text-[#484f58] bg-[#161b22] px-1.5 py-0.5 rounded">Soon</span>
                : <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#39d353] animate-pulse" />
              }
              <div className={`w-14 h-14 rounded-xl ${item.bg} ${item.color} flex items-center justify-center`}>{item.icon}</div>
              <div className="text-center">
                <div className="font-[Syne] font-semibold text-[#e6edf3] text-sm group-hover:text-[#39d353] transition-colors">{item.name}</div>
                <div className="text-[#484f58] text-xs mt-0.5">{item.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
