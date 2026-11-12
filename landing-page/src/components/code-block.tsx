import type { ReactNode } from 'react'

import { CopyButton } from '@/components/copy-button'
import { cn } from '@/lib/utils'

type Lang = 'shell' | 'plain'

function ShellLines({ code }: { code: string }) {
  const lines = code.split('\n')
  return lines.map((line, index) => {
    const continued = index > 0 && lines[index - 1].trimEnd().endsWith('\\')
    const isComment = line.trimStart().startsWith('#')
    const isBlank = line.trim() === ''
    return (
      <span key={index} className="block">
        {isBlank ? (
          '​'
        ) : isComment ? (
          <span className="text-zinc-500">{line}</span>
        ) : (
          <>
            <span aria-hidden className="mr-3 select-none text-teal-400/70">
              {continued ? ' ' : '$'}
            </span>
            {line}
          </>
        )}
      </span>
    )
  })
}

export function CodeBlock({
  code,
  title,
  lang = 'shell',
  children,
  className,
}: {
  /** The exact text that gets copied. */
  code: string
  title: string
  lang?: Lang
  /** Optional pre-highlighted rendering. Falls back to `code`. */
  children?: ReactNode
  className?: string
}) {
  return (
    <figure
      className={cn(
        'group/code overflow-hidden rounded-xl border border-white/10 bg-zinc-900/70 transition-colors duration-300 hover:border-white/15',
        className,
      )}
    >
      <figcaption className="flex items-center justify-between gap-3 border-b border-white/10 py-1.5 pr-1.5 pl-4">
        <span className="truncate font-mono text-xs text-zinc-400">{title}</span>
        <CopyButton text={code} label={`Copy ${title}`} />
      </figcaption>
      <pre
        tabIndex={0}
        aria-label={title}
        className="overflow-x-auto p-4 font-mono text-[0.8125rem] leading-6 text-zinc-200"
      >
        <code>{children ?? (lang === 'shell' ? <ShellLines code={code} /> : code)}</code>
      </pre>
    </figure>
  )
}
