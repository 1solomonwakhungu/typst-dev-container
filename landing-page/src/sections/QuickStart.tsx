import { Animate, Grid, Heading, InlineLink, Section, SectionIntro, Tabs, Text } from '@primer/react-brand'
import type { ReactNode } from 'react'

import { CodeBlock, InlineCode } from '../components/CodeBlock'
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

function Steps({ children }: { children: ReactNode }) {
  return <ol className={styles.steps}>{children}</ol>
}

function Step({ title, children }: { title: string; children: ReactNode }) {
  return (
    <li className={styles.step}>
      <Heading as="h3" size="subhead-large" className={styles.stepTitle}>
        {title}
      </Heading>
      <div className={styles.stepBody}>{children}</div>
    </li>
  )
}

function P({ children }: { children: ReactNode }) {
  return (
    <Text as="p" size="200" variant="muted">
      {children}
    </Text>
  )
}

function HelloSteps() {
  return (
    <>
      <Step title="Write a document">
        <P>
          In the container terminal, create <InlineCode>hello.typ</InlineCode>:
        </P>
        <CodeBlock title="hello.typ" lang="plain" code={helloTyp} />
      </Step>
      <Step title="Compile it">
        <CodeBlock title="Terminal" code="typst compile hello.typ" />
        <P>
          <InlineCode>hello.pdf</InlineCode> appears next to the source file.
        </P>
      </Step>
    </>
  )
}

export function QuickStart() {
  return (
    <Section id="quick-start" paddingBlockStart="normal" paddingBlockEnd="normal">
      <Grid>
        <Grid.Column span={{ xsmall: 12, large: 9 }}>
          <Animate animate="slide-in-up">
            <SectionIntro align="start" fullWidth className={styles.intro}>
              <SectionIntro.Heading as="h2" size="3">
                Quick start
              </SectionIntro.Heading>
              <SectionIntro.Description>
                Four ways in. Each one ends with the same toolchain and the same compile command.
              </SectionIntro.Description>
            </SectionIntro>
          </Animate>

          <Tabs aria-label="Ways to start" variant="underline" align="start" className={styles.tabs}>
            <Tabs.Item>VS Code</Tabs.Item>
            <Tabs.Item>Codespaces</Tabs.Item>
            <Tabs.Item>Your project</Tabs.Item>
            <Tabs.Item>Docker</Tabs.Item>

            <Tabs.Panel>
              <div className={styles.panel}>
                <P>
                  Needs VS Code or a compatible editor, the{' '}
                  <InlineLink href="https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers">
                    Dev Containers extension
                  </InlineLink>{' '}
                  and Docker.
                </P>
                <Steps>
                  <Step title="Clone the repository and open it">
                    <CodeBlock title="Terminal" code={`git clone ${CLONE_URL}\ncode typst-dev-container`} />
                  </Step>
                  <Step title="Reopen in the container">
                    <P>
                      Click <strong>Reopen in Container</strong> when VS Code offers it, or press{' '}
                      <kbd className={styles.kbd}>F1</kbd> and run{' '}
                      <InlineCode>Dev Containers: Reopen in Container</InlineCode>. The first start pulls the image.
                    </P>
                  </Step>
                  <HelloSteps />
                </Steps>
              </div>
            </Tabs.Panel>

            <Tabs.Panel>
              <div className={styles.panel}>
                <P>Runs in the browser on GitHub Codespaces. No local Docker needed.</P>
                <Steps>
                  <Step title="Create a codespace from the repository">
                    <P>
                      Open <InlineLink href={CODESPACES_URL}>codespaces.new/{REPO}</InlineLink>, or use the GitHub
                      CLI:
                    </P>
                    <CodeBlock title="Terminal" code={`gh codespace create --repo ${REPO}`} />
                    <P>The codespace starts from the same dev container configuration as the local setup.</P>
                  </Step>
                  <HelloSteps />
                </Steps>
              </div>
            </Tabs.Panel>

            <Tabs.Panel>
              <div className={styles.panel}>
                <P>
                  Add the container to a document project you already have. The repository publishes a Dev
                  Container template for this.
                </P>
                <Steps>
                  <Step title="Apply the template">
                    <P>With the Dev Container CLI, from your project folder:</P>
                    <CodeBlock
                      title="Terminal"
                      code={`devcontainer templates apply \\\n  --template-id ${TEMPLATE_ID} \\\n  --template-args '{"typstVersion": "latest"}'`}
                    />
                    <P>
                      Or in VS Code, run{' '}
                      <InlineCode>Dev Containers: Add Dev Container Configuration Files...</InlineCode>, choose{' '}
                      <strong>Show All Definitions</strong> and search for the template id above.
                    </P>
                  </Step>
                  <Step title="Or write the config by hand">
                    <P>
                      A minimal <InlineCode>.devcontainer/devcontainer.json</InlineCode> that uses the published
                      image:
                    </P>
                    <CodeBlock title=".devcontainer/devcontainer.json" lang="plain" code={minimalConfig} />
                  </Step>
                  <Step title="Reopen the folder in the container">
                    <P>
                      Then compile any <InlineCode>.typ</InlineCode> file with{' '}
                      <InlineCode>typst compile &lt;file&gt;.typ</InlineCode>.
                    </P>
                  </Step>
                </Steps>
              </div>
            </Tabs.Panel>

            <Tabs.Panel>
              <div className={styles.panel}>
                <P>
                  No editor involved. The image sets <InlineCode>/workspace</InlineCode> as its working directory,
                  so mount your documents there.
                </P>
                <Steps>
                  <Step title="Pull the image">
                    <CodeBlock title="Terminal" code={`docker pull ${IMAGE}:latest`} />
                  </Step>
                  <Step title="Compile a file from the current folder">
                    <CodeBlock
                      title="Terminal"
                      code={`docker run --rm -v "$PWD":/workspace \\\n  ${IMAGE}:latest \\\n  typst compile hello.typ`}
                    />
                    <P>
                      The PDF is written back to the mounted folder. Swap <InlineCode>latest</InlineCode> for a
                      numbered tag to stay on one Typst version.
                    </P>
                  </Step>
                </Steps>
              </div>
            </Tabs.Panel>
          </Tabs>
        </Grid.Column>
      </Grid>
    </Section>
  )
}
