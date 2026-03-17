import { useTranslation } from 'react-i18next'
import ProductCard from '../components/ProductCard'

const GRADIENTS = {
  primary: 'linear-gradient(160deg, #2a2520 0%, #3d3028 40%, #4a3828 70%, #2a2520 100%)',
  variantA: 'linear-gradient(160deg, #1e1a16 0%, #2d2318 40%, #3a2e1e 70%, #1e1a16 100%)',
  variantB: 'linear-gradient(160deg, #252018 0%, #33281a 40%, #3e2f1c 70%, #252018 100%)',
  variantC: 'linear-gradient(160deg, #221c14 0%, #2e2416 40%, #382c1a 70%, #221c14 100%)',
  variantD: 'linear-gradient(160deg, #1c1a18 0%, #282420 40%, #322c24 70%, #1c1a18 100%)',
  variantE: 'linear-gradient(160deg, #20201a 0%, #2c2a20 40%, #36321e 70%, #20201a 100%)',
}

const products = [
  {
    title: 'The Good Shepherd',
    style: 'Classical Oil',
    price: '$145',
    gradient: GRADIENTS.primary,
    slug: 'the-good-shepherd',
  },
  {
    title: 'Christ the Redeemer',
    style: 'Renaissance',
    price: '$145',
    gradient: GRADIENTS.variantA,
    slug: 'christ-the-redeemer',
  },
  {
    title: 'Light of the World',
    style: 'Contemporary Sacred',
    price: '$175',
    gradient: GRADIENTS.variantB,
    slug: 'light-of-the-world',
  },
  {
    title: 'Gethsemane',
    style: 'Baroque',
    price: '$165',
    gradient: GRADIENTS.variantC,
    slug: 'gethsemane',
  },
  {
    title: 'The Transfiguration',
    style: 'Minimalist',
    price: '$145',
    gradient: GRADIENTS.variantD,
    slug: 'the-transfiguration',
  },
  {
    title: 'Ecce Homo',
    style: 'Renaissance',
    price: '$185',
    gradient: GRADIENTS.variantE,
    slug: 'ecce-homo',
  },
]

export default function Collection() {
  const { t } = useTranslation()

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14 lg:py-20">

      {/* Header */}
      <div className="text-center mb-14 lg:mb-18">
        <p className="font-garamond text-xs tracking-[0.25em] uppercase text-umber mb-4">
          {t('collection.original')}
        </p>
        <h1 className="font-cormorant font-light text-4xl lg:text-6xl text-charcoal mb-6">
          {t('collection.title')}
        </h1>
        <p className="font-garamond text-base lg:text-lg text-umber max-w-xl mx-auto leading-relaxed">
          {t('collection.subtitle')}
        </p>
      </div>

      <div className="section-divider mb-14" />

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
        {products.map((p) => (
          <ProductCard key={p.slug} {...p} showExplore={true} />
        ))}
      </div>

    </div>
  )
}
