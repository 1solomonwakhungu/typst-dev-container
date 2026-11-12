import { type KeyboardEvent, type ReactNode, useId, useRef, useState } from 'react'

import styles from '../page.module.css'

export type TabItem = { id: string; label: string; content: ReactNode }

/** Underline tabs, following the WAI-ARIA tabs pattern with automatic activation. */
export function Tabs({ label, items }: { label: string; items: TabItem[] }) {
  const [active, setActive] = useState(items[0].id)
  const baseId = useId()
  const refs = useRef<Record<string, HTMLButtonElement | null>>({})

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const index = items.findIndex((item) => item.id === active)
    const last = items.length - 1
    const next =
      event.key === 'ArrowRight'
        ? index === last ? 0 : index + 1
        : event.key === 'ArrowLeft'
          ? index === 0 ? last : index - 1
          : event.key === 'Home'
            ? 0
            : event.key === 'End'
              ? last
              : -1
    if (next === -1) return
    event.preventDefault()
    setActive(items[next].id)
    refs.current[items[next].id]?.focus()
  }

  return (
    <div>
      <div role="tablist" aria-label={label} className={styles.tabList} onKeyDown={onKeyDown}>
        {items.map((item) => (
          <button
            key={item.id}
            ref={(node) => {
              refs.current[item.id] = node
            }}
            type="button"
            role="tab"
            id={`${baseId}-tab-${item.id}`}
            aria-selected={active === item.id}
            aria-controls={`${baseId}-panel-${item.id}`}
            tabIndex={active === item.id ? 0 : -1}
            className={styles.tab}
            onClick={() => setActive(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      {items.map((item) => (
        <div
          key={item.id}
          role="tabpanel"
          id={`${baseId}-panel-${item.id}`}
          aria-labelledby={`${baseId}-tab-${item.id}`}
          hidden={active !== item.id}
        >
          {item.content}
        </div>
      ))}
    </div>
  )
}
