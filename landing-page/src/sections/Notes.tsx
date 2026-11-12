import { FAQ, Grid, Heading, Section } from '@primer/react-brand'
import type { ReactNode } from 'react'

import { InlineCode } from '../components/CodeBlock'
import { IMAGE } from '../lib/site'
import styles from '../page.module.css'

const notes: { question: string; answer: ReactNode }[] = [
  {
    question: 'How big is the first pull?',
    answer: (
      <p>
        Roughly 650 to 700 MB compressed, depending on the platform. Most of that is the Rust base image. Later
        starts reuse the cached image. Keep at least 3 GB of disk free for Docker.
      </p>
    ),
  },
  {
    question: 'How do I pin a Typst version?',
    answer: (
      <p>
        Use a numbered tag such as <InlineCode>{IMAGE}:0.15.0</InlineCode> instead of{' '}
        <InlineCode>:latest</InlineCode>. With the template, set the <InlineCode>typstVersion</InlineCode> option.
        If <InlineCode>latest</InlineCode> changes how a document builds, reproduce with a numbered tag first.
      </p>
    ),
  },
  {
    question: 'Which user does the container run as?',
    answer: (
      <p>
        <InlineCode>root</InlineCode>. Remove the <InlineCode>remoteUser</InlineCode> line from{' '}
        <InlineCode>.devcontainer/devcontainer.json</InlineCode> if you need a different user.
      </p>
    ),
  },
  {
    question: 'Does it work on macOS and Windows?',
    answer: (
      <p>
        Yes, through Docker Desktop or WSL 2, or with no local Docker at all on GitHub Codespaces. The image is
        published for linux/amd64 and linux/arm64, so Apple silicon runs it natively.
      </p>
    ),
  },
  {
    question: 'The container fails to start. What should I check?',
    answer: (
      <p>
        Check that Docker is running and has free disk space, then pull the image directly with{' '}
        <InlineCode>docker pull {IMAGE}:latest</InlineCode>. In VS Code, the Remote output panel has the detailed
        log.
      </p>
    ),
  },
  {
    question: 'typst or pandoc is not found in the terminal',
    answer: (
      <p>
        The terminal is probably running on the host. Check that the bottom left corner of VS Code says Dev
        Container, and reopen the workspace in the container if it does not.
      </p>
    ),
  },
]

export function Notes() {
  return (
    <>
      <Section id="notes" backgroundColor="subtle" paddingBlockStart="normal" paddingBlockEnd="normal">
        <Grid>
          <Grid.Column span={{ xsmall: 12, large: 9 }}>
            <Heading as="h2" size="3" className={styles.intro}>
              Good to know
            </Heading>
            <FAQ className={styles.faq}>
              {notes.map((note) => (
                <FAQ.Item key={note.question}>
                  <FAQ.Question>{note.question}</FAQ.Question>
                  <FAQ.Answer>{note.answer}</FAQ.Answer>
                </FAQ.Item>
              ))}
            </FAQ>
          </Grid.Column>
        </Grid>
      </Section>

    </>
  )
}
