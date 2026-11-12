import type { ReactNode } from 'react'

import { Reveal } from '@/components/reveal'
import { InlineCode, Section } from '@/components/section'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { IMAGE } from '@/lib/site'

const notes: { id: string; question: string; answer: ReactNode }[] = [
  {
    id: 'size',
    question: 'How big is the first pull?',
    answer: (
      <p>
        Roughly 650 to 700 MB compressed, depending on the platform. Most of that is the Rust base image. Later
        starts reuse the cached image. Keep at least 3 GB of disk free for Docker.
      </p>
    ),
  },
  {
    id: 'pin',
    question: 'How do I pin a Typst version?',
    answer: (
      <p>
        Use a numbered tag such as <InlineCode>{IMAGE}:0.15.0</InlineCode> instead of{' '}
        <InlineCode>:latest</InlineCode>. With the template, set the <InlineCode>typstVersion</InlineCode> option.
        If <InlineCode>latest</InlineCode> changes how a document builds, reproduce with a numbered tag first.
      </p>
    ),
  },
  {
    id: 'user',
    question: 'Which user does the container run as?',
    answer: (
      <p>
        <InlineCode>root</InlineCode>. Remove the <InlineCode>remoteUser</InlineCode> line from{' '}
        <InlineCode>.devcontainer/devcontainer.json</InlineCode> if you need a different user.
      </p>
    ),
  },
  {
    id: 'platforms',
    question: 'Does it work on macOS and Windows?',
    answer: (
      <p>
        Yes, through Docker Desktop or WSL 2, or with no local Docker at all on GitHub Codespaces. The image is
        published for linux/amd64 and linux/arm64, so Apple silicon runs it natively.
      </p>
    ),
  },
  {
    id: 'build-fails',
    question: 'The container fails to start. What should I check?',
    answer: (
      <p>
        Check that Docker is running and has free disk space, then pull the image directly with{' '}
        <InlineCode>docker pull {IMAGE}:latest</InlineCode>. In VS Code, the Remote output panel has the detailed
        log.
      </p>
    ),
  },
  {
    id: 'not-found',
    question: 'typst or pandoc is not found in the terminal',
    answer: (
      <p>
        The terminal is probably running on the host. Check that the bottom left corner of VS Code says Dev
        Container, and reopen the workspace in the container if it does not.
      </p>
    ),
  },
]

export function Notes() {
  return (
    <Section id="notes" title="Good to know" className="border-t border-white/10 bg-zinc-900/30">
      <Reveal className="max-w-3xl">
        <Accordion className="rounded-xl border border-white/10 bg-zinc-950/60 px-4 sm:px-5">
          {notes.map((note) => (
            <AccordionItem key={note.id} value={note.id} className="not-last:border-white/10">
              <AccordionTrigger className="py-4 text-[0.9375rem] hover:text-teal-200 hover:no-underline">
                {note.question}
              </AccordionTrigger>
              <AccordionContent className="pb-4 text-sm leading-6 text-zinc-400">{note.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </Section>
  )
}
