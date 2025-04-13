// Cart functionality
class Cart {
    constructor() {
        this.cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        this.cartCountElement = document.querySelector('.cart-count');
        this.cartItemsList = document.querySelector('.cart-items-list');
        this.subtotalElement = document.querySelector('.subtotal');
        this.taxElement = document.querySelector('.tax');
        this.totalElement = document.querySelector('.total-amount');
        this.shippingElement = document.querySelector('.shipping');
        
        this.init();
    }
    
    init() {
        this.updateCartCount();
        this.renderCartItems();
        this.calculateTotals();
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // Continue shopping button
        const continueShoppingBtn = document.querySelector('.continue-shopping');
        if (continueShoppingBtn) {
            continueShoppingBtn.addEventListener('click', () => {
                window.location.href = '../index.html';
            });
        }
        
        // Checkout button
        const checkoutBtn = document.querySelector('.checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => {
                if (this.cartItems.length > 0) {
                    alert('Proceeding to checkout!');
                    // In a real app, you would redirect to checkout page
                } else {
                    alert('Your cart is empty!');
                }
            });
        }
    }
    
    updateCartCount() {
        const totalItems = this.cartItems.reduce((total, item) => total + item.quantity, 0);
        this.cartCountElement.textContent = totalItems;
    }
    
    renderCartItems() {
        if (this.cartItems.length === 0) {
            this.cartItemsList.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <h2>Your cart is empty</h2>
                    <p>Looks like you haven't added anything to your cart yet</p>
                    <button class="continue-shopping">Continue Shopping</button>
                </div>
            `;
            
            // Add event listener to the dynamically created button
            const continueShoppingBtn = document.querySelector('.empty-cart .continue-shopping');
            if (continueShoppingBtn) {
                continueShoppingBtn.addEventListener('click', () => {
                    window.location.href = '../index.html';
                });
            }
            
            return;
        }
        
        this.cartItemsList.innerHTML = '';
        
        this.cartItems.forEach(item => {
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');
            cartItemElement.dataset.id = item.id;
            
            cartItemElement.innerHTML = `
                <div class="cart-item-details">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                    <div>
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-category">${item.category}</div>
                    </div>
                </div>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                <div class="cart-item-quantity">
                    <div class="quantity-control">
                        <button class="quantity-btn minus" data-id="${item.id}">-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-id="${item.id}">
                        <button class="quantity-btn plus" data-id="${item.id}">+</button>
                    </div>
                </div>
                <div class="cart-item-total">$${(item.price * item.quantity).toFixed(2)}</div>
                <div class="cart-item-remove">
                    <i class="fas fa-trash remove-item" data-id="${item.id}"></i>
                </div>
            `;
            
            this.cartItemsList.appendChild(cartItemElement);
        });
        
        // Add event listeners to quantity controls
        document.querySelectorAll('.quantity-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = e.target.dataset.id;
                const isPlus = e.target.classList.contains('plus');
                this.updateQuantity(id, isPlus ? 1 : -1);
            });
        });
        
        // Add event listeners to quantity inputs
        document.querySelectorAll('.quantity-input').forEach(input => {
            input.addEventListener('change', (e) => {
                const id = e.target.dataset.id;
                const newQuantity = parseInt(e.target.value);
                if (newQuantity > 0) {
                    this.setQuantity(id, newQuantity);
                } else {
                    e.target.value = 1;
                }
            });
        });
        
        // Add event listeners to remove buttons
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = e.target.dataset.id;
                this.removeItem(id);
            });
        });
    }
    
    updateQuantity(id, change) {
        const itemIndex = this.cartItems.findIndex(item => item.id === id);
        if (itemIndex !== -1) {
            this.cartItems[itemIndex].quantity += change;
            
            // Ensure quantity doesn't go below 1
            if (this.cartItems[itemIndex].quantity < 1) {
                this.cartItems[itemIndex].quantity = 1;
            }
            
            this.saveCart();
            this.renderCartItems();
            this.calculateTotals();
        }
    }
    
    setQuantity(id, quantity) {
        const itemIndex = this.cartItems.findIndex(item => item.id === id);
        if (itemIndex !== -1) {
            this.cartItems[itemIndex].quantity = quantity;
            this.saveCart();
            this.renderCartItems();
            this.calculateTotals();
        }
    }
    
    removeItem(id) {
        this.cartItems = this.cartItems.filter(item => item.id !== id);
        this.saveCart();
        this.updateCartCount();
        this.renderCartItems();
        this.calculateTotals();
        
        // Animate removal
        const cartElement = document.querySelector('.cart');
        cartElement.classList.add('animate-cart');
        setTimeout(() => {
            cartElement.classList.remove('animate-cart');
        }, 500);
    }
    
    calculateTotals() {
        const subtotal = this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
        const shipping = subtotal > 0 ? 5.99 : 0; // Free shipping for orders over $50 could be added here
        const tax = subtotal * 0.1; // 10% tax for example
        const total = subtotal + shipping + tax;
        
        this.subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        this.shippingElement.textContent = `$${shipping.toFixed(2)}`;
        this.taxElement.textContent = `$${tax.toFixed(2)}`;
        this.totalElement.textContent = `$${total.toFixed(2)}`;
    }
    
    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cartItems));
        this.updateCartCount();
        
        // Dispatch event to notify other pages about cart changes
        window.dispatchEvent(new Event('cartUpdated'));
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const cart = new Cart();
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');
    
    if (menuToggle && menu) {
        menuToggle.addEventListener('click', () => {
            menu.classList.toggle('active');
        });
    }
    
    // Cart icon click
    const cartIcon = document.querySelector('.cart');
    if (cartIcon) {
        cartIcon.addEventListener('click', (e) => {
            // Prevent redirect if already on cart page
            if (!window.location.pathname.includes('cart.html')) {
                window.location.href = './pages/cart.html';
            }
        });
    }
});