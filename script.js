const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');
let cartCount = 0;

menuToggle.addEventListener('click', () => {
  menu.classList.toggle('active');
});

// Cart functionality
const cartElement = document.querySelector('.cart');
const cartCountElement = document.querySelector('.cart-count');

cartElement.addEventListener('click', () => {
  // You can add cart dropdown functionality here
  console.log('Cart clicked');
});

// Enhanced product rendering with animations
async function fetchProducts() {
  try {
    const pathSegments = window.location.pathname.split("/"); 
    const fileName = pathSegments[pathSegments.length - 1];
    const hardwareValue = fileName.split(".")[0];

    const response = await fetch('http://localhost:8000/api/products');
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    const data = await response.json();

    if (data && data.data) {
      const hardwareProducts = data?.data?.filter((x) => x.category === "hardware");
      const electronicProducts = data?.data?.filter((x) => x.category === "electronic");
      const sanitryProducts = data?.data?.filter((x) => x.category === "sanitry");
      
      renderProducts(hardwareProducts);
      renderElectricProducts(electronicProducts); 
      renderSanitryProducts(sanitryProducts);
    }
  } catch (error) {
    console.error('Error fetching products:', error.message);
    // Fallback to local data if API fails
    // renderProducts(hardwareProducts);
  }
}

// Enhanced product card rendering with animations
function renderProducts(products) {
  const main = document.getElementById("hardware");
  if (!main) return;

  main.innerHTML = "";

  products.forEach((product, index) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");
    
    // Add animation delay for staggered entrance
    productCard.style.animationDelay = `${index * 0.1}s`;
    
    // Generate random badge (sale, new, etc)
    const badges = ["Sale", "New", "Popular", "Limited"];
    const randomBadge = badges[Math.floor(Math.random() * badges.length)];
    
    // Generate random rating (3-5 stars)
    const rating = Math.floor(Math.random() * 3) + 3;
    
    productCard.innerHTML = `
      <div class="product-image">
        <span class="product-badge">${randomBadge}</span>
        <img src="${product.image}" alt="${product.name}" />
      </div>
      <div class="product-info">
        <h3 class="product-title">${product.name}</h3>
        <p class="product-description">${product.description}</p>
        <div class="product-rating">
          ${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}
        </div>
        <div class="product-price">
          <div>
            <span class="price">$${product.price}</span>
            ${product.oldPrice ? `<span class="discount">$${product.oldPrice}</span>` : ''}
          </div>
          <button class="add-to-cart" data-id="${product.id}">
            <i class="fas fa-cart-plus"></i> Add
          </button>
        </div>
      </div>
    `;

    main.appendChild(productCard);
  });

  // Add event listeners to all "Add to Cart" buttons
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
      const productId = this.getAttribute('data-id');
      addToCart(productId);
    });
  });
}

// Cart functionality
function addToCart(productId) {
  cartCount++;
  cartCountElement.textContent = cartCount;
  
  // Animate the cart icon
  cartElement.classList.add('animate-cart');
  setTimeout(() => {
    cartElement.classList.remove('animate-cart');
  }, 500);
  
  console.log(`Product ${productId} added to cart`);
}

// Add animation for other product pages if needed
function renderElectricProducts(products) {
  const main = document.getElementById("electric");
  if (!main) return;

  main.innerHTML = "";

  products.forEach((product, index) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");
    productCard.style.animationDelay = `${index * 0.1}s`;
    
    productCard.innerHTML = `
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}" />
      </div>
      <div class="product-info">
        <h3 class="product-title">${product.name}</h3>
        <p class="product-description">${product.description}</p>
        <div class="product-price">
          <span class="price">$${product.price}</span>
          <button class="add-to-cart" data-id="${product.id}">
            <i class="fas fa-cart-plus"></i> Add
          </button>
        </div>
      </div>
    `;

    main.appendChild(productCard);
  });
}

function renderSanitryProducts(products) {
  const main = document.getElementById("sanitry");
  if (!main) return;

  main.innerHTML = "";

  products.forEach((product, index) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");
    productCard.style.animationDelay = `${index * 0.1}s`;
    
    productCard.innerHTML = `
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}" />
      </div>
      <div class="product-info">
        <h3 class="product-title">${product.name}</h3>
        <p class="product-description">${product.description}</p>
        <div class="product-price">
          <span class="price">$${product.price}</span>
          <button class="add-to-cart" data-id="${product.id}">
            <i class="fas fa-cart-plus"></i> Add
          </button>
        </div>
      </div>
    `;

    main.appendChild(productCard);
  });
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
  fetchProducts();
  
  // Add animation class to header
  const header = document.querySelector('.hardh1');
  if (header) {
    setTimeout(() => {
      header.classList.add('animate-header');
    }, 300);
  }
});

// Add CSS for cart animation
const style = document.createElement('style');
style.textContent = `
  @keyframes cartBounce {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.2); }
  }
  .animate-cart {
    animation: cartBounce 0.5s ease;
  }
  .product-card {
    opacity: 0;
    animation: fadeInUp 0.5s ease forwards;
  }
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);