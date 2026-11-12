import { Animate, Grid, Heading, Link, River, Section, SectionIntro, Text } from '@primer/react-brand'

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
          <Animate animate="slide-in-up">
            <SectionIntro align="start" className={styles.intro}>
              <SectionIntro.Heading as="h2" size="3">
                Everyday commands
              </SectionIntro.Heading>
              <SectionIntro.Description>
                Typst turns markup into PDFs. Pandoc gets existing LaTeX, Markdown and Word documents into Typst.
                Both are on the PATH inside the container.
              </SectionIntro.Description>
            </SectionIntro>
          </Animate>

          <River className={styles.river}>
            <River.Visual hasShadow={false} className={styles.riverVisual}>
              <CodeBlock title="Terminal" code={typstCommands} />
            </River.Visual>
            <River.Content>
              <Heading as="h3">Typst to PDF</Heading>
              <Text>Compile a document once, or watch it and recompile on every save.</Text>
              <Link href="https://typst.app/docs/">Typst documentation</Link>
            </River.Content>
          </River>

          <River align="end" className={styles.river}>
            <River.Visual hasShadow={false} className={styles.riverVisual}>
              <CodeBlock title="Terminal" code={pandocCommands} />
            </River.Visual>
            <River.Content>
              <Heading as="h3">Convert with Pandoc</Heading>
              <Text>
                Bring LaTeX, Markdown and Word documents into Typst. Review converted files before relying on them.
                Pandoc does not carry over every layout detail.
              </Text>
              <Link href="https://pandoc.org/MANUAL.html">Pandoc user guide</Link>
            </River.Content>
          </River>

          <River className={styles.river}>
            <River.Visual hasShadow={false} className={styles.riverVisual}>
              <CodeBlock title="Terminal" code={verifyCommands} />
            </River.Visual>
            <River.Content>
              <Heading as="h3">Check the toolchain</Heading>
              <Text>Three commands confirm which versions the running container has.</Text>
            </River.Content>
          </River>
        </Grid.Column>
      </Grid>
    </Section>
  )
}
