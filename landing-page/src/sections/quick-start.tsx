import type { ReactNode } from 'react'

import { CodeBlock } from '@/components/code-block'
import { Reveal } from '@/components/reveal'
import { InlineCode, Section, TextLink } from '@/components/section'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CLONE_URL, CODESPACES_URL, IMAGE, REPO, TEMPLATE_ID } from '@/lib/site'

const helloTyp = `#set text(size: 14pt)
= Hello, Typst!
This is a simple PDF document.`

const minimalConfig = `{
  "name": "Typst + Pandoc",
  "image": "${IMAGE}:latest",
  "customizations": {
    "vscode": {
      "extensions": ["myriad-dreamin.tinymist"]
    }
  }
}`

function Steps({ children }: { children: ReactNode }) {
  return <ol className="relative space-y-8 border-l border-white/10 pl-7 sm:pl-9">{children}</ol>
}

function Step({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return (
    <li className="relative">
      <span
        aria-hidden
        className="absolute top-0 -left-7 flex size-6 -translate-x-1/2 items-center justify-center rounded-full border border-teal-400/40 bg-zinc-950 font-mono text-xs text-teal-300 sm:-left-9"
      >
        {n}
      </span>
      <h3 className="text-base leading-6 font-medium text-zinc-50">{title}</h3>
      <div className="mt-2 space-y-3 text-sm leading-6 text-zinc-400">{children}</div>
    </li>
  )
}

function HelloStep({ n }: { n: number }) {
  return (
    <>
      <Step n={n} title="Write a document">
        <p>
          In the container terminal, create <InlineCode>hello.typ</InlineCode>:
        </p>
        <CodeBlock title="hello.typ" lang="plain" code={helloTyp} />
      </Step>
      <Step n={n + 1} title="Compile it">
        <CodeBlock title="Terminal" code="typst compile hello.typ" />
        <p>
          <InlineCode>hello.pdf</InlineCode> appears next to the source file.
        </p>
      </Step>
    </>
  )
}

const tabs = [
  { value: 'vscode', label: 'VS Code' },
  { value: 'codespaces', label: 'Codespaces' },
  { value: 'template', label: 'Your project' },
  { value: 'docker', label: 'Docker' },
]

export function QuickStart() {
  return (
    <Section
      id="quick-start"
      title="Quick start"
      intro="Four ways in. Each one ends with the same toolchain and the same compile command."
    >
      <Reveal>
        <Tabs defaultValue="vscode" className="gap-8">
          <TabsList
            aria-label="Ways to start"
            className="grid w-full grid-cols-2 gap-1 group-data-horizontal/tabs:h-auto sm:inline-flex sm:w-fit"
          >
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value} className="h-8 px-3 sm:px-4">
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="vscode" className="max-w-3xl">
            <p className="mb-8 text-sm leading-6 text-zinc-400">
              Needs VS Code or a compatible editor, the{' '}
              <TextLink href="https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers">
                Dev Containers extension
              </TextLink>{' '}
              and Docker.
            </p>
            <Steps>
              <Step n={1} title="Clone the repository and open it">
                <CodeBlock title="Terminal" code={`git clone ${CLONE_URL}\ncode typst-dev-container`} />
              </Step>
              <Step n={2} title="Reopen in the container">
                <p>
                  Click <strong className="font-medium text-zinc-200">Reopen in Container</strong> when VS Code
                  offers it, or press <kbd className="rounded border border-white/15 bg-white/5 px-1.5 py-0.5 font-mono text-xs text-zinc-200">F1</kbd>{' '}
                  and run <InlineCode>Dev Containers: Reopen in Container</InlineCode>. The first start pulls the
                  image.
                </p>
              </Step>
              <HelloStep n={3} />
            </Steps>
          </TabsContent>

          <TabsContent value="codespaces" className="max-w-3xl">
            <p className="mb-8 text-sm leading-6 text-zinc-400">
              Runs in the browser on GitHub Codespaces. No local Docker needed.
            </p>
            <Steps>
              <Step n={1} title="Create a codespace from the repository">
                <p>
                  Open <TextLink href={CODESPACES_URL}>codespaces.new/{REPO}</TextLink>, or use the GitHub CLI:
                </p>
                <CodeBlock title="Terminal" code={`gh codespace create --repo ${REPO}`} />
                <p>The codespace starts from the same dev container configuration as the local setup.</p>
              </Step>
              <HelloStep n={2} />
            </Steps>
          </TabsContent>

          <TabsContent value="template" className="max-w-3xl">
            <p className="mb-8 text-sm leading-6 text-zinc-400">
              Add the container to a document project you already have. The repository publishes a Dev Container
              template for this.
            </p>
            <Steps>
              <Step n={1} title="Apply the template">
                <p>With the Dev Container CLI, from your project folder:</p>
                <CodeBlock
                  title="Terminal"
                  code={`devcontainer templates apply \\\n  --template-id ${TEMPLATE_ID} \\\n  --template-args '{"typstVersion": "latest"}'`}
                />
                <p>
                  Or in VS Code, run <InlineCode>Dev Containers: Add Dev Container Configuration Files...</InlineCode>,
                  choose <strong className="font-medium text-zinc-200">Show All Definitions</strong> and search for
                  the template id above.
                </p>
              </Step>
              <Step n={2} title="Or write the config by hand">
                <p>
                  A minimal <InlineCode>.devcontainer/devcontainer.json</InlineCode> that uses the published image:
                </p>
                <CodeBlock title=".devcontainer/devcontainer.json" lang="plain" code={minimalConfig} />
              </Step>
              <Step n={3} title="Reopen the folder in the container">
                <p>
                  Then compile any <InlineCode>.typ</InlineCode> file with{' '}
                  <InlineCode>typst compile &lt;file&gt;.typ</InlineCode>.
                </p>
              </Step>
            </Steps>
          </TabsContent>

          <TabsContent value="docker" className="max-w-3xl">
            <p className="mb-8 text-sm leading-6 text-zinc-400">
              No editor involved. The image sets <InlineCode>/workspace</InlineCode> as its working directory, so
              mount your documents there.
            </p>
            <Steps>
              <Step n={1} title="Pull the image">
                <CodeBlock title="Terminal" code={`docker pull ${IMAGE}:latest`} />
              </Step>
              <Step n={2} title="Compile a file from the current folder">
                <CodeBlock
                  title="Terminal"
                  code={`docker run --rm -v "$PWD":/workspace \\\n  ${IMAGE}:latest \\\n  typst compile hello.typ`}
                />
                <p>
                  The PDF is written back to the mounted folder. Swap <InlineCode>latest</InlineCode> for a numbered
                  tag to stay on one Typst version.
                </p>
              </Step>
            </Steps>
          </TabsContent>
        </Tabs>
      </Reveal>
    </Section>
  )
}
