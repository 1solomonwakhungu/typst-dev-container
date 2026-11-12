import { Grid, Hero, Text } from '@primer/react-brand'
import { Fragment } from 'react'

import { CodeBlock } from '../components/CodeBlock'
import { CopyButton } from '../components/CopyButton'
import { CODESPACES_URL, IMAGE, latestRow } from '../lib/site'
import styles from '../page.module.css'

const pullCommand = `docker pull ${IMAGE}:latest`
// Lets the long image reference wrap after a slash instead of mid-word.
const pullParts = pullCommand.split(/(?<=\/)/)

const helloTyp = `#set text(size: 14pt)
= Hello, Typst!
This is a simple PDF document.`

export function HeroSection() {
  return (
    <section id="top" className={styles.heroBand}>
      <Grid className={styles.heroGrid}>
        <Grid.Column span={{ xsmall: 12, large: 6 }}>
          <Hero align="start" className={styles.hero}>
            <Hero.Heading>Typst and Pandoc in one container</Hero.Heading>
            <Hero.Description>
              A prebuilt image with pinned versions of Typst, Pandoc and Rust. Open it in VS Code Dev Containers,
              GitHub Codespaces or plain Docker and get the same PDF build on every machine.
            </Hero.Description>
            <Hero.PrimaryAction href="#quick-start">Quick start</Hero.PrimaryAction>
            <Hero.SecondaryAction href={CODESPACES_URL}>Open in Codespaces</Hero.SecondaryAction>
          </Hero>
          <div className={styles.pullBox}>
            <pre aria-label="Pull command" className={styles.pullCommand}>
              <code>
                <span aria-hidden className={styles.codePrompt}>
                  $
                </span>
                {pullParts.map((part, index) => (
                  <Fragment key={index}>
                    {part}
                    <wbr />
                  </Fragment>
                ))}
              </code>
            </pre>
            <CopyButton text={pullCommand} label="Copy pull command" />
          </div>
          <Text as="p" size="200" variant="muted" className={styles.heroNote}>
            Currently Typst {latestRow.typst}, Pandoc {latestRow.pandoc} and Rust {latestRow.rust}, for linux/amd64
            and linux/arm64. MIT licensed.
          </Text>
        </Grid.Column>
        <Grid.Column span={{ xsmall: 12, large: 6 }} className={styles.heroVisualColumn}>
          <div className={styles.heroVisual}>
            <CodeBlock title="hello.typ" lang="plain" code={helloTyp} />
            <figure className={styles.output}>
              <img
                src="/hello-pdf.png"
                width={1200}
                height={475}
                alt="Top of the compiled page: the heading Hello, Typst! above the line This is a simple PDF document."
              />
              <figcaption>
                The top of <code>hello.pdf</code>, compiled from the file above with <code>typst compile hello.typ</code>{' '}
                in the container.
              </figcaption>
            </figure>
          </div>
        </Grid.Column>
      </Grid>
    </section>
  )
}
