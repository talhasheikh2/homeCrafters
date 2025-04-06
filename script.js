const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');

menuToggle.addEventListener('click', () => {
  menu.classList.toggle('active');
});

  // Array of products
  // const hardwareProducts = [
  //   { image: "../images/lock17.jpeg", name: "DOOR LOCK", description: "High-quality door lock for enhanced security.", price: "$9999.99" },
  //   { image: "../images/lock13.jpeg", name: "DOOR LOCK", description: "Reliable door lock with modern design.", price: "$9991.99" },
  //   { image: "../images/lock10.jpeg", name: "DOOR LOCK", description: "Durable and affordable door lock.", price: "$969.99" },
  //   { image: "../images/lock11.jpeg", name: "DOOR LOCK", description: "Elegant door lock for your home.", price: "$495.99" },
  //   { image: "../images/lock12.jpeg", name: "DOOR LOCK", description: "Stylish and secure door lock.", price: "$595.99" },
  //   { image: "../images/lock2.jpeg", name: "DOOR LOCK", description: "Modern and durable lock.", price: "$895.99" },
  //   { image: "../images/lock3.jpeg", name: "DOOR LOCK", description: "Compact and reliable door lock.", price: "$885.99" },
  //   { image: "../images/lock4.jpeg", name: "DOOR LOCK", description: "Affordable lock with great security.", price: "$795.99" },
  //   { image: "../images/lock1.jpeg", name: "DOOR LOCK", description: "Efficient lock for everyday use.", price: "$795.99" },
  //   { image: "../images/lock5.jpeg", name: "DOOR LOCK", description: "Sturdy and easy-to-install lock.", price: "$795.99" },
  //   { image: "../images/lock8.jpeg", name: "DOOR LOCK", description: "Minimalistic lock with great functionality.", price: "$795.99" },
  //   { image: "../images/lock14.jpeg", name: "DOOR LOCK", description: "Classic design with modern features.", price: "$795.99" },
  //   { image: "../images/lock16.jpeg", name: "DOOR LOCK", description: "Advanced lock for premium security.", price: "$795.99" },
  //   { image: "../images/lock6.jpeg", name: "DOOR LOCK", description: "Compact lock for small doors.", price: "$795.99" },
  //   { image: "../images/lock19.jpeg", name: "DOOR LOCK", description: "Elegant and efficient lock.", price: "$795.99" },
  //   { image: "../images/lock15.jpeg", name: "DOOR LOCK", description: "Durable and stylish lock.", price: "$795.99" },
  //   { image: "../images/Rodlock.jpeg", name: "DOOR LOCK", description: "Rod lock for reinforced security.", price: "$795.99" },
  //   { image: "../images/Fansigrip.jpeg", name: "DOOR LOCK", description: "Fan-shaped grip lock.", price: "$795.99" },
  //   { image: "../images/simplegrip.jpeg", name: "DOOR LOCK", description: "Simple grip for ease of use.", price: "$795.99" },
  //   { image: "../images/AB.jpeg", name: "DOOR LOCK", description: "AB series lock for modern homes.", price: "$795.99" },
  //   { image: "../images/CP.jpeg", name: "DOOR LOCK", description: "Chrome-plated lock.", price: "$795.99" },
  //   { image: "../images/doorhinges.jpeg", name: "DOOR LOCK", description: "Secure door hinges lock.", price: "$795.99" },
  //   { image: "../images/Cphand1.jpeg", name: "DOOR LOCK", description: "Cphand lock series 1.", price: "$795.99" },
  //   { image: "../images/Cphand2.jpeg", name: "DOOR LOCK", description: "Cphand lock series 2.", price: "$795.99" },
  //   { image: "../images/Cphand3.jpeg", name: "DOOR LOCK", description: "Cphand lock series 3.", price: "$795.99" },
  //   { image: "../images/Cphand4.jpeg", name: "DOOR LOCK", description: "Cphand lock series 4.", price: "$795.99" },
  //   { image: "../images/Cphand5.jpeg", name: "DOOR LOCK", description: "Cphand lock series 5.", price: "$795.99" },
  //   { image: "../images/Cphand6.jpeg", name: "DOOR LOCK", description: "Cphand lock series 6.", price: "$795.99" },
  //   { image: "../images/Cphand7.jpeg", name: "DOOR LOCK", description: "Cphand lock series 7.", price: "$795.99" },
  //   { image: "../images/latoo (2).jpeg", name: "DOOR LOCK", description: "Latoo lock for heavy doors.", price: "$795.99" },
  //   { image: "../images/drazlock.jpeg", name: "DOOR LOCK", description: "Drawer lock for secure storage.", price: "$795.99" },
  //   { image: "../images/keylock.jpeg", name: "DOOR LOCK", description: "Key-operated lock.", price: "$795.99" },
  //   { image: "../images/chinalock.jpeg", name: "DOOR LOCK", description: "China lock with classic features.", price: "$795.99" },
  // ];

