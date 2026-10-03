/**
 * BookNest - Books Dataset and Catalog Management
 * Generative AI Assisted Development for College Assignment
 */

// Comprehensive Book Dataset (16 Curated Titles across 6 Categories)
const BOOKS = [
  {
    id: 1,
    title: "Atomic Habits",
    author: "James Clear",
    category: "Self-Help",
    price: 19.99,
    originalPrice: 27.00,
    rating: 4.9,
    reviewsCount: 2840,
    cover: "assets/images/covers/atomic-habits.svg",
    badge: "Bestseller",
    featured: true,
    year: 2018,
    pages: 320,
    isbn: "978-0735211292",
    description: "An extraordinarily practical framework for building good habits, breaking bad ones, and mastering the tiny behaviors that lead to remarkable personal and professional transformation."
  },
  {
    id: 2,
    title: "The Psychology of Money",
    author: "Morgan Housel",
    category: "Business",
    price: 18.50,
    originalPrice: 24.99,
    rating: 4.8,
    reviewsCount: 1950,
    cover: "assets/images/covers/psychology-of-money.svg",
    badge: "Staff Pick",
    featured: true,
    year: 2020,
    pages: 256,
    isbn: "978-0857197689",
    description: "Doing well with money isn't necessarily about what you know. It's about how you behave. Housel shares 19 short stories exploring the strange ways people think about wealth, greed, and happiness."
  },
  {
    id: 3,
    title: "Dune",
    author: "Frank Herbert",
    category: "Fiction",
    price: 16.99,
    originalPrice: 21.00,
    rating: 4.8,
    reviewsCount: 3120,
    cover: "assets/images/covers/dune.svg",
    badge: "Sci-Fi Classic",
    featured: true,
    year: 1965,
    pages: 688,
    isbn: "978-0441172719",
    description: "Set on the desert planet Arrakis, Dune tells the story of Paul Atreides as he navigates a complex web of politics, religion, ecology, and prophecy in one of science fiction's greatest masterpieces."
  },
  {
    id: 4,
    title: "Clean Code",
    author: "Robert C. Martin",
    category: "Technology",
    price: 34.99,
    originalPrice: 44.99,
    rating: 4.7,
    reviewsCount: 1680,
    cover: "assets/images/covers/clean-code.svg",
    badge: "Essential",
    featured: true,
    year: 2008,
    pages: 464,
    isbn: "978-0132350884",
    description: "Even bad code can function. But if code isn't clean, it can bring a development organization to its knees. A revolutionary handbook on agile software craftsmanship and best practices."
  },
  {
    id: 5,
    title: "Ikigai: The Japanese Secret",
    author: "Héctor García",
    category: "Self-Help",
    price: 15.99,
    originalPrice: 19.99,
    rating: 4.6,
    reviewsCount: 1420,
    cover: "assets/images/covers/ikigai.svg",
    badge: "Mindfulness",
    featured: false,
    year: 2017,
    pages: 208,
    isbn: "978-0143130727",
    description: "Discover the Japanese concept of Ikigai—the intersection of what you love, what you are good at, what the world needs, and what you can get paid for—to find purpose and vitality."
  },
  {
    id: 6,
    title: "Sapiens: Humankind",
    author: "Yuval Noah Harari",
    category: "Science",
    price: 22.00,
    originalPrice: 28.00,
    rating: 4.9,
    reviewsCount: 4200,
    cover: "assets/images/covers/sapiens.svg",
    badge: "Global Hit",
    featured: true,
    year: 2014,
    pages: 464,
    isbn: "978-0062316097",
    description: "From a renowned historian, an illuminating exploration of how Homo sapiens came to conquer Earth through cognitive revolution, agriculture, empire building, and scientific advancement."
  },
  {
    id: 7,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    category: "Classics",
    price: 12.99,
    originalPrice: 16.50,
    rating: 4.8,
    reviewsCount: 2190,
    cover: "assets/images/covers/pride-and-prejudice.svg",
    badge: "Classic",
    featured: false,
    year: 1813,
    pages: 432,
    isbn: "978-0141439518",
    description: "The turbulent relationship between Elizabeth Bennet and Fitzwilliam Darcy sparkles with wit, social commentary, and unforgettable romantic tension in 19th-century England."
  },
  {
    id: 8,
    title: "The Pragmatic Programmer",
    author: "David Thomas & Andrew Hunt",
    category: "Technology",
    price: 39.99,
    originalPrice: 49.99,
    rating: 4.9,
    reviewsCount: 1870,
    cover: "assets/images/covers/pragmatic-programmer.svg",
    badge: "Developer Must-Have",
    featured: true,
    year: 2019,
    pages: 352,
    isbn: "978-0135957059",
    description: "Written for software developers looking to hone their craft, this 20th Anniversary edition cuts through the clutter of modern software development with timeless principles and pragmatic advice."
  },
  {
    id: 9,
    title: "The Alchemist",
    author: "Paulo Coelho",
    category: "Fiction",
    price: 14.50,
    originalPrice: 18.00,
    rating: 4.7,
    reviewsCount: 3560,
    cover: "assets/images/covers/the-alchemist.svg",
    badge: "Inspiring",
    featured: false,
    year: 1988,
    pages: 208,
    isbn: "978-0062315007",
    description: "An inspiring fable about Santiago, an Andalusian shepherd boy who journeys across Egyptian deserts in search of treasure, discovering that the real treasure lies within following his Personal Legend."
  },
  {
    id: 10,
    title: "Zero to One",
    author: "Peter Thiel",
    category: "Business",
    price: 21.00,
    originalPrice: 26.50,
    rating: 4.6,
    reviewsCount: 1530,
    cover: "assets/images/covers/zero-to-one.svg",
    badge: "Startup Icon",
    featured: false,
    year: 2014,
    pages: 224,
    isbn: "978-0804139298",
    description: "The great secret of our time is that there are still uncharted frontiers and inventions to create. Thiel provides provocative insights on how to build businesses that create truly novel value."
  },
  {
    id: 11,
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    category: "Science",
    price: 17.99,
    originalPrice: 22.99,
    rating: 4.8,
    reviewsCount: 2640,
    cover: "assets/images/covers/brief-history-of-time.svg",
    badge: "Cosmology",
    featured: false,
    year: 1988,
    pages: 256,
    isbn: "978-0553380163",
    description: "A landmark volume in science writing by one of the greatest minds of our century, exploring black holes, gravitational singularities, the nature of time, and the origins of the cosmos."
  },
  {
    id: 12,
    title: "1984",
    author: "George Orwell",
    category: "Classics",
    price: 13.50,
    originalPrice: 17.50,
    rating: 4.9,
    reviewsCount: 3890,
    cover: "assets/images/covers/1984.svg",
    badge: "Dystopian Legend",
    featured: true,
    year: 1949,
    pages: 328,
    isbn: "978-0451524935",
    description: "A haunting prophecy of a totalitarian future where surveillance is ubiquitous, historical truth is manipulated, and individuality is crushed under the gaze of Big Brother."
  },
  {
    id: 13,
    title: "Deep Work",
    author: "Cal Newport",
    category: "Self-Help",
    price: 18.99,
    originalPrice: 25.00,
    rating: 4.7,
    reviewsCount: 1710,
    cover: "assets/images/covers/deep-work.svg",
    badge: "Productivity",
    featured: false,
    year: 2016,
    pages: 304,
    isbn: "978-1455586691",
    description: "Deep work is the ability to focus without distraction on a cognitively demanding task. Newport demonstrates why this super-power is the ultimate key to thriving in our hyper-connected economy."
  },
  {
    id: 14,
    title: "Design Patterns",
    author: "Erich Gamma et al.",
    category: "Technology",
    price: 44.50,
    originalPrice: 54.99,
    rating: 4.6,
    reviewsCount: 1340,
    cover: "assets/images/covers/design-patterns.svg",
    badge: "Software Architecture",
    featured: false,
    year: 1994,
    pages: 416,
    isbn: "978-0201633610",
    description: "The seminal Gang of Four reference cataloging 23 fundamental design patterns for reusable, modular, and robust object-oriented software engineering."
  },
  {
    id: 15,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    category: "Classics",
    price: 14.99,
    originalPrice: 18.99,
    rating: 4.9,
    reviewsCount: 3410,
    cover: "assets/images/covers/to-kill-a-mockingbird.svg",
    badge: "Pulitzer Winner",
    featured: false,
    year: 1960,
    pages: 336,
    isbn: "978-0060935467",
    description: "Through the innocent eyes of young Scout Finch, Harper Lee explores racial injustice, moral courage, and compassionate empathy in the American South."
  },
  {
    id: 16,
    title: "Cosmos",
    author: "Carl Sagan",
    category: "Science",
    price: 19.50,
    originalPrice: 26.00,
    rating: 4.9,
    reviewsCount: 2320,
    cover: "assets/images/covers/cosmos.svg",
    badge: "Stargazing",
    featured: false,
    year: 1980,
    pages: 384,
    isbn: "978-0345539434",
    description: "A breathtaking poetic journey through fifteen billion years of cosmic evolution, tracking the origin of life, civilizations, the search for extraterrestrial intelligence, and our future."
  }
];

