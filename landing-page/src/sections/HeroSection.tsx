import { Animate, Grid, Hero, Text } from '@primer/react-brand'
import { Fragment } from 'react'

import { CopyButton } from '../components/CopyButton'
import { CODESPACES_URL, IMAGE, latestRow } from '../lib/site'
import styles from '../page.module.css'

const pullCommand = `docker pull ${IMAGE}:latest`
// Lets the long image reference wrap after a slash instead of mid-word.
const pullParts = pullCommand.split(/(?<=\/)/)

function SourcePane() {
  return (
    <div className={styles.editor}>
      <div className={styles.editorBar}>
        <span aria-hidden className={styles.editorDots}>
          <span />
          <span />
          <span />
        </span>
        <span className={styles.codeTitle}>hello.typ</span>
      </div>
      <pre className={styles.codeBody}>
        <code>
          <span className={styles.codeLine}>
            <span className={styles.tokKeyword}>#set</span> <span className={styles.tokFunc}>text</span>(size:{' '}
            <span className={styles.tokNumber}>14pt</span>)
          </span>
          <span className={`${styles.codeLine} ${styles.tokHeading}`}>
            <span className={styles.tokKeyword}>=</span> Hello, Typst!
          </span>
          <span className={styles.codeLine}>This is a simple PDF document.</span>
        </code>
      </pre>
      <div className={styles.editorTerminal}>
        <span aria-hidden className={styles.codePrompt}>
          $
        </span>
        typst compile hello.typ
        <span aria-hidden className={styles.caret} />
      </div>
    </div>
  )
}

function PaperPane() {
  return (
    <div className={styles.paper}>
      <p className={styles.paperHeading}>Hello, Typst!</p>
      <p className={styles.paperBody}>This is a simple PDF document.</p>
      <span className={styles.paperName}>hello.pdf</span>
    </div>
  )
}

export function HeroSection() {
  return (
    <section id="top" className={styles.heroBand}>
      <Grid className={styles.heroGrid}>
        <Grid.Column span={{ xsmall: 12, large: 6 }}>
          <Hero align="start" className={styles.hero}>
            <Hero.Label color="green">
              Typst {latestRow.typst}, Pandoc {latestRow.pandoc}, Rust {latestRow.rust}
            </Hero.Label>
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
            MIT licensed. Built for linux/amd64 and linux/arm64.
          </Text>
        </Grid.Column>
        <Grid.Column span={{ xsmall: 12, large: 6 }} className={styles.heroVisualColumn}>
          <Animate animate="slide-in-up">
            <figure className={styles.heroVisual} aria-label="A Typst source file and the PDF page it compiles to">
              <SourcePane />
              <PaperPane />
              <figcaption className={styles.heroCaption}>
                The three line example from the README, and the page it compiles to.
              </figcaption>
            </figure>
          </Animate>
        </Grid.Column>
      </Grid>
    </section>
  )
}
