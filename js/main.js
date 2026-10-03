/**
 * BookNest - Main Application Script
 * Global UI logic: Dark/Light Mode, Mobile Navigation, Toast Notifications,
 * Newsletter Subscription, FAQ Accordion, and Page Initializations.
 */

// Global Toast Notification System
function showToast(message, type = 'success', title = '') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    container.setAttribute('aria-live', 'polite');
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast-item toast-${type}`;

  // Select appropriate icon
  let iconSvg = '';
  switch (type) {
    case 'success':
      iconSvg = `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
      break;
    case 'info':
      iconSvg = `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;
      break;
    case 'warning':
      iconSvg = `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`;
      break;
    case 'error':
      iconSvg = `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`;
      break;
  }

  toast.innerHTML = `
    <div class="toast-icon">${iconSvg}</div>
    <div class="toast-body">
      ${title ? `<div class="toast-title">${title}</div>` : ''}
      <div class="toast-message">${message}</div>
    </div>
    <button type="button" class="toast-close" aria-label="Close notification">&times;</button>
  `;

  container.appendChild(toast);

  // Trigger entrance transition
  requestAnimationFrame(() => {
    toast.classList.add('toast-visible');
  });

  // Close handler
  const removeToast = () => {
    toast.classList.remove('toast-visible');
    toast.classList.add('toast-hiding');
    setTimeout(() => {
      if (toast.parentElement) toast.parentElement.removeChild(toast);
    }, 300);
  };

  toast.querySelector('.toast-close').addEventListener('click', removeToast);

  // Auto-dismiss after 3.5 seconds
  setTimeout(removeToast, 3500);
}

// Dark / Light Theme Manager
const ThemeManager = {
  STORAGE_KEY: 'booknest_theme',

  init() {
    const savedTheme = localStorage.getItem(this.STORAGE_KEY) || 'light';
    this.applyTheme(savedTheme);

    const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
    toggleBtns.forEach(btn => {
      btn.addEventListener('click', () => this.toggle());
    });
  },

  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(this.STORAGE_KEY, theme);

    // Update toggle icons state
    const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
    toggleBtns.forEach(btn => {
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
      const sunIcon = btn.querySelector('.icon-sun');
      const moonIcon = btn.querySelector('.icon-moon');
      if (sunIcon && moonIcon) {
        if (theme === 'dark') {
          sunIcon.style.display = 'block';
          moonIcon.style.display = 'none';
        } else {
          sunIcon.style.display = 'none';
          moonIcon.style.display = 'block';
        }
      }
    });
  },

  toggle() {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    this.applyTheme(next);
    showToast(`Switched to ${next} mode.`, 'info', 'Theme Changed');
  }
};

// Mobile Navigation Drawer Manager
const MobileNav = {
  init() {
    const toggleBtn = document.getElementById('mobile-nav-toggle');
    const drawer = document.getElementById('mobile-nav-drawer');
    const overlay = document.getElementById('mobile-nav-overlay');
    const closeBtn = document.getElementById('mobile-nav-close');

    if (!toggleBtn || !drawer) return;

    const openMenu = () => {
      drawer.classList.add('is-open');
      if (overlay) overlay.classList.add('is-visible');
      toggleBtn.setAttribute('aria-expanded', 'true');
      document.body.classList.add('drawer-open');
    };

    const closeMenu = () => {
      drawer.classList.remove('is-open');
      if (overlay) overlay.classList.remove('is-visible');
      toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('drawer-open');
    };

    toggleBtn.addEventListener('click', () => {
      const isOpen = drawer.classList.contains('is-open');
      if (isOpen) closeMenu();
      else openMenu();
    });

    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    if (overlay) overlay.addEventListener('click', closeMenu);

    // Close when clicking mobile nav links
    const links = drawer.querySelectorAll('.mobile-nav-link');
    links.forEach(link => link.addEventListener('click', closeMenu));
  }
};

// Newsletter Form Validation and Simulation
function initNewsletter() {
  const forms = document.querySelectorAll('.newsletter-form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = form.querySelector('input[type="email"]');
      if (!emailInput) return;

      const email = emailInput.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email || !emailRegex.test(email)) {
        showToast('Please provide a valid email address.', 'error', 'Invalid Email');
        emailInput.focus();
        return;
      }

      showToast(`Thanks! You're subscribed to BookNest updates with ${email}.`, 'success', 'Subscribed!');
      emailInput.value = '';
    });
  });
}

