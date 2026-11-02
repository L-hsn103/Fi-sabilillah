# Fi Sabilillah Official Website

This repository contains the complete frontend codebase for **Fi Sabilillah** (ফি সাবিলিল্লাহ), a non-political, non-profit, and voluntary organization founded in Bangladesh on April 10, 2021.

## Vision & Philosophy
Fi Sabilillah seeks to eliminate wealth-based social stratifications by shifting charitable assistance from transient, prestige-seeking public handouts to permanent, dignified self-reliance.

## Directory Structure
```
fi-sabilillah-website/
│
├── index.html                  # Main application markup & structure
├── README.md                   # Project overview and setup instructions
├── .gitignore                  # Git version control exclusions
│
├── public/
│   └── images/
│       ├── logo.png            # High-resolution transparent circular logo
│       └── favicon.png         # Browser tab favicon (64x64)
│
└── src/
    ├── css/
    │   ├── style.css           # Glassmorphism 2.0 theme, cards, and root tokens
    │   ├── responsive.css      # Mobile drawer styles and print stylesheets
    │   └── animations.css      # Keyframes and micro-interaction transitions
    │
    ├── js/
    │   ├── main.js             # Toast notification engine & bootstrap
    │   ├── navigation.js       # Mobile drawer navigation & smooth scrolling
    │   ├── language.js         # Real-time English & Bengali language switcher
    │   ├── constitution.js     # Chapter tabs & keyword search filtering
    │   ├── membership.js       # Article 7 modal & application validation
    │   ├── calculator.js       # Micro-donation empowerment impact visualizer
    │   ├── contact.js          # In-page inquiries & 1-click email copy
    │   └── translations.js     # Bilingual dictionary (EN / BN)
    │
    └── data/
        └── constitution.js     # Full 8 Chapters & 16 Articles (verbatim & EN)
```

## Running Locally
No build step or Node.js runtime is strictly required. You can preview this site directly:
1. Clone or extract this repository into your working directory.
2. Open `index.html` in any modern web browser, or serve it using Python's built-in HTTP server:
   ```bash
   python3 -m http.server 8000
   ```
3. Visit `http://localhost:8000` in your browser.

## Official Contact
* **Organization**: Fi Sabilillah (ফি সাবিলিল্লাহ)
* **Official Email**: [fisabilillahofficial21@gmail.com](mailto:fisabilillahofficial21@gmail.com)
* **Established**: April 10, 2021
