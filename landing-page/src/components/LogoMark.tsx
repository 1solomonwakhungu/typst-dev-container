import type { SVGProps } from 'react'

/* The viewBox hugs the glyph so the mark sits flush on the layout's left edge. */
export function LogoMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="6 4.5 19 23" fill="none" aria-hidden {...props}>
      <path
        d="M9 5.5h9.5L24 11v13.5a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-17a2 2 0 0 1 2-2z"
        fill="#161b22"
        stroke="#3fb950"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M18.5 5.5V11H24" stroke="#3fb950" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M11.5 16.5h8M11.5 20.5h8" stroke="#56d364" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}
