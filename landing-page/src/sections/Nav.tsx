import { MarkGithubIcon } from '@primer/octicons-react'
import { Button } from '@primer/react-brand'

import { LogoMark } from '../components/LogoMark'
import { REPO_URL } from '../lib/site'
import styles from '../page.module.css'

const links = [
  { href: '#quick-start', label: 'Quick start' },
  { href: '#image', label: 'Image' },
  { href: '#usage', label: 'Usage' },
  { href: '#upkeep', label: 'Upkeep' },
  { href: '#notes', label: 'Notes' },
]

export function Nav() {
  return (
    <header className={styles.nav}>
      <a href="#main" className={styles.skipLink}>
        Skip to content
      </a>
      <div className={`${styles.container} ${styles.navInner}`}>
        <a href="#top" className={styles.brand}>
          <LogoMark width={18} height={22} />
          <span>
            typst<span className={styles.brandMuted}>-dev-container</span>
          </span>
        </a>
        <div className={styles.navEnd}>
          <nav aria-label="Sections" className={styles.navLinks}>
            {links.map((link) => (
              <a key={link.href} href={link.href} className={styles.navLink}>
                {link.label}
              </a>
            ))}
          </nav>
          <Button as="a" href={REPO_URL} size="small" variant="secondary" leadingVisual={<MarkGithubIcon />} hasArrow={false}>
            GitHub
          </Button>
        </div>
      </div>
    </header>
  )
}
