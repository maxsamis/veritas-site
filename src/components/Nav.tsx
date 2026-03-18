import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useCart } from '../contexts/CartContext'

export default function Nav() {
  const { t, i18n } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const { count: cartCount, openCart } = useCart()

  const isSpanish = i18n.language.startsWith('es')
  const toggleLang = () => i18n.changeLanguage(isSpanish ? 'en' : 'es')

  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(path + '/')

  const links = [
    { href: '/collection', label: t('nav.collection') },
    { href: '/craftsmanship', label: 'Craftsmanship' },
    { href: '/about', label: t('nav.about') },
    { href: '/reviews', label: 'Reviews' },
    { href: '/faq', label: 'FAQ' },
  ]

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        {/* Announcement bar */}
        <div className="bg-[#2A2927] py-2 px-4">
          <p className="text-center font-garamond text-xs tracking-[0.15em] uppercase text-[#D4C9B4]">
            Free US Shipping · Lifetime Guarantee · Made to Order
          </p>
        </div>

        <nav className="bg-parchment/95 backdrop-blur-sm border-b border-umber/20">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="flex items-center justify-between h-16 lg:h-20">

              {/* Left: hamburger (mobile) + links (desktop) */}
              <div className="flex items-center gap-10">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="lg:hidden flex flex-col gap-1.5 p-1"
                  aria-label="Menu"
                >
                  <span className={`block w-6 h-px bg-charcoal transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                  <span className={`block w-6 h-px bg-charcoal transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
                  <span className={`block w-6 h-px bg-charcoal transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                </button>

                <div className="hidden lg:flex items-center gap-10">
                  {[{ href: '/collection', label: t('nav.collection') }, { href: '/craftsmanship', label: 'Craftsmanship' }, { href: '/about', label: t('nav.about') }].map(link => (
                    <Link
                      key={link.href}
                      to={link.href}
                      className={`font-garamond text-xs tracking-widest uppercase transition-opacity ${isActive(link.href) ? 'text-charcoal' : 'text-umber hover:text-charcoal'}`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Wordmark — centered */}
              <Link to="/" className="absolute left-1/2 -translate-x-1/2">
                <span className="wordmark text-xl lg:text-2xl text-charcoal tracking-widest2">
                  VERITAS
                </span>
              </Link>

              {/* Right: Reviews + FAQ + language + cart */}
              <div className="flex items-center gap-5 lg:gap-6">
                <div className="hidden lg:flex items-center gap-7">
                  {[{ href: '/reviews', label: 'Reviews' }, { href: '/faq', label: 'FAQ' }].map(link => (
                    <Link
                      key={link.href}
                      to={link.href}
                      className={`font-garamond text-xs tracking-widest uppercase transition-opacity ${isActive(link.href) ? 'text-charcoal' : 'text-umber hover:text-charcoal'}`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                {/* Language toggle — bold pill */}
                <button
                  onClick={toggleLang}
                  className="font-garamond text-[10px] tracking-widest uppercase px-3 py-1.5 bg-[#2A2927] text-[#EFECE5] hover:bg-[#1C1A17] transition-colors"
                  aria-label="Toggle language"
                >
                  {isSpanish ? 'English' : 'Español'}
                </button>

                {/* Cart icon with badge */}
                <button
                  onClick={openCart}
                  className="relative text-umber hover:text-charcoal transition-colors"
                  aria-label="Cart"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007Z" />
                  </svg>
                  {cartCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#2A2927] text-[#EFECE5] flex items-center justify-center" style={{ fontSize: '9px', fontFamily: 'Georgia, serif' }}>
                      {cartCount > 9 ? '9+' : cartCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          {menuOpen && (
            <div className="lg:hidden bg-parchment border-t border-umber/20 px-6 py-8">
              <div className="flex flex-col gap-8">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="font-garamond text-base tracking-widest uppercase text-charcoal"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-2 border-t border-umber/20">
                  <button
                    onClick={() => { toggleLang(); setMenuOpen(false) }}
                    className="font-garamond text-xs tracking-widest uppercase px-4 py-2.5 bg-[#2A2927] text-[#EFECE5] w-full text-center"
                  >
                    {isSpanish ? 'English' : 'Español'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </nav>
      </div>

      {/* Spacer */}
      <div className="h-24 lg:h-28" />
    </>
  )
}
