'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

/* ──────────────────────────────────────────────────────────────
   Drop-in: wire useChangePassword() from @/hooks/useAuth
   ────────────────────────────────────────────────────────────── */

type Step = 'request' | 'sent' | 'change' | 'done'

function PasswordInput({ label, placeholder }: { label: string; placeholder: string }) {
  const [show, setShow] = useState(false)
  return (
    <Input
      label={label} type={show ? 'text' : 'password'} placeholder={placeholder}
      rightElement={
        <button type="button" onClick={() => setShow(!show)} tabIndex={-1} className="text-[#484f58] hover:text-[#8b949e] transition-colors">
          {show ? (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
            </svg>
          )}
        </button>
      }
    />
  )
}

/* ── Step: Request reset ──────────────────────────────────────── */
function RequestStep({ onNext }: { onNext: (email: string) => void }) {
  const [loading, setLoading] = useState(false)
  const [email,   setEmail]   = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    setLoading(false)
    onNext(email)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        label="Email address" type="email" value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="you@example.com" autoComplete="email"
        hint="We'll send a reset link to this email."
        leftIcon={
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
          </svg>
        }
      />
      <Button type="submit" variant="primary" size="lg" className="w-full" loading={loading}>
        {loading ? 'Sending…' : 'Send reset link'}
      </Button>
    </form>
  )
}

/* ── Step: Email sent ─────────────────────────────────────────── */
function SentStep({ email, onSetNew }: { email: string; onSetNew: () => void }) {
  return (
    <div className="flex flex-col items-center gap-5 text-center py-2">
      <div className="w-16 h-16 rounded-full bg-[#39d353]/15 flex items-center justify-center">
        <svg className="w-8 h-8 text-[#39d353]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
        </svg>
      </div>
      <div>
        <h3 className="font-[Syne] font-bold text-lg text-[#e6edf3] mb-1">Check your inbox</h3>
        <p className="text-sm text-[#8b949e]">
          We sent a reset link to <span className="text-[#e6edf3] font-medium">{email}</span>.
          <br />It expires in 30 minutes.
        </p>
      </div>
      <p className="text-xs text-[#484f58] font-mono">Didn&apos;t receive it? Check your spam folder.</p>
      <button onClick={onSetNew} className="text-xs text-[#484f58] font-mono hover:text-[#8b949e] transition-colors underline underline-offset-2">
        Already have a reset code? Set new password →
      </button>
    </div>
  )
}

/* ── Step: Set new password ───────────────────────────────────── */
function ChangeStep({ onDone }: { onDone: () => void }) {
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false)
    onDone()
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      {error && (
        <div className="px-4 py-3 rounded-lg bg-[#f78166]/10 border border-[#f78166]/30 text-sm text-[#f78166] flex items-center gap-2">
          <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
          </svg>
          {error}
        </div>
      )}
      <PasswordInput label="Current password"    placeholder="Your current password" />
      <PasswordInput label="New password"        placeholder="Min 8 chars, uppercase, number" />
      <PasswordInput label="Confirm new password" placeholder="Repeat new password" />
      <Button type="submit" variant="primary" size="lg" className="w-full" loading={loading}>
        {loading ? 'Updating…' : 'Update password'}
      </Button>
    </form>
  )
}

/* ── Step: Done ───────────────────────────────────────────────── */
function DoneStep() {
  return (
    <div className="flex flex-col items-center gap-5 text-center py-2">
      <div className="w-16 h-16 rounded-full bg-[#39d353]/15 flex items-center justify-center">
        <svg className="w-8 h-8 text-[#39d353]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
        </svg>
      </div>
      <div>
        <h3 className="font-[Syne] font-bold text-lg text-[#e6edf3] mb-1">Password updated!</h3>
        <p className="text-sm text-[#8b949e]">Your password has been changed successfully.</p>
      </div>
      <Link href="/login">
        <Button variant="primary" size="md">Back to sign in</Button>
      </Link>
    </div>
  )
}

/* ── Main page ────────────────────────────────────────────────── */
const HEADINGS: Record<Step, { title: string; sub: string }> = {
  request: { title: 'Reset password',   sub: 'Enter your email to receive a reset link' },
  sent:    { title: 'Email sent',        sub: 'Follow the link in your inbox' },
  change:  { title: 'Change password',   sub: 'Update your account password' },
  done:    { title: 'All done',          sub: 'Your password has been updated' },
}

export default function ResetPasswordPage() {
  const [step,  setStep]  = useState<Step>('request')
  const [email, setEmail] = useState('')

  return (
    <div className="min-h-screen bg-[#080b0f] flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[400px] bg-[#00d4ff]/4 blur-[120px] rounded-full pointer-events-none" />

      <header className="relative z-10 flex items-center justify-between px-6 py-5 max-w-7xl mx-auto w-full">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-[#39d353] flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_16px_rgba(57,211,83,0.3)]">
            <svg className="w-4 h-4 text-[#080b0f]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </div>
          <span className="font-[Syne] font-bold text-xl text-[#e6edf3]">GitHub<span className="text-[#39d353]">24</span></span>
        </Link>
        <Link href="/" className="text-sm text-[#8b949e] hover:text-[#e6edf3] transition-colors flex items-center gap-1.5">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
          </svg>
          Back to home
        </Link>
      </header>

      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md"
        >
          <div className="rounded-2xl border border-[#21262d] bg-[#0f1318] p-8 sm:p-10 shadow-[0_4px_40px_rgba(0,0,0,0.5)]">
            <div className="text-center mb-8">
              <h1 className="font-[Syne] font-extrabold text-2xl sm:text-3xl text-[#e6edf3] mb-2">{HEADINGS[step].title}</h1>
              <p className="text-[#8b949e] text-sm">{HEADINGS[step].sub}</p>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.22 }}
              >
                {step === 'request' && <RequestStep onNext={e => { setEmail(e); setStep('sent') }} />}
                {step === 'sent'    && <SentStep email={email} onSetNew={() => setStep('change')} />}
                {step === 'change'  && <ChangeStep onDone={() => setStep('done')} />}
                {step === 'done'    && <DoneStep />}
              </motion.div>
            </AnimatePresence>

            {step !== 'done' && (
              <p className="text-center text-sm text-[#484f58] mt-6">
                Remember it?{' '}
                <Link href="/login" className="text-[#39d353] hover:opacity-80 font-medium transition-opacity">Back to sign in</Link>
              </p>
            )}
          </div>
        </motion.div>
      </main>
    </div>
  )
}
