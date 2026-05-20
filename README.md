# SafeSwap — Landing

Decentralized P2P for Stellar users. Swap crypto, receive fiat, stay protected.

A bold, production-grade landing page built to the official SafeSwap Visual
Identity guide: Rich Black canvas, Persian Green / Turquoise accents, the
shield-and-bidirectional-arrows mark, and the Satoshi typeface.

## Stack

- **Vite + React + TypeScript**
- **Tailwind CSS** for the brand design system
- **Framer Motion** for scroll-choreographed reveals & micro-interactions
- **lucide-react** for all UI iconography
- **Satoshi** (Fontshare) — the brand typeface

## Sections

Hero with a live swap visual · brand marquee · 3-step flow · bento feature
grid mapped to the brand values · interactive swap demo with a real fiat
quote engine · animated stat counters · security/trust architecture ·
FAQ accordion · CTA · footer.

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production bundle to dist/
npm run preview
```

## Brand

Colors, typography and logo vectors are derived from
`brand/SafeSwapLogo and VIsual Identity.pdf` and `brand/Logo/`. The shield
mark is inlined as an SVG component (`src/components/Logo.tsx`) so it scales
crisply and inherits brand colors.
