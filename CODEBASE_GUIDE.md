# Cumilla Codebase Guide

Welcome to the codebase documentation for **Cumilla Resort**, a Next.js 15 bilingual application with both a public resort portal and an admin operations management system.

Below is a detailed guide on the application structure, the purpose of each file, and instructions on which files to modify for specific tasks.

---

## 📂 Directory Map

The Next.js application is located in the [cumilla-resort/](file:///c:/PlayGround/Play%20apps/Claudes/Aesthetic%20Resort/cumilla-resort) subdirectory. The project is organized as follows:

```text
cumilla-resort/
├── app/                  # Next.js App Router (pages, layouts, dynamic routes)
│   ├── about/            # Public: About / Story page
│   ├── admin/            # Admin Panel: Operations Dashboard
│   ├── availability/     # Public: Real-time room availability calendar
│   ├── booking/          # Public: 4-step reservation wizard
│   ├── contact/          # Public: Contact info & query form
│   ├── dining/           # Public: Restaurant options & menus
│   ├── events/           # Public: Event & wedding planning inquiries
│   ├── experiences/      # Public: Local tours & activities
│   ├── explore/          # Public: Nearby tourist sights map & directions
│   ├── faq/              # Public: FAQ page
│   ├── gallery/          # Public: Photo showcase
│   ├── my-booking/       # Public: Guest portal to view stays / pay dues
│   ├── offers/           # Public: Seasonal package deals
│   ├── reviews/          # Public: Submit/view guest reviews
│   ├── villas/           # Public: Room directory & single villa details
│   ├── globals.css       # Core design styling sheet (Vanilla CSS)
│   ├── layout.jsx        # Root HTML structure, Fonts, Providers
│   └── page.jsx          # Public: Homepage landing page
│
├── components/           # Reusable React components
│   ├── AdminTopbar.jsx   # Header bar for the admin interface
│   ├── ChatWidget.jsx    # Predefined help/FAQ chat popup on public site
│   ├── Counter.jsx       # Counter animation for numerical stats
│   ├── Footer.jsx        # Public website footer
│   ├── Icons.jsx         # Custom SVG icon set definition
│   ├── LangToggle.jsx    # Dual language selector switcher (EN/BN)
│   ├── Navbar.jsx        # Public website responsive header
│   ├── PageHero.jsx      # Generic banner header image for public pages
│   ├── Reveal.jsx        # Intersection-Observer scroll animation wrapper
│   ├── StatusBadge.jsx   # Status tags for bookings/housekeeping tasks
│   └── VillaCard.jsx     # Reusable card component for villas lists
│
└── lib/                  # State context & local demo data
    ├── cms.jsx           # LocalStorage-backed dynamic Landing Page CMS state
    ├── data.js           # Static mock data (villas, bookings, staff roster, invoices)
    ├── dict.js           # Bilingual dictionary translations (EN / BN)
    └── i18n.jsx          # Internationalization engine context (translation t(), number formatting n(), data localization L())
```

---

## 📑 Detailed File Contents

### 1. State Contexts & Internationalization ([lib/](file:///c:/PlayGround/Play%20apps/Claudes/Aesthetic%20Resort/cumilla-resort/lib))
*   **[lib/i18n.jsx](file:///c:/PlayGround/Play%20apps/Claudes/Aesthetic%20Resort/cumilla-resort/lib/i18n.jsx)**: Implements context for switching between English (`en`) and Bengali (`bn`). 
    *   Exposes `t(path)` to search translation paths.
    *   Exposes `n(value)` to convert standard numerals to Bengali digits when required.
    *   Exposes `L(obj)` to resolve localized text fields like `{ en: "Hello", bn: "হ্যালো" }`.
*   **[lib/dict.js](file:///c:/PlayGround/Play%20apps/Claudes/Aesthetic%20Resort/cumilla-resort/lib/dict.js)**: Contains all the text translations used across the website.
*   **[lib/cms.jsx](file:///c:/PlayGround/Play%20apps/Claudes/Aesthetic%20Resort/cumilla-resort/lib/cms.jsx)**: Implements state management for site customization. It saves homepage visibility states, hero images/headers, and custom sections directly into the browser's `localStorage` under the key `cumilla-resort-cms-v1`.
*   **[lib/data.js](file:///c:/PlayGround/Play%20apps/Claudes/Aesthetic%20Resort/cumilla-resort/lib/data.js)**: Holds the structural mock records including villas info, room lists, check-ins log, staff shifts roster, financial statements, and active bookings.

### 2. Global Styling & Core Setup
*   **[app/globals.css](file:///c:/PlayGround/Play%20apps/Claudes/Aesthetic%20Resort/cumilla-resort/app/globals.css)**: Holds all styles, animations, variables, layouts, and responsive queries. Vanilla CSS is used.
*   **[app/layout.jsx](file:///c:/PlayGround/Play%20apps/Claudes/Aesthetic%20Resort/cumilla-resort/app/layout.jsx)**: Declares application metadata, imports Google Fonts (Playfair Display, Karla, Noto Serif Bengali, Hind Siliguri), and wraps the application in the dynamic providers (`LangProvider`, `CmsProvider`).

### 3. Public User Interface Pages
*   **[app/page.jsx](file:///c:/PlayGround/Play%20apps/Claudes/Aesthetic%20Resort/cumilla-resort/app/page.jsx)**: The primary resort landing page containing hero section, occupancy highlights, sanctuary about content, sample villas, guest experiences preview, interactive gallery, testimonials slide, and a quick booking selector.
*   **[app/villas/page.jsx](file:///c:/PlayGround/Play%20apps/Claudes/Aesthetic%20Resort/cumilla-resort/app/villas/page.jsx)**: Displays a grid overview of all available eco-luxury villas.
*   **[app/villas/\[slug\]/page.jsx](file:///c:/PlayGround/Play%20apps/Claudes/Aesthetic%20Resort/cumilla-resort/app/villas/%5Bslug%5D/page.jsx)**: Dynamically rendered page representing a single villa category. Renders overview details, pricing summaries, specifications, and amenity lists.
*   **[app/availability/page.jsx](file:///c:/PlayGround/Play%20apps/Claudes/Aesthetic%20Resort/cumilla-resort/app/availability/page.jsx)**: Checks real-time room occupancies between guest-selected check-in/check-out dates.
*   **[app/booking/page.jsx](file:///c:/PlayGround/Play%20apps/Claudes/Aesthetic%20Resort/cumilla-resort/app/booking/page.jsx)**: Guides prospective guests through dates search, villa selection, personal info inputs, and request confirmation.
*   **[app/my-booking/page.jsx](file:///c:/PlayGround/Play%20apps/Claudes/Aesthetic%20Resort/cumilla-resort/app/my-booking/page.jsx)**: Renders booking lookups. Guests can review invoices and simulate payment gateways to settle outstanding dues.
*   **[app/experiences/page.jsx](file:///c:/PlayGround/Play%20apps/Claudes/Aesthetic%20Resort/cumilla-resort/app/experiences/page.jsx)**: Displays tours and nature guide packages (e.g. Lawachara treks, tea garden visits).
*   **[app/dining/page.jsx](file:///c:/PlayGround/Play%20apps/Claudes/Aesthetic%20Resort/cumilla-resort/app/dining/page.jsx)**: Showcases restaurant highlights and menus.
*   **[app/gallery/page.jsx](file:///c:/PlayGround/Play%20apps/Claudes/Aesthetic%20Resort/cumilla-resort/app/gallery/page.jsx)**: Categorized photo stream of the property.
*   **[app/about/page.jsx](file:///c:/PlayGround/Play%20apps/Claudes/Aesthetic%20Resort/cumilla-resort/app/about/page.jsx)**: Explains the history, values, team members, and award recognitions.
*   **[app/offers/page.jsx](file:///c:/PlayGround/Play%20apps/Claudes/Aesthetic%20Resort/cumilla-resort/app/offers/page.jsx)**: Features promotional travel packages.
*   **[app/contact/page.jsx](file:///c:/PlayGround/Play%20apps/Claudes/Aesthetic%20Resort/cumilla-resort/app/contact/page.jsx)**: Addresses, maps, direct calling channels, and contact message input form.
*   **[app/faq/page.jsx](file:///c:/PlayGround/Play%20apps/Claudes/Aesthetic%20Resort/cumilla-resort/app/faq/page.jsx)**: Resort policies and standard procedures list.
*   **[app/reviews/page.jsx](file:///c:/PlayGround/Play%20apps/Claudes/Aesthetic%20Resort/cumilla-resort/app/reviews/page.jsx)**: Public guest feedback submission hub.

### 4. Admin Management Operations Dashboard ([app/admin/](file:///c:/PlayGround/Play%20apps/Claudes/Aesthetic%20Resort/cumilla-resort/app/admin))
*   **[app/admin/layout.jsx](file:///c:/PlayGround/Play%20apps/Claudes/Aesthetic%20Resort/cumilla-resort/app/admin/layout.jsx)**: The admin sidebar layout template. Controls operations authorization and locks routes based on guest-care permissions (GM, Front Desk, or Housekeeping).
*   **[app/admin/page.jsx](file:///c:/PlayGround/Play%20apps/Claudes/Aesthetic%20Resort/cumilla-resort/app/admin/page.jsx)**: The primary dashboard screen summarizing key performance indicators (Occupancy rate, income projections, pending actions, arrivals) using line and donut SVG charts.
*   **[app/admin/login/page.jsx](file:///c:/PlayGround/Play%20apps/Claudes/Aesthetic%20Resort/cumilla-resort/app/admin/login/page.jsx)**: Renders the staff sign-in login interface.
*   **[app/admin/bookings/page.jsx](file:///c:/PlayGround/Play%20apps/Claudes/Aesthetic%20Resort/cumilla-resort/app/admin/bookings/page.jsx)**: Allows filtering and locating reservations.
*   **[app/admin/bookings/\[ref\]/page.jsx](file:///c:/PlayGround/Play%20apps/Claudes/Aesthetic%20Resort/cumilla-resort/app/admin/bookings/%5Bref%5D/page.jsx)**: Detailed billing breakdown and reservation invoice management.
*   **[app/admin/calendar/page.jsx](file:///c:/PlayGround/Play%20apps/Claudes/Aesthetic%20Resort/cumilla-resort/app/admin/calendar/page.jsx)**: A grid calendar representing room bookings day-by-day.
*   **[app/admin/rent/page.jsx](file:///c:/PlayGround/Play%20apps/Claudes/Aesthetic%20Resort/cumilla-resort/app/admin/rent/page.jsx)**: Front-desk interface to enter walk-in or over-the-phone bookings with automatic price calculations.
*   **[app/admin/rooms/page.jsx](file:///c:/PlayGround/Play%20apps/Claudes/Aesthetic%20Resort/cumilla-resort/app/admin/rooms/page.jsx)**: Oversees category prices and live occupied/vacant room logs.
*   **[app/admin/guests/page.jsx](file:///c:/PlayGround/Play%20apps/Claudes/Aesthetic%20Resort/cumilla-resort/app/admin/guests/page.jsx)**: Directories tracking currently registered guests.
*   **[app/admin/guests/\[id\]/page.jsx](file:///c:/PlayGround/Play%20apps/Claudes/Aesthetic%20Resort/cumilla-resort/app/admin/guests/%5Bid%5D/page.jsx)**: CRM profiles, history of visits, notes, preferences, and details of individual guest records.
*   **[app/admin/frontdesk/page.jsx](file:///c:/PlayGround/Play%20apps/Claudes/Aesthetic%20Resort/cumilla-resort/app/admin/frontdesk/page.jsx)**: Immediate checking-in queue and checking-out bill clearances tracker.
*   **[app/admin/prebooking/page.jsx](file:///c:/PlayGround/Play%20apps/Claudes/Aesthetic%20Resort/cumilla-resort/app/admin/prebooking/page.jsx)**: Oversees advance payment confirmations (30% base payment check).
*   **[app/admin/dues/page.jsx](file:///c:/PlayGround/Play%20apps/Claudes/Aesthetic%20Resort/cumilla-resort/app/admin/dues/page.jsx)**: List of bookings with pending unpaid balances.
*   **[app/admin/membership/page.jsx](file:///c:/PlayGround/Play%20apps/Claudes/Aesthetic%20Resort/cumilla-resort/app/admin/membership/page.jsx)**: Directories detailing loyalty status (Star, Gold, Platinum).
*   **[app/admin/feedback/page.jsx](file:///c:/PlayGround/Play%20apps/Claudes/Aesthetic%20Resort/cumilla-resort/app/admin/feedback/page.jsx)**: Resolving and addressing complaints/ratings.
*   **[app/admin/housekeeping/page.jsx](file:///c:/PlayGround/Play%20apps/Claudes/Aesthetic%20Resort/cumilla-resort/app/admin/housekeeping/page.jsx)**: Operations log outlining clean/dirty room checklists and team shifts assignments.
*   **[app/admin/staff/page.jsx](file:///c:/PlayGround/Play%20apps/Claudes/Aesthetic%20Resort/cumilla-resort/app/admin/staff/page.jsx)**: Roster schedules detailing department shifts.
*   **[app/admin/hr/page.jsx](file:///c:/PlayGround/Play%20apps/Claudes/Aesthetic%20Resort/cumilla-resort/app/admin/hr/page.jsx)**: Attendance logging and monthly salaries payroll calculator.
*   **[app/admin/finance/page.jsx](file:///c:/PlayGround/Play%20apps/Claudes/Aesthetic%20Resort/cumilla-resort/app/admin/finance/page.jsx)**: Monthly balance ledger statement, rates breakdown, and revenue mix dashboard.
*   **[app/admin/pos/page.jsx](file:///c:/PlayGround/Play%20apps/Claudes/Aesthetic%20Resort/cumilla-resort/app/admin/pos/page.jsx)**: Restaurant food/beverage ordering terminal which posts the charges to the client room bill.
*   **[app/admin/cms/page.jsx](file:///c:/PlayGround/Play%20apps/Claudes/Aesthetic%20Resort/cumilla-resort/app/admin/cms/page.jsx)**: Simple site management tool to live-edit the homepage hero, visibility tags, and announcements.
*   **[app/admin/reports/page.jsx](file:///c:/PlayGround/Play%20apps/Claudes/Aesthetic%20Resort/cumilla-resort/app/admin/reports/page.jsx)**: Exportable statistics (RevPAR, Average Daily Rate, performance).
*   **[app/admin/settings/page.jsx](file:///c:/PlayGround/Play%20apps/Claudes/Aesthetic%20Resort/cumilla-resort/app/admin/settings/page.jsx)**: Custom templates for SMS and reservation alerts.
*   **[app/admin/roles/page.jsx](file:///c:/PlayGround/Play%20apps/Claudes/Aesthetic%20Resort/cumilla-resort/app/admin/roles/page.jsx)**: Role permissions page allowing superadmins to create custom roles and toggle page permissions.

---

## 🛠️ Modifying the Application: Which File to Change?

Use the tables below to quickly find the exact files to modify depending on the type of change you want to make.

### A. Editing Website Content & Translations

| Task / Change | Files to Modify | Notes |
| :--- | :--- | :--- |
| **Add or edit static descriptions, names, pricing, or images (Villas, Experiences, Dining, Staff, Bookings)** | 📄 [lib/data.js](file:///c:/PlayGround/Play%20apps/Claudes/Aesthetic%20Resort/cumilla-resort/lib/data.js) | Change arrays like `villas`, `experiences`, or `restaurants`. |
| **Change text labels, menu titles, or page sub-headers (English & Bengali)** | 📄 [lib/dict.js](file:///c:/PlayGround/Play%20apps/Claudes/Aesthetic%20Resort/cumilla-resort/lib/dict.js) | Edit the translation JSON trees under `en` and `bn`. |
| **Modify default state config or customize dynamic landing page sections** | 📄 [lib/cms.jsx](file:///c:/PlayGround/Play%20apps/Claudes/Aesthetic%20Resort/cumilla-resort/lib/cms.jsx) | Modify `DEFAULT_CMS` structure or dynamic triggers. |
| **Update the list of pages in the main header navigation** | 📄 [components/Navbar.jsx](file:///c:/PlayGround/Play%20apps/Claudes/Aesthetic%20Resort/cumilla-resort/components/Navbar.jsx) | Edit the `LINKS` array. |

### B. Adjusting UI Components & Common Elements

| Task / Change | Files to Modify | Notes |
| :--- | :--- | :--- |
| **Change the site header logo, links, or booking button** | 📄 [components/Navbar.jsx](file:///c:/PlayGround/Play%20apps/Claudes/Aesthetic%20Resort/cumilla-resort/components/Navbar.jsx) | Controls the public header and mobile menu overlay. |
| **Edit the help chat widget options or predefined answers** | 📄 [components/ChatWidget.jsx](file:///c:/PlayGround/Play%20apps/Claudes/Aesthetic%20Resort/cumilla-resort/components/ChatWidget.jsx)<br>📄 [lib/dict.js](file:///c:/PlayGround/Play%20apps/Claudes/Aesthetic%20Resort/cumilla-resort/lib/dict.js) | Predefined questions are mapped under `chat` in the dictionary file. |
| **Edit default icons used throughout the project** | 📄 [components/Icons.jsx](file:///c:/PlayGround/Play%20apps/Claudes/Aesthetic%20Resort/cumilla-resort/components/Icons.jsx) | Contains SVG definitions mapped to shorthand keys. |
| **Change the details displayed on the Villa listing cards** | 📄 [components/VillaCard.jsx](file:///c:/PlayGround/Play%20apps/Claudes/Aesthetic%20Resort/cumilla-resort/components/VillaCard.jsx) | Customize how a single card is styled / structured. |

### C. Modifying Styles, Typography, & Visuals

| Task / Change | Files to Modify | Notes |
| :--- | :--- | :--- |
| **Change colors, spacing, borders, grid sizes, or layouts globally** | 📄 [app/globals.css](file:///c:/PlayGround/Play%20apps/Claudes/Aesthetic%20Resort/cumilla-resort/app/globals.css) | Custom Vanilla CSS file. Edit CSS variables (e.g. `--forest`, `--cream`, `--gold`) for immediate global palette adjustments. |
| **Change fonts or import new styles** | 📄 [app/layout.jsx](file:///c:/PlayGround/Play%20apps/Claudes/Aesthetic%20Resort/cumilla-resort/app/layout.jsx)<br>📄 [app/globals.css](file:///c:/PlayGround/Play%20apps/Claudes/Aesthetic%20Resort/cumilla-resort/app/globals.css) | Edit Google Fonts links in layout `<head>`, then update the font variables in `globals.css`. |

### D. Modifying Operations & Administrative Features

| Task / Change | Files to Modify | Notes |
| :--- | :--- | :--- |
| **Modify administrative page layouts or add new operational sidebar views** | 📄 [app/admin/layout.jsx](file:///c:/PlayGround/Play%20apps/Claudes/Aesthetic%20Resort/cumilla-resort/app/admin/layout.jsx) | Edit the `NAV` object and modify role accessibility mapping `ROLE_ACCESS`. |
| **Add a new operational page under the staff portal** | 📁 [app/admin/](file:///c:/PlayGround/Play%20apps/Claudes/Aesthetic%20Resort/cumilla-resort/app/admin) | Create a new subdirectory with a `page.jsx` file (e.g. `app/admin/maintenance/page.jsx`). |
| **Change data models / forms for Manual Reservation (Room Renting)** | 📄 [app/admin/rent/page.jsx](file:///c:/PlayGround/Play%20apps/Claudes/Aesthetic%20Resort/cumilla-resort/app/admin/rent/page.jsx) | Handles walk-in guest check-ins and invoice calculations. |
| **Adjust cleaning checklist logs or inspect categories** | 📄 [app/admin/housekeeping/page.jsx](file:///c:/PlayGround/Play%20apps/Claudes/Aesthetic%20Resort/cumilla-resort/app/admin/housekeeping/page.jsx) | Controls rooms priority list, cleaner details, and inspection approvals. |
| **Change Point of Sale menu items or pricing logic** | 📄 [app/admin/pos/page.jsx](file:///c:/PlayGround/Play%20apps/Claudes/Aesthetic%20Resort/cumilla-resort/app/admin/pos/page.jsx) | Modifies POS UI and items order totals calculation rules. |
| **Change default template messages for emails/SMS confirmations** | 📄 [app/admin/settings/page.jsx](file:///c:/PlayGround/Play%20apps/Claudes/Aesthetic%20Resort/cumilla-resort/app/admin/settings/page.jsx) | Modifies the forms for custom alert template layouts. |
| **Manage custom roles, select page permissions, or reset system defaults** | 📄 [app/admin/roles/page.jsx](file:///c:/PlayGround/Play%20apps/Claudes/Aesthetic%20Resort/cumilla-resort/app/admin/roles/page.jsx) | Custom role registration, visual icon picker, and page access switches. |
