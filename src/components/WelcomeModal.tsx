import { useState, useEffect } from 'react'

const STORAGE_KEY = 'veritas_modal_dismissed'
const DELAY_MS = 3500
const DISCOUNT_CODE = 'WELCOME20'

export default function WelcomeModal() {
  const [visible, setVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return
    const timer = setTimeout(() => setVisible(true), DELAY_MS)
    return () => clearTimeout(timer)
  }, [])

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, '1')
    setVisible(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    localStorage.setItem(STORAGE_KEY, '1')
    setSubmitted(true)
  }

  const copyCode = () => {
    navigator.clipboard.writeText(DISCOUNT_CODE).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
      style={{ backgroundColor: 'rgba(28,26,23,0.75)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) dismiss() }}
    >
      <div
        className="relative w-full max-w-md"
        style={{ backgroundColor: '#EFECE5', border: '1px solid #C4BDB3' }}
      >
        {/* Close */}
        <button
          onClick={dismiss}
          className="absolute top-4 right-4 text-umber hover:text-charcoal transition-colors"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Gold rule */}
        <div style={{ height: '2px', backgroundColor: '#C4A55A' }} />

        <div className="px-10 py-12 text-center">
          {!submitted ? (
            <>
              <p className="font-garamond text-xs tracking-[0.2em] uppercase text-umber mb-4">
                Limited Time
              </p>
              <h2 className="font-cormorant italic font-light text-4xl text-charcoal mb-3 leading-tight">
                Save 20% on your first edition.
              </h2>
              <p className="font-garamond text-sm text-umber leading-relaxed mb-8 max-w-xs mx-auto">
                Enter your email to receive your personal discount code. Valid on any portrait, any size.
              </p>
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full font-garamond text-sm text-charcoal bg-white border border-[#C4BDB3] px-4 py-3 outline-none focus:border-[#2A2927] transition-colors placeholder:text-umber/40"
                />
                <button
                  type="submit"
                  className="w-full font-garamond text-xs tracking-[0.18em] uppercase font-bold py-3.5 transition-colors"
                  style={{ backgroundColor: '#1C1A17', color: '#EFECE5' }}
                >
                  Claim 20% Off
                </button>
              </form>
              <p className="font-garamond text-xs text-umber/50 mt-5">
                One use per customer. Not combinable with other offers.
              </p>
            </>
          ) : (
            <>
              <p className="font-garamond text-xs tracking-[0.2em] uppercase text-umber mb-4">
                Your Code
              </p>
              <h2 className="font-cormorant italic font-light text-4xl text-charcoal mb-3">
                Welcome.
              </h2>
              <p className="font-garamond text-sm text-umber mb-8">
                Apply this code at checkout to save 20%.
              </p>
              <button
                onClick={copyCode}
                className="w-full font-garamond text-sm tracking-[0.25em] uppercase py-4 border transition-colors mb-3"
                style={{ borderColor: '#2A2927', backgroundColor: copied ? '#2A2927' : 'transparent', color: copied ? '#EFECE5' : '#1C1A17' } as React.CSSProperties}
              >
                {copied ? 'Copied' : DISCOUNT_CODE}
              </button>
              <p className="font-garamond text-xs text-umber/50">
                Tap to copy · Valid until end of month
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
