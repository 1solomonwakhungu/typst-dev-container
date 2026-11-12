import { Text } from '@primer/react-brand'

import { LogoMark } from '../components/LogoMark'
import { AUTHOR_URL, REPO_URL } from '../lib/site'
import styles from '../page.module.css'

const groups = [
  {
    title: 'Project',
    links: [
      { label: 'Repository', href: REPO_URL },
      { label: 'Issues', href: `${REPO_URL}/issues` },
      { label: 'Contributing', href: `${REPO_URL}/blob/main/CONTRIBUTING.md` },
      { label: 'License (MIT)', href: `${REPO_URL}/blob/main/LICENSE` },
    ],
  },
  {
    title: 'Reference',
    links: [
      { label: 'Typst documentation', href: 'https://typst.app/docs/' },
      { label: 'Pandoc user guide', href: 'https://pandoc.org/MANUAL.html' },
      { label: 'Dev Containers specification', href: 'https://containers.dev/' },
    ],
  },
]

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerGrid}>
          <div>
            <div className={styles.brand}>
              <LogoMark width={28} height={28} />
              typst-dev-container
            </div>
            <Text as="p" size="200" variant="muted" className={styles.footerBlurb}>
              Typst and Pandoc dev container for reproducible PDF document builds.
            </Text>
          </div>
          {groups.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className={styles.footerHeading}>{group.title}</h2>
              <ul className={styles.footerList}>
                {group.links.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className={styles.footerLink}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <Text as="p" size="100" variant="muted" className={styles.footerLegal}>
          Made by{' '}
          <a href={AUTHOR_URL} className={styles.footerLink}>
            Solomon Wakhungu
          </a>
          . Released under the MIT License.
        </Text>
      </div>
    </footer>
  )
}
