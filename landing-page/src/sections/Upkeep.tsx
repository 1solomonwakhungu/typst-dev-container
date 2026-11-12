import { InlineLink } from '@primer/react-brand'

import { CodeBlock, InlineCode } from '../components/CodeBlock'
import { PageSection } from '../components/Layout'
import { REPO_URL, TEMPLATE_ID, toolchain } from '../lib/site'
import styles from '../page.module.css'

const skills = [
  {
    name: 'typst-devcontainer-pandoc-setup',
    note: 'For document work. Sets up and verifies a containerized Typst and Pandoc workspace, converts with Pandoc and compiles Typst to PDF.',
  },
  {
    name: 'typst-toolchain-version-updater',
    note: 'For maintaining the repository. Updates the Typst, Rust and Pandoc version matrix and the publishing workflow.',
  },
]

export function Upkeep() {
  return (
    <>
      <PageSection
        id="upkeep"
        title="How the versions stay current"
        intro="The version matrix is maintained by GitHub Actions workflows in the repository, not by hand."
        alt
      >
        <dl className={styles.ledger}>
          <div className={styles.split}>
            <dt>Weekly update check</dt>
            <dd>
              Every Monday a scheduled workflow looks up the three newest stable Typst releases and the newest Rust
              and Pandoc, and opens a pull request if anything changed. A release is only adopted once the files the
              image builds from are published.
            </dd>
          </div>
          <div className={styles.split}>
            <dt>Smoke test on pull requests</dt>
            <dd>
              Pull requests that touch the image or the template build the image from the change and run the
              template smoke test against it, which checks that <InlineCode>typst</InlineCode> and{' '}
              <InlineCode>pandoc</InlineCode> run in the container.
            </dd>
          </div>
          <div className={styles.split}>
            <dt>Publish from main</dt>
            <dd>
              Merges to <InlineCode>main</InlineCode> build every version for both platforms and push the tags to
              ghcr.io. The Dev Container template, currently version {toolchain.templateVersion}, is published
              separately.
            </dd>
          </div>
          <div className={styles.split}>
            <dt>Where it lives</dt>
            <dd>
              Workflows are in{' '}
              <InlineLink href={`${REPO_URL}/tree/main/.github/workflows`}>.github/workflows</InlineLink>. The
              template id is <InlineCode>{TEMPLATE_ID}</InlineCode>.
            </dd>
          </div>
        </dl>
      </PageSection>

      <PageSection
        id="skills"
        title="Skills for coding agents"
        intro="The repository publishes two skills that can be installed with the skills CLI."
      >
        <dl className={styles.ledger}>
          {skills.map((skill) => (
            <div key={skill.name} className={styles.split}>
              <div>
                <dt className={styles.mono}>{skill.name}</dt>
                <dd>{skill.note}</dd>
              </div>
              <dd>
                <CodeBlock title="Terminal" code={`npx skills add \\\n  ${REPO_URL} \\\n  --skill ${skill.name}`} />
              </dd>
            </div>
          ))}
        </dl>
      </PageSection>
    </>
  )
}
