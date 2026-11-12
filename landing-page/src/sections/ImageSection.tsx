import { Animate, Grid, Heading, InlineLink, Label, Section, SectionIntro, Text } from '@primer/react-brand'

import { InlineCode } from '../components/CodeBlock'
import { CopyButton } from '../components/CopyButton'
import { IMAGE, REPO_URL, toolchain } from '../lib/site'
import styles from '../page.module.css'

const extensions = [
  { id: 'myriad-dreamin.tinymist', note: 'Typst language server, preview and typstyle formatting on save' },
  { id: 'FreddyZhu.pandoc-assist', note: 'Pandoc assistant' },
  { id: 'shardulm94.trailing-spaces', note: 'Highlights trailing whitespace' },
  { id: 'stkb.rewrap', note: 'Rewraps comments and prose' },
]

const facts = [
  { term: 'Typst', detail: 'The CLI from the static musl release build' },
  { term: 'Pandoc', detail: 'The official Linux release binaries' },
  { term: 'Rust', detail: 'The full toolchain from the official rust base image' },
  { term: 'Base', detail: 'Debian 13 (trixie)' },
  { term: 'Platforms', detail: 'linux/amd64 and linux/arm64' },
  { term: 'Workdir', detail: '/workspace' },
]

export function ImageSection() {
  return (
    <Section id="image" backgroundColor="subtle" paddingBlockStart="normal" paddingBlockEnd="normal">
      <Grid>
        <Grid.Column span={12}>
          <Animate animate="slide-in-up">
            <SectionIntro align="start" className={styles.intro}>
              <SectionIntro.Heading as="h2" size="3">
                What is in the image
              </SectionIntro.Heading>
              <SectionIntro.Description>
                Every supported Typst version is published as its own tag on ghcr.io. The versions below are read
                from the build matrix in the repository when this page is built.
              </SectionIntro.Description>
            </SectionIntro>
          </Animate>
        </Grid.Column>

        <Grid.Column span={{ xsmall: 12, large: 7 }}>
          <Animate animate="slide-in-up" className={styles.panelCard}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <caption className={styles.visuallyHidden}>Published image tags and the tool versions in each</caption>
                <thead>
                  <tr>
                    <th scope="col">Typst tag</th>
                    <th scope="col">Pandoc</th>
                    <th scope="col">Rust</th>
                    <th scope="col">
                      <span className={styles.visuallyHidden}>Copy image reference</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {toolchain.rows.map((row) => (
                    <tr key={row.typst}>
                      <th scope="row">
                        <span className={styles.tagCell}>
                          :{row.typst}
                          {row.typst === toolchain.latest ? (
                            <Label size="small" color="green">
                              latest
                            </Label>
                          ) : null}
                        </span>
                      </th>
                      <td>{row.pandoc}</td>
                      <td>{row.rust}</td>
                      <td className={styles.copyCell}>
                        <CopyButton
                          text={`${IMAGE}:${row.typst}`}
                          label={`Copy image reference for Typst ${row.typst}`}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Text as="p" size="200" variant="muted" className={styles.cardFooter}>
              <InlineCode>:latest</InlineCode> follows the newest supported Typst release. Numbered tags stay on one
              Typst version. Source:{' '}
              <InlineLink href={`${REPO_URL}/blob/main/images/typst/docker-bake.hcl`}>docker-bake.hcl</InlineLink>{' '}
              and the <InlineLink href={`${REPO_URL}/blob/main/images/typst/Dockerfile`}>Dockerfile</InlineLink>.
            </Text>
          </Animate>
        </Grid.Column>

        <Grid.Column span={{ xsmall: 12, large: 5 }}>
          <Animate animate="slide-in-up" className={`${styles.panelCard} ${styles.panelCardPadded}`}>
            <Heading as="h3" size="subhead-large">
              Contents
            </Heading>
            <dl className={styles.facts}>
              {facts.map((fact) => (
                <div key={fact.term}>
                  <dt>{fact.term}</dt>
                  <dd>{fact.detail}</dd>
                </div>
              ))}
            </dl>
          </Animate>
        </Grid.Column>

        <Grid.Column span={12}>
          <Animate animate="slide-in-up" className={`${styles.panelCard} ${styles.panelCardPadded}`}>
            <Heading as="h3" size="subhead-large">
              Editor setup that comes with the dev container
            </Heading>
            <ul className={styles.extensions}>
              {extensions.map((extension) => (
                <li key={extension.id}>
                  <span className={styles.extensionId}>{extension.id}</span>
                  <Text as="span" size="200" variant="muted">
                    {extension.note}
                  </Text>
                </li>
              ))}
            </ul>
            <Text as="p" size="200" variant="muted" className={styles.cardNote}>
              The config also turns on format on save, sets line endings to LF and maps{' '}
              <InlineCode>*.typ</InlineCode> files to Typst.
            </Text>
          </Animate>
        </Grid.Column>
      </Grid>
    </Section>
  )
}
