const products = [
  { name: "Kani Salad", price: 145, category: "Sides", image: "images/kani-salad.png" },
  { name: "Miso Soup", price: 85, category: "Sides", image: "images/miso-soup.png" },
  { name: "Namuru", price: 95, category: "Sides", image: "images/namuru.png" },
  { name: "Yakimeshi", price: 120, category: "Sides", image: "images/yakimeshi.png" },
  { name: "Gomaae", price: 95, category: "Sides", image: "images/gomaae.png" },
  { name: "Tuna Mayo", price: 110, category: "Onigiri", image: "images/tuna-mayo.png" },
  { name: "Spicy Tuna Mayo", price: 120, category: "Onigiri", image: "images/spicy-tuna-mayo.png" },
  { name: "Okaka", price: 105, category: "Onigiri", image: "images/okaka.png" },
  { name: "Salmon", price: 130, category: "Onigiri", image: "images/salmon.png" },
  { name: "Karaage Mayo", price: 135, category: "Onigiri", image: "images/karaage-mayo.png" },
  { name: "California Roll", price: 185, category: "Maki/Uramaki", image: "images/california.png" },
  { name: "Shrimp Tempura Roll", price: 220, category: "Maki/Uramaki", image: "images/shrimp-tempura.png" },
  { name: "Dragon Roll", price: 280, category: "Maki/Uramaki", image: "images/dragon.png" },
  { name: "Salmon Avocado Roll", price: 250, category: "Maki/Uramaki", image: "images/salmon-avocado.png" },
  { name: "Spicy Tuna Roll", price: 230, category: "Maki/Uramaki", image: "images/spicy-tuna.png" },
  { name: "Bottled Water", price: 45, category: "Drinks", image: "images/water.png" },
  { name: "Canned Soda", price: 60, category: "Drinks", image: "images/soda.png" },
  { name: "Green Tea", price: 70, category: "Drinks", image: "images/green-tea.png" },
  { name: "Barley Tea", price: 80, category: "Drinks", image: "images/barley-tea.png" },
  { name: "Sake", price: 180, category: "Drinks", image: "images/sake.png" }
];

const cart = [];

function renderProducts() {
  const container = document.getElementById("products");
  container.innerHTML = ""; 

  const categories = {};

  products.forEach((product, index) => {
    const category = product.category || "Uncategorized";
    if (!categories[category]) {
      categories[category] = [];
    }
    categories[category].push({ product, index });
  });

  for (const category in categories) {
    const header = document.createElement("h3");
    header.className = "category-header";
    header.innerText = category;
    container.appendChild(header);

    categories[category].forEach(({ product, index }) => {
      const div = document.createElement("div");
      div.className = "product";
      div.innerHTML = `
        <img src="${product.image}" alt="${product.name}" style="width:100px;height:auto;">
        <h4>${product.name}</h4>
        <p>Php ${product.price}</p>
        <button onclick="addToCart(${index})">Add to Cart</button>
      `;
      container.appendChild(div);
    });
  }
}

function renderCart() {
  const cartList = document.getElementById("cart-items");
  cartList.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    document.getElementById("cart-total").innerText = "0.00";
    
    const custOrderField = document.getElementById("cust_order");
    if (custOrderField) {
      custOrderField.value = "[]";
    }
    console.log("Cart is empty. Resetting cart total and order.");
    return;
  }

  cart.forEach((item, index) => {

    const itemPrice = Number(item.price);
    
    if (isNaN(itemPrice)) {
      console.error(`Invalid price for item: ${item.name}, price: ${item.price}`);
      return; // Skip this item and don't add it to the total
    }

    console.log(`Adding item to cart: ${item.name}, price: Php ${itemPrice}`);

    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} - Php ${itemPrice.toFixed(2)}
      <button onclick="removeFromCart(${index})">Remove</button>
    `;
    cartList.appendChild(li);

    total += itemPrice; 
  });

  document.getElementById("cart-total").innerText = `${total.toFixed(2)}`;

  const orderItems = cart.map(item => ({
    name: item.name,
    price: item.price
  }));

  const custOrderField = document.getElementById("cust_order");
  if (custOrderField) {
    custOrderField.value = JSON.stringify(orderItems);
  }

  console.log("Cart Data:", cart);
  console.log("Total Price:", total);
  console.log("Order JSON:", custOrderField?.value);
}




function addToCart(index) {
  const product = products[index];
  const price = Number(product.price);

  if (isNaN(price)) {
    console.error(`Invalid price when adding ${product.name}: ${product.price}`);
    return;
  }

  cart.push({
    name: product.name,
    price: price, 
  });
  console.log(`Added to cart: ${product.name} - Php ${price}`);
  renderCart();
}


function removeFromCart(index) {
  const removedItem = cart.splice(index, 1)[0];
  console.log(`Removed from cart: ${removedItem.name}`);
  renderCart();
}



document.getElementById("checkout-form").addEventListener("submit", function(event) {
  event.preventDefault();
  console.log("Form submitted with data:", this);


  if (cart.length === 0) {
    alert("Your cart is empty. Please add items to your cart before checking out.");
    return;
  }

  this.submit();
});

window.onload = () => {
  renderProducts();
  renderCart();
};
