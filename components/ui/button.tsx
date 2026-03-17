'use client'

import { forwardRef, ButtonHTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  [
    // base layout
    'inline-flex items-center justify-center gap-2',
    'rounded-lg font-[family-name:var(--font-syne)] font-semibold',
    'transition-all duration-200 ease-out',
    'select-none cursor-pointer whitespace-nowrap',
    // focus ring
    'focus-visible:outline-none focus-visible:ring-2',
    'focus-visible:ring-[#39d353] focus-visible:ring-offset-2',
    'focus-visible:ring-offset-[#080b0f]',
    // disabled
    'disabled:pointer-events-none disabled:opacity-40 disabled:cursor-not-allowed',
  ].join(' '),
  {
    variants: {
      variant: {
        primary: [
          'bg-[#39d353] text-[#080b0f]',
          'hover:brightness-110',
          'hover:shadow-[0_0_32px_rgba(57,211,83,0.3)]',
          'active:scale-[0.97] active:brightness-95',
        ].join(' '),

        secondary: [
          'bg-[#161b22] text-[#e6edf3]',
          'border border-[#21262d]',
          'hover:border-[#39d353] hover:text-[#39d353] hover:bg-[#161b22]',
          'active:scale-[0.97]',
        ].join(' '),

        ghost: [
          'bg-transparent text-[#8b949e]',
          'hover:text-[#e6edf3] hover:bg-[#161b22]',
          'active:scale-[0.97]',
        ].join(' '),

        outline: [
          'bg-transparent text-[#39d353]',
          'border border-[#39d353]',
          'hover:bg-[#39d353] hover:text-[#080b0f]',
          'active:scale-[0.97]',
        ].join(' '),

        cyan: [
          'bg-[#00d4ff] text-[#080b0f]',
          'hover:brightness-110',
          'hover:shadow-[0_0_32px_rgba(0,212,255,0.3)]',
          'active:scale-[0.97]',
        ].join(' '),

        danger: [
          'bg-[#f78166] text-[#080b0f]',
          'hover:brightness-110',
          'hover:shadow-[0_0_24px_rgba(247,129,102,0.3)]',
          'active:scale-[0.97]',
        ].join(' '),

        glass: [
          'bg-white/5 text-[#e6edf3]',
          'border border-white/10',
          'backdrop-blur-md',
          'hover:bg-white/10 hover:border-white/20',
          'active:scale-[0.97]',
        ].join(' '),
      },

      size: {
        // height / horizontal padding / font size / letter spacing
        xs:   'h-7  px-3   text-xs  tracking-wide  gap-1.5',
        sm:   'h-9  px-4   text-xs  tracking-wide  gap-2',
        md:   'h-11 px-5   text-sm  tracking-wide  gap-2',
        lg:   'h-12 px-7   text-base tracking-wide gap-2.5',
        xl:   'h-14 px-9   text-lg  tracking-wide  gap-3',
        // icon-only — perfect square, no text
        icon:    'h-10 w-10 p-0',
        'icon-sm': 'h-8  w-8  p-0',
        'icon-lg': 'h-12 w-12 p-0',
      },
    },

    defaultVariants: {
      variant: 'primary',
      size:    'md',
    },
  }
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, children, disabled, ...props }, ref) => (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {/* Spinner — shown when loading, replaces leading icon slot */}
      {loading && (
        <svg
          className="animate-spin h-4 w-4 flex-shrink-0"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12" cy="12" r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      )}
      {children}
    </button>
  )
)

Button.displayName = 'Button'
export { Button, buttonVariants }