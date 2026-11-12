import { CheckIcon, CopyIcon } from '@primer/octicons-react'
import { useEffect, useRef, useState } from 'react'

import styles from '../page.module.css'

async function writeToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    // The Clipboard API can be unavailable (older browsers, denied permission).
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

export function CopyButton({ text, label = 'Copy' }: { text: string; label?: string }) {
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
      className={styles.copyButton}
    >
      <span className={styles.copyIcons} aria-hidden>
        <CopyIcon size={16} className={styles.copyIconIdle} />
        <CheckIcon size={16} className={styles.copyIconDone} />
      </span>
      <span role="status" className={styles.visuallyHidden}>
        {copied ? 'Copied to clipboard' : ''}
      </span>
    </button>
  )
}
