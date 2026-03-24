# Chez Amis Bar and Grill

Production website for Chez Amis Restaurant in Accra: menu, reservations, gallery, and online ordering. Built as a fast, SEO-friendly Next.js app with a Tailwind-based design system aligned to the brand.

## Tech stack

- Next.js 14 (App Router), React 18, TypeScript
- Tailwind CSS, shadcn-style UI primitives
- React Hook Form + Zod for forms
- Resend (email) and Twilio (SMS) behind service modules

## Local setup

1. `npm install`
2. Copy [`.env.example`](.env.example) to `.env.local` and fill in values (see comments in the file). Narrative notes: [`docs/environment.md`](docs/environment.md).
3. `npm run dev` — open [http://localhost:3000](http://localhost:3000)
4. `npm run build` before deploy to verify types and lint.

## Documentation

Operational notes, deployment, audits, and setup guides live under [`docs/`](docs/). Start there for environment variables, hosting, and handover material.
