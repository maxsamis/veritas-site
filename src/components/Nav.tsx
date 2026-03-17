import { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import CountryFlag from 'react-country-flag'

const LANGUAGES = [
  { code: 'en', country: 'US', label: 'English' },
  { code: 'es', country: 'ES', label: 'Español' },
  { code: 'pt', country: 'BR', label: 'Português' },
  { code: 'it', country: 'IT', label: 'Italiano' },
  { code: 'fr', country: 'FR', label: 'Français' },
  { code: 'pl', country: 'PL', label: 'Polski' },
]

const SHOPIFY_CART = 'https://veritaseditions-2.myshopify.com/cart'

export default function Nav() {
  const { t, i18n } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const location = useLocation()
  const langRef = useRef<HTMLDivElement>(null)

  const currentLang = LANGUAGES.find(l => i18n.language.startsWith(l.code)) ?? LANGUAGES[0]

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(path + '/')

  const links = [
    { href: '/collection', label: t('nav.collection') },
    { href: '/craftsmanship', label: 'Craftsmanship' },
    { href: '/reviews', label: 'Reviews' },
    { href: '/about', label: t('nav.about') },
    { href: '/faq', label: 'FAQ' },
  ]

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        {/* Announcement bar */}
        <div className="bg-[#2A2927] py-2 px-4">
          <p className="text-center font-garamond text-xs tracking-[0.15em] uppercase text-[#D4C9B4]">
            Free US Shipping · Lifetime Guarantee · Delivered to 40+ Countries
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
                      className={`font-garamond text-sm tracking-widest uppercase transition-opacity ${isActive(link.href) ? 'text-charcoal' : 'text-umber hover:text-charcoal'}`}
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

              {/* Right: Reviews + FAQ + lang + cart */}
              <div className="flex items-center gap-5 lg:gap-7">
                <div className="hidden lg:flex items-center gap-7">
                  {[{ href: '/reviews', label: 'Reviews' }, { href: '/faq', label: 'FAQ' }].map(link => (
                    <Link
                      key={link.href}
                      to={link.href}
                      className={`font-garamond text-sm tracking-widest uppercase transition-opacity ${isActive(link.href) ? 'text-charcoal' : 'text-umber hover:text-charcoal'}`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                {/* Language flag dropdown */}
                <div ref={langRef} className="relative">
                  <button
                    onClick={() => setLangOpen(!langOpen)}
                    className="flex items-center gap-1.5 text-umber hover:text-charcoal transition-colors"
                    aria-label="Language"
                  >
                    <CountryFlag
                      countryCode={currentLang.country}
                      svg
                      style={{ width: '20px', height: '14px', borderRadius: '2px' }}
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 opacity-60">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                  </button>

                  {langOpen && (
                    <div className="absolute right-0 top-8 bg-[#EFECE5] border border-umber/20 shadow-lg w-44 z-50">
                      {LANGUAGES.map(lang => (
                        <button
                          key={lang.code}
                          onClick={() => { i18n.changeLanguage(lang.code); setLangOpen(false) }}
                          className={`w-full flex items-center gap-3 px-4 py-2.5 font-garamond text-xs tracking-wide text-left hover:bg-[#E5E1D8] transition-colors ${lang.code === currentLang.code ? 'text-charcoal' : 'text-umber'}`}
                        >
                          <CountryFlag
                            countryCode={lang.country}
                            svg
                            style={{ width: '18px', height: '13px', borderRadius: '2px', flexShrink: 0 }}
                          />
                          {lang.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Cart icon */}
                <a
                  href={SHOPIFY_CART}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-umber hover:text-charcoal transition-colors"
                  aria-label="Cart"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007Z" />
                  </svg>
                </a>
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
                {/* Mobile language options */}
                <div className="flex flex-wrap gap-4 pt-2 border-t border-umber/20">
                  {LANGUAGES.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => { i18n.changeLanguage(lang.code); setMenuOpen(false) }}
                      className={`flex items-center gap-2 font-garamond text-xs tracking-wide ${lang.code === currentLang.code ? 'text-charcoal' : 'text-umber'}`}
                    >
                      <CountryFlag countryCode={lang.country} svg style={{ width: '18px', height: '13px', borderRadius: '2px' }} />
                      {lang.label}
                    </button>
                  ))}
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
