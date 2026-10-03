/**
 * BookNest - Cart Management Engine
 * Handles persistent shopping cart, item calculations, promo codes, and simulated checkout.
 */

const Cart = {
  STORAGE_KEY: 'booknest_cart',
  PROMO_KEY: 'booknest_promo',
  FREE_SHIPPING_THRESHOLD: 35.00,
  STANDARD_SHIPPING_FEE: 4.99,

  // Retrieve current cart from localStorage
  getItems() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Error reading cart from localStorage', e);
      return [];
    }
  },

  // Save cart to localStorage and broadcast change
  saveItems(items) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Error saving cart to localStorage', e);
    }
    this.updateGlobalBadge();
    window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { items } }));
  },

  // Add book to cart
  add(bookId, quantity = 1) {
    const book = typeof getBookById === 'function' ? getBookById(bookId) : (window.BOOKS || []).find(b => b.id === Number(bookId));
    if (!book) {
      if (typeof showToast === 'function') {
        showToast('Book not found', 'error', 'Error');
      }
      return;
    }

    const items = this.getItems();
    const existingIndex = items.findIndex(item => item.id === Number(bookId));

    if (existingIndex > -1) {
      items[existingIndex].quantity += Number(quantity);
      if (items[existingIndex].quantity > 99) {
        items[existingIndex].quantity = 99;
      }
    } else {
      items.push({
        id: book.id,
        title: book.title,
        author: book.author,
        price: book.price,
        cover: book.cover,
        category: book.category,
        quantity: Math.max(1, Math.min(99, Number(quantity)))
      });
    }

    this.saveItems(items);

    if (typeof showToast === 'function') {
      showToast(`Added "${book.title}" to your cart.`, 'success', 'Added to Cart');
    }
  },

  // Remove book from cart
  remove(bookId) {
    let items = this.getItems();
    const itemToRemove = items.find(i => i.id === Number(bookId));
    items = items.filter(i => i.id !== Number(bookId));
    this.saveItems(items);

    if (typeof showToast === 'function') {
      const title = itemToRemove ? itemToRemove.title : 'Item';
      showToast(`Removed "${title}" from your cart.`, 'info', 'Cart Updated');
    }

    if (this.isCartPage()) {
      this.renderCartPage();
    }
  },

  // Update item quantity
  updateQty(bookId, newQty) {
    const qty = parseInt(newQty, 10);
    let items = this.getItems();
    const item = items.find(i => i.id === Number(bookId));

    if (!item) return;

    if (qty <= 0) {
      this.remove(bookId);
      return;
    }

    item.quantity = Math.min(99, qty);
    this.saveItems(items);

    if (this.isCartPage()) {
      this.renderCartPage();
    }
  },

  // Increment item quantity
  incrementQty(bookId) {
    const items = this.getItems();
    const item = items.find(i => i.id === Number(bookId));
    if (item && item.quantity < 99) {
      this.updateQty(bookId, item.quantity + 1);
    }
  },

  // Decrement item quantity
  decrementQty(bookId) {
    const items = this.getItems();
    const item = items.find(i => i.id === Number(bookId));
    if (item) {
      this.updateQty(bookId, item.quantity - 1);
    }
  },

  // Clear entire cart
  clear() {
    this.saveItems([]);
    sessionStorage.removeItem(this.PROMO_KEY);
    if (this.isCartPage()) {
      this.renderCartPage();
    }
  },

  // Total count of distinct books / total items in cart
  getTotalCount() {
    const items = this.getItems();
    return items.reduce((sum, item) => sum + (item.quantity || 1), 0);
  },

  // Calculated totals: subtotal, shipping, discount, total
  getTotals() {
    const items = this.getItems();
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Check promo code from sessionStorage
    const promo = this.getAppliedPromo();
    let discount = 0;
    if (promo && promo.percent) {
      discount = (subtotal * promo.percent) / 100;
    }

    // Shipping logic: Free over $35 or if promo gives free shipping
    let shipping = 0;
    if (subtotal > 0) {
      if (promo && promo.freeShipping) {
        shipping = 0;
      } else {
        shipping = subtotal >= this.FREE_SHIPPING_THRESHOLD ? 0 : this.STANDARD_SHIPPING_FEE;
      }
    }

    const estimatedTax = subtotal > 0 ? (subtotal - discount) * 0.05 : 0; // 5% simulated tax
    const total = Math.max(0, subtotal - discount + shipping + estimatedTax);

    return {
      subtotal,
      discount,
      shipping,
      estimatedTax,
      total,
      freeShippingEligible: subtotal >= this.FREE_SHIPPING_THRESHOLD,
      amountNeededForFreeShipping: Math.max(0, this.FREE_SHIPPING_THRESHOLD - subtotal)
    };
  },

  // Promo code helper
  getAppliedPromo() {
    try {
      const data = sessionStorage.getItem(this.PROMO_KEY);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  },

  applyPromo(code) {
    const cleanCode = (code || '').trim().toUpperCase();
    if (!cleanCode) {
      if (typeof showToast === 'function') showToast('Please enter a promo code.', 'warning');
      return false;
    }

    if (cleanCode === 'BOOKNEST10') {
      const promo = { code: 'BOOKNEST10', percent: 10, description: '10% discount applied!' };
      sessionStorage.setItem(this.PROMO_KEY, JSON.stringify(promo));
      if (typeof showToast === 'function') showToast('Promo code applied: 10% off your order!', 'success', 'Code Applied');
      if (this.isCartPage()) this.renderCartPage();
      return true;
    } else if (cleanCode === 'FREESHIP') {
      const promo = { code: 'FREESHIP', freeShipping: true, description: 'Free Standard Shipping applied!' };
      sessionStorage.setItem(this.PROMO_KEY, JSON.stringify(promo));
      if (typeof showToast === 'function') showToast('Promo code applied: Free Shipping unlocked!', 'success', 'Code Applied');
      if (this.isCartPage()) this.renderCartPage();
      return true;
    } else {
      if (typeof showToast === 'function') showToast('Invalid promo code. Try "BOOKNEST10" or "FREESHIP".', 'error', 'Invalid Code');
      return false;
    }
  },

  removePromo() {
    sessionStorage.removeItem(this.PROMO_KEY);
    if (typeof showToast === 'function') showToast('Promo code removed.', 'info');
    if (this.isCartPage()) this.renderCartPage();
  },

  // Updates badge counters in navbar across the entire page
  updateGlobalBadge() {
    const count = this.getTotalCount();
    const badges = document.querySelectorAll('.cart-badge-count');
    badges.forEach(badge => {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'inline-flex' : 'none';
      
      // Trigger a gentle pop animation
      badge.classList.remove('badge-pop');
      void badge.offsetWidth; // trigger reflow
      badge.classList.add('badge-pop');
    });
  },

  isCartPage() {
    return !!document.getElementById('cart-items-container');
  },

  // Render the shopping cart page
  renderCartPage() {
    const items = this.getItems();
    const container = document.getElementById('cart-items-container');
    const summaryCol = document.getElementById('cart-summary-col');
    const emptyState = document.getElementById('cart-empty-state');
    const fullCartWrap = document.getElementById('cart-layout-wrapper');

    if (!container || !summaryCol || !emptyState || !fullCartWrap) return;

    if (items.length === 0) {
      emptyState.style.display = 'block';
      fullCartWrap.style.display = 'none';
      return;
    }

    emptyState.style.display = 'none';
    fullCartWrap.style.display = 'grid';

    // Render items list
    container.innerHTML = `
      <div class="cart-items-header">
        <h2 class="cart-title">Your Bag (${this.getTotalCount()} ${this.getTotalCount() === 1 ? 'item' : 'items'})</h2>
        <button type="button" class="btn-clear-cart" onclick="Cart.confirmClearCart()">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
          Clear Cart
        </button>
      </div>

      <div class="cart-items-list">
        ${items.map(item => `
          <div class="cart-item-row" data-id="${item.id}">
            <div class="cart-item-cover-col">
              <a href="books.html?search=${encodeURIComponent(item.title)}">
                <img src="${item.cover}" alt="Cover of ${item.title}" class="cart-item-img">
              </a>
            </div>

            <div class="cart-item-details-col">
              <div class="cart-item-meta">
                <span class="cart-item-category">${item.category || 'Book'}</span>
                <span class="cart-item-unit-price">$${Number(item.price).toFixed(2)} each</span>
              </div>
              <h3 class="cart-item-title">
                <a href="books.html?search=${encodeURIComponent(item.title)}">${item.title}</a>
              </h3>
              <p class="cart-item-author">by ${item.author}</p>

              <div class="cart-item-actions-row">
                <div class="quantity-stepper cart-stepper">
                  <button 
                    type="button" 
                    class="stepper-btn" 
                    onclick="Cart.decrementQty(${item.id})"
                    aria-label="Decrease quantity of ${item.title}">
                    -
                  </button>
                  <span class="stepper-count">${item.quantity}</span>
                  <button 
                    type="button" 
                    class="stepper-btn" 
                    onclick="Cart.incrementQty(${item.id})"
                    aria-label="Increase quantity of ${item.title}">
                    +
                  </button>
                </div>

                <div class="cart-item-line-total">
                  <span class="label">Total:</span>
                  <span class="price">$${(item.price * item.quantity).toFixed(2)}</span>
                </div>

                <button 
                  type="button" 
                  class="btn-remove-item" 
                  onclick="Cart.remove(${item.id})"
                  aria-label="Remove ${item.title} from cart">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                  </svg>
                  <span>Remove</span>
                </button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    // Calculate totals
    const totals = this.getTotals();
    const promo = this.getAppliedPromo();
    const percentToFree = Math.min(100, Math.round((totals.subtotal / this.FREE_SHIPPING_THRESHOLD) * 100));

    // Render Order Summary Card
    summaryCol.innerHTML = `
      <div class="order-summary-card">
        <h3 class="summary-card-title">Order Summary</h3>

        <!-- Free Delivery Progress Bar -->
        <div class="shipping-threshold-box">
          ${totals.freeShippingEligible || (promo && promo.freeShipping) ? `
            <div class="free-shipping-unlocked">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>You've unlocked <strong>Free Standard Delivery!</strong></span>
            </div>
          ` : `
            <div class="free-shipping-progress-text">
              Add <strong>$${totals.amountNeededForFreeShipping.toFixed(2)}</strong> more to get <strong>FREE Delivery</strong>
            </div>
            <div class="progress-bar-track">
              <div class="progress-bar-fill" style="width: ${percentToFree}%;"></div>
            </div>
          `}
        </div>

        <!-- Breakdown List -->
        <div class="summary-breakdown-list">
          <div class="summary-row">
            <span class="row-label">Subtotal</span>
            <span class="row-value font-medium">$${totals.subtotal.toFixed(2)}</span>
          </div>

          ${totals.discount > 0 ? `
            <div class="summary-row discount-row">
              <span class="row-label">Discount (${promo.code})</span>
              <span class="row-value discount-val">-$${totals.discount.toFixed(2)}</span>
            </div>
          ` : ''}

          <div class="summary-row">
            <span class="row-label">Estimated Delivery</span>
            <span class="row-value">
              ${totals.shipping === 0 ? '<span class="free-tag">FREE</span>' : `$${totals.shipping.toFixed(2)}`}
            </span>
          </div>

          <div class="summary-row">
            <span class="row-label">Estimated Tax (5%)</span>
            <span class="row-value">$${totals.estimatedTax.toFixed(2)}</span>
          </div>

          <div class="summary-divider"></div>

          <div class="summary-row total-row">
            <span class="total-label">Estimated Total</span>
            <span class="total-amount">$${totals.total.toFixed(2)}</span>
          </div>
        </div>

        <!-- Promo Code Section -->
        <div class="promo-code-container">
          ${promo ? `
            <div class="promo-applied-badge">
              <div class="promo-applied-info">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                  <line x1="7" y1="7" x2="7.01" y2="7"></line>
                </svg>
                <span>Coupon: <strong>${promo.code}</strong> (${promo.description})</span>
              </div>
              <button type="button" class="btn-remove-promo" onclick="Cart.removePromo()" title="Remove promo code">&times;</button>
            </div>
          ` : `
            <form class="promo-form" onsubmit="event.preventDefault(); Cart.applyPromo(this.promoInput.value)">
              <div class="promo-input-group">
                <input 
                  type="text" 
                  name="promoInput" 
                  placeholder="Promo code (e.g. BOOKNEST10)" 
                  class="promo-input" 
                  autocomplete="off"
                >
                <button type="submit" class="btn-apply-promo">Apply</button>
              </div>
              <p class="promo-hint">Try code <code>BOOKNEST10</code> for 10% off or <code>FREESHIP</code></p>
            </form>
          `}
        </div>

        <!-- Checkout Simulation Button -->
        <button 
          type="button" 
          class="btn-checkout-primary" 
          onclick="Cart.openCheckoutModal()">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
            <line x1="1" y1="10" x2="23" y2="10"></line>
          </svg>
          Proceed to Checkout
        </button>

        <!-- Trust Badges -->
        <div class="cart-trust-badges">
          <div class="trust-badge-item">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
            <span>Frontend-Only Simulated Checkout</span>
          </div>
          <div class="trust-badge-item">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 14 14"></polyline>
            </svg>
            <span>Instant Dispatch Simulation</span>
          </div>
        </div>
      </div>
    `;
  },

  confirmClearCart() {
    if (confirm('Are you sure you want to empty your shopping cart?')) {
      this.clear();
      if (typeof showToast === 'function') {
        showToast('Your cart has been emptied.', 'info', 'Cart Cleared');
      }
    }
  },

  // Open Simulated Checkout Modal
  openCheckoutModal() {
    const items = this.getItems();
    if (items.length === 0) {
      if (typeof showToast === 'function') showToast('Your cart is empty.', 'warning');
      return;
    }

    const modal = document.getElementById('checkout-modal');
    if (!modal) return;

    const totals = this.getTotals();
    const modalTotalEl = modal.querySelector('#checkout-modal-total');
    if (modalTotalEl) {
      modalTotalEl.textContent = `$${totals.total.toFixed(2)}`;
    }

    const itemsSummaryList = modal.querySelector('#checkout-modal-items-list');
    if (itemsSummaryList) {
      itemsSummaryList.innerHTML = items.map(item => `
        <div class="modal-summary-line">
          <span class="line-title">${item.title} × ${item.quantity}</span>
          <span class="line-price">$${(item.price * item.quantity).toFixed(2)}</span>
        </div>
      `).join('');
    }

    modal.classList.add('is-active');
    document.body.classList.add('modal-open');
  },

  closeCheckoutModal() {
    const modal = document.getElementById('checkout-modal');
    if (modal) {
      modal.classList.remove('is-active');
      document.body.classList.remove('modal-open');
    }
  },

  // Submit simulated checkout order
  submitSimulatedOrder(event) {
    if (event) event.preventDefault();

    const form = document.getElementById('checkout-form');
    if (form && !form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const name = form ? form.customerName.value.trim() : 'Valued Customer';
    const email = form ? form.customerEmail.value.trim() : 'reader@example.com';
    const address = form ? form.shippingAddress.value.trim() : '123 Book Lane';
    const totals = this.getTotals();
    const items = [...this.getItems()];

    // Generate simulated order confirmation
    const orderNumber = 'BN-' + Math.floor(100000 + Math.random() * 900000);
    const orderDate = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });

    const modal = document.getElementById('checkout-modal');
    if (!modal) return;

    const modalBody = modal.querySelector('.checkout-modal-content');
    if (modalBody) {
      modalBody.innerHTML = `
        <div class="order-success-screen">
          <div class="success-icon-wrap">
            <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#183B2B" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>

          <h2 class="success-title">Order Placed Successfully!</h2>
          <p class="success-subtitle">Thank you, <strong>${name}</strong>! Your simulated order has been registered in your browser.</p>

          <div class="receipt-card">
            <div class="receipt-row">
              <span class="receipt-label">Order Number:</span>
              <strong class="receipt-val">${orderNumber}</strong>
            </div>
            <div class="receipt-row">
              <span class="receipt-label">Date:</span>
              <span class="receipt-val">${orderDate}</span>
            </div>
            <div class="receipt-row">
              <span class="receipt-label">Delivery To:</span>
              <span class="receipt-val">${address}</span>
            </div>
            <div class="receipt-row">
              <span class="receipt-label">Confirmation Email:</span>
              <span class="receipt-val">${email}</span>
            </div>
            <div class="receipt-row">
              <span class="receipt-label">Total Amount:</span>
              <strong class="receipt-val receipt-total">$${totals.total.toFixed(2)}</strong>
            </div>

            <div class="receipt-items-list">
              <h4 class="receipt-items-heading">Purchased Titles (${items.length}):</h4>
              <ul>
                ${items.map(i => `<li>${i.title} (Qty: ${i.quantity}) — $${(i.price * i.quantity).toFixed(2)}</li>`).join('')}
              </ul>
            </div>
          </div>

          <div class="academic-note-box">
            <strong>College Project Note:</strong> This was a simulated frontend order checkout. No real payment was processed, and no real delivery will take place.
          </div>

          <div class="success-actions">
            <button type="button" class="btn-primary" onclick="Cart.finishCheckoutAndRedirect()">
              Continue Browsing Books
            </button>
          </div>
        </div>
      `;
    }

    // Clear cart data
    this.clear();

    if (typeof showToast === 'function') {
      showToast(`Simulated Order ${orderNumber} completed successfully!`, 'success', 'Order Confirmed');
    }
  },

  finishCheckoutAndRedirect() {
    this.closeCheckoutModal();
    window.location.href = 'books.html';
  }
};

// Initialize Cart Badge on load
document.addEventListener('DOMContentLoaded', () => {
  Cart.updateGlobalBadge();
  if (Cart.isCartPage()) {
    Cart.renderCartPage();
  }
});

// Sync cart across browser tabs
window.addEventListener('storage', (e) => {
  if (e.key === Cart.STORAGE_KEY) {
    Cart.updateGlobalBadge();
    if (Cart.isCartPage()) {
      Cart.renderCartPage();
    }
  }
});

// Expose globally
window.Cart = Cart;
