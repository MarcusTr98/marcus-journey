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

## Firebase

The site uses local milestone data when Firebase is not configured. Copy `.env.example` to `.env.local`, create a Firebase web app, and fill the `NEXT_PUBLIC_FIREBASE_*` values. Planned collections: `profile`, `milestones`, `projects`, `skills`, `achievements`, `messages`, and `siteSettings`.

Use Firebase Authentication only for `/admin`. Keep Firestore writes denied by default and grant write access only to approved admin UIDs. Never add a service account or private key to this repository.

## Deploy to Vercel

Import the GitHub repository in Vercel, select Next.js, add the same Firebase environment variables, then deploy. No custom build command is required.

## MVP architecture

- `src/components/world`: Three.js/R3F scene, road, car and landmarks
- `src/components/journey`: journey experience and scroll UI
- `src/components/portfolio`: semantic 2D Quick Profile fallback
- `src/data`: typed local content fallback
- `src/stores`: Zustand journey state
- `src/lib`: Firebase and shared helpers

The three localized CV files live in `public/cv`. Public routes are `/vi`, `/en`, and `/zh`; `/` redirects to Vietnamese. Future optimized assets belong in `public/models`, `public/textures`, and `public/audio`.

## Foundation 0.3

- Locale-specific routes and metadata for Vietnamese, English, and Chinese
- Milestone localization resolved by stable IDs
- Adaptive 3D quality with instanced trees and rocks
- Playwright content invariants and browser journey checks
- Feature CSS and journey navigation extracted from the main application shell
