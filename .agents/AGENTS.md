# Cumilla Resort — AI Agent Instructions & Guidelines

Welcome! This workspace contains **Cumilla Resort**, a premium, bilingual, fully-featured Next.js 15 web application. It combines a public-facing booking portal with an advanced administrative Operations Management System (OS).

To maintain high development quality and consistent design, adhere to the guidelines below when making changes.

---

## 🚀 Technology Stack & Design System

1. **Framework**: Next.js 15 (using App Router, client/server routing).
2. **Styling**: Vanilla CSS only. Do NOT use TailwindCSS or utility libraries unless explicitly requested.
   - Core design tokens (colors, fonts, animations) are configured as variables in [app/globals.css](file:///c:/PlayGround/Play%20apps/Claudes/Aesthetic%20Resort/Cumilla%20Resort/app/globals.css).
   - Core Theme Colors:
     - `--jade` / `--forest`: `#0C2B2A` (Primary Dark Green)
     - `--champagne` / `--gold`: `#C9A46B` (Accent Gold)
     - `--ivory` / `--cream`: `#F8F4EE` (Clean Off-White Background)
     - `--line`: `#DDD6C8` (Borders & dividers)
     - `--ink`: `#1A1410` (Body Text)
     - `--muted`: `#7A6E65` (Supporting labels)
   - Fonts:
     - English: Headings (`Cormorant Garamond`), Body (`DM Sans`).
     - Bangla: Headings (`Noto Serif Bengali`), Body (`Hind Siliguri`).
3. **Bilingual Support (Internationalization)**:
     - Global translation context is managed in [lib/i18n.jsx](file:///c:/PlayGround/Play%20apps/Claudes/Aesthetic%20Resort/Cumilla%20Resort/lib/i18n.jsx).
     - Hook `useLang()` exposes:
       - `lang`: Current active language (`'en'` or `'bn'`).
       - `t(path)`: Function to lookup text within [lib/dict.js](file:///c:/PlayGround/Play%20apps/Claudes/Aesthetic%20Resort/Cumilla%20Resort/lib/dict.js).
       - `n(number)`: Converts normal digits to local Bengali numerals (e.g. `10` -> `১০`).
       - `L(object)`: Utility to retrieve current locale string value (e.g. `L({ en: 'Hello', bn: 'হ্যালো' })`).
4. **Dynamic Landing Page CMS**:
     - System customization is powered by [lib/cms.jsx](file:///c:/PlayGround/Play%20apps/Claudes/Aesthetic%20Resort/Cumilla%20Resort/lib/cms.jsx) using the browser's `localStorage` key `cumilla-resort-cms-v1`.
     - Controls landing page visibility flags, hero image links, descriptions, and custom sections.

---

## 📂 Core Directories & Files

```text
cumilla-resort/
├── app/                  # Pages, layouts and API routes
│   ├── about/            # Story page
│   ├── admin/            # Administrative dashboard and modules (Housekeeping, POS, HR, Roles)
│   │   ├── layout.jsx    # Sidebar navigation and RBAC route guarding controls
│   │   └── page.jsx      # Manager overview analytics & charts
│   ├── availability/     # Real-time room vacancy grid
│   ├── booking/          # 4-step reservation funnel
│   ├── features/         # Features Showcase directory index page
│   ├── my-booking/       # Guest portal for invoices & demo payment settles
│   ├── page.jsx          # Public homepage / landing page
│   └── globals.css       # Style sheets, design guidelines and variables
│
├── components/           # UI elements (Navbar, Footer, Icons list, Reveal animations)
│   ├── Navbar.jsx        # Public navigation header
│   ├── Footer.jsx        # Public website footer
│   ├── Icons.jsx         # Global SVGs definition mapper
│   └── Reveal.jsx        # Scrolling reveal wrapper
│
└── lib/                  # State hooks and data files
    ├── data.js           # Static mock database tables (Villas, bookings log, roster shifts)
    ├── dict.js           # Translation files (EN & BN)
    └── i18n.jsx          # Context provider for multilingual switcher
```

---

## 📝 Common Modification Tasks

### 1. Translating or Editing Content
- Static strings (menus, headings, buttons) are in [lib/dict.js](file:///c:/PlayGround/Play%20apps/Claudes/Aesthetic%20Resort/Cumilla%20Resort/lib/dict.js). Add keys under `en` and `bn` respectively.
- Mock data assets (villas details, experiences list, extra add-on services, mock billing map) are in [lib/data.js](file:///c:/PlayGround/Play%20apps/Claudes/Aesthetic%20Resort/Cumilla%20Resort/lib/data.js). Use the `{ en: "...", bn: "..." }` format for custom string values.

### 2. Modifying UI Styles
- Do not add Tailwind classes. Modify classes in [app/globals.css](file:///c:/PlayGround/Play%20apps/Claudes/Aesthetic%20Resort/Cumilla%20Resort/app/globals.css) or write standard inline React styles where localized controls are needed.

### 3. Adding Admin Modules
- To add a new screen to the administrative side, create its directory under `app/admin/` (e.g. `app/admin/maintenance/page.jsx`).
- Register the route key in `NAV` list and `ROLE_ACCESS` permissions inside [app/admin/layout.jsx](file:///c:/PlayGround/Play%20apps/Claudes/Aesthetic%20Resort/Cumilla%20Resort/app/admin/layout.jsx).

---

## ⚙️ Development Commands
- **Local Dev Server**: `npm run dev`
- **Verification / Production Build**: `npm run build`
