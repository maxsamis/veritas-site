import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ProductCard from '../components/ProductCard'

const GRADIENTS = {
  primary: 'linear-gradient(160deg, #2a2520 0%, #3d3028 40%, #4a3828 70%, #2a2520 100%)',
  variantA: 'linear-gradient(160deg, #1e1a16 0%, #2d2318 40%, #3a2e1e 70%, #1e1a16 100%)',
  variantB: 'linear-gradient(160deg, #252018 0%, #33281a 40%, #3e2f1c 70%, #252018 100%)',
}

const carouselReviews = [
  {
    id: 3,
    name: 'Emma T.',
    city: 'Nashville, TN',
    title: 'My whole family was moved to tears',
    body: 'We gave Light of the World to my parents for their 40th anniversary. My mother cried when she opened it. The quality of the print combined with the solid wood frame made it feel like a genuine heirloom. We ordered a second one for ourselves.',
  },
  {
    id: 10,
    name: 'Noah P.',
    city: 'Seattle, WA',
    title: 'Three friends ordered after seeing mine',
    body: "Prince of Peace has been a conversation piece since day one. Three of my friends have now ordered from Veritas after visiting and seeing it in person. That's the best endorsement I can give — this print sells itself.",
  },
  {
    id: 20,
    name: 'Evelyn T.',
    city: 'Phoenix, AZ',
    title: 'My priest asked where I got it',
    body: "Christ the Redeemer hangs in our home chapel and my priest saw it during a house blessing. He asked immediately where I'd purchased it. The piece has an authenticity and gravitas that you can't fake. Absolutely worthy of sacred space.",
  },
  {
    id: 42,
    name: 'Lauren B.',
    city: 'Dallas, TX',
    title: 'My husband cried',
    body: "Gifted Emmanuel to my husband for our tenth anniversary. He's not a crier. He cried. The piece is that beautiful, that meaningful. It hangs in his home office now and he says it starts every workday on the right note.",
  },
  {
    id: 72,
    name: 'Charles N.',
    city: 'Denver, CO',
    title: "Simply the best I've seen",
    body: "I've visited galleries in New York, London, and Paris. Emmanuel compares favorably to what hangs in those spaces. The print quality, the frame construction, the total composition — this is the real thing. Veritas has created something special.",
  },
  {
    id: 77,
    name: 'Nancy F.',
    city: 'Charlotte, NC',
    title: 'The gift of a lifetime',
    body: 'The Sacred Heart was a gift to my sister during a difficult time in her life. She said it brought her genuine comfort every day it hung on her wall. Art that can do that is worth ten times its price. I cannot recommend it highly enough.',
  },
  {
    id: 97,
    name: 'Raymond L.',
    city: 'New York, NY',
    title: 'Better than what hangs in hotels',
    body: "I travel constantly and stay in luxury hotels. The art in those spaces is carefully curated and of the highest quality. Light of the World is better than most of what I've seen in those rooms. That's the best frame of reference I can offer.",
  },
  {
    id: 100,
    name: 'Teresa M.',
    city: 'Dallas, TX',
    title: "The last piece of art I'll ever need to buy",
    body: "Emmanuel is the piece I've been searching for my entire adult life. The quality is beyond what I imagined possible at this price, and the archival materials mean it will outlast everything else on our walls. I am done searching.",
  },
]

const ugcPhotos = [
  'https://i.imgur.com/ZYiWmF9.jpeg',
  'https://i.imgur.com/zQCIOqy.jpeg',
  'https://i.imgur.com/WGRNmXf.jpeg',
  'https://i.imgur.com/ThF68zp.jpeg',
  'https://i.imgur.com/VqFWzKB.jpeg',
]

const craftNumbers = ['01', '02', '03', '04']
const craftKeys = ['craft_1', 'craft_2', 'craft_3', 'craft_4']

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

