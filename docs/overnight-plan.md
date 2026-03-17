# Veritas Overnight Plan

## Initial Assessment

The site launched with solid foundations — brand system is impeccably defined, typography is correct, layout structure is sound. Issues were execution-level, not architectural.

### Critical Issues Found

1. **Review photos** — `M9qXc66`, `AMY6HtW`, `RUxl9uQ` (room composites with floating print syndrome) used as review thumbnails. Visually broken.
2. **ProductPage hardcoded** — All product slugs routed to `ProductPage.tsx` but the page had a single hardcoded "The Good Shepherd" — every product slug showed the same content, same image, same $145 price.
3. **Craftsmanship page** — All 4 process sections showed dark gradient placeholders instead of real portrait imagery.
4. **og:image** — Pointed to the bad composite `M9qXc66`.
5. **Footer** — Missing Reviews and Craftsmanship links.
6. **About page** — Pure text, no visual moments. Below the brand standard.

### Polish Issues Found

7. **Home hero** — Good bones but wordmark treatment was thin; no subtitle to orient the visitor.
8. **Pull-quote section** — Lacked depth; needed the ambient glow treatment.
9. **Craft section icons** — Unicode geometric characters (◈◇◉◎) felt generic.
10. **Collection badges** — No inventory tension signaling ("Limited Edition", "Few Remaining").
11. **ProductCard** — No hover overlay, images felt static.
12. **Product page** — No breadcrumb navigation, no trust signals grid.

---

## Prioritized Worklist

### Round 1 (Critical — execute first)
- [x] Fix review photos → ThF68zp, VqFWzKB, TQIrBod
- [x] Make ProductPage data-driven with per-slug content + pricing
- [x] Replace Craftsmanship gradient placeholders with real portrait images
- [x] Fix og:image → ThF68zp
- [x] Add Reviews + Craftsmanship to footer
- [x] Improve Home hero (wordmark treatment, subtitle)
- [x] Improve pull-quote section (ambient glow, better spacing)
- [x] Add collection badges ("Limited Edition", "Few Remaining")
- [x] Add product page breadcrumb + trust signals grid
- [x] Add "Back to Collection" link on product page

### Round 2 (Polish — execute after Round 1 deployed)
- [x] About page — add portrait hero with image, visual break mid-page, CTA
- [x] Home craft section — replace Unicode icons with SVG icons
- [x] ProductCard — add hover overlay for depth
- [x] Review photos rendered smaller (portrait thumbnail, not full-width banner)
- [x] Reviews hero — more editorial headline

### Round 3 (Refinements — if time permits)
- [ ] Mobile polish pass — check all pages on 375px viewport
- [ ] Add lazy loading on remaining images
- [ ] Smooth page transitions (fade-in on route change)
- [ ] Consider adding a "How it arrives" visual section to the product page
- [ ] Collection page — consider masonry or staggered grid for visual variety

---

## Quality Standard

Target: "This feels like a real luxury brand that could compete with Restoration Hardware's art offering."

Every pixel communicates reverence, quality, and taste. No sans-serif. No emojis. No discount language. Typography does the heavy lifting.
