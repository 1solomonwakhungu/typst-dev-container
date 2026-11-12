import { ArrowUpRightIcon } from 'lucide-react'

import { GitHubIcon, LogoMark } from '@/components/icons'
import { Reveal } from '@/components/reveal'
import { buttonVariants } from '@/components/ui/button'
import { AUTHOR_URL, CODESPACES_URL, REPO_URL } from '@/lib/site'
import { cn } from '@/lib/utils'

const groups = [
  {
    title: 'Project',
    links: [
      { label: 'Repository', href: REPO_URL },
      { label: 'Issues', href: `${REPO_URL}/issues` },
      { label: 'Contributing', href: `${REPO_URL}/blob/main/CONTRIBUTING.md` },
      { label: 'License (MIT)', href: `${REPO_URL}/blob/main/LICENSE` },
    ],
  },
  {
    title: 'Reference',
    links: [
      { label: 'Typst documentation', href: 'https://typst.app/docs/' },
      { label: 'Pandoc user guide', href: 'https://pandoc.org/MANUAL.html' },
      { label: 'Dev Containers specification', href: 'https://containers.dev/' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <Reveal className="flex flex-col items-start justify-between gap-6 py-14 sm:py-16 lg:flex-row lg:items-center">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
              Clone it, reopen in the container, compile.
            </h2>
            <p className="mt-2 text-base text-zinc-400">The source, issues and version matrix are on GitHub.</p>
          </div>
          <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row">
            <a href={REPO_URL} className={cn(buttonVariants({ size: 'lg' }), 'h-11 gap-2 px-5 text-[0.9375rem] font-semibold')}>
              <GitHubIcon className="size-4" />
              View on GitHub
            </a>
            <a
              href={CODESPACES_URL}
              className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'h-11 px-5 text-[0.9375rem]')}
            >
              Open in Codespaces
            </a>
          </div>
        </Reveal>

        <div className="grid gap-10 border-t border-white/10 py-10 sm:grid-cols-[minmax(0,1.4fr)_repeat(2,minmax(0,1fr))]">
          <div>
            <div className="flex items-center gap-2.5 text-sm font-semibold tracking-tight">
              <LogoMark className="size-7" />
              typst-dev-container
            </div>
            <p className="mt-3 max-w-xs text-sm leading-6 text-zinc-400">
              Typst and Pandoc dev container for reproducible PDF document builds.
            </p>
          </div>
          {groups.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h3 className="text-xs font-medium tracking-wide text-zinc-500 uppercase">{group.title}</h3>
              <ul className="mt-3 space-y-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="group inline-flex items-center gap-1 rounded-sm text-sm text-zinc-300 transition-colors hover:text-teal-200"
                    >
                      {link.label}
                      <ArrowUpRightIcon
                        aria-hidden
                        className="size-3.5 text-zinc-600 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-teal-300"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <p className="border-t border-white/10 py-6 text-sm text-zinc-500">
          Made by{' '}
          <a href={AUTHOR_URL} className="rounded-sm text-zinc-300 transition-colors hover:text-teal-200">
            Solomon Wakhungu
          </a>
          . Released under the MIT License.
        </p>
      </div>
    </footer>
  )
}
