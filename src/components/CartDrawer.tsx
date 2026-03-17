import { useEffect } from 'react'
import { useCart } from '../contexts/CartContext'

const SHOPIFY_STORE = 'veritaseditions-2.myshopify.com'

const FRAME_OPTIONS = [
  { key: 'frame_black',   color: '#1a1a1a', label: 'Matte Black' },
  { key: 'frame_walnut',  color: '#5c3d1e', label: 'Walnut Brown' },
  { key: 'frame_white',   color: '#f0ece2', label: 'Ivory White' },
  { key: 'frame_gold',    color: '#b89040', label: 'Burnished Gold' },
  { key: 'frame_natural', color: '#c4a55a', label: 'Antique Gold' },
]

const FRAME_ADDONS: Record<number, number> = { 0: 50, 1: 70, 2: 110, 3: 150 }

function buildCheckoutUrl(items: ReturnType<typeof useCart>['items']): string {
  const parts = items
    .filter(i => i.variantId)
    .map(i => `${i.variantId}:${i.qty}`)
  if (parts.length === 0) return `https://${SHOPIFY_STORE}/cart`
  return `https://${SHOPIFY_STORE}/cart/${parts.join(',')}`
}

export default function CartDrawer() {
  const { items, count, subtotal, removeItem, updateQty, addFrame, removeFrame, isOpen, closeCart } = useCart()

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  const checkoutUrl = buildCheckoutUrl(items)

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[9998]"
        style={{ backgroundColor: 'rgba(28,26,23,0.5)', backdropFilter: 'blur(2px)' }}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        className="fixed top-0 right-0 h-full z-[9999] flex flex-col"
        style={{ width: '420px', maxWidth: '100vw', backgroundColor: '#EFECE5', borderLeft: '1px solid #C4BDB3' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-[#C4BDB3]">
          <div>
            <p className="font-garamond text-xs tracking-[0.2em] uppercase text-umber">Your Cart</p>
            {count > 0 && (
              <p className="font-garamond text-xs text-umber/60 mt-0.5">{count} item{count !== 1 ? 's' : ''}</p>
            )}
          </div>
          <button onClick={closeCart} className="text-umber hover:text-charcoal transition-colors" aria-label="Close">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <p className="font-cormorant italic font-light text-3xl text-charcoal mb-3">Your cart is empty.</p>
              <p className="font-garamond text-sm text-umber">Add a portrait to begin.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {items.map(item => {
                const addonPrice = FRAME_ADDONS[item.sizeKey] ?? 50
                const itemTotal = (item.price + item.frameAddon) * item.qty

                return (
                  <div key={item.id} className="pb-6 border-b border-[#E5E1D8] last:border-0 last:pb-0">
                    <div className="flex gap-4">
                      {/* Image */}
                      <div className="flex-shrink-0 w-20 h-28 overflow-hidden" style={{ border: '1px solid #C4BDB3' }}>
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <p className="font-cormorant italic font-light text-xl text-charcoal leading-tight mb-1 truncate">{item.title}</p>
                        <p className="font-garamond text-xs text-umber tracking-wide mb-1">{item.sizeLabel}</p>
                        {item.isFramed && item.frameLabel && (
                          <p className="font-garamond text-xs text-umber/70 tracking-wide mb-3">
                            Framed — {item.frameLabel}
                          </p>
                        )}
                        {!item.isFramed && (
                          <p className="font-garamond text-xs text-umber/50 tracking-wide mb-3">
                            Print only
                          </p>
                        )}

                        {/* Qty + price row */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center border border-[#C4BDB3]">
                            <button
                              onClick={() => updateQty(item.id, item.qty - 1)}
                              className="w-8 h-8 flex items-center justify-center text-umber hover:text-charcoal transition-colors font-garamond text-lg leading-none"
                              aria-label="Decrease"
                            >
                              −
                            </button>
                            <span className="w-8 text-center font-garamond text-sm text-charcoal">{item.qty}</span>
                            <button
                              onClick={() => updateQty(item.id, item.qty + 1)}
                              className="w-8 h-8 flex items-center justify-center text-umber hover:text-charcoal transition-colors font-garamond text-lg leading-none"
                              aria-label="Increase"
                            >
                              +
                            </button>
                          </div>

                          <p className="font-garamond text-sm text-charcoal">${itemTotal}</p>
                        </div>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="flex-shrink-0 self-start text-umber/40 hover:text-umber transition-colors mt-1"
                        aria-label="Remove"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    {/* Frame upsell section */}
                    {!item.isFramed ? (
                      <div className="mt-3 pt-3 border-t border-[#E5E1D8]">
                        <p className="font-garamond text-xs tracking-widest uppercase text-umber mb-2">
                          Complete your piece
                        </p>
                        <div className="flex items-center gap-2 flex-wrap">
                          {FRAME_OPTIONS.map(f => (
                            <button
                              key={f.key}
                              onClick={() => addFrame(item.id, f.key, f.label, addonPrice)}
                              aria-label={`Add ${f.label} frame (+$${addonPrice})`}
                              title={`${f.label} +$${addonPrice}`}
                              className="w-7 h-7 rounded-full border-2 border-transparent hover:border-[#2C2C2C] transition-all duration-150 flex-shrink-0"
                              style={{ backgroundColor: f.color, outline: f.color === '#f0ece2' ? '1px solid #C4BDB3' : 'none' }}
                            />
                          ))}
                          <span className="font-garamond text-xs text-umber/50 ml-1">+${addonPrice}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-3 pt-3 border-t border-[#E5E1D8] flex items-center gap-2">
                        {item.frameKey && (() => {
                          const frameOpt = FRAME_OPTIONS.find(f => f.key === item.frameKey)
                          return frameOpt ? (
                            <span
                              className="inline-block rounded-full flex-shrink-0"
                              style={{ width: '10px', height: '10px', backgroundColor: frameOpt.color, border: frameOpt.color === '#f0ece2' ? '1px solid #C4BDB3' : 'none' }}
                            />
                          ) : null
                        })()}
                        <span className="font-garamond text-xs text-umber">
                          Framed — {item.frameLabel}
                        </span>
                        <button
                          onClick={() => removeFrame(item.id)}
                          className="font-garamond text-xs text-umber/50 hover:text-umber transition-colors ml-auto"
                        >
                          Remove frame (−${item.frameAddon})
                        </button>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-8 py-6 border-t border-[#C4BDB3]">
            <div className="flex items-center justify-between mb-6">
              <p className="font-garamond text-sm text-umber tracking-wide">Subtotal</p>
              <p className="font-cormorant font-light text-2xl text-charcoal">${subtotal}</p>
            </div>
            <p className="font-garamond text-xs text-umber/60 mb-5">Shipping calculated at checkout.</p>

            <a
              href={checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center font-garamond text-xs tracking-[0.18em] uppercase font-bold py-4 transition-colors mb-3"
              style={{ backgroundColor: '#1C1A17', color: '#EFECE5' }}
            >
              Proceed to Checkout
            </a>
            <button
              onClick={closeCart}
              className="block w-full text-center font-garamond text-xs tracking-[0.15em] uppercase text-umber hover:text-charcoal transition-colors py-2"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  )
}
