'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Button } from '../ui/button'

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Integrations', href: '#integrations' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
]

const GithubIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
)

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  // Handle scroll events for both navbar style and active section tracking
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      
      // Update active section based on scroll position
      const sections = NAV_LINKS.map(link => link.href.substring(1))
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      setActiveSection(currentSection || '')
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on resize (if screen becomes desktop)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileOpen])

  // Handle smooth scroll for anchor links
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
      setMobileOpen(false)
    }
  }

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ 
          duration: 0.5, 
          ease: [0.25, 0.1, 0.25, 1],
          type: "tween"
        }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled 
            ? 'bg-[#0d1117]/90 backdrop-blur-xl border-b border-[#30363d] shadow-lg' 
            : 'bg-transparent'
        )}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20">

          {/* Logo with hover effect */}
          <Link 
            href="/" 
            className="flex items-center gap-2.5 group relative"
            aria-label="GitHub24 Home"
          >
            <div className="relative">
              <div className="w-8 h-8 md:w-9 md:h-9 rounded-xl bg-gradient-to-br from-[#39d353] to-[#2ea44f] flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-[#39d353]/20">
                <GithubIcon />
              </div>
              <div className="absolute -inset-1 bg-[#39d353]/20 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span className="font-bold text-xl md:text-2xl text-[#e6edf3] tracking-tight">
              GitHub<span className="text-[#39d353]">24</span>
            </span>
          </Link>

          {/* Desktop navigation links with active state */}
          <ul className="hidden md:flex items-center gap-1 lg:gap-2">
            {NAV_LINKS.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className={cn(
                    'relative px-3 lg:px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                    activeSection === link.href.substring(1)
                      ? 'text-[#e6edf3] bg-[#1f2937]'
                      : 'text-[#8b949e] hover:text-[#e6edf3] hover:bg-[#1f2937]/50'
                  )}
                >
                  {link.label}
                  {activeSection === link.href.substring(1) && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#39d353] rounded-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/login">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-[#8b949e] hover:text-[#e6edf3] hover:bg-[#1f2937] px-4"
              >
                Sign in
              </Button>
            </Link>
            <Link href="/register">
              <Button 
                variant="primary" 
                size="sm"
                className="bg-gradient-to-r from-[#39d353] to-[#2ea44f] hover:from-[#2ea44f] hover:to-[#39d353] text-white font-medium px-5 shadow-lg shadow-[#39d353]/20 hover:shadow-xl hover:shadow-[#39d353]/30 transition-all duration-300"
              >
                Get started free
                <svg className="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Button>
            </Link>
          </div>

          {/* Mobile menu button with animation */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[#1f2937] transition-colors focus:outline-none focus:ring-2 focus:ring-[#39d353]/50"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            <div className="w-5 flex flex-col gap-1.5">
              <span className={cn(
                'block h-0.5 bg-[#e6edf3] transform transition-all duration-300 ease-in-out',
                mobileOpen && 'rotate-45 translate-y-2'
              )} />
              <span className={cn(
                'block h-0.5 bg-[#e6edf3] transition-all duration-300 ease-in-out',
                mobileOpen && 'opacity-0 scale-0'
              )} />
              <span className={cn(
                'block h-0.5 bg-[#e6edf3] transform transition-all duration-300 ease-in-out',
                mobileOpen && '-rotate-45 -translate-y-2'
              )} />
            </div>
          </button>
        </nav>
      </motion.header>

      {/* Mobile menu with improved animation and accessibility */}
      <AnimatePresence mode="wait">
        {mobileOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />
            
            {/* Menu panel */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="fixed top-16 left-0 right-0 z-40 md:hidden mx-4 mt-2"
            >
              <div className="bg-[#0d1117]/95 backdrop-blur-xl border border-[#30363d] rounded-2xl shadow-2xl overflow-hidden">
                <div className="px-4 py-3 flex flex-col gap-1 max-h-[calc(100vh-6rem)] overflow-y-auto">
                  
                  {/* Navigation links */}
                  {NAV_LINKS.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <a
                        href={link.href}
                        onClick={(e) => handleSmoothScroll(e, link.href)}
                        className={cn(
                          'block px-4 py-3.5 text-base font-medium rounded-xl transition-all duration-200',
                          activeSection === link.href.substring(1)
                            ? 'text-[#e6edf3] bg-[#1f2937] border-l-4 border-[#39d353]'
                            : 'text-[#8b949e] hover:text-[#e6edf3] hover:bg-[#1f2937]/50'
                        )}
                      >
                        {link.label}
                      </a>
                    </motion.div>
                  ))}
                  
                  {/* CTA buttons */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="mt-4 pt-4 border-t border-[#30363d] flex flex-col gap-2"
                  >
                    <Link href="/login" onClick={() => setMobileOpen(false)}>
                      <Button 
                        variant="secondary" 
                        size="lg" 
                        className="w-full bg-[#1f2937] hover:bg-[#2d3748] text-[#e6edf3] border border-[#30363d] font-medium"
                      >
                        Sign in
                      </Button>
                    </Link>
                    <Link href="/register" onClick={() => setMobileOpen(false)}>
                      <Button 
                        variant="primary" 
                        size="lg" 
                        className="w-full bg-gradient-to-r from-[#39d353] to-[#2ea44f] hover:from-[#2ea44f] hover:to-[#39d353] text-white font-medium shadow-lg"
                      >
                        Get started free
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Button>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[100] bg-[#39d353] text-black px-4 py-2 rounded-lg"
      >
        Skip to main content
      </a>
    </>
  )
}