export default function Home() {
  const { t } = useTranslation()
  const [reviewsPaused, setReviewsPaused] = useState(false)

  const heroFade = useFadeIn()
  const collectionFade = useFadeIn()
  const craftFade = useFadeIn()
  const quoteFade = useFadeIn()
  const ctaFade = useFadeIn()

  const mergedItems = [
    { type: 'review' as const, ...carouselReviews[0] },
    { type: 'photo' as const, url: ugcPhotos[0] },
    { type: 'review' as const, ...carouselReviews[1] },
    { type: 'review' as const, ...carouselReviews[2] },
    { type: 'photo' as const, url: ugcPhotos[1] },
    { type: 'review' as const, ...carouselReviews[3] },
    { type: 'photo' as const, url: ugcPhotos[2] },
    { type: 'review' as const, ...carouselReviews[4] },
    { type: 'review' as const, ...carouselReviews[5] },
    { type: 'photo' as const, url: ugcPhotos[3] },
    { type: 'review' as const, ...carouselReviews[6] },
    { type: 'photo' as const, url: ugcPhotos[4] },
    { type: 'review' as const, ...carouselReviews[7] },
  ]

  return (
    <div>

      {/* ── Hero ─────────────────────────────────────────── */}
      <section
        className="relative min-h-[92vh] lg:min-h-screen flex flex-col items-center justify-center text-center px-6 pt-[104px] lg:pt-0"
        style={{
          backgroundImage: 'url(https://i.imgur.com/ThF68zp.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Dark overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundColor: 'rgba(30, 22, 16, 0.55)' }}
        />

        {/* Ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 70% at 50% 40%, rgba(120,90,60,0.15) 0%, transparent 70%)',
          }}
        />

        {/* Cross motif */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04]">
          <div className="relative w-px bg-parchment" style={{ height: '55%' }}>
            <div className="absolute top-[28%] left-1/2 -translate-x-1/2 h-px bg-parchment w-20 lg:w-32" />
          </div>
        </div>

        {/* Content */}
        <div
          ref={heroFade.ref}
          className={`relative z-10 flex flex-col items-center gap-8 lg:gap-10 transition-all duration-700 ${
            heroFade.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="flex flex-col items-center gap-3">
            <div className="h-px w-8 bg-parchment/40" />
            <span className="wordmark text-[10px] lg:text-xs text-parchment/50 tracking-[0.35em]">
              VERITAS
            </span>
            <div className="h-px w-8 bg-parchment/40" />
          </div>

          <h1 className="font-cormorant italic font-light text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-parchment leading-tight max-w-3xl">
            Every edition. Limited to 250.
          </h1>

          <p
            className="font-cormorant italic text-xl lg:text-2xl"
            style={{ color: '#C4A55A' }}
          >
            Archival fine art portraits of Christ. Hand numbered. Ready to hang.
          </p>

          <Link to="/collection">
            <button
              className="font-garamond text-sm tracking-widest uppercase px-10 py-4 transition-all duration-200"
              style={{
                border: '1px solid rgba(239,236,229,0.7)',
                color: '#EFECE5',
                background: 'transparent',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = 'rgba(239,236,229,0.12)'
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = 'transparent'
              }}
            >
              {t('home.hero_cta')}
            </button>
          </Link>
        </div>

        {/* Scroll cue — bounce */}
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

      {/* ── Collection Preview ───────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
        <div
          ref={collectionFade.ref}
          className={`transition-all duration-700 ${
            collectionFade.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="text-center mb-14 lg:mb-16">
            {/* Gold line + label */}
            <div
              style={{ width: '60px', height: '1px', backgroundColor: '#C4A55A', margin: '0 auto 16px' }}
            />
            <p
              className="font-garamond text-xs tracking-widest uppercase mb-6"
              style={{ color: '#8C8C7A' }}
            >
              The Collection
            </p>
            <h2 className="font-cormorant font-light text-3xl lg:text-5xl text-charcoal mb-5">
              {t('home.preview_title')}
            </h2>
            <p className="font-garamond text-base lg:text-lg text-umber max-w-xl mx-auto leading-relaxed">
              {t('home.preview_subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            <ProductCard
              title="The Good Shepherd"
              style="Classical Oil"
              price="$145"
              gradient={GRADIENTS.primary}
              image="https://i.imgur.com/whtAlx1.jpeg"
              slug="the-good-shepherd"
              showExplore={false}
            />
            <ProductCard
              title="Christ the Redeemer"
              style="Renaissance"
              price="$145"
              gradient={GRADIENTS.variantA}
              image="https://i.imgur.com/zQCIOqy.jpeg"
              slug="christ-the-redeemer"
              showExplore={false}
            />
            <ProductCard
              title="Light of the World"
              style="Contemporary Sacred"
              price="$175"
              gradient={GRADIENTS.variantB}
              image="https://i.imgur.com/WGRNmXf.jpeg"
              slug="light-of-the-world"
              showExplore={false}
            />
          </div>

          <div className="text-center mt-14">
            <Link to="/collection">
              <span className="font-garamond text-sm tracking-widest uppercase text-umber border-b border-umber/50 pb-px hover:text-charcoal hover:border-charcoal transition-colors">
                {t('home.cta_section_btn')} &rarr;
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Divider ──────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="section-divider" />
      </div>

      {/* ── Craft Section ────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
        <div
          ref={craftFade.ref}
          className={`transition-all duration-700 ${
            craftFade.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="text-center mb-14">
            <h2 className="font-cormorant italic font-light text-3xl lg:text-5xl text-charcoal">
              {t('home.craft_title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {craftKeys.map((key, idx) => (
              <div key={key} className="text-center">
                <p
                  className="font-cormorant italic text-5xl select-none pointer-events-none mb-4"
                  style={{ color: '#C4BDB3' }}
                >
                  {craftNumbers[idx]}
                </p>
                <div className="h-px w-8 bg-umber/20 mb-5 mx-auto" />
                <h3 className="font-cormorant font-semibold text-xl lg:text-2xl text-charcoal mb-3">
                  {t(`home.${key}_title`)}
                </h3>
                <p className="font-garamond text-sm leading-relaxed text-umber">
                  {t(`home.${key}_desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pull Quote ───────────────────────────────────── */}
      <section
        className="py-28 lg:py-44 px-6 text-center relative overflow-hidden"
        style={{ backgroundColor: '#2A2927' }}
      >
        {/* Ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 50% 60% at 50% 50%, rgba(120,90,60,0.12) 0%, transparent 70%)',
          }}
        />
        <div
          ref={quoteFade.ref}
          className={`max-w-3xl mx-auto relative z-10 transition-all duration-700 ${
            quoteFade.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="h-px w-10 bg-parchment/20 mx-auto mb-10" />
          {/* Opening quote — absolute, gold */}
          <div className="relative inline-block w-full">
            <span
              className="font-cormorant absolute select-none pointer-events-none"
              style={{
                color: '#C4A55A',
                fontSize: '7rem',
                lineHeight: 1,
                top: '-2rem',
                left: '0',
              }}
            >
              &ldquo;
            </span>
            <blockquote
              className="font-cormorant italic font-light text-4xl lg:text-5xl text-parchment leading-snug tracking-tight pt-8"
            >
              {t('home.quote')}
            </blockquote>
          </div>
          <div className="mt-10 h-px w-10 bg-parchment/20 mx-auto" />
          <p className="wordmark text-[10px] text-parchment/25 mt-7 tracking-[0.35em]">VERITAS</p>
        </div>
      </section>

      {/* ── Reviews + UGC Carousel ─────────────────────── */}
      <section className="py-20 overflow-hidden" style={{ background: '#F2EDE4' }}>
        <div className="text-center mb-10 px-6">
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '32px', color: '#2C2C2C', marginBottom: '8px' }}>
            What Our Customers Say
          </h2>
          <p style={{ fontSize: '14px', color: '#8C8C7A' }}>Delivered to homes in 40+ countries</p>
        </div>

        <div
          className="scrollbar-hide"
          style={{ overflow: 'hidden', width: '100%' }}
          onMouseEnter={() => setReviewsPaused(true)}
          onMouseLeave={() => setReviewsPaused(false)}
        >
          <div
            style={{
              display: 'flex',
              gap: '16px',
              paddingLeft: '24px',
              width: 'max-content',
              animation: `scrollLeft 40s linear infinite`,
              animationPlayState: reviewsPaused ? 'paused' : 'running',
            }}
          >
            {[...mergedItems, ...mergedItems].map((item, i) =>
              item.type === 'photo' ? (
                <div
                  key={i}
                  style={{
                    flexShrink: 0,
                    width: '220px',
                    height: '300px',
                    borderRadius: '12px',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={item.url}
                    alt="Customer home"
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              ) : (
                <div
                  key={i}
                  style={{
                    flexShrink: 0,
                    width: '280px',
                    background: '#F9F6F1',
                    borderRadius: '12px',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '300px',
                  }}
                >
                  <div>
                    <div style={{ color: '#C9A84C', fontSize: '16px', marginBottom: '10px', letterSpacing: '2px' }}>
                      {'★★★★★'}
                    </div>
                    <p
                      style={{
                        fontFamily: 'Cormorant Garamond, serif',
                        fontStyle: 'italic',
                        fontSize: '16px',
                        color: '#3C3C3C',
                        lineHeight: '1.6',
                        display: '-webkit-box',
                        WebkitLineClamp: 5,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      &ldquo;{item.body}&rdquo;
                    </p>
                  </div>
                  <p style={{ fontSize: '12px', color: '#8C8C7A', marginTop: '12px' }}>
                    {item.name} &mdash; {(item as { city?: string }).city || ''}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────── */}
      <section
        className="relative flex flex-col items-center justify-center text-center px-6 overflow-hidden"
        style={{ minHeight: '100vh', backgroundColor: '#1C1A17' }}
      >
        {/* Background — Tribeca room wall, heavily darkened, acts as stone texture */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(https://i.imgur.com/ZYiWmF9.jpeg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
            filter: 'blur(4px) brightness(0.15) saturate(0.3) contrast(1.1)',
            transform: 'scale(1.08)',
          }}
        />
        {/* Subtle ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(196,165,90,0.06) 0%, transparent 70%)',
          }}
        />

        <div
          ref={ctaFade.ref}
          className={`relative z-10 flex flex-col items-center gap-8 max-w-2xl transition-all duration-700 ${
            ctaFade.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {/* Gold line */}
          <div style={{ width: '60px', height: '1px', backgroundColor: '#C4A55A' }} />

          <h2
            className="font-cormorant italic font-light text-5xl lg:text-6xl leading-tight"
            style={{ color: '#FFFFFF' }}
          >
            Every portrait tells a story of faith.
          </h2>

          <p
            className="font-garamond text-base leading-relaxed"
            style={{ color: '#A8A39C' }}
          >
            Limited editions. Museum-grade materials. Made to last a lifetime.
          </p>

          {/* Two buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-6 mt-2">
            <Link to="/collection">
              <button
                className="font-garamond text-sm tracking-widest uppercase px-10 py-4 transition-all duration-200"
                style={{
                  border: '1px solid rgba(239,236,229,0.7)',
                  color: '#EFECE5',
                  background: 'transparent',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = 'rgba(239,236,229,0.12)'
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = 'transparent'
                }}
              >
                View the Collection
              </button>
            </Link>
            <Link
              to="/craftsmanship"
              className="font-garamond text-sm tracking-widest uppercase transition-colors duration-200"
              style={{
                color: '#A8A39C',
                textDecoration: 'underline',
                textUnderlineOffset: '4px',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = '#EFECE5'
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = '#A8A39C'
              }}
            >
              Our Process
            </Link>
          </div>

          {/* Gold line bottom */}
          <div style={{ width: '60px', height: '1px', backgroundColor: '#C4A55A', marginTop: '8px' }} />
        </div>
      </section>

    </div>
  )
}
