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

Place the final CV at `public/cv/marcus-tran-cv.pdf`. Future optimized assets belong in `public/models`, `public/textures`, and `public/audio`.
