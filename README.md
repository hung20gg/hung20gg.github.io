# Hung Nguyen's Personal Portfolio Website

A highly responsive, custom-styled Next.js App Router static portfolio featuring an automated File-based CMS and sophisticated CSS-driven UI physics.

## 🌟 Features

- **Extremely Optimized UI:** Bypasses conventional styling frameworks like Tailwind in favor of raw Vanilla CSS variable mapping (`globals.css`) resulting in incredibly fast light/dark mode DOM transitions.
- **Micro-interactive Geometrics:** Built-in floating geometric objects (`PageBackdrop.tsx`) and profile widgets (`Avatar.tsx`) which react dynamically via custom ripple mathematical calculations (`border-radius` mapping vs `.ripple-ringe`) upon mouse hover.
- **File-Based CMS:** Zero external database footprint! Content for sections like `Experience`, `Research`, `Publications`, and more is decoupled natively into lightweight, readable JSON shards underneath `/content/`.
- **Github Pages CI/CD:** Fully CI/CD integrated. Code pushed via Git automatically builds locally into `/out` and distributes securely over GitHub Pages Action workflows.

## 📂 Project Architecture

```
.
├── .github/workflows/       # CI/CD instructions (deploy.yml)
├── app/                     # Next.js App Router UI Logic
│   ├── about/
│   ├── experience/
│   ├── projects/
│   └── globals.css          # Central hub for variables & complex CSS animations 
├── components/              # Shared isolated React elements
│   ├── Avatar.tsx           # Profile picture mechanics
│   ├── ExpandableCard.tsx   # Toggled content displays used extensively across timeline pages
│   ├── PageBackdrop.tsx     # Seeded geometric particle backgrounds 
│   ├── ThemeToggle.tsx      # Dark/Light switch handler
│   └── ...
├── content/                 # JSON File-Database (The core backend storage layer)
│   ├── experience/data.json
│   ├── publications/data.json
│   └── schemas.md           # Instructions on how to write content
├── lib/
│   └── data.ts              # Native FS reader layer 
└── next.config.ts           # Overridden compiler args for 'export' & 'basePath'
```

## 🚀 Running Locally

Because the backend relies heavily on Node.js native `fs` to pipe content strings down to Server Components, simply run:

```bash
npm run dev
# App routes to http://localhost:3000/portfolio
```

## 🛠 Modifying Content

1. Open the `/content` folder.
2. Search for the relevant `.json` file (`/content/experience/data.json`).
3. Follow formatting guidelines dictated internally via `schemas.md`.
4. Refresh! 

*Note: Custom string formats support nested JSON-stringification where specific components unpack arrays or apply custom tags. Review `ExpandableCard` definitions prior to mapping.* 

## 🌐 Deploying

The repository operates natively alongside GitHub's Action Pages API. Pushing codebase updates into the tracking root `main` branch explicitly cascades updates outward. Ensure `basePath` configurations remain synchronized with the GitHub Repository URI prefix.
