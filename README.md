# Fi Sabilillah Official Website

This repository contains the complete frontend codebase for **Fi Sabilillah** (ফি সাবিলিল্লাহ), a non-political, non-profit, and voluntary organization founded in Bangladesh on April 10, 2021.

## Vision & Philosophy

Fi Sabilillah seeks to eliminate wealth-based social stratifications by shifting charitable assistance from transient, prestige-seeking public handouts to permanent, dignified self-reliance.

## Directory Structure

```
fi-sabilillah-website/
│
├── index.html                  # Homepage (short landing page)
├── README.md                   # Project overview and setup instructions
├── .gitignore                  # Git version control exclusions
│
├── components/                 # Shared HTML components (loaded via fetch)
│   ├── navbar.html             # Hybrid navigation bar (desktop + mobile)
│   └── footer.html             # Site footer
│
├── public/
│   └── images/
│       ├── logo.png            # High-resolution transparent circular logo
│       └── favicon.png         # Browser tab favicon (64x64)
│
├── pages/                      # Multi-page website sections
│   ├── about.html              # About Us - background, vision, mission, values
│   ├── programs.html           # Our Programs - 3 core programs
│   ├── governance.html         # Governance - structure, council, elections
│   ├── membership.html         # Membership - eligibility, application form
│   ├── constitution.html       # Constitution - 8 chapters, 16 articles reader
│   ├── transparency.html       # Transparency - funding, audit, calculator
│   ├── activities.html         # Activities & Updates - listings, filtering
│   └── contact.html            # Contact - inquiry form, FAQ, email copy
│
└── src/
    ├── css/
    │   ├── style.css           # Modern minimalist design system
    │   ├── responsive.css      # Responsive layouts & print styles
    │   └── animations.css      # Keyframes and micro-interactions
    │
    ├── js/
    │   ├── main.js             # Toast engine, clipboard copy, FAQ toggle
    │   ├── components.js       # Shared component fetch-loader
    │   ├── navigation.js       # Hybrid navbar, dropdowns, ARIA, active state
    │   ├── language.js         # EN/BN switcher, localStorage persistence
    │   ├── constitution.js     # Chapter tabs, search, print, rendering
    │   ├── membership.js       # Article 7 modal, validation, application
    │   ├── calculator.js       # Donation impact calculator
    │   ├── contact.js          # Inquiry form, email copy
    │   ├── activities.js       # Activity listings, filtering, detail view
    │   └── translations.js     # Bilingual dictionary (EN / BN)
    │
    └── data/
        ├── constitution.js     # Full 8 Chapters & 16 Articles (verbatim & EN)
        └── activities.js       # Activities & Updates data (empty state)
```

## Running Locally

No build step or Node.js runtime is required. A local HTTP server is recommended because shared components (navbar/footer) are loaded via `fetch()`, which does not work with `file://` protocol.

### Option 1: Python HTTP Server
```bash
python3 -m http.server 8000
# Visit http://localhost:8000
```

### Option 2: Node.js http-server
```bash
npx http-server . -p 8000
# Visit http://localhost:8000
```

### Option 3: Direct file open (limited)
You can open `index.html` directly in a browser, but the navbar/footer components will not load because `fetch()` is blocked on `file://` protocol.

## Language Support

The website supports two fully independent language modes:

- **English**: All interface text in English, English-only constitution
- **বাংলা**: All interface text in Bangla, Bangla-only constitution

Language preference is saved in `localStorage` and persists across page navigation. Switch languages using the language toggle in the navbar.

## Existing Features Preserved

- Constitution chapter navigation, keyword search, and print
- Membership application form (age ≥16 validation, referral required)
- Donation calculator with slider and impact tiers
- Contact form and 1-click email copy
- FAQ accordion
- Toast notifications
- Language switching with localStorage persistence

## New Features Implemented

- Hybrid multi-page architecture (9 pages)
- Shared navbar/footer component loader
- Desktop dropdowns + mobile expandable navigation
- Active page indicator and ARIA accessibility
- Constitution dedicated reader with chapter/article navigation
- Activities & Updates with category filtering and detail view
- Modern minimalist design system (forest green, sage, gold accent)
- Plus Jakarta Sans (EN) / Hind Siliguri (BN) typography
- Fully independent EN/BN language modes

## Official Contact

* **Organization**: Fi Sabilillah (ফি সাবিলিল্লাহ)
* **Official Email**: [fisabilillahofficial21@gmail.com](mailto:fisabilillahofficial21@gmail.com)
* **Established**: April 10, 2021
