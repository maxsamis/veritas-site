# Progress Log

## Round 1 — Critical Fixes + Core Polish
**Commit:** `3a49d15`
**Deployed:** `https://cc199911.veritas-site-27f.pages.dev`

### Changes
- **ProductPage.tsx** — Fully data-driven. Added `PRODUCTS` lookup keyed by slug. Each of the 6 products now has its own title, style label, edition note, image, description, and base price. Price dynamically adjusts: `basePrice + (sizeIndex * 50) + (rolled ? -30 : 0)`. Added breadcrumb navigation at top. Added 4-cell trust signals grid (lifetime warranty, ships double-boxed, certificate of authenticity, solid wood frame). Added "Back to Collection" link at bottom.
- **Reviews.tsx** — Replaced `IMGUR_PHOTOS` array: `M9qXc66 → ThF68zp`, `AMY6HtW → VqFWzKB`, `RUxl9uQ → TQIrBod`. Review photos now render as small portrait thumbnails (80×96px) with italic product caption — clean and elegant rather than full-width room composites.
- **Craftsmanship.tsx** — Replaced `GradientPlaceholder` component with real portrait images. Each section gets a distinct portrait in a 3:4 aspect ratio container. Added `loading="lazy"`.
- **Home.tsx** — Hero: wordmark now has flanking hairlines for editorial weight; added "Original compositions. Limited editions. Ready to hang." subtitle. Pull-quote: added ambient radial glow, deeper padding, flanking hairlines above and below.
- **Footer.tsx** — Added Craftsmanship and Reviews links to Shop column.
- **Collection.tsx** — Added `badge` field to product data. "Light of the World" = "Few Remaining". "The Sacred Heart" = "Limited Edition". Badges rendered as charcoal pills overlaid on card top-left.
- **index.html** — Fixed `og:image` from `M9qXc66` to `ThF68zp`. Added `og:description`, `og:type`, `twitter:card`, `twitter:image`.

---

## Round 2 — About Page, Craft Icons, Card Hover
**Commit:** pending

### Changes
- **About.tsx** — Rewrote hero: now dark charcoal hero with portrait (`VqFWzKB`) at 30% opacity behind text, fading to parchment. Added portrait image break mid-article (`ThF68zp`, wide banner crop). Replaced diamond dividers with subtle dot dividers. Added CTA "View the Collection" at bottom.
- **Home.tsx** — Replaced Unicode craft icons (◈◇◉◎) with proper SVG icons from Heroicons outline set. Added horizontal hairline below each icon for editorial breathing room.
- **ProductCard.tsx** — Added `loading="lazy"` to images. Added charcoal overlay on hover (`opacity-0 → opacity-10`) for depth and interactivity.
- **Reviews.tsx** — Rewrote hero section: "The work speaks for itself." headline with "Customer Reviews" eyebrow. Stars + rating moved inside hero area for clean single-section treatment.

---

## Round 3 — Collection Polish, Craftsmanship Eyebrow, FAQ Intro, Hero Overlay
**Commit:** `4dd9f3d`
**Deployed:** `https://69c989fa.veritas-site-27f.pages.dev`

### Changes
- **Home.tsx** — Added dark overlay to hero (`rgba(30,22,16,0.55)`) to ensure parchment text is fully legible against the oil painting.
- **Collection.tsx** — Upgraded eyebrow treatment with flanking hairlines ("Original Composition · Limited Edition" now reads more like a luxury editorial label).
- **Craftsmanship.tsx** — Added "Veritas · The Process" eyebrow above the hero headline.
- **Faq.tsx** — Added subtitle paragraph: "Everything you need to know about our materials, process, and policies."
- **index.html** — Added `<link rel="preload" as="image">` for the hero portrait for faster initial paint.

---

## Round 4 — Animations, Final CSS Refinements
**Commit:** `aef90ba`
**Deployed:** `https://dd624228.veritas-site-27f.pages.dev`

### Changes
- **index.css** — Added `@keyframes fadeInUp` and `@keyframes fadeIn`. Body now fades in on mount (0.35s ease). `.animate-fade-in-up` utility class added.
- **Home.tsx** — Hero content group gets `animate-fade-in-up` with 0.1s delay for a subtle cinematic entrance.
