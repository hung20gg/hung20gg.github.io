# Website Implementation Tasks

1. **Setup Core Infrastructure**
   - Initialize Next.js (App Router) project in this directory without TailwindCSS.
   - Configure `next.config.mjs` for static site export (GitHub Pages).
   - Establish CSS variables for a premium, sleek dark-mode design system.

2. **Implement Global Layout**
   - Create `app/layout.tsx` enclosing all pages.
   - Build a responsive `Navbar` and `Footer`.

3. **Develop Homepage (`app/page.tsx`)**
   - Build the Hero section with a modern title. Apply text gradient **only** to the name "Nguyen Quang Hung".
   - Add the short about summary.
   - Build interactive `PortfolioCard` components with subtle micro-animations (hover scale, soft glow) for the portfolio sections.

4. **Scaffold Sub-pages**
   - Create placeholder structures for `/about`, `/experience`, `/research`, `/projects`, `/publications`, `/skills`, and `/contact`.

5. **CI/CD Pipeline**
   - Create `.github/workflows/deploy.yml` to automatically build and deploy Next.js static output to GitHub Pages on pushes to `main`.
