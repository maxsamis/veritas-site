import { Link } from 'react-router-dom'
import { useRef, useEffect, useState } from 'react'

function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, isVisible }
}

const beliefStatements = [
  {
    number: '01',
    lead: 'For centuries, sacred portraiture lived in churches and chapels.',
    body: 'The rest of the world made do with mass-produced reproductions on paper that yellows and fades within a generation.',
  },
  {
    number: '02',
    lead: 'We changed that.',
    body: 'Veritas Editions works with studio artists in the Flemish and Renaissance tradition to produce limited-edition archival prints \u2014 250 per portrait, never reprinted \u2014 on the same museum-grade paper used by the Louvre.',
  },
  {
    number: '03',
    lead: 'This is not decoration.',
    body: 'It is portraiture with a point of view. The faces in these works are not illustrations. They are presences.',
  },
]

const stats = [
  { value: '250', label: 'per portrait, forever' },
  { value: '310 GSM', label: 'Hahnemüh\u00fcle Photo Rag' },
  { value: '200+', label: 'years archival life' },
]

function BeliefStatement({ statement, delay }: { statement: typeof beliefStatements[0]; delay: number }) {
  const { ref, isVisible } = useFadeIn()

  return (
    <div className="relative overflow-hidden py-20 px-6" style={{ backgroundColor: '#EFECE5' }}>
      {/* Ghost number — absolute top-right */}
      <span
        className="absolute top-4 right-4 font-cormorant italic select-none pointer-events-none"
        style={{
          fontSize: '120px',
          color: '#E4E4E7',
          opacity: 0.5,
          lineHeight: 1,
        }}
      >
        {statement.number}
      </span>

      <div
        ref={ref}
        className={`max-w-2xl mx-auto text-center relative z-10 transition-all duration-700`}
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
          transitionDelay: `${delay}ms`,
        }}
      >
        <p
          className="font-cormorant italic font-semibold text-3xl leading-snug mb-6"
          style={{ color: '#1C1A17' }}
        >
          {statement.lead}
        </p>
        <p
          className="font-garamond text-base leading-relaxed"
          style={{ color: '#8C8C7A' }}
        >
          {statement.body}
        </p>
      </div>
    </div>
  )
}

export default function About() {
  const heroFade = useFadeIn()
  const statsFade = useFadeIn()
  const closingFade = useFadeIn()

  return (
    <div>

      {/* ── Section 1: Dark Cinematic Hero ─────────────── */}
      <section
        className="relative flex flex-col items-center justify-center text-center overflow-hidden"
        style={{ minHeight: '100vh', backgroundColor: '#1C1A17' }}
      >
        {/* Background texture image at 20% opacity */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: 'url(https://i.imgur.com/zhzfFp0.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.2,
          }}
        />

        {/* Dark overlay */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: 'rgba(28,26,23,0.65)' }}
        />

        {/* Hero content */}
        <div
          ref={heroFade.ref}
          className={`relative z-10 px-6 flex flex-col items-center transition-all duration-700 ${
            heroFade.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {/* Label */}
          <p
            className="font-garamond text-xs tracking-widest uppercase mb-8"
            style={{ color: '#8C8C7A' }}
          >
            About Veritas
          </p>

          {/* Main heading */}
          <h1
            className="font-cormorant italic font-light text-5xl lg:text-7xl leading-tight max-w-3xl"
            style={{ color: '#FFFFFF' }}
          >
            We make the sacred available.
          </h1>

          {/* Gold line */}
          <div
            style={{
              width: '60px',
              height: '1px',
              backgroundColor: '#C4A55A',
              margin: '2rem auto',
            }}
          />

          {/* Subtitle */}
          <p
            className="font-garamond text-lg leading-relaxed max-w-xl"
            style={{ color: '#A8A39C' }}
          >
            Veritas Editions produces limited-edition archival portraits in the Flemish and Renaissance tradition.
          </p>
        </div>

        {/* Scroll chevron — bouncing */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce"
          style={{ opacity: 0.4 }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </section>

      {/* ── Section 2: Three Belief Statements ─────────── */}
      <div>
        {beliefStatements.map((statement, idx) => (
          <BeliefStatement key={statement.number} statement={statement} delay={idx * 80} />
        ))}
      </div>

      {/* ── Section 3: Dark Stat Strip ─────────────────── */}
      <section
        className="w-full py-20 px-6 relative overflow-hidden"
        style={{ backgroundColor: '#1C1A17' }}
      >
        <div
          ref={statsFade.ref}
          className={`max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center transition-all duration-700 ${
            statsFade.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {stats.map((stat, idx) => (
            <div key={stat.value} className="flex items-center">
              <div className="text-center px-10 py-6">
                <p
                  className="font-cormorant italic text-5xl leading-none mb-3"
                  style={{ color: '#FFFFFF' }}
                >
                  {stat.value}
                </p>
                <p
                  className="font-garamond text-xs tracking-widest uppercase"
                  style={{ color: '#8C8C7A' }}
                >
                  {stat.label}
                </p>
              </div>
              {/* Gold divider between stats */}
              {idx < stats.length - 1 && (
                <div
                  className="hidden sm:block flex-shrink-0"
                  style={{
                    width: '1px',
                    height: '60px',
                    backgroundColor: '#C4A55A',
                    opacity: 0.5,
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── Section 4: Closing ─────────────────────────── */}
      <section
        className="py-24 px-6 text-center"
        style={{ backgroundColor: '#EFECE5' }}
      >
        <div
          ref={closingFade.ref}
          className={`max-w-2xl mx-auto flex flex-col items-center transition-all duration-700 ${
            closingFade.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <h2
            className="font-cormorant italic font-light text-4xl leading-tight"
            style={{ color: '#1C1A17' }}
          >
            Owned by those who know the difference.
          </h2>

          {/* Gold line */}
          <div
            style={{
              width: '60px',
              height: '1px',
              backgroundColor: '#C4A55A',
              margin: '2rem auto',
            }}
          />

          {/* Closing italic */}
          <p
            className="font-garamond italic text-sm"
            style={{ color: '#8C8C7A' }}
          >
            Veritas. Truth.
          </p>

          {/* CTA Button */}
          <Link
            to="/collection"
            className="inline-block font-garamond text-xs tracking-widest uppercase px-10 py-4 mt-10 transition-all duration-200"
            style={{
              backgroundColor: '#1C1A17',
              color: '#FFFFFF',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#2A2927'
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#1C1A17'
            }}
          >
            View the Collection
          </Link>
        </div>
      </section>

    </div>
  )
}
