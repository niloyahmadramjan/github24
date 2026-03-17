import { HTMLAttributes, ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full font-mono text-xs font-medium px-2.5 py-0.5 border',
  {
    variants: {
      variant: {
        green:   'bg-[#39d353]/10  border-[#39d353]/30  text-[#39d353]',
        cyan:    'bg-[#00d4ff]/10  border-[#00d4ff]/30  text-[#00d4ff]',
        orange:  'bg-[#f78166]/10  border-[#f78166]/30  text-[#f78166]',
        purple:  'bg-[#bc8cff]/10  border-[#bc8cff]/30  text-[#bc8cff]',
        default: 'bg-[#161b22]     border-[#21262d]      text-[#8b949e]',
      },
    },
    defaultVariants: { variant: 'default' },
  }
)

interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean
  children: ReactNode
}

export function Badge({ className, variant, dot, children, ...props }: BadgeProps) {
  const dotColor: Record<string, string> = {
    green: 'bg-[#39d353]', cyan: 'bg-[#00d4ff]',
    orange: 'bg-[#f78166]', purple: 'bg-[#bc8cff]', default: 'bg-[#484f58]',
  }
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props}>
      {dot && (
        <span className={cn('w-1.5 h-1.5 rounded-full animate-pulse', dotColor[variant ?? 'default'])} />
      )}
      {children}
    </span>
  )
}
