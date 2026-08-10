# Marcus Journey

Interactive 3D portfolio for Marcus Tran — Production, Kaizen and Technology.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. Production checks:

```bash
npm run typecheck
npm run lint
npm run build
npm run test
npm run test:e2e
```

## Deploy to Vercel

Import the GitHub repository in Vercel and deploy with the default Next.js configuration. No environment variables or custom build command are required for the static portfolio.

## MVP architecture

- `src/components/world`: Three.js/R3F scene, road, car and landmarks
- `src/components/journey`: journey experience and scroll UI
- `src/components/portfolio`: semantic 2D Quick Profile fallback
- `src/data`: typed local content fallback
- `src/stores`: Zustand journey state
- `src/lib`: shared helpers

The three localized CV files live in `public/cv`. Public routes are `/vi`, `/en`, and `/zh`; `/` redirects to Vietnamese. Future optimized assets belong in `public/models`, `public/textures`, and `public/audio`.

## Foundation 0.3

- Locale-specific routes and metadata for Vietnamese, English, and Chinese
- Milestone localization resolved by stable IDs
- Adaptive 3D quality with instanced trees and rocks
- Playwright content invariants and browser journey checks
- Feature CSS and journey navigation extracted from the main application shell
