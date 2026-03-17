import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

interface ProductCardProps {
  title: string
  style: string
  price: string
  gradient: string
  slug: string
  showExplore?: boolean
  imageUrl?: string
}

export default function ProductCard({
  title,
  style,
  price,
  gradient,
  slug,
  showExplore = true,
  imageUrl,
}: ProductCardProps) {
  const { t } = useTranslation()

  return (
    <Link to={`/collection/${slug}`} className="group block">
      {/* Image — 2:3 ratio */}
      <div
        className="w-full relative overflow-hidden mb-5"
        style={{ paddingBottom: '150%' }}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            crossOrigin="anonymous"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        ) : (
          <div
            className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.03]"
            style={{ background: gradient }}
          />
        )}
        {!imageUrl && (
          <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-15 transition-opacity duration-500">
            <div
              className="w-1/3 h-2/3 rounded-full"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(255,240,200,1) 0%, transparent 70%)',
                filter: 'blur(20px)',
              }}
            />
          </div>
        )}
      </div>

      {/* Details */}
      <div>
        <p className="font-garamond text-[10px] tracking-[0.2em] uppercase text-umber mb-2">{style}</p>
        <h3 className="font-cormorant italic font-light text-xl text-charcoal mb-1 group-hover:text-umber transition-colors">
          {title}
        </h3>
        <p className="font-garamond text-sm text-umber/80 mb-3">{t('collection.limited_edition')}</p>
        <p className="font-garamond text-base text-charcoal">{t('collection.from')} {price}</p>
        {showExplore && (
          <span className="inline-block mt-4 font-garamond text-xs tracking-widest uppercase text-umber border-b border-umber/40 pb-px group-hover:text-charcoal group-hover:border-charcoal transition-colors">
            {t('collection.explore')} →
          </span>
        )}
      </div>
    </Link>
  )
}
