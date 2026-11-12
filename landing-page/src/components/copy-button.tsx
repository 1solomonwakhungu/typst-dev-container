import { CheckIcon, CopyIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils'

async function writeToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    // Clipboard API can be unavailable (older browsers, denied permission).
    const field = document.createElement('textarea')
    field.value = text
    field.setAttribute('readonly', '')
    field.style.position = 'fixed'
    field.style.opacity = '0'
    document.body.appendChild(field)
    field.select()
    let copied = false
    try {
      copied = document.execCommand('copy')
    } catch {
      copied = false
    }
    field.remove()
    return copied
  }
}

export function CopyButton({
  text,
  label = 'Copy',
  compact = false,
  className,
}: {
  text: string
  label?: string
  /** Icon only below the `sm` breakpoint, for tight rows. */
  compact?: boolean
  className?: string
}) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  async function handleClick() {
    if (!(await writeToClipboard(text))) return
    setCopied(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setCopied(false), 1800)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={copied ? 'Copied' : label}
      data-copied={copied || undefined}
      className={cn(
        'group/copy relative inline-flex h-8 shrink-0 items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2 text-xs font-medium text-zinc-300 transition-colors duration-200',
        'hover:border-white/20 hover:bg-white/10 hover:text-zinc-50 active:translate-y-px',
        'data-copied:border-teal-400/40 data-copied:bg-teal-400/10 data-copied:text-teal-300',
        className,
      )}
    >
      <span className="relative size-3.5">
        <CopyIcon
          aria-hidden
          className="absolute inset-0 size-3.5 transition-all duration-200 group-data-copied/copy:scale-50 group-data-copied/copy:opacity-0"
        />
        <CheckIcon
          aria-hidden
          className="absolute inset-0 size-3.5 scale-50 opacity-0 transition-all duration-200 group-data-copied/copy:scale-100 group-data-copied/copy:opacity-100"
        />
      </span>
      <span aria-hidden className={cn('min-w-10 text-left', compact && 'hidden sm:inline')}>
        {copied ? 'Copied' : 'Copy'}
      </span>
      <span role="status" className="sr-only">
        {copied ? 'Copied to clipboard' : ''}
      </span>
    </button>
  )
}
