import { Link } from 'react-router-dom'
import { useRef, useEffect, useState } from 'react'

const sections = [
  {
    number: '01',
    title: 'Fine Art Paper',
    subtitle: 'The Paper',
    body: 'We print exclusively on Hahnemühle Photo Rag 308, a 100% cotton rag paper with a smooth matte surface that eliminates glare and gives each piece the presence of an original painting. No optical brighteners. No shortcuts.',
    image: 'https://i.imgur.com/1BEQ1tN.png',
    stat: '310 GSM',
    statLabel: 'Hahnemühle Photo Rag',
  },
  {
    number: '02',
    title: '12-Color Archival Pigment Inks',
    subtitle: 'The Inks',
    body: 'Our Epson SC-P9000 printers use UltraChrome HDX pigment inks rated for 200+ years of light-fastness. Blacks are deep and dimensionally rich. Colors are faithful to the original composition. Every print is inspected under museum-grade lighting before framing.',
    image: 'https://i.imgur.com/s3vxNBv.png',
    stat: '200+',
    statLabel: 'years of light-fastness',
  },
  {
    number: '03',
    title: 'Hand-Assembled in the United States',
    subtitle: 'The Frame',
    body: 'Each frame is built from solid wood moulding, hand-assembled by our team in Austin, Texas. We use museum-quality UV-protective glazing and acid-free backing board. The result is a piece that will outlast the wall it hangs on.',
    image: 'https://i.imgur.com/zhzfFp0.png',
    stat: '100%',
    statLabel: 'solid wood moulding',
  },
  {
    number: '04',
    title: 'White-Glove Delivery',
    subtitle: 'The Packaging',
    body: "Every order ships double-boxed with custom foam inserts designed for each frame size. Fragile corners are individually protected. We have never had a piece arrive damaged — and we intend to keep it that way.",
    image: 'https://i.imgur.com/36mqBQF.png',
    stat: '0',
    statLabel: 'pieces arrived damaged',
  },
]

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
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, isVisible }
}

function EditorialSection({
  section,
  index,
}: {
  section: (typeof sections)[0]
  index: number
}) {
  const { ref, isVisible } = useFadeIn()
  // 01, 03 (index 0, 2) → content left; 02, 04 (index 1, 3) → content right
  const contentLeft = index % 2 === 0

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ minHeight: '100vh' }}
    >
      {/* Full-bleed background image */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${section.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: 'rgba(28,26,23,0.55)' }}
      />

      {/* Enormous backdrop number */}
      <div
        className="absolute bottom-0 right-0 leading-none select-none pointer-events-none font-cormorant"
        style={{
          fontSize: '180px',
          color: '#FFFFFF',
          opacity: 0.08,
          lineHeight: 1,
          paddingRight: '24px',
          paddingBottom: '0px',
        }}
      >
        {section.number}
      </div>

      {/* Content box */}
      <div className="relative z-10 flex items-center min-h-screen px-6 lg:px-16 py-20">
        <div
          ref={ref}
          className={`w-full flex ${contentLeft ? 'justify-start' : 'justify-end'}`}
        >
          <div
            className={`max-w-lg transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {/* Subtitle label */}
            <p
              className="font-garamond text-xs tracking-widest uppercase mb-5"
              style={{ color: '#C4A55A' }}
            >
              {section.subtitle}
            </p>

            {/* Title */}
            <h2
              className="font-cormorant italic font-light text-5xl lg:text-6xl leading-tight mb-8"
              style={{ color: '#FFFFFF' }}
            >
              {section.title}
            </h2>

            {/* Stat + divider + body */}
            <div className="flex items-start gap-6 mb-8">
              {/* Stat callout */}
              <div className="flex-shrink-0">
                <p
                  className="font-cormorant italic text-4xl leading-none"
                  style={{ color: '#FFFFFF' }}
                >
                  {section.stat}
                </p>
                <p
                  className="font-garamond text-xs tracking-widest uppercase mt-1"
                  style={{ color: '#8C8C7A' }}
                >
                  {section.statLabel}
                </p>
              </div>

              {/* Vertical gold divider */}
              <div
                className="flex-shrink-0 self-start mt-1"
                style={{
                  width: '1px',
                  height: '40px',
                  backgroundColor: '#C4A55A',
                }}
              />

              {/* Body text */}
              <p
                className="font-garamond text-base leading-relaxed"
                style={{ color: 'rgba(255,255,255,0.9)' }}
              >
                {section.body}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Craftsmanship() {
  const { ref: heroRef, isVisible: heroVisible } = useFadeIn()

  return (
    <div style={{ backgroundColor: '#1C1A17' }}>
      {/* Hero */}
      <section
        className="relative flex flex-col items-center justify-center text-center overflow-hidden"
        style={{ minHeight: '100vh' }}
      >
        {/* Hero background */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: 'url(https://i.imgur.com/zhzfFp0.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        {/* Heavy dark overlay 70% */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: 'rgba(28,26,23,0.70)' }}
        />

        {/* Hero content */}
        <div
          ref={heroRef}
          className={`relative z-10 px-6 transition-all duration-700 ${
            heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <h1
            className="font-cormorant italic font-light text-6xl lg:text-8xl leading-tight mb-6"
            style={{ color: '#FFFFFF' }}
          >
            Made to last a lifetime.
          </h1>
          <p
            className="font-garamond text-lg max-w-xl mx-auto leading-relaxed"
            style={{ color: '#A8A39C' }}
          >
            The four decisions that define every Veritas edition.
          </p>
        </div>

        {/* Scroll chevron */}
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

      {/* Editorial sections */}
      {sections.map((section, i) => (
        <EditorialSection key={section.number} section={section} index={i} />
      ))}

      {/* Stat strip */}
      <StatStrip />

      {/* CTA */}
      <CTASection />
    </div>
  )
}

function StatStrip() {
  const { ref, isVisible } = useFadeIn()

  const stats = [
    { value: '310 GSM', label: 'Fine Art Paper' },
    { value: '200+ Years', label: 'Archival Life' },
    { value: '250', label: 'Limited Edition' },
    { value: '0', label: 'Damaged on Arrival' },
  ]

  return (
    <div
      className="py-20 px-6"
      style={{ backgroundColor: '#1C1A17' }}
    >
      <div
        ref={ref}
        className={`max-w-4xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-10 text-center transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        {stats.map((stat) => (
          <div key={stat.value}>
            <p
              className="font-cormorant italic text-4xl mb-2"
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
        ))}
      </div>
    </div>
  )
}

function CTASection() {
  const { ref, isVisible } = useFadeIn()

  return (
    <div
      className="py-24 px-6 text-center"
      style={{ backgroundColor: '#1C1A17' }}
    >
      <div
        ref={ref}
        className={`max-w-2xl mx-auto transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <div
          className="w-px h-12 mx-auto mb-10"
          style={{ backgroundColor: '#C4A55A' }}
        />
        <h2
          className="font-cormorant italic font-light text-3xl lg:text-5xl mb-10 leading-tight"
          style={{ color: '#FFFFFF' }}
        >
          Owned by those who know the difference.
        </h2>
        <Link
          to="/collection"
          className="inline-block font-garamond text-sm tracking-widest uppercase px-10 py-4 transition-all duration-200"
          style={{
            border: '1px solid #FFFFFF',
            color: '#FFFFFF',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLAnchorElement
            el.style.backgroundColor = '#FFFFFF'
            el.style.color = '#1C1A17'
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLAnchorElement
            el.style.backgroundColor = 'transparent'
            el.style.color = '#FFFFFF'
          }}
        >
          View the Collection
        </Link>
      </div>
    </div>
  )
}
