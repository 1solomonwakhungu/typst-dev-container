import { Heading, InlineLink } from '@primer/react-brand'

import { CodeBlock } from '../components/CodeBlock'
import { Body, PageSection, Split } from '../components/Layout'
import styles from '../page.module.css'

const typstCommands = `# One-time compile
typst compile document.typ document.pdf

# Watch for changes and recompile
typst watch document.typ document.pdf`

const pandocCommands = `# LaTeX to Typst
pandoc article.tex -o article.typ

# Markdown to editable Typst, then to PDF
pandoc input.md --to typst --output output.typ
typst compile output.typ

# Word to Markdown
pandoc document.docx -o document.md`

const verifyCommands = `typst --version
pandoc --version
rustc --version`

export function Usage() {
  return (
    <PageSection
      id="usage"
      title="Everyday commands"
      intro="Typst turns markup into PDFs. Pandoc gets existing LaTeX, Markdown and Word documents into Typst. Both are on the PATH inside the container."
    >
      <Split>
        <div className={styles.stack}>
          <Heading as="h3" size="subhead-large" className={styles.blockTitle}>
            Typst to PDF
          </Heading>
          <CodeBlock title="Terminal" code={typstCommands} />
          <Heading as="h3" size="subhead-large" className={`${styles.blockTitle} ${styles.blockTitleNext}`}>
            Check the toolchain
          </Heading>
          <CodeBlock title="Terminal" code={verifyCommands} />
        </div>
        <div className={styles.stack}>
          <Heading as="h3" size="subhead-large" className={styles.blockTitle}>
            Convert with Pandoc
          </Heading>
          <CodeBlock title="Terminal" code={pandocCommands} />
          <div className={styles.blockNote}>
            <Body>
              Review converted files before relying on them. Pandoc does not carry over every layout detail. See the{' '}
              <InlineLink href="https://typst.app/docs/">Typst documentation</InlineLink> and the{' '}
              <InlineLink href="https://pandoc.org/MANUAL.html">Pandoc user guide</InlineLink>.
            </Body>
          </div>
        </div>
      </Split>
    </PageSection>
  )
}
