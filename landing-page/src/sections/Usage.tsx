import { Grid, Heading, InlineLink, Section, SectionIntro, Text } from '@primer/react-brand'

import { CodeBlock } from '../components/CodeBlock'
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
    <Section id="usage" paddingBlockStart="normal" paddingBlockEnd="normal">
      <Grid>
        <Grid.Column span={12}>
          <SectionIntro align="start" className={styles.intro}>
            <SectionIntro.Heading as="h2" size="3">
              Everyday commands
            </SectionIntro.Heading>
            <SectionIntro.Description>
              Typst turns markup into PDFs. Pandoc gets existing LaTeX, Markdown and Word documents into Typst.
              Both are on the PATH inside the container.
            </SectionIntro.Description>
          </SectionIntro>
        </Grid.Column>

        <Grid.Column span={{ xsmall: 12, large: 6 }} className={styles.stack}>
          <Heading as="h3" size="subhead-large">
            Typst to PDF
          </Heading>
          <CodeBlock title="Terminal" code={typstCommands} />
          <Heading as="h3" size="subhead-large" className={styles.stackGap}>
            Check the toolchain
          </Heading>
          <CodeBlock title="Terminal" code={verifyCommands} />
        </Grid.Column>

        <Grid.Column span={{ xsmall: 12, large: 6 }} className={styles.stack}>
          <Heading as="h3" size="subhead-large">
            Convert with Pandoc
          </Heading>
          <CodeBlock title="Terminal" code={pandocCommands} />
          <Text as="p" size="200" variant="muted">
            Review converted files before relying on them. Pandoc does not carry over every layout detail. See the{' '}
            <InlineLink href="https://typst.app/docs/">Typst documentation</InlineLink> and the{' '}
            <InlineLink href="https://pandoc.org/MANUAL.html">Pandoc user guide</InlineLink>.
          </Text>
        </Grid.Column>
      </Grid>
    </Section>
  )
}
