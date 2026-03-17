import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

interface ProductCardProps {
  title: string
  style: string
  price: string
  gradient: string
  slug: string
  showExplore?: boolean
  image?: string
  imageFilter?: string
}

export default function ProductCard({
  title,
  style,
  price,
  gradient,
  slug,
  showExplore = true,
  image,
  imageFilter,
}: ProductCardProps) {
  const { t } = useTranslation()

  return (
    <Link to={`/collection/${slug}`} className="group block">
      {/* Image — 2:3 ratio */}
      <div
        className="w-full relative overflow-hidden mb-5"
        style={{ paddingBottom: '150%' }}
      >
        {image ? (
          <>
            <img
              src={image}
              alt={title}
              crossOrigin="anonymous"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              style={imageFilter ? { filter: imageFilter } : undefined}
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-charcoal opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
          </>
        ) : (
          <>
            <div
              className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.03]"
              style={{ background: gradient }}
            />
            {/* Subtle light motif */}
            <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-15 transition-opacity duration-500">
              <div
                className="w-1/3 h-2/3 rounded-full"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(255,240,200,1) 0%, transparent 70%)',
                  filter: 'blur(20px)',
                }}
              />
            </div>
          </>
        )}
      </div>

      <div>
        <p className="font-garamond text-[10px] tracking-[0.2em] uppercase text-umber mb-1.5">
          {t('collection.original')}
        </p>
        <h3 className="font-cormorant italic font-light text-xl lg:text-2xl text-charcoal mb-1.5 leading-tight group-hover:text-umber transition-colors">
          {title}
        </h3>
        <p className="font-garamond text-[11px] tracking-[0.15em] uppercase text-umber/70 mb-3">
          {style}
        </p>
        <div className="flex items-center justify-between">
          <p className="font-garamond text-sm text-charcoal">
            {t('collection.from')} {price}
          </p>
          {showExplore && (
            <span className="font-garamond text-xs tracking-widest uppercase text-umber border-b border-umber/40 pb-px group-hover:border-charcoal group-hover:text-charcoal transition-colors">
              {t('collection.explore')}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