// Categories definition with icons, descriptions, and slugs
const CATEGORIES_DATA = [
  {
    name: "Fiction",
    slug: "Fiction",
    icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path><path d="M12 6v6"></path><path d="M9 9h6"></path></svg>`,
    description: "Immersive narratives, epic sagas, imaginative world-building, and transformative character journeys.",
    count: 2
  },
  {
    name: "Technology",
    slug: "Technology",
    icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line><polyline points="7 8 10 11 7 14"></polyline><line x1="13" y1="14" x2="17" y2="14"></line></svg>`,
    description: "Master clean software engineering, algorithmic design, pragmatic craftsmanship, and modern system architectures.",
    count: 3
  },
  {
    name: "Self-Help",
    slug: "Self-Help",
    icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a5 5 0 0 0-5 5v1a5 5 0 0 0 10 0V7a5 5 0 0 0-5-5z"></path><path d="M19 14v1a7 7 0 0 1-14 0v-1"></path><line x1="12" y1="19" x2="12" y2="22"></line><circle cx="12" cy="7" r="1"></circle></svg>`,
    description: "Actionable frameworks for habit formation, deep concentration, mental clarity, and purposeful living.",
    count: 3
  },
  {
    name: "Business",
    slug: "Business",
    icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>`,
    description: "Timeless economic wisdom, venture creation, entrepreneurial psychology, and market strategies.",
    count: 2
  },
  {
    name: "Science",
    slug: "Science",
    icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>`,
    description: "Deep explorations of cosmic evolution, anthropology, astrophysics, and the frontiers of human discovery.",
    count: 3
  },
  {
    name: "Classics",
    slug: "Classics",
    icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>`,
    description: "Timeless literary monuments, incisive social commentary, and enduring philosophical milestones.",
    count: 3
  }
];

// Helper to look up a book by ID
function getBookById(id) {
  return BOOKS.find(b => b.id === Number(id));
}

// Generate Star Rating HTML
function generateRatingStars(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  let starsHtml = '';

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      starsHtml += `<svg class="star-icon star-full" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
      </svg>`;
    } else if (i === fullStars && hasHalfStar) {
      starsHtml += `<svg class="star-icon star-half" viewBox="0 0 20 20" fill="currentColor">
        <defs>
          <linearGradient id="halfGrad">
            <stop offset="50%" stop-color="currentColor"/>
            <stop offset="50%" stop-color="#D1D5DB" stop-opacity="1"/>
          </linearGradient>
        </defs>
        <path fill="url(#halfGrad)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
      </svg>`;
    } else {
      starsHtml += `<svg class="star-icon star-empty" viewBox="0 0 20 20" fill="#D1D5DB">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
      </svg>`;
    }
  }
  return starsHtml;
}

// Render a single book card component
function renderBookCard(book) {
  const discountPercent = Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100);
  
  return `
    <article class="book-card" data-id="${book.id}" data-category="${book.category}">
      <div class="book-card-cover-wrap">
        <div class="book-cover-container">
          <img src="${book.cover}" alt="Cover of ${book.title}" class="book-cover-img" loading="lazy">
          <div class="book-spine-effect"></div>
        </div>
        ${book.badge ? `<span class="book-badge">${book.badge}</span>` : ''}
        <button type="button" class="quick-view-btn" onclick="openBookModal(${book.id})" aria-label="Quick view ${book.title}">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
          Quick View
        </button>
      </div>

      <div class="book-card-body">
        <div class="book-card-meta">
          <span class="book-category-pill">${book.category}</span>
          <span class="book-discount-tag">-${discountPercent}%</span>
        </div>

        <h3 class="book-title" title="${book.title}">${book.title}</h3>
        <p class="book-author">by ${book.author}</p>

        <div class="book-rating-row">
          <div class="book-stars">
            ${generateRatingStars(book.rating)}
          </div>
          <span class="rating-value">${book.rating.toFixed(1)}</span>
          <span class="rating-count">(${book.reviewsCount.toLocaleString()})</span>
        </div>

        <div class="book-card-footer">
          <div class="book-price-block">
            <span class="book-current-price">$${book.price.toFixed(2)}</span>
            <span class="book-original-price">$${book.originalPrice.toFixed(2)}</span>
          </div>

          <button 
            type="button" 
            class="btn-add-cart" 
            onclick="Cart.add(${book.id}, 1)"
            aria-label="Add ${book.title} to shopping cart">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <span>Add</span>
          </button>
        </div>
      </div>
    </article>
  `;
}

// Render Book Quick View Modal Details
function openBookModal(bookId) {
  const book = getBookById(bookId);
  if (!book) return;

  const modal = document.getElementById('book-quick-modal');
  if (!modal) return;

  const discountPercent = Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100);

  const modalBody = modal.querySelector('.modal-content-body');
  if (modalBody) {
    modalBody.innerHTML = `
      <div class="modal-book-layout">
        <div class="modal-book-cover-col">
          <div class="book-cover-container modal-cover">
            <img src="${book.cover}" alt="Cover of ${book.title}">
            <div class="book-spine-effect"></div>
          </div>
          ${book.badge ? `<div class="modal-badge-tag">${book.badge}</div>` : ''}
        </div>

        <div class="modal-book-info-col">
          <div class="modal-meta-header">
            <span class="book-category-pill">${book.category}</span>
            <span class="stock-status in-stock">
              <span class="stock-dot"></span> In Stock & Ready to Dispatch
            </span>
          </div>

          <h2 class="modal-book-title">${book.title}</h2>
          <p class="modal-book-author">Written by <strong>${book.author}</strong></p>

          <div class="modal-rating-row">
            <div class="book-stars">
              ${generateRatingStars(book.rating)}
            </div>
            <span class="rating-value font-bold">${book.rating.toFixed(1)}</span>
            <span class="rating-count">(${book.reviewsCount.toLocaleString()} verified customer reviews)</span>
          </div>

          <div class="modal-price-row">
            <span class="modal-price">$${book.price.toFixed(2)}</span>
            <span class="modal-original-price">$${book.originalPrice.toFixed(2)}</span>
            <span class="modal-save-pill">Save ${discountPercent}%</span>
          </div>

          <p class="modal-synopsis">${book.description}</p>

          <div class="modal-spec-grid">
            <div class="spec-item">
              <span class="spec-label">Category</span>
              <span class="spec-value">${book.category}</span>
            </div>
            <div class="spec-item">
              <span class="spec-label">Pages</span>
              <span class="spec-value">${book.pages} pages</span>
            </div>
            <div class="spec-item">
              <span class="spec-label">Publication Year</span>
              <span class="spec-value">${book.year}</span>
            </div>
            <div class="spec-item">
              <span class="spec-label">ISBN-13</span>
              <span class="spec-value">${book.isbn}</span>
            </div>
          </div>

          <div class="modal-actions-row">
            <div class="quantity-stepper">
              <button type="button" class="stepper-btn" onclick="changeModalQty(-1)" aria-label="Decrease quantity">-</button>
              <input type="number" id="modal-qty-input" value="1" min="1" max="99" readonly>
              <button type="button" class="stepper-btn" onclick="changeModalQty(1)" aria-label="Increase quantity">+</button>
            </div>

            <button 
              type="button" 
              class="btn-primary modal-add-cart-btn" 
              onclick="addFromModal(${book.id})">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              Add to Shopping Cart
            </button>
          </div>
        </div>
      </div>
    `;
  }

  modal.classList.add('is-active');
  document.body.classList.add('modal-open');
}

function closeBookModal() {
  const modal = document.getElementById('book-quick-modal');
  if (modal) {
    modal.classList.remove('is-active');
    document.body.classList.remove('modal-open');
  }
}

function changeModalQty(delta) {
  const input = document.getElementById('modal-qty-input');
  if (!input) return;
  let val = parseInt(input.value, 10) || 1;
  val = Math.max(1, Math.min(99, val + delta));
  input.value = val;
}

function addFromModal(bookId) {
  const input = document.getElementById('modal-qty-input');
  const qty = input ? parseInt(input.value, 10) || 1 : 1;
  if (window.Cart) {
    window.Cart.add(bookId, qty);
  }
  closeBookModal();
}

/**
 * Filter, Search, and Sort Engine for books.html
 */
const BookCatalog = {
  activeCategory: 'All',
  searchQuery: '',
  activeSort: 'featured',

  init() {
    this.readUrlParams();
    this.setupListeners();
    this.applyFiltersAndRender();
  },

  readUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get('category');
    const search = params.get('search');
    const sort = params.get('sort');

    if (cat) {
      this.activeCategory = cat;
    }
    if (search) {
      this.searchQuery = search;
    }
    if (sort) {
      this.activeSort = sort;
    }

    // Sync input fields with read parameters
    const searchInput = document.getElementById('catalog-search-input');
    if (searchInput && this.searchQuery) {
      searchInput.value = this.searchQuery;
    }

    const categorySelect = document.getElementById('catalog-category-select');
    if (categorySelect) {
      categorySelect.value = this.activeCategory;
    }

    const sortSelect = document.getElementById('catalog-sort-select');
    if (sortSelect) {
      sortSelect.value = this.activeSort;
    }

    this.updateActiveFilterPills();
  },

  setupListeners() {
    const searchInput = document.getElementById('catalog-search-input');
    const clearSearchBtn = document.getElementById('clear-search-btn');
    const categorySelect = document.getElementById('catalog-category-select');
    const sortSelect = document.getElementById('catalog-sort-select');
    const pillsContainer = document.getElementById('category-pills-container');

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.trim();
        if (clearSearchBtn) {
          clearSearchBtn.style.display = this.searchQuery ? 'flex' : 'none';
        }
        this.applyFiltersAndRender();
      });
    }

    if (clearSearchBtn) {
      clearSearchBtn.addEventListener('click', () => {
        if (searchInput) {
          searchInput.value = '';
          searchInput.focus();
        }
        this.searchQuery = '';
        clearSearchBtn.style.display = 'none';
        this.applyFiltersAndRender();
      });
    }

    if (categorySelect) {
      categorySelect.addEventListener('change', (e) => {
        this.activeCategory = e.target.value;
        this.updateActiveFilterPills();
        this.applyFiltersAndRender();
      });
    }

    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.activeSort = e.target.value;
        this.applyFiltersAndRender();
      });
    }

    if (pillsContainer) {
      pillsContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('.category-pill');
        if (!btn) return;
        const selected = btn.getAttribute('data-category');
        if (selected) {
          this.activeCategory = selected;
          if (categorySelect) {
            categorySelect.value = selected;
          }
          this.updateActiveFilterPills();
          this.applyFiltersAndRender();
        }
      });
    }
  },

  updateActiveFilterPills() {
    const pills = document.querySelectorAll('.category-pill');
    pills.forEach(pill => {
      const pillCat = pill.getAttribute('data-category');
      if (pillCat.toLowerCase() === this.activeCategory.toLowerCase()) {
        pill.classList.add('is-active');
      } else {
        pill.classList.remove('is-active');
      }
    });
  },

  applyFiltersAndRender() {
    const grid = document.getElementById('books-grid');
    const resultsCount = document.getElementById('results-count');
    if (!grid) return;

    let filtered = [...BOOKS];

    // Filter by Category
    if (this.activeCategory && this.activeCategory !== 'All') {
      filtered = filtered.filter(b => b.category.toLowerCase() === this.activeCategory.toLowerCase());
    }

    // Filter by Search Query (Title or Author)
    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      filtered = filtered.filter(b => 
        b.title.toLowerCase().includes(q) || 
        b.author.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q)
      );
    }

    // Sort Results
    switch (this.activeSort) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating-desc':
        filtered.sort((a, b) => b.rating - a.rating || b.reviewsCount - a.reviewsCount);
        break;
      case 'title-asc':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'featured':
      default:
        // Priority to featured, then by ID
        filtered.sort((a, b) => (b.featured === true ? 1 : 0) - (a.featured === true ? 1 : 0));
        break;
    }

    // Update Result Counter
    if (resultsCount) {
      if (filtered.length === BOOKS.length) {
        resultsCount.textContent = `Showing all ${filtered.length} books`;
      } else {
        resultsCount.textContent = `Showing ${filtered.length} of ${BOOKS.length} books`;
      }
    }

    // Render Grid or Empty State
    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="empty-results-box">
          <div class="empty-icon-wrap">
            <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              <line x1="8" y1="11" x2="14" y2="11"></line>
            </svg>
          </div>
          <h3>No books found</h3>
          <p>We couldn't find any books matching "<strong>${this.searchQuery || this.activeCategory}</strong>". Try searching with different keywords or clearing your category filters.</p>
          <button type="button" class="btn-primary" onclick="BookCatalog.resetFilters()">
            Clear All Filters
          </button>
        </div>
      `;
    } else {
      grid.innerHTML = filtered.map(renderBookCard).join('');
    }
  },

  resetFilters() {
    this.activeCategory = 'All';
    this.searchQuery = '';
    this.activeSort = 'featured';

    const searchInput = document.getElementById('catalog-search-input');
    const categorySelect = document.getElementById('catalog-category-select');
    const sortSelect = document.getElementById('catalog-sort-select');
    const clearSearchBtn = document.getElementById('clear-search-btn');

    if (searchInput) searchInput.value = '';
    if (clearSearchBtn) clearSearchBtn.style.display = 'none';
    if (categorySelect) categorySelect.value = 'All';
    if (sortSelect) sortSelect.value = 'featured';

    this.updateActiveFilterPills();
    this.applyFiltersAndRender();
  }
};

// Expose globally
window.BOOKS = BOOKS;
window.CATEGORIES_DATA = CATEGORIES_DATA;
window.getBookById = getBookById;
window.renderBookCard = renderBookCard;
window.openBookModal = openBookModal;
window.closeBookModal = closeBookModal;
window.changeModalQty = changeModalQty;
window.addFromModal = addFromModal;
window.BookCatalog = BookCatalog;
