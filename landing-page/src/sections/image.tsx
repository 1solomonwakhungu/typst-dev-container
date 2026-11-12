import { CopyButton } from '@/components/copy-button'
import { Reveal } from '@/components/reveal'
import { InlineCode, Section, TextLink } from '@/components/section'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { IMAGE, REPO_URL, toolchain } from '@/lib/site'

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

export function Image() {
  return (
    <Section
      id="image"
      title="What is in the image"
      intro={
        <>
          Every supported Typst version is published as its own tag on ghcr.io. The versions below are read from
          the build matrix in the repository when this page is built.
        </>
      }
      className="border-y border-white/10 bg-zinc-900/30"
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <Reveal>
          <div className="overflow-hidden rounded-xl border border-white/10 bg-zinc-950/60">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[19rem] text-left text-sm">
                <caption className="sr-only">Published image tags and the tool versions in each</caption>
                <thead>
                  <tr className="border-b border-white/10 text-xs tracking-wide text-zinc-500 uppercase">
                    <th scope="col" className="px-3 py-3 font-medium sm:px-4">
                      Typst tag
                    </th>
                    <th scope="col" className="px-3 py-3 font-medium sm:px-4">
                      Pandoc
                    </th>
                    <th scope="col" className="px-3 py-3 font-medium sm:px-4">
                      Rust
                    </th>
                    <th scope="col" className="px-2 py-3 text-right font-medium">
                      <span className="sr-only">Copy image reference</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="font-mono text-[0.8125rem]">
                  {toolchain.rows.map((row) => {
                    const isLatest = row.typst === toolchain.latest
                    return (
                      <tr
                        key={row.typst}
                        className="border-b border-white/5 transition-colors duration-200 last:border-0 hover:bg-white/[0.03]"
                      >
                        <th scope="row" className="px-3 py-3 font-normal whitespace-nowrap text-zinc-50 sm:px-4">
                          <span className="inline-flex items-center gap-2">
                            :{row.typst}
                            {isLatest ? (
                              <Badge
                                variant="outline"
                                className="border-teal-400/30 bg-teal-400/10 font-sans text-teal-200"
                              >
                                latest
                              </Badge>
                            ) : null}
                          </span>
                        </th>
                        <td className="px-3 py-3 text-zinc-300 sm:px-4">{row.pandoc}</td>
                        <td className="px-3 py-3 text-zinc-300 sm:px-4">{row.rust}</td>
                        <td className="py-2 pr-2 pl-2 text-right sm:pl-4">
                          <CopyButton
                            text={`${IMAGE}:${row.typst}`}
                            label={`Copy image reference for Typst ${row.typst}`}
                            compact
                            className="font-sans"
                          />
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            <p className="border-t border-white/10 px-4 py-3 text-sm leading-6 text-zinc-400">
              <InlineCode>:latest</InlineCode> follows the newest supported Typst release. Numbered tags stay on one
              Typst version. Source:{' '}
              <TextLink href={`${REPO_URL}/blob/main/images/typst/docker-bake.hcl`}>docker-bake.hcl</TextLink> and
              the <TextLink href={`${REPO_URL}/blob/main/images/typst/Dockerfile`}>Dockerfile</TextLink>.
            </p>
          </div>
        </Reveal>

        <Reveal delay={100} className="grid gap-6">
          <Card className="bg-zinc-950/60">
            <CardHeader>
              <CardTitle>Contents</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-2.5 text-sm">
                {facts.map((fact) => (
                  <div key={fact.term} className="col-span-2 grid grid-cols-subgrid">
                    <dt className="font-mono text-xs leading-6 text-teal-300">{fact.term}</dt>
                    <dd className="leading-6 text-zinc-300">{fact.detail}</dd>
                  </div>
                ))}
              </dl>
            </CardContent>
          </Card>
        </Reveal>
      </div>

      <Reveal className="mt-6">
        <Card className="bg-zinc-950/60">
          <CardHeader>
            <CardTitle>Editor setup that comes with the dev container</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {extensions.map((extension) => (
                <li key={extension.id} className="text-sm leading-6">
                  <span className="font-mono text-[0.8125rem] break-all text-zinc-100">{extension.id}</span>
                  <span className="block text-zinc-400">{extension.note}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 border-t border-white/10 pt-4 text-sm leading-6 text-zinc-400">
              The config also turns on format on save, sets line endings to LF and maps{' '}
              <InlineCode>*.typ</InlineCode> files to Typst.
            </p>
          </CardContent>
        </Card>
      </Reveal>
    </Section>
  )
}
