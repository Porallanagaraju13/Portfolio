# Personal Portfolio

Modern, responsive developer portfolio built with Vite, React, TypeScript, Tailwind CSS, and shadcn/ui. It showcases sections like Hero, About, Stats, Experience, Projects, Certifications, and Contact, with dark mode, smooth UI components, basic routing, and a lightweight chatbot widget.

## 🚀 Tech Stack

- React 18 + TypeScript
- Vite 5 (SWC React plugin)
- Tailwind CSS + tailwind-merge + tailwindcss-animate
- shadcn/ui (Radix UI primitives)
- React Router DOM
- TanStack Query (React Query)
- Recharts (charts)
- Lucide Icons

## ✨ Features

- Responsive UI with Tailwind + shadcn/ui components
- Dark mode support via `next-themes`
- Client-side routing with `react-router-dom`
- Toasts and notifications (`sonner`, shadcn Toaster)
- Charts/Stats section powered by `recharts`
- Organized, reusable UI components under `src/components/ui`
- Chatbot component mounted app-wide

## 📦 Project Structure

```
src/
  assets/                     # static assets
  components/
    ui/                       # shadcn/ui primitives
    About.tsx
    Certifications.tsx
    Chatbot.tsx
    Contact.tsx
    Experience.tsx
    Footer.tsx
    Hero.tsx
    Navigation.tsx
    ParticleBackground.tsx
    Projects.tsx
    Stats.tsx
  contexts/
    ThemeContext.tsx          # theme handling
  hooks/
    use-mobile.tsx
    use-toast.ts
  lib/
    utils.ts
  pages/
    Index.tsx                 # homepage (sections)
    NotFound.tsx
  App.tsx                     # providers, router, chatbot
  main.tsx                    # React root
```

Public assets include resume/CV and certificates under `public/`.

## 🛠️ Setup & Development

Prerequisites: Node.js 18+ and npm.

```sh
git clone <YOUR_REPO_URL>
cd <YOUR_PROJECT_DIRECTORY>
npm install
npm run dev
```

The dev server runs (by default) on http://localhost:8080 as configured in `vite.config.ts`.

## 📜 Available Scripts

- `npm run dev` – start Vite dev server
- `npm run build` – production build
- `npm run build:dev` – development-mode build
- `npm run preview` – preview the production build locally
- `npm run lint` – run ESLint

## 🔧 Configuration

- `vite.config.ts` – alias `@` → `src`, dev server port 8080
- `tailwind.config.ts` – Tailwind setup + typography
- `eslint.config.js` – TypeScript/React rules
- `tsconfig*.json` – TypeScript configuration

## 🧩 Key Implementation Details

- Providers: App wraps `TooltipProvider`, `Toaster`, `Sonner`, and `QueryClientProvider`.
- Routing: `BrowserRouter` routes `/` to `pages/Index.tsx` and `*` to `NotFound`.
- Sections: `Index.tsx` composes `Hero`, `About`, `Stats`, `Experience`, `Projects`, `Certifications`, `Contact`, and `Footer`.
- UI: Components from `src/components/ui` are based on shadcn/ui and Radix.
- Chatbot: `Chatbot` is rendered globally from `App.tsx`.

## 🚢 Deployment

Static hosting works great (Vite build outputs to `dist/`). You can deploy to Netlify, Vercel, GitHub Pages, Cloudflare Pages, or any static host.

Build and preview locally:

```sh
npm run build
npm run preview
```

## 📁 Assets & Content

- `public/` contains static files (resume/CV, certificates, images, robots.txt). Files here are served at the site root.

## 🤝 Contributing

Issues and PRs are welcome for fixes, improvements, or new features.

## 📄 License

This project does not currently specify a license. Add one (e.g., MIT) if you plan to open-source contributions.
