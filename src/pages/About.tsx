import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function About() {
  const { t } = useTranslation()

  return (
    <div>

      {/* ── Hero ─────────────────────────────────────────── */}
      <section
        className="relative min-h-[75vh] flex items-end justify-center pb-0 overflow-hidden"
        style={{ backgroundColor: '#2A2927' }}
      >
        {/* Portrait — right side, cropped artfully */}
        <div className="absolute inset-0 flex items-center justify-end pointer-events-none">
          <div className="w-1/2 h-full relative overflow-hidden opacity-30">
            <img
              src="https://i.imgur.com/VqFWzKB.jpeg"
              alt=""
              className="absolute inset-0 w-full h-full object-cover object-top"
              aria-hidden="true"
            />
            {/* Gradient fade to charcoal on left side */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to right, #2A2927 0%, transparent 60%)',
              }}
            />
          </div>
        </div>

        {/* Text content */}
        <div className="relative z-10 max-w-3xl px-6 py-24 lg:py-36 text-center mx-auto">
          <span className="wordmark text-xs text-parchment/30 tracking-widest2 block mb-10">
            VERITAS
          </span>
          <blockquote className="font-cormorant italic font-light text-3xl md:text-4xl lg:text-5xl text-parchment leading-snug">
            {t('about.hero_quote')}
          </blockquote>
          <div className="h-px w-12 bg-parchment/20 mx-auto mt-10" />
        </div>

        {/* Fade to parchment */}
        <div
          className="absolute bottom-0 left-0 right-0 h-16"
          style={{ background: 'linear-gradient(to bottom, transparent, #EFECE5)' }}
        />
      </section>

      {/* ── Content ──────────────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-6 lg:px-10 py-20 lg:py-28">

        {/* Section 1 */}
        <section className="mb-20">
          <h2 className="font-cormorant font-light text-3xl lg:text-4xl text-charcoal mb-8">
            {t('about.section1_title')}
          </h2>
          {t('about.section1_body').split('\n\n').map((para, i) => (
            <p key={i} className="font-garamond text-base lg:text-lg leading-relaxed text-umber mb-6">
              {para}
            </p>
          ))}
        </section>

        {/* Portrait break */}
        <div className="mb-20 relative overflow-hidden" style={{ paddingBottom: '45%' }}>
          <img
            src="https://i.imgur.com/ThF68zp.jpeg"
            alt="The Good Shepherd — classical oil portrait"
            className="absolute inset-0 w-full h-full object-cover object-top"
            loading="lazy"
          />
        </div>

        {/* Section 2 */}
        <section className="mb-20">
          <h2 className="font-cormorant font-light text-3xl lg:text-4xl text-charcoal mb-8">
            {t('about.section2_title')}
          </h2>
          {t('about.section2_body').split('\n\n').map((para, i) => (
            <p key={i} className="font-garamond text-base lg:text-lg leading-relaxed text-umber mb-6">
              {para}
            </p>
          ))}
        </section>

        {/* Divider */}
        <div className="flex items-center gap-6 mb-20">
          <div className="flex-1 h-px bg-umber/20" />
          <div className="w-1 h-1 rounded-full bg-umber/30" />
          <div className="flex-1 h-px bg-umber/20" />
        </div>

        {/* Section 3 */}
        <section className="mb-20">
          <h2 className="font-cormorant font-light text-3xl lg:text-4xl text-charcoal mb-8">
            {t('about.section3_title')}
          </h2>
          {t('about.section3_body').split('\n\n').map((para, i) => (
            <p key={i} className="font-garamond text-base lg:text-lg leading-relaxed text-umber mb-6">
              {para}
            </p>
          ))}
        </section>

        {/* Closing Quote */}
        <div
          className="border-l-2 border-umber/30 pl-8 py-6 mb-12"
          style={{ backgroundColor: 'transparent' }}
        >
          <blockquote className="font-cormorant italic font-light text-xl lg:text-2xl text-charcoal leading-relaxed">
            &ldquo;{t('about.closing_quote')}&rdquo;
          </blockquote>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/collection"
            className="inline-block bg-charcoal text-parchment font-garamond text-sm tracking-widest uppercase px-10 py-4 hover:bg-umber transition-colors duration-200"
          >
            View the Collection
          </Link>
        </div>

      </div>
    </div>
  )
}
