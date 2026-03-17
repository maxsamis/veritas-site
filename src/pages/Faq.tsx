import { useTranslation } from 'react-i18next'
import FaqAccordion from '../components/FaqAccordion'

export default function Faq() {
  const { t } = useTranslation()

  const items = Array.from({ length: 9 }, (_, i) => ({
    q: t(`faq.q${i + 1}`),
    a: t(`faq.a${i + 1}`),
  }))

  return (
    <div className="max-w-3xl mx-auto px-6 lg:px-10 py-16 lg:py-24">

      {/* Header */}
      <div className="mb-14 lg:mb-16">
        <p className="font-garamond text-xs tracking-[0.25em] uppercase text-umber mb-4">
          Veritas
        </p>
        <h1 className="font-cormorant font-light text-4xl lg:text-6xl text-charcoal mb-5">
          {t('faq.title')}
        </h1>
        <p className="font-garamond text-base lg:text-lg text-umber leading-relaxed max-w-lg">
          Everything you need to know about our materials, process, and policies.
        </p>
      </div>

      <div className="section-divider mb-2" />

      <FaqAccordion items={items} />

    </div>
  )
}
