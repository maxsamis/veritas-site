import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-charcoal text-parchment/70">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">

          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="wordmark text-2xl text-parchment tracking-widest2 mb-5">
              VERITAS
            </div>
            <p className="font-garamond text-base text-parchment/60 leading-relaxed max-w-xs">
              {t('footer.tagline')}
            </p>
            <p className="font-garamond text-sm text-parchment/40 mt-3 tracking-wide">
              {t('footer.made_in')}
            </p>
          </div>

          {/* Shop */}
          <div>
            <p className="font-garamond text-xs tracking-widest uppercase text-parchment/40 mb-5">
              {t('footer.col1_title')}
            </p>
            <div className="flex flex-col gap-3">
              <Link to="/collection" className="font-garamond text-sm text-parchment/70 hover:text-parchment transition-colors">
                {t('footer.collection')}
              </Link>
              <Link to="/craftsmanship" className="font-garamond text-sm text-parchment/70 hover:text-parchment transition-colors">
                Craftsmanship
              </Link>
              <Link to="/reviews" className="font-garamond text-sm text-parchment/70 hover:text-parchment transition-colors">
                Reviews
              </Link>
              <Link to="/policies" className="font-garamond text-sm text-parchment/70 hover:text-parchment transition-colors">
                {t('footer.policies')}
              </Link>
            </div>
          </div>

          {/* Company + Support */}
          <div>
            <p className="font-garamond text-xs tracking-widest uppercase text-parchment/40 mb-5">
              {t('footer.col2_title')}
            </p>
            <div className="flex flex-col gap-3">
              <Link to="/about" className="font-garamond text-sm text-parchment/70 hover:text-parchment transition-colors">
                {t('footer.about')}
              </Link>
              <Link to="/faq" className="font-garamond text-sm text-parchment/70 hover:text-parchment transition-colors">
                {t('footer.faq')}
              </Link>
              <Link to="/policies" className="font-garamond text-sm text-parchment/70 hover:text-parchment transition-colors">
                {t('footer.policies')}
              </Link>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-parchment/10 pt-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <p className="font-garamond text-xs text-parchment/30 tracking-wide">
            {t('footer.copyright')}
          </p>
          <p className="font-garamond text-xs text-parchment/30 tracking-wide italic">
            &ldquo;{t('home.quote')}&rdquo;
          </p>
        </div>
      </div>
    </footer>
  )
}
