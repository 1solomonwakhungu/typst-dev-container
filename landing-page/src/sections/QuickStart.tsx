import { Heading, InlineLink } from '@primer/react-brand'
import type { ReactNode } from 'react'

import { CodeBlock, InlineCode } from '../components/CodeBlock'
import { Body, PageSection } from '../components/Layout'
import { Tabs } from '../components/Tabs'
import { CLONE_URL, CODESPACES_URL, IMAGE, REPO, TEMPLATE_ID } from '../lib/site'
import styles from '../page.module.css'

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

/** One step per row: the instruction on the left half, its code on the right half. */
function Step({ title, code, children }: { title: string; code?: ReactNode; children?: ReactNode }) {
  return (
    <li className={`${styles.split} ${styles.step}`}>
      <div className={styles.stepText}>
        <span aria-hidden className={styles.stepNumber} />
        <Heading as="h3" size="subhead-large">
          {title}
        </Heading>
        {children}
      </div>
      <div className={styles.stepCode}>{code}</div>
    </li>
  )
}

function Panel({ lead, children }: { lead: ReactNode; children: ReactNode }) {
  return (
    <>
      <div className={styles.panelLead}>
        <Body>{lead}</Body>
      </div>
      <ol className={styles.steps}>{children}</ol>
    </>
  )
}

function HelloSteps() {
  return (
    <>
      <Step title="Write a document" code={<CodeBlock title="hello.typ" lang="plain" code={helloTyp} />}>
        <Body>
          In the container terminal, create <InlineCode>hello.typ</InlineCode>.
        </Body>
      </Step>
      <Step title="Compile it" code={<CodeBlock title="Terminal" code="typst compile hello.typ" />}>
        <Body>
          <InlineCode>hello.pdf</InlineCode> appears next to the source file.
        </Body>
      </Step>
    </>
  )
}

const tabs = [
  {
    id: 'vscode',
    label: 'VS Code',
    content: (
      <Panel
        lead={
          <>
            Needs VS Code or a compatible editor, the{' '}
            <InlineLink href="https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers">
              Dev Containers extension
            </InlineLink>{' '}
            and Docker.
          </>
        }
      >
        <Step
          title="Clone the repository and open it"
          code={<CodeBlock title="Terminal" code={`git clone ${CLONE_URL}\ncode typst-dev-container`} />}
        />
        <Step title="Reopen in the container">
          <Body>
            Click <strong>Reopen in Container</strong> when VS Code offers it, or press{' '}
            <kbd className={styles.kbd}>F1</kbd> and run <InlineCode>Dev Containers: Reopen in Container</InlineCode>
            . The first start pulls the image.
          </Body>
        </Step>
        <HelloSteps />
      </Panel>
    ),
  },
  {
    id: 'codespaces',
    label: 'Codespaces',
    content: (
      <Panel lead="Runs in the browser on GitHub Codespaces. No local Docker needed.">
        <Step
          title="Create a codespace from the repository"
          code={<CodeBlock title="Terminal" code={`gh codespace create --repo ${REPO}`} />}
        >
          <Body>
            Open <InlineLink href={CODESPACES_URL}>codespaces.new/{REPO}</InlineLink>, or use the GitHub CLI. The
            codespace starts from the same dev container configuration as the local setup.
          </Body>
        </Step>
        <HelloSteps />
      </Panel>
    ),
  },
  {
    id: 'template',
    label: 'Template',
    content: (
      <Panel lead="Add the container to a document project you already have. The repository publishes a Dev Container template for this.">
        <Step
          title="Apply the template"
          code={
            <CodeBlock
              title="Terminal"
              code={`devcontainer templates apply \\\n  --template-id ${TEMPLATE_ID} \\\n  --template-args '{"typstVersion": "latest"}'`}
            />
          }
        >
          <Body>
            Run the Dev Container CLI from your project folder. Or in VS Code, run{' '}
            <InlineCode>Dev Containers: Add Dev Container Configuration Files...</InlineCode>, choose{' '}
            <strong>Show All Definitions</strong> and search for the template id.
          </Body>
        </Step>
        <Step
          title="Or write the config by hand"
          code={<CodeBlock title=".devcontainer/devcontainer.json" lang="plain" code={minimalConfig} />}
        >
          <Body>
            A minimal <InlineCode>.devcontainer/devcontainer.json</InlineCode> that uses the published image.
          </Body>
        </Step>
        <Step title="Reopen the folder in the container" code={<CodeBlock title="Terminal" code="typst compile <file>.typ" />}>
          <Body>
            Then compile any <InlineCode>.typ</InlineCode> file.
          </Body>
        </Step>
      </Panel>
    ),
  },
  {
    id: 'docker',
    label: 'Docker',
    content: (
      <Panel
        lead={
          <>
            No editor involved. The image sets <InlineCode>/workspace</InlineCode> as its working directory, so
            mount your documents there.
          </>
        }
      >
        <Step title="Pull the image" code={<CodeBlock title="Terminal" code={`docker pull ${IMAGE}:latest`} />} />
        <Step
          title="Compile a file from the current folder"
          code={
            <CodeBlock
              title="Terminal"
              code={`docker run --rm -v "$PWD":/workspace \\\n  ${IMAGE}:latest \\\n  typst compile hello.typ`}
            />
          }
        >
          <Body>
            The PDF is written back to the mounted folder. Swap <InlineCode>latest</InlineCode> for a numbered tag
            to stay on one Typst version.
          </Body>
        </Step>
      </Panel>
    ),
  },
]

export function QuickStart() {
  return (
    <PageSection id="quick-start" title="Quick start">
      <Tabs label="Ways to start" items={tabs} />
    </PageSection>
  )
}
