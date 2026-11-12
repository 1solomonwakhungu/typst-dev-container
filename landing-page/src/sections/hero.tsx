import { ArrowRightIcon } from 'lucide-react'
import { Fragment } from 'react'

import { CopyButton } from '@/components/copy-button'
import { GitHubIcon } from '@/components/icons'
import { Reveal } from '@/components/reveal'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { CODESPACES_URL, IMAGE, REPO_URL, latestRow } from '@/lib/site'
import { cn } from '@/lib/utils'

const pullCommand = `docker pull ${IMAGE}:latest`
// Lets the long image reference wrap after a slash instead of mid-word.
const pullParts = pullCommand.split(/(?<=\/)/)

function SourcePane() {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-zinc-900/80 shadow-2xl shadow-black/40">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
        <span aria-hidden className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-zinc-700" />
          <span className="size-2.5 rounded-full bg-zinc-700" />
          <span className="size-2.5 rounded-full bg-zinc-700" />
        </span>
        <span className="ml-2 font-mono text-xs text-zinc-400">hello.typ</span>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[0.8125rem] leading-6 text-zinc-200">
        <code>
          <span className="block">
            <span className="text-teal-300">#set</span> <span className="text-sky-300">text</span>(size:{' '}
            <span className="text-amber-200">14pt</span>)
          </span>
          <span className="block font-semibold text-zinc-50">
            <span className="text-teal-300">=</span> Hello, Typst!
          </span>
          <span className="block">This is a simple PDF document.</span>
        </code>
      </pre>
      <div className="border-t border-white/10 bg-zinc-950/60 px-4 py-3 font-mono text-[0.8125rem] leading-6">
        <span aria-hidden className="mr-3 text-teal-400/70 select-none">
          $
        </span>
        <span className="text-zinc-200">typst compile hello.typ</span>
        <span aria-hidden className="caret ml-1 inline-block h-4 w-[7px] translate-y-[3px] bg-teal-400/80" />
      </div>
    </div>
  )
}

function PaperPane() {
  return (
    <div className="group/paper relative">
      <div
        aria-hidden
        className="absolute inset-x-6 -bottom-3 h-10 rounded-full bg-teal-400/20 blur-2xl transition-opacity duration-500 group-hover/paper:opacity-80"
      />
      <div className="relative aspect-[1/1.2] w-full rounded-md bg-zinc-50 p-5 font-serif text-zinc-900 shadow-2xl ring-1 shadow-black/50 ring-white/20 transition-transform duration-500 ease-out group-hover/paper:-translate-y-1 group-hover/paper:rotate-[0.4deg] sm:p-6">
        <p className="text-xl leading-tight font-bold whitespace-nowrap">Hello, Typst!</p>
        <p className="mt-2.5 text-[0.8125rem] leading-snug">This is a simple PDF document.</p>
        <span className="absolute right-3 bottom-2.5 font-mono text-[0.65rem] tracking-wide text-zinc-400">
          hello.pdf
        </span>
      </div>
    </div>
  )
}

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div aria-hidden className="page-grid pointer-events-none absolute inset-0" />
      <div aria-hidden className="page-glow pointer-events-none absolute inset-0" />
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-4 pt-14 pb-16 sm:px-6 sm:pt-20 sm:pb-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12">
        <Reveal>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="h-6 gap-1.5 border-teal-400/30 bg-teal-400/10 px-2.5 text-teal-200">
              <span aria-hidden className="size-1.5 rounded-full bg-teal-400" />
              Typst {latestRow.typst}
            </Badge>
            <Badge variant="outline" className="h-6 px-2.5 text-zinc-300">
              Pandoc {latestRow.pandoc}
            </Badge>
            <Badge variant="outline" className="h-6 px-2.5 text-zinc-300">
              Rust {latestRow.rust}
            </Badge>
          </div>
          <h1 className="mt-6 text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Typst and Pandoc in <span className="text-primary">one container</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-pretty text-zinc-400 sm:text-lg sm:leading-8">
            A prebuilt image with pinned versions of Typst, Pandoc and Rust. Open it in VS Code Dev Containers,
            GitHub Codespaces or plain Docker and get the same PDF build on every machine.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#quick-start"
              className={cn(buttonVariants({ size: 'lg' }), 'group/cta h-11 gap-2 px-5 text-[0.9375rem] font-semibold')}
            >
              Quick start
              <ArrowRightIcon className="size-4 transition-transform duration-200 group-hover/cta:translate-x-0.5" />
            </a>
            <a
              href={CODESPACES_URL}
              className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'h-11 px-5 text-[0.9375rem]')}
            >
              Open in Codespaces
            </a>
            <a
              href={REPO_URL}
              className={cn(buttonVariants({ variant: 'ghost', size: 'lg' }), 'h-11 gap-2 px-4 text-[0.9375rem]')}
            >
              <GitHubIcon className="size-4" />
              Source
            </a>
          </div>
          <div className="mt-6 flex items-center gap-2 rounded-xl border border-white/10 bg-zinc-900/70 py-1.5 pr-1.5 pl-4 transition-colors duration-300 hover:border-white/15">
            <pre aria-label="Pull command" className="min-w-0 flex-1 py-1.5 font-mono text-xs leading-5 [overflow-wrap:anywhere] whitespace-pre-wrap text-zinc-200 sm:text-[0.8125rem]">
              <code>
                <span aria-hidden className="mr-3 text-teal-400/70 select-none">
                  $
                </span>
                {pullParts.map((part, index) => (
                  <Fragment key={index}>
                    {part}
                    <wbr />
                  </Fragment>
                ))}
              </code>
            </pre>
            <CopyButton text={pullCommand} label="Copy pull command" />
          </div>
          <p className="mt-3 text-sm text-zinc-500">MIT licensed. Built for linux/amd64 and linux/arm64.</p>
        </Reveal>

        <Reveal delay={120}>
          <figure aria-label="A Typst source file and the PDF page it compiles to">
            <div className="grid items-center gap-5 sm:grid-cols-[minmax(0,1fr)_13rem] lg:grid-cols-1 xl:grid-cols-[minmax(0,1fr)_13rem]">
              <SourcePane />
              <div className="mx-auto w-full max-w-[13rem]">
                <PaperPane />
              </div>
            </div>
            <figcaption className="mt-5 text-sm text-zinc-500">
              The three line example from the README, and the page it compiles to.
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  )
}
