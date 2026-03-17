import { useTranslation } from 'react-i18next'
import ProductCard from '../components/ProductCard'

const GRADIENTS = {
  primary: 'linear-gradient(160deg, #2a2520 0%, #3d3028 40%, #4a3828 70%, #2a2520 100%)',
  variantA: 'linear-gradient(160deg, #1e1a16 0%, #2d2318 40%, #3a2e1e 70%, #1e1a16 100%)',
  variantB: 'linear-gradient(160deg, #252018 0%, #33281a 40%, #3e2f1c 70%, #252018 100%)',
}

const PRODUCTS = [
  {
    title: 'The Good Shepherd',
    style: 'Classical Oil',
    price: '$145',
    gradient: GRADIENTS.primary,
    slug: 'the-good-shepherd',
    imageUrl: 'https://i.imgur.com/whtAlx1.jpeg',
    badge: null,
  },
  {
    title: 'Christ the Redeemer',
    style: 'Renaissance',
    price: '$165',
    gradient: GRADIENTS.variantA,
    slug: 'christ-the-redeemer',
    imageUrl: 'https://i.imgur.com/zQCIOqy.jpeg',
    badge: null,
  },
  {
    title: 'Light of the World',
    style: 'Contemporary Sacred',
    price: '$175',
    gradient: GRADIENTS.variantB,
    slug: 'light-of-the-world',
    imageUrl: 'https://i.imgur.com/WGRNmXf.jpeg',
    badge: 'Few Remaining',
  },
  {
    title: 'Prince of Peace',
    style: 'Minimalist',
    price: '$145',
    gradient: GRADIENTS.primary,
    slug: 'prince-of-peace',
    imageUrl: 'https://i.imgur.com/whtAlx1.jpeg',
    badge: null,
  },
  {
    title: 'The Sacred Heart',
    style: 'Baroque',
    price: '$185',
    gradient: GRADIENTS.variantA,
    slug: 'the-sacred-heart',
    imageUrl: 'https://i.imgur.com/zQCIOqy.jpeg',
    badge: 'Limited Edition',
  },
  {
    title: 'Emmanuel',
    style: 'Icon Tradition',
    price: '$155',
    gradient: GRADIENTS.variantB,
    slug: 'emmanuel',
    imageUrl: 'https://i.imgur.com/WGRNmXf.jpeg',
    badge: null,
  },
]

export default function Collection() {
  const { t } = useTranslation()

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
      <div className="text-center mb-16 lg:mb-20">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px w-10 bg-umber/30" />
          <p className="font-garamond text-xs tracking-[0.25em] uppercase text-umber">
            {t('collection.original')}
          </p>
          <div className="h-px w-10 bg-umber/30" />
        </div>
        <h1 className="font-cormorant font-light text-4xl lg:text-6xl text-charcoal mb-6">
          {t('collection.title')}
        </h1>
        <p className="font-garamond text-base lg:text-lg text-umber max-w-xl mx-auto leading-relaxed">
          {t('collection.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14">
        {PRODUCTS.map((product) => (
          <div key={product.slug} className="relative">
            {product.badge && (
              <div className="absolute top-4 left-4 z-10">
                <span className="font-garamond text-[10px] tracking-[0.18em] uppercase bg-charcoal text-parchment px-3 py-1">
                  {product.badge}
                </span>
              </div>
            )}
            <ProductCard
              title={product.title}
              style={product.style}
              price={product.price}
              gradient={product.gradient}
              slug={product.slug}
              image={product.imageUrl}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