//   async function fetchProducts() {
//     renderElectricProducts(electricProducts);


//     try {
//         // Extract category from URL filename
//         const pathSegments = window.location.pathname.split("/"); 
//         const fileName = pathSegments[pathSegments.length - 1]; // Get last segment (hardware.html)
//         const categoryValue = fileName.split(".")[0]; // Extract category (hardware, electronic, sanitary)

//         console.log("Category:", categoryValue); // Debugging

//         // Make a POST request to send category to the backend
//         const postResponse = await fetch('http://localhost:8000/api/products', {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             // body: JSON.stringify({ category: categoryValue }) // Send category in request body
//         });

//         if (!postResponse.ok) {
//             throw new Error('Failed to send category');
//         }


//         const data = await postResponse.json(); // Parse JSON data

//         if (data && data.data) {
//             const filteredProducts = data?.data;
//             if(categoryValue==="hardware"){
//               renderProducts(filteredProducts);

//             }          
//             else if(categoryValue==="electronic"){
//             }
//             else{
//               // renderSanitryProducts(filteredProducts);
//             }

//         }
//     } catch (error) {
//         console.error('Error:', error.message);
//     }
// }

  async function fetchProducts() {
    try {
      const pathSegments = window.location.pathname.split("/"); 
const fileName = pathSegments[pathSegments.length - 1]; // Get last segment (hardware.html)
const hardwareValue = fileName.split(".")[0]; // Remove '.html'

console.log(hardwareValue); // Output: "hardware"

      const response = await fetch('http://localhost:8000/api/products'); // Backend endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
  
      const data = await response.json(); // Parse JSON data
  
      if (data && data.data) {
        const hardwareProducts= data?.data?.filter((x)=> x.category==="hardware")
        const electronicProducts= data?.data?.filter((x)=> x.category==="electronic")
        const sanitryProducts= data?.data?.filter((x)=> x.category==="sanitry")
        renderProducts(hardwareProducts);
        renderElectricProducts(electronicProducts); 
        renderSanitryProducts(sanitryProducts);// Call render function with product data
      }
    } catch (error) {
      console.error('Error fetching products:', error.message);
    }
  }
  
  // Function to generate the product elements
  function renderProducts(hardwareProducts) {
    const main = document.getElementById("hardware");
    if(main){
        main.innerHTML = ""; // Clear existing products
        // Clear existing products
  
    hardwareProducts.forEach((product) => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("product");
  
      productDiv.innerHTML = `
        <img src="${product.image}" alt="Product Image" />
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <p>${product.price}</p>
        <button>Add to Cart</button>
      `;
  
      main.appendChild(productDiv);
    });
} 
  }
  window.onload = fetchProducts;

  // Call the function to render products
  // renderProducts(hardwareProducts);
  


   // Array of products
  //  const electricProducts = [
    
  //       { name: "LED Ceiling Light", description: "Energy-efficient LED light for ceilings.", price: 49.99, image: "../images/Electmag/led ceiling light.webp" },
  //       { name: "Smart Switch", description: "Wi-Fi enabled smart switch for home automation.", price: 29.99, image: "../images/Electmag/smart switch.jfif" },
  //       { name: "Electrical Wire (10m)", description: "High-quality copper electrical wire.", price: 19.99, image: "../images/Electmag/electrical wire.webp" },
  //       { name: "Power Outlet", description: "Standard dual power outlet with USB ports.", price: 14.99, image: "../images/Electmag/power outlet.jpg" },
  //       { name: "Circuit Breaker", description: "Safety circuit breaker for electrical panels.", price: 39.99, image: "../images/Electmag/power inverter.webp" },
  //       { name: "Ceiling Fan", description: "Energy-efficient ceiling fan with remote control.", price: 89.99, image: "../images/Electmag/ceiling fan.webp" },
  //       { name: "Chandelier", description: "Elegant chandelier for living rooms.", price: 199.99, image: "../images/Electmag/chandelier.jpg" },
  //       { name: "Light Switch", description: "Basic light switch with durable build.", price: 9.99, image: "../images/Electmag/smart switch.jfif" },
  //       { name: "Electrical Conduit Pipe", description: "PVC pipe for electrical wiring.", price: 24.99, image: "../images/Electmag/outdoor light.jfif" },
  //       { name: "Extension Cord", description: "10m extension cord with surge protection.", price: 34.99, image: "../images/Electmag/power inverter.webp" },
  //       { name: "Outdoor Light", description: "Weather-resistant outdoor lighting fixture.", price: 59.99, image: "../images/Electmag/outdoor light.jfif" },
  //       { name: "Smoke Detector", description: "Battery-powered smoke detector for safety.", price: 14.99, image: "../images/Electmag/doorbell camera.avif" },
  //       { name: "Doorbell Camera", description: "Smart doorbell with HD camera.", price: 99.99, image: "../images/Electmag/smoke detecto.jfif" },
  //       { name: "Electrical Tape", description: "Insulated tape for electrical repairs.", price: 4.99, image: "../images/Electmag/electrical tape.jpg" },
  //       { name: "Power Inverter", description: "Backup power inverter for home use.", price: 149.99, image: "../images/Electmag/power inverter.webp" },
  //       { name: "Solar Panel", description: "High-efficiency solar panel for energy savings.", price: 399.99, image: "../images/Electmag/solar panel.jfif" },
  //       { name: "Battery Backup", description: "Backup battery for home power systems.", price: 249.99, image: "../images/Electmag/recessed light.webp" },
  //       { name: "Recessed Light", description: "Modern recessed lighting for ceilings.", price: 39.99, image: "../images/Electmag/recessed light.webp" },
  //       { name: "Dimmer Switch", description: "Dimmable switch for mood lighting.", price: 19.99, image: "../images/Electmag/dimmer switch.webp" },
  //       { name: "Surge Protector", description: "Multi-outlet surge protector for devices.", price: 24.99, image: "../images/Electmag/surge protector.webp" }
            
  //      ];
  
  // Function to generate the product elements
  function renderElectricProducts(electricProducts) {
    const main = document.getElementById("electric");
    if(main){
    main.innerHTML = ""; // Clear existing products
   
    electricProducts.forEach((product) => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("product");
  
      productDiv.innerHTML = `
        <img src="${product.image}" alt="Product Image" />
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <p>${product.price}</p>
        <button>Add to Cart</button>
      `;
  
      main.appendChild(productDiv);
    });
     }
  }
  
  // Call the function to render products
  // renderElectricProducts(electricProducts);


  // const sanitryProducts = [
  //   { name: "Bathroom Sink", description: "Ceramic bathroom sink with faucet.", price: 129.99, image: "../images/Electmag/bathroom sink.jpg" },
  //   { name: "Showerhead", description: "Adjustable water-saving showerhead.", price: 49.99, image: "../images/Electmag/showerhead.jpg" },
  //   { name: "Toilet Seat", description: "Comfortable toilet seat with soft-close lid.", price: 89.99, image: "../images/Electmag/toilet seat.png" },
  //   { name: "Water Heater", description: "Instant water heater for bathrooms.", price: 199.99, image: "../images/Electmag/water heater.webp" },
  //   { name: "Towel Rack", description: "Stainless steel wall-mounted towel rack.", price: 34.99, image: "../images/Electmag/towel rack.jfif" },
  //   { name: "Faucet", description: "Stylish and durable kitchen faucet.", price: 69.99, image: "../images/Electmag/faucet.avif" },
  //   { name: "Soap Dispenser", description: "Wall-mounted liquid soap dispenser.", price: 19.99, image: "../images/Electmag/soap dispenser.jfif" },
  //   { name: "Mirror Cabinet", description: "Bathroom mirror cabinet with storage.", price: 149.99, image: "../images/Electmag/mirror cabinet.webp" },
  //   { name: "Flush Tank", description: "Durable dual-flush toilet tank.", price: 89.99, image: "../images/Electmag/flush tank.jpg" },
  //   { name: "PVC Pipes", description: "High-quality PVC pipes for plumbing.", price: 29.99, image: "../images/Electmag/pvc pipes.jpg" },
  //   { name: "Hand Shower", description: "Flexible hand shower for convenience.", price: 39.99, image: "../images/Electmag/shower enclosure.jfif" },
  //   { name: "Drain Cover", description: "Stainless steel drain cover for bathrooms.", price: 14.99, image: "../images/Electmag/drain cove.jfif" },
  //   { name: "Bathtub", description: "Modern acrylic bathtub for relaxation.", price: 499.99, image: "../images/Electmag/bathtub.jfif" },
  //   { name: "Shower Enclosure", description: "Glass shower enclosure for bathrooms.", price: 799.99, image: "../images/Electmag/shower enclosure.jfif" },
  //   { name: "Water Pump", description: "High-efficiency water pump for plumbing.", price: 249.99, image: "../images/Electmag/water pump.webp" },
  //   { name: "Floor Drain", description: "Anti-odor stainless steel floor drain.", price: 24.99, image: "../images/Electmag/floor drain.jpg" },
  //   { name: "Toilet Brush Set", description: "Durable toilet brush with holder.", price: 12.99, image: "../images/Electmag/toilet brush set.jpeg" },
  //   { name: "Water Mixer", description: "Stylish water mixer for bathrooms.", price: 89.99, image: "../images/Electmag/water mixer.webp" },
  //   { name: "Kitchen Sink", description: "Stainless steel kitchen sink with drainer.", price: 199.99, image: "../images/Electmag/kitchen sink.jpg" },
  //   { name: "Bidet Spray", description: "Handheld bidet spray for hygiene.", price: 29.99, image: "../images/Electmag/mirror cabinet.webp" }
  //   ];
  
  //Function to generate the product elements
  function renderSanitryProducts(sanitryProducts) {
    const main = document.getElementById("sanitry");

      if(main){
    main.innerHTML = ""; // Clear existing products
   
  
    sanitryProducts.forEach((product) => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("product");
  
      productDiv.innerHTML = `
        <img src="${product.image}" alt="Product Image" />
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <p>${product.price}</p>
        <button>Add to Cart</button>
      `;
  
      main.appendChild(productDiv);

    });
      }
  }
  
  // Call the function to render products
   renderSanitryProducts(sanitryProducts);


// cards

document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
      const img = card.querySelector("img");
      const originalSrc = img.src;
      const hoverSrc = card.getAttribute("data-hover");

      card.addEventListener("mouseenter", function () {
          img.src = hoverSrc;
      });

      card.addEventListener("mouseleave", function () {
          img.src = originalSrc;
      });
  });
});
