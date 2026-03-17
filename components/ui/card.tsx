import { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  glow?: 'green' | 'cyan' | 'none'
  hover?: boolean
}

export function Card({ className, children, glow = 'none', hover = false, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-xl bg-[#0f1318] border border-[#21262d] p-6',
        hover && 'transition-all duration-300 hover:-translate-y-1 hover:border-[#484f58] cursor-pointer',
        glow === 'green' && 'shadow-[0_0_30px_rgba(57,211,83,0.12)] border-[#39d353]/20',
        glow === 'cyan'  && 'shadow-[0_0_30px_rgba(0,212,255,0.12)]  border-[#00d4ff]/20',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardTitle({ className, children, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn('font-[Syne] font-semibold text-[#e6edf3] text-lg', className)} {...props}>
      {children}
    </h3>
  )
}

export function CardDescription({ className, children, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn('text-sm text-[#8b949e] mt-1 leading-relaxed', className)} {...props}>
      {children}
    </p>
  )
}
