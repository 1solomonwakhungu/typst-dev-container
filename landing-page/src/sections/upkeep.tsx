import { CalendarClockIcon, FlaskConicalIcon, PackageIcon } from 'lucide-react'
import type { ReactNode } from 'react'

import { CodeBlock } from '@/components/code-block'
import { Reveal } from '@/components/reveal'
import { InlineCode, Section, TextLink } from '@/components/section'
import { REPO_URL, TEMPLATE_ID, toolchain } from '@/lib/site'

const skillCommands = `npx skills add ${REPO_URL} --skill typst-devcontainer-pandoc-setup
npx skills add ${REPO_URL} --skill typst-toolchain-version-updater`

function Stage({
  icon,
  title,
  delay,
  children,
}: {
  icon: ReactNode
  title: string
  delay: number
  children: ReactNode
}) {
  return (
    <Reveal delay={delay} className="h-full">
      <div className="group h-full rounded-xl border border-white/10 bg-zinc-900/50 p-5 transition-colors duration-300 hover:border-teal-400/30 hover:bg-zinc-900/80">
        <div className="flex size-9 items-center justify-center rounded-lg border border-white/10 bg-zinc-950 text-teal-300 transition-transform duration-300 group-hover:-translate-y-0.5 [&_svg]:size-4.5">
          {icon}
        </div>
        <h3 className="mt-4 text-base font-medium">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-zinc-400">{children}</p>
      </div>
    </Reveal>
  )
}

export function Upkeep() {
  return (
    <>
      <Section
        id="upkeep"
        title="How the versions stay current"
        intro="The version matrix is maintained by GitHub Actions workflows in the repository, not by hand."
        className="border-y border-white/10 bg-zinc-900/30"
      >
        <div className="grid gap-4 md:grid-cols-3">
          <Stage icon={<CalendarClockIcon aria-hidden />} title="Weekly update check" delay={0}>
            Every Monday a scheduled workflow looks up the three newest stable Typst releases and the newest Rust
            and Pandoc, and opens a pull request if anything changed. A release is only adopted once the files the
            image builds from are published.
          </Stage>
          <Stage icon={<FlaskConicalIcon aria-hidden />} title="Smoke test on pull requests" delay={80}>
            Pull requests that touch the image or the template build the image from the change and run the
            template smoke test against it, which checks that <InlineCode>typst</InlineCode> and{' '}
            <InlineCode>pandoc</InlineCode> run in the container.
          </Stage>
          <Stage icon={<PackageIcon aria-hidden />} title="Publish from main" delay={160}>
            Merges to <InlineCode>main</InlineCode> build every version for both platforms and push the tags to
            ghcr.io. The Dev Container template, currently version {toolchain.templateVersion}, is published
            separately.
          </Stage>
        </div>
        <Reveal className="mt-6">
          <p className="text-sm leading-6 text-zinc-400">
            Template id: <InlineCode>{TEMPLATE_ID}</InlineCode>. Workflows live in{' '}
            <TextLink href={`${REPO_URL}/tree/main/.github/workflows`}>.github/workflows</TextLink>.
          </p>
        </Reveal>
      </Section>

      <Section
        id="skills"
        title="Skills for coding agents"
        intro="The repository publishes two skills that can be installed with the skills CLI."
      >
        <div className="grid gap-6">
          <Reveal>
            <dl className="grid gap-6 text-sm leading-6 sm:grid-cols-2">
              <div>
                <dt className="font-mono text-[0.8125rem] break-all text-zinc-100">
                  typst-devcontainer-pandoc-setup
                </dt>
                <dd className="mt-1 text-zinc-400">
                  For document work. Sets up and verifies a containerized Typst and Pandoc workspace, converts
                  with Pandoc and compiles Typst to PDF.
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[0.8125rem] break-all text-zinc-100">
                  typst-toolchain-version-updater
                </dt>
                <dd className="mt-1 text-zinc-400">
                  For maintaining the repository. Updates the Typst, Rust and Pandoc version matrix and the
                  publishing workflow.
                </dd>
              </div>
            </dl>
          </Reveal>
          <Reveal delay={100}>
            <CodeBlock title="Terminal" code={skillCommands} />
          </Reveal>
        </div>
      </Section>
    </>
  )
}
