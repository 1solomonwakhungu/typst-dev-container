import type { ReactNode } from 'react'

import styles from '../page.module.css'
import { CopyButton } from './CopyButton'

function ShellLines({ code }: { code: string }) {
  const lines = code.split('\n')
  return lines.map((line, index) => {
    const continued = index > 0 && lines[index - 1].trimEnd().endsWith('\\')
    if (line.trim() === '') return <span key={index} className={styles.codeLine}>{'​'}</span>
    if (line.trimStart().startsWith('#')) {
      return (
        <span key={index} className={`${styles.codeLine} ${styles.codeComment}`}>
          {line}
        </span>
      )
    }
    return (
      <span key={index} className={styles.codeLine}>
        <span aria-hidden className={styles.codePrompt}>
          {continued ? ' ' : '$'}
        </span>
        {line}
      </span>
    )
  })
}

export function CodeBlock({
  code,
  title,
  lang = 'shell',
  children,
}: {
  /** The exact text that gets copied. */
  code: string
  title: string
  lang?: 'shell' | 'plain'
  /** Optional pre-highlighted rendering. Falls back to `code`. */
  children?: ReactNode
}) {
  return (
    <figure className={styles.codeBlock}>
      <figcaption className={styles.codeHeader}>
        <span className={styles.codeTitle}>{title}</span>
        <CopyButton text={code} label={`Copy ${title}`} />
      </figcaption>
      <pre tabIndex={0} aria-label={title} className={styles.codeBody}>
        <code>{children ?? (lang === 'shell' ? <ShellLines code={code} /> : code)}</code>
      </pre>
    </figure>
  )
}

export function InlineCode({ children }: { children: ReactNode }) {
  return <code className={styles.inlineCode}>{children}</code>
}
