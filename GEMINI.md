# 🚀 Deployment / Project Config Notice

> [!WARNING]
> Do not use raw absolute `/` paths (like `src="/avatar.jpg"`) without prefixing it with `/portfolio/`, otherwise the assets will 404 in production. Always rely on Next.js native `<Link>` for navigation.
> The site has been successfully exported statically with native dark/light variables; please be aware that standard `TailwindCSS` libraries are NOT installed (per user rules). Do all UI scaling via Vanilla CSS.

---

### Project Tasks Status Tracker

- [x] **Setup Core Infrastructure**
  - **Finished:** Setup core Next.js App Router (TypeScript). Configured CI/CD static output targeting `` routes.
- [x] **Implement Global Layout**
  - **Finished:** Integrated `app/layout.tsx` enclosing Navbar, Footer, and globally configured ThemeToggle components inside the root hierarchy.
- [x] **Develop Interactive Homepage**
  - **Finished:** Developed dynamic `PageBackdrop.tsx` and `Avatar.tsx` to handle highly complex geometric click-ripple hover interactions natively using calculated CSS layouts.
- [x] **Scaffold Sub-pages**
  - **Finished:** Hooked all sub-pages (`/experience`, `/research`, etc.) through a completely decoupled File-based CMS architecture pulling natively from `/content/.../data.json` blobs mapped via `lib/data.ts`.
- [x] **CI/CD Pipeline**
  - **Finished:** Established Action YAML runner via standard `actions/configure-pages@v4` targeting Next.js build.
