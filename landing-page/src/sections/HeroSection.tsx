import { Button, Heading, Text } from '@primer/react-brand'
import { Fragment } from 'react'

import { CodeBlock } from '../components/CodeBlock'
import { CopyButton } from '../components/CopyButton'
import { Split } from '../components/Layout'
import { CODESPACES_URL, IMAGE, latestRow } from '../lib/site'
import styles from '../page.module.css'

const imageRef = `${IMAGE}:latest`
// Lets the long image reference wrap after a slash instead of mid-word.
const imageRefParts = imageRef.split(/(?<=\/)/)

const helloTyp = `#set text(size: 14pt)
= Hello, Typst!
This is a simple PDF document.`

export function HeroSection() {
  return (
    <section id="top" className={styles.hero}>
      <Split className={styles.container}>
        <div className={styles.heroText}>
          <Heading as="h1" size="1">
            Typst and Pandoc in one container
          </Heading>
          <Text as="p" size="400" variant="muted" className={styles.heroLede}>
            A prebuilt image with pinned versions of Typst, Pandoc and Rust. Open it in VS Code Dev Containers,
            GitHub Codespaces or plain Docker and get the same PDF build on every machine.
          </Text>
          <div className={styles.heroActions}>
            <Button as="a" href="#quick-start" variant="primary" hasArrow={false}>
              Quick start
            </Button>
            <Button as="a" href={CODESPACES_URL} variant="secondary" hasArrow={false}>
              Open in Codespaces
            </Button>
          </div>
          <div className={styles.field}>
            <span className={styles.fieldLabel} id="image-ref-label">
              Image
            </span>
            <div className={styles.fieldBox}>
              <code aria-labelledby="image-ref-label" className={styles.fieldValue}>
                {imageRefParts.map((part, index) => (
                  <Fragment key={index}>
                    {part}
                    <wbr />
                  </Fragment>
                ))}
              </code>
              <CopyButton text={imageRef} label="Copy image reference" />
            </div>
            <span className={styles.fieldHint}>
              Typst {latestRow.typst}, Pandoc {latestRow.pandoc}, Rust {latestRow.rust}. linux/amd64 and
              linux/arm64. MIT licensed.
            </span>
          </div>
        </div>

        <div className={styles.heroDemo}>
          <CodeBlock title="hello.typ" lang="plain" code={helloTyp} />
          <figure className={styles.output}>
            <img
              src="/hello-pdf.png"
              width={1200}
              height={475}
              alt="Top of the compiled page: the heading Hello, Typst! above the line This is a simple PDF document."
            />
            <figcaption>
              The top of <code>hello.pdf</code>, compiled from the file above with{' '}
              <code>typst compile hello.typ</code> in the container.
            </figcaption>
          </figure>
        </div>
      </Split>
    </section>
  )
}
