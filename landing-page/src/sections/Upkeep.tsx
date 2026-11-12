import { Grid, Heading, InlineLink, Section, SectionIntro, Text } from '@primer/react-brand'

import { CodeBlock, InlineCode } from '../components/CodeBlock'
import { REPO_URL, TEMPLATE_ID, toolchain } from '../lib/site'
import styles from '../page.module.css'

const skillCommands = `npx skills add ${REPO_URL} --skill typst-devcontainer-pandoc-setup
npx skills add ${REPO_URL} --skill typst-toolchain-version-updater`

export function Upkeep() {
  return (
    <>
      <Section id="upkeep" backgroundColor="subtle" paddingBlockStart="normal" paddingBlockEnd="normal">
        <Grid>
          <Grid.Column span={12}>
            
              <SectionIntro align="start" className={styles.intro}>
                <SectionIntro.Heading as="h2" size="3">
                  How the versions stay current
                </SectionIntro.Heading>
                <SectionIntro.Description>
                  The version matrix is maintained by GitHub Actions workflows in the repository, not by hand.
                </SectionIntro.Description>
              </SectionIntro>
            
          </Grid.Column>
          <Grid.Column span={{ xsmall: 12, large: 9 }}>
            <dl className={styles.workflow}>
              <div>
                <dt>Weekly update check</dt>
                <dd>
                  Every Monday a scheduled workflow looks up the three newest stable Typst releases and the newest
                  Rust and Pandoc, and opens a pull request if anything changed. A release is only adopted once the
                  files the image builds from are published.
                </dd>
              </div>
              <div>
                <dt>Smoke test on pull requests</dt>
                <dd>
                  Pull requests that touch the image or the template build the image from the change and run the
                  template smoke test against it, which checks that <InlineCode>typst</InlineCode> and{' '}
                  <InlineCode>pandoc</InlineCode> run in the container.
                </dd>
              </div>
              <div>
                <dt>Publish from main</dt>
                <dd>
                  Merges to <InlineCode>main</InlineCode> build every version for both platforms and push the tags
                  to ghcr.io. The Dev Container template, currently version {toolchain.templateVersion}, is
                  published separately.
                </dd>
              </div>
            </dl>
          </Grid.Column>
          <Grid.Column span={12}>
            <Text as="p" size="200" variant="muted">
              Template id: <InlineCode>{TEMPLATE_ID}</InlineCode>. Workflows live in{' '}
              <InlineLink href={`${REPO_URL}/tree/main/.github/workflows`}>.github/workflows</InlineLink>.
            </Text>
          </Grid.Column>
        </Grid>
      </Section>

      <Section id="skills" paddingBlockStart="normal" paddingBlockEnd="normal">
        <Grid>
          <Grid.Column span={12}>
            
              <SectionIntro align="start" className={styles.intro}>
                <SectionIntro.Heading as="h2" size="3">
                  Skills for coding agents
                </SectionIntro.Heading>
                <SectionIntro.Description>
                  The repository publishes two skills that can be installed with the skills CLI.
                </SectionIntro.Description>
              </SectionIntro>
            
          </Grid.Column>
          <Grid.Column span={{ xsmall: 12, medium: 6 }}>
            <Heading as="h3" size="subhead-large" className={styles.skillName}>
              typst-devcontainer-pandoc-setup
            </Heading>
            <Text as="p" size="200" variant="muted">
              For document work. Sets up and verifies a containerized Typst and Pandoc workspace, converts with
              Pandoc and compiles Typst to PDF.
            </Text>
          </Grid.Column>
          <Grid.Column span={{ xsmall: 12, medium: 6 }}>
            <Heading as="h3" size="subhead-large" className={styles.skillName}>
              typst-toolchain-version-updater
            </Heading>
            <Text as="p" size="200" variant="muted">
              For maintaining the repository. Updates the Typst, Rust and Pandoc version matrix and the publishing
              workflow.
            </Text>
          </Grid.Column>
          <Grid.Column span={12}>
            <CodeBlock title="Terminal" code={skillCommands} />
          </Grid.Column>
        </Grid>
      </Section>
    </>
  )
}