// Active Nav Link Highlighter
function highlightActiveNav() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// FAQ Accordion on about.html
function initFaqAccordion() {
  const items = document.querySelectorAll('.faq-item');
  if (items.length === 0) return;

  items.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-active');

      // Optional: Close other FAQs for a clean accordion effect
      items.forEach(other => {
        if (other !== item) {
          other.classList.remove('is-active');
          const otherBtn = other.querySelector('.faq-question');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        }
      });

      if (isOpen) {
        item.classList.remove('is-active');
        questionBtn.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('is-active');
        questionBtn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

// Render Featured Books on index.html
function initHomePage() {
  const featuredGrid = document.getElementById('featured-books-grid');
  if (featuredGrid && window.BOOKS) {
    const featured = window.BOOKS.filter(b => b.featured).slice(0, 6);
    featuredGrid.innerHTML = featured.map(renderBookCard).join('');
  }

  const categoriesGrid = document.getElementById('home-categories-grid');
  if (categoriesGrid && window.CATEGORIES_DATA) {
    categoriesGrid.innerHTML = window.CATEGORIES_DATA.map(cat => `
      <a href="books.html?category=${encodeURIComponent(cat.slug)}" class="home-cat-card">
        <div class="home-cat-icon">${cat.icon}</div>
        <div class="home-cat-info">
          <h4 class="home-cat-name">${cat.name}</h4>
          <span class="home-cat-count">${cat.count} curated titles</span>
        </div>
        <div class="home-cat-arrow">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </div>
      </a>
    `).join('');
  }
}

// Render Category Cards on categories.html
function initCategoriesPage() {
  const container = document.getElementById('categories-full-grid');
  if (!container || !window.CATEGORIES_DATA) return;

  container.innerHTML = window.CATEGORIES_DATA.map(cat => {
    // Find sample books in this category
    const catBooks = (window.BOOKS || []).filter(b => b.category.toLowerCase() === cat.slug.toLowerCase());
    const sampleCovers = catBooks.slice(0, 3);

    return `
      <div class="category-showcase-card">
        <div class="cat-card-header">
          <div class="cat-card-icon-pill">${cat.icon}</div>
          <span class="cat-card-badge">${catBooks.length} Books</span>
        </div>

        <h3 class="cat-card-title">${cat.name}</h3>
        <p class="cat-card-desc">${cat.description}</p>

        <div class="cat-card-preview-covers">
          ${sampleCovers.map(b => `
            <img src="${b.cover}" alt="Cover of ${b.title}" class="cat-mini-cover" title="${b.title} by ${b.author}">
          `).join('')}
        </div>

        <div class="cat-card-footer">
          <a href="books.html?category=${encodeURIComponent(cat.slug)}" class="btn-explore-cat">
            <span>Explore ${cat.name}</span>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>
      </div>
    `;
  }).join('');
}

// Global Modal Dismissal on ESC key or backdrop
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (typeof closeBookModal === 'function') closeBookModal();
    if (window.Cart && typeof Cart.closeCheckoutModal === 'function') Cart.closeCheckoutModal();
    const drawer = document.getElementById('mobile-nav-drawer');
    if (drawer && drawer.classList.contains('is-open')) {
      const toggle = document.getElementById('mobile-nav-toggle');
      if (toggle) toggle.click();
    }
  }
});

// App Initialization
document.addEventListener('DOMContentLoaded', () => {
  ThemeManager.init();
  MobileNav.init();
  initNewsletter();
  highlightActiveNav();
  initFaqAccordion();
  initHomePage();
  initCategoriesPage();

  // If on books.html, initialize catalog engine
  if (document.getElementById('books-grid') && window.BookCatalog) {
    window.BookCatalog.init();
  }
});

// Expose globally
window.showToast = showToast;
window.ThemeManager = ThemeManager;
