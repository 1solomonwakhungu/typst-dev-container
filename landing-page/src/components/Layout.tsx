import { Heading, Text } from '@primer/react-brand'
import type { ReactNode } from 'react'

import styles from '../page.module.css'

/**
 * Every section shares one container and one two-column split, so left edges,
 * the centre line and right edges line up down the whole page.
 */
export function PageSection({
  id,
  title,
  intro,
  alt = false,
  children,
}: {
  id: string
  title: string
  intro?: ReactNode
  alt?: boolean
  children: ReactNode
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`${styles.section} ${alt ? styles.sectionAlt : ''}`}>
      <div className={styles.container}>
        <header className={styles.sectionHead}>
          <Heading as="h2" size="4" id={`${id}-title`}>
            {title}
          </Heading>
          {intro ? (
            <Text as="p" size="300" variant="muted" className={styles.sectionIntro}>
              {intro}
            </Text>
          ) : null}
        </header>
        {children}
      </div>
    </section>
  )
}

export function Split({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`${styles.split} ${className}`}>{children}</div>
}

export function Body({ children }: { children: ReactNode }) {
  return (
    <Text as="p" size="200" variant="muted" className={styles.body}>
      {children}
    </Text>
  )
}
