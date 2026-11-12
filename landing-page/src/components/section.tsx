import type { ReactNode } from 'react'

import { Reveal } from '@/components/reveal'
import { cn } from '@/lib/utils'

/** Section headings carry a Typst heading marker (`=`) as a small nod to the markup. */
export function Section({
  id,
  title,
  intro,
  children,
  className,
}: {
  id: string
  title: string
  intro?: ReactNode
  children: ReactNode
  className?: string
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={cn('py-16 sm:py-24', className)}>
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <Reveal>
          <h2
            id={`${id}-title`}
            className="flex items-baseline gap-3 text-2xl font-semibold tracking-tight text-balance sm:text-3xl"
          >
            <span aria-hidden className="font-mono text-xl font-medium text-primary sm:text-2xl">
              =
            </span>
            {title}
          </h2>
          {intro ? (
            <p className="mt-3 max-w-2xl text-base leading-7 text-pretty text-muted-foreground">{intro}</p>
          ) : null}
        </Reveal>
        <div className="mt-8 sm:mt-10">{children}</div>
      </div>
    </section>
  )
}

export function InlineCode({ children }: { children: ReactNode }) {
  return (
    <code className="rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[0.85em] break-words text-zinc-200">
      {children}
    </code>
  )
}

export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="rounded-sm font-medium text-teal-300 underline decoration-teal-300/40 underline-offset-4 transition-colors hover:text-teal-200 hover:decoration-teal-200"
    >
      {children}
    </a>
  )
}
