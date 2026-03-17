import { useState } from 'react'

interface FaqItem {
  q: string
  a: string
}

interface FaqAccordionProps {
  items: FaqItem[]
}

export default function FaqAccordion({ items }: FaqAccordionProps) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="divide-y divide-umber/20">
      {items.map((item, i) => (
        <div key={i} className="py-6">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-start justify-between gap-6 text-left"
            aria-expanded={open === i}
          >
            <span className="font-cormorant font-light text-xl lg:text-2xl text-charcoal leading-snug">
              {item.q}
            </span>
            <span
              className={`flex-shrink-0 mt-1 text-umber transition-transform duration-200 ${
                open === i ? 'rotate-45' : ''
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 1v14M1 8h14" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
              </svg>
            </span>
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              open === i ? 'max-h-96 mt-4' : 'max-h-0'
            }`}
          >
            <p className="font-garamond text-base leading-relaxed text-umber max-w-2xl">
              {item.a}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
