import { CodeBlock } from '@/components/code-block'
import { Reveal } from '@/components/reveal'
import { Section } from '@/components/section'

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
    <Section
      id="usage"
      title="Everyday commands"
      intro="Typst turns markup into PDFs. Pandoc gets existing LaTeX, Markdown and Word documents into Typst. Both are on the PATH inside the container."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <Reveal className="space-y-6">
          <div>
            <h3 className="mb-3 text-base font-medium">Typst to PDF</h3>
            <CodeBlock title="Terminal" code={typstCommands} />
          </div>
          <div>
            <h3 className="mb-3 text-base font-medium">Check the toolchain</h3>
            <CodeBlock title="Terminal" code={verifyCommands} />
          </div>
        </Reveal>
        <Reveal delay={100}>
          <h3 className="mb-3 text-base font-medium">Convert with Pandoc</h3>
          <CodeBlock title="Terminal" code={pandocCommands} />
          <p className="mt-3 text-sm leading-6 text-zinc-400">
            Review converted files before relying on them. Pandoc does not carry over every layout detail.
          </p>
        </Reveal>
      </div>
    </Section>
  )
}
