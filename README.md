# BookNest — Online Book Store

**College Assignment Project:**  
*Design and Development of an Online Book Store Using Generative AI*

---

## 1. Project Overview

**BookNest** is a modern, responsive, frontend-only online bookstore web application designed with a clean, premium bookstore aesthetic. The project showcases how Generative AI can assist throughout the software engineering lifecycle—from semantic HTML architecture and CSS custom property theming to reactive Vanilla JavaScript algorithms and accessibility testing.

---

## 2. Key Features

- **Catalogue & Real-Time Filtering (`books.html`)**:
  - Live search across titles, authors, and keywords.
  - Multi-genre filtering (*Fiction, Technology, Self-Help, Business, Science, Classics*).
  - Sorting by *Featured, Price (Low to High), Price (High to Low), Highest Rated, and Title (A-Z)*.
  - URL Query Parameter support (e.g. `books.html?category=Fiction` or `books.html?search=Clean`).
  - Quick-View modal for in-depth book synopses, publication details, and ISBNs.

- **Persistent Shopping Cart (`cart.html`)**:
  - Client-side persistence using the browser's `localStorage` API.
  - Cart counter badge with pop micro-animations in the header across all pages.
  - Quantity adjustments (`+` / `-`), line-item recalculation, and single-click removal.
  - Free delivery calculation with dynamic progress bar (free on orders over $35.00).
  - Working promo code engine:
    - `BOOKNEST10` — 10% discount on entire order.
    - `FREESHIP` — Complimentary standard shipping.
  - Simulated Checkout Modal with address validation, simulated payment selection, randomized Order ID generation (`BN-XXXXXX`), and printable receipt screen.

- **Genre Showcase (`categories.html`)**:
  - 6 genre cards with custom vector icons, descriptions, and mini book cover stacks.
  - Direct routing to pre-filtered catalogue pages.

- **About & AI Methodology (`about.html`)**:
  - Academic assignment documentation and architecture breakdown.
  - Generative AI contribution logs (HTML generation, CSS styling, JS logic, QA).
  - Interactive, accessible FAQ accordion.

- **Global UI Systems**:
  - **Light & Dark Theme Toggle**: Cleanly switches between a warm cream bookstore aesthetic and an elegant nocturnal slate/forest mode, persisted in `localStorage`.
  - **Non-blocking Toast Notifications**: Instant visual feedback on cart operations, promo codes, and newsletter subscription.
  - **Mobile Hamburger Navigation**: Touch-optimized slide-out drawer with backdrop blur.
  - **Zero Backend / Offline Capable**: Works immediately by double-clicking `index.html`.

---

## 3. Technology Stack

* **Markup**: HTML5 (Semantic elements: `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`, WAI-ARIA roles)
* **Styling**: Modern CSS3 (CSS Custom Properties, Flexbox, CSS Grid, media queries, 3D book spine lighting effects)
* **Scripting**: Vanilla JavaScript (ES6+ classes/objects, Web Storage API, Event Listeners)
* **Dependencies**: **0 (Zero external libraries, zero frameworks, zero backend)**

---

## 4. File Structure

```
BookNest/
│
├── index.html          # Home page with hero, categories preview, featured books, newsletter
├── books.html          # Complete catalogue with live search, filters, sorting, quick view
├── categories.html     # Dedicated categories showcase page with direct filter links
├── cart.html           # Interactive shopping cart, promo codes, simulated checkout
├── about.html          # Assignment documentation, AI workflow showcase, interactive FAQ
├── README.md           # Project documentation
│
├── css/
│   └── style.css       # Design tokens, color palette, dark mode, responsive media queries
│
├── js/
│   ├── books.js        # 16 curated books dataset, categories info, catalogue filter engine
│   ├── cart.js         # LocalStorage cart management, calculations, simulated checkout
│   └── main.js         # Theme toggle, mobile drawer, toast alerts, newsletter, FAQ accordion
│
└── assets/
    └── images/
        └── covers/     # 16 SVG book covers with realistic gradients & book spine depth
```

---

## 5. How to Run

1. Navigate to the `BookNest` directory.
2. Double-click `index.html` or right-click and select **Open with... (Chrome, Edge, Firefox, Safari)**.
3. No local server, Node.js, or internet connection is required—all assets and scripts are completely self-contained.

---

## 6. Generative AI Contribution Summary

This project was built to fulfill the college assignment requirement:  
*"Design and Development of an Online Book Store Using Generative AI"*.

1. **HTML Architecture**: Structured semantic, accessible HTML5 templates with clean component hierarchies and ARIA accessibility labels.
2. **CSS UI/UX Design**: Implemented a warm boutique bookstore palette (`#183B2B`, `#C47735`, `#FBFAF7`, `#F0E5D4`) with cohesive dark mode switching and realistic book cover spine effects.
3. **JavaScript Engineering**: Developed modular client-side state engines for cart management, localStorage persistence, multi-factor catalogue filtering, and simulated checkout receipt generation.
4. **Responsive Testing & Debugging**: Ensured fluid adaptation across mobile (320px+), tablet, and desktop viewports with zero horizontal scrolling.
