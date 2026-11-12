import { GitHubIcon, LogoMark } from '@/components/icons'
import { buttonVariants } from '@/components/ui/button'
import { REPO_URL } from '@/lib/site'
import { cn } from '@/lib/utils'

const links = [
  { href: '#quick-start', label: 'Quick start' },
  { href: '#image', label: 'Image' },
  { href: '#usage', label: 'Usage' },
  { href: '#upkeep', label: 'Upkeep' },
  { href: '#notes', label: 'Notes' },
]

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-zinc-950/75 backdrop-blur-md">
      <a
        href="#main"
        className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:top-2 focus-visible:left-2 focus-visible:z-50 focus-visible:rounded-md focus-visible:bg-zinc-900 focus-visible:px-3 focus-visible:py-2 focus-visible:text-sm"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#top" className="group flex items-center gap-2.5 rounded-md text-sm font-semibold tracking-tight">
          <LogoMark className="size-7 transition-transform duration-300 group-hover:-rotate-6" />
          <span>
            typst<span className="text-zinc-500">-dev-container</span>
          </span>
        </a>
        <nav aria-label="Sections" className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md px-2.5 py-1.5 text-sm text-zinc-400 transition-colors hover:bg-white/5 hover:text-zinc-50"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a href={REPO_URL} className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'gap-2 px-3')}>
          <GitHubIcon className="size-4" />
          GitHub
        </a>
      </div>
    </header>
  )
}
