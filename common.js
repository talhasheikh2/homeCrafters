// Common functionality across all pages
class Common {
    constructor() {
        this.cartCountElement = document.querySelector('.cart-count');
        this.init();
    }
    
    init() {
        this.updateCartCount();
        this.setupMobileMenu();
        this.setupCartIcon();
        this.listenForCartUpdates();
    }
    
    updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        if (this.cartCountElement) {
            this.cartCountElement.textContent = totalItems;
        }
    }
    
    setupMobileMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const menu = document.querySelector('.menu');
        
        if (menuToggle && menu) {
            menuToggle.addEventListener('click', () => {
                menu.classList.toggle('active');
            });
        }
    }
    
    setupCartIcon() {
        const cartIcon = document.querySelector('.cart');
        if (cartIcon) {
            cartIcon.addEventListener('click', (e) => {
                // Prevent redirect if already on cart page
                if (!window.location.pathname.includes('cart.html')) {
                    window.location.href = './pages/cart.html';
                }
            });
        }
    }
    
    listenForCartUpdates() {
        window.addEventListener('cartUpdated', () => {
            this.updateCartCount();
        });
    }
    
    // Add to cart function to be used on product pages
    addToCart(product) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Check if product already exists in cart
        const existingItem = cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Update cart count
        this.updateCartCount();
        
        // Dispatch event to notify other components
        window.dispatchEvent(new Event('cartUpdated'));
        
        // Animate the cart icon
        const cartElement = document.querySelector('.cart');
        if (cartElement) {
            cartElement.classList.add('animate-cart');
            setTimeout(() => {
                cartElement.classList.remove('animate-cart');
            }, 500);
        }
    }
}

// Initialize common functionality
document.addEventListener('DOMContentLoaded', () => {
    const common = new Common();
    
    // Make addToCart available globally if needed
    window.addToCart = (product) => common.addToCart(product);
});