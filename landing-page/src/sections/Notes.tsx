import { ChevronDownIcon } from '@primer/octicons-react'
import type { ReactNode } from 'react'

import { InlineCode } from '../components/CodeBlock'
import { PageSection } from '../components/Layout'
import { IMAGE } from '../lib/site'
import styles from '../page.module.css'

const notes: { question: string; answer: ReactNode }[] = [
  {
    question: 'How big is the first pull?',
    answer: (
      <>
        Roughly 650 to 700 MB compressed, depending on the platform. Most of that is the Rust base image. Later
        starts reuse the cached image. Keep at least 3 GB of disk free for Docker.
      </>
    ),
  },
  {
    question: 'How do I pin a Typst version?',
    answer: (
      <>
        Use a numbered tag such as <InlineCode>{IMAGE}:0.15.0</InlineCode> instead of{' '}
        <InlineCode>:latest</InlineCode>. With the template, set the <InlineCode>typstVersion</InlineCode> option.
        If <InlineCode>latest</InlineCode> changes how a document builds, reproduce with a numbered tag first.
      </>
    ),
  },
  {
    question: 'Which user does the container run as?',
    answer: (
      <>
        <InlineCode>root</InlineCode>. Remove the <InlineCode>remoteUser</InlineCode> line from{' '}
        <InlineCode>.devcontainer/devcontainer.json</InlineCode> if you need a different user.
      </>
    ),
  },
  {
    question: 'Does it work on macOS and Windows?',
    answer: (
      <>
        Yes, through Docker Desktop or WSL 2, or with no local Docker at all on GitHub Codespaces. The image is
        published for linux/amd64 and linux/arm64, so Apple silicon runs it natively.
      </>
    ),
  },
  {
    question: 'The container fails to start. What should I check?',
    answer: (
      <>
        Check that Docker is running and has free disk space, then pull the image directly with{' '}
        <InlineCode>docker pull {IMAGE}:latest</InlineCode>. In VS Code, the Remote output panel has the detailed
        log.
      </>
    ),
  },
  {
    question: 'typst or pandoc is not found in the terminal',
    answer: (
      <>
        The terminal is probably running on the host. Check that the bottom left corner of VS Code says Dev
        Container, and reopen the workspace in the container if it does not.
      </>
    ),
  },
]

export function Notes() {
  return (
    <PageSection id="notes" title="Good to know" alt>
      <div className={styles.faq}>
        {notes.map((note) => (
          <details key={note.question} className={styles.faqItem}>
            <summary>
              <span>{note.question}</span>
              <ChevronDownIcon size={16} aria-hidden />
            </summary>
            <p>{note.answer}</p>
          </details>
        ))}
      </div>
    </PageSection>
  )
}
