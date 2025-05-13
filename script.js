const products = [
  {name: "Unicorn Poop", price: 299, category: "Fluffy Slimes", image: "images/item1.png" },
  {name: "Mint Choc Chip", price: 285, category: "Fluffy Slimes", image: "images/item2.png" },
  {name: "Bubblegum", price: 270, category: "Fluffy Slimes", image: "images/item3.png" },
  {name: "Funfetti Batter", price: 290, category: "Fluffy Slimes", image: "images/item4.png" },
  {name: "Marshmallow", price: 280, category: "Fluffy Slimes", image: "images/item5.png" },
  {name: "Kaleidoscope Beads", price: 320, category: "Clear Slimes", image: "images/item6.png" },
  {name: "Galaxy", price: 300, category: "Clear Slimes", image: "images/item7.png" },
  {name: "Tutti Frutti", price: 310, category: "Clear Slimes", image: "images/item8.png" },
  {name: "Angel Wings", price: 320, category: "Clear Slimes", image: "images/item9.png" },
  {name: "Mermaid Water", price: 300, category: "Clear Slimes", image: "images/item10.png" },
  {name: "Pineapple", price: 275, category: "Cloud Slimes", image: "images/item11.png" },
  {name: "Candyland", price: 320, category: "Cloud Slimes", image: "images/item12.png" },
  {name: "Baby Cloud", price: 290, category: "Cloud Slimes", image: "images/item13.png" },
  {name: "Cotton Candy", price: 300, category: "Cloud Slimes", image: "images/item14.png" },
  {name: "Birthday Cake", price: 285, category: "Cloud Slimes", image: "images/item15.png" },
  {name: "Strawberry Milk Cereal", price: 285, category: "Floam Slimes", image: "images/item16.png"},
  {name: "Rainbow Cereal", price: 295, category: "Floam Slimes", image: "images/item17.png"},
  {name: "Unicorn Puke", price: 310, category: "Floam Slimes", image: "images/item18.png"},
  {name: "Sea Foam", price: 280, category: "Floam Slimes", image: "images/item19.png"},
  {name: "Lemonade Fizz", price: 290, category: "Floam Slimes", image: "images/item20.png"}
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
    document.getElementById("cart-total").innerText = "Php 0"; 
    document.getElementById("cust_order").value = "";
    return;
  }

  cart.forEach((item, index) => {
    if (item && item.name && item.price) { 
      const li = document.createElement("li");
      li.innerHTML = `
        ${item.name} - Php ${item.price}
        <button onclick="removeFromCart(${index})">Remove</button>
      `;
      cartList.appendChild(li);
      total += item.price;
    }
  });

  total = isNaN(total) ? 0 : total;
  document.getElementById("cart-total").innerText = `Php ${total}`;

  const orderArray = cart
    .map(item => (item.name && item.price) ? { prod_name: item.name, prod_price: item.price } : null)
    .filter(item => item !== null);

  document.getElementById("cust_order").value = JSON.stringify(orderArray);
}

function addToCart(index) {
  const product = products[index];
  if (product && product.name && product.price) {
    cart.push(product);
    renderCart(); 
  }
}

function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
}

window.onload = () => {
  renderProducts(); 
  renderCart(); 

  document.getElementById("checkout-form").addEventListener("submit", function(event) {
    event.preventDefault();

    console.log("Before submitting: ", document.getElementById("cust_order").value);

    document.getElementById("cust_order").value = JSON.stringify(cart
      .map(item => ({ prod_name: item.name, prod_price: item.price }))
    );

    console.log("After updating: ", document.getElementById("cust_order").value);

    this.submit();
  });
};
const products = [
  {name: "Unicorn Poop", price: 299, category: "Fluffy Slimes", image: "images/item1.png" },
  {name: "Mint Choc Chip", price: 285, category: "Fluffy Slimes", image: "images/item2.png" },
  {name: "Bubblegum", price: 270, category: "Fluffy Slimes", image: "images/item3.png" },
  {name: "Funfetti Batter", price: 290, category: "Fluffy Slimes", image: "images/item4.png" },
  {name: "Marshmallow", price: 280, category: "Fluffy Slimes", image: "images/item5.png" },
  {name: "Kaleidoscope Beads", price: 320, category: "Clear Slimes", image: "images/item6.png" },
  {name: "Galaxy", price: 300, category: "Clear Slimes", image: "images/item7.png" },
  {name: "Tutti Frutti", price: 310, category: "Clear Slimes", image: "images/item8.png" },
  {name: "Angel Wings", price: 320, category: "Clear Slimes", image: "images/item9.png" },
  {name: "Mermaid Water", price: 300, category: "Clear Slimes", image: "images/item10.png" },
  {name: "Pineapple", price: 275, category: "Cloud Slimes", image: "images/item11.png" },
  {name: "Candyland", price: 320, category: "Cloud Slimes", image: "images/item12.png" },
  {name: "Baby Cloud", price: 290, category: "Cloud Slimes", image: "images/item13.png" },
  {name: "Cotton Candy", price: 300, category: "Cloud Slimes", image: "images/item14.png" },
  {name: "Birthday Cake", price: 285, category: "Cloud Slimes", image: "images/item15.png" },
  {name: "Strawberry Milk Cereal", price: 285, category: "Floam Slimes", image: "images/item16.png"},
  {name: "Rainbow Cereal", price: 295, category: "Floam Slimes", image: "images/item17.png"},
  {name: "Unicorn Puke", price: 310, category: "Floam Slimes", image: "images/item18.png"},
  {name: "Sea Foam", price: 280, category: "Floam Slimes", image: "images/item19.png"},
  {name: "Lemonade Fizz", price: 290, category: "Floam Slimes", image: "images/item20.png"}
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
    document.getElementById("cart-total").innerText = "Php 0"; 
    document.getElementById("cust_order").value = "";
    return;
  }

  cart.forEach((item, index) => {
    if (item && item.name && item.price) { 
      const li = document.createElement("li");
      li.innerHTML = `
        ${item.name} - Php ${item.price}
        <button onclick="removeFromCart(${index})">Remove</button>
      `;
      cartList.appendChild(li);
      total += item.price;
    }
  });

  total = isNaN(total) ? 0 : total;
  document.getElementById("cart-total").innerText = `Php ${total}`;

  const orderArray = cart
    .map(item => (item.name && item.price) ? { prod_name: item.name, prod_price: item.price } : null)
    .filter(item => item !== null);

  document.getElementById("cust_order").value = JSON.stringify(orderArray);
}

function addToCart(index) {
  const product = products[index];
  if (product && product.name && product.price) {
    cart.push(product);
    renderCart(); 
  }
}

function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
}

window.onload = () => {
  renderProducts(); 
  renderCart(); 

  document.getElementById("checkout-form").addEventListener("submit", function(event) {
    event.preventDefault();

    console.log("Before submitting: ", document.getElementById("cust_order").value);

    document.getElementById("cust_order").value = JSON.stringify(cart
      .map(item => ({ prod_name: item.name, prod_price: item.price }))
    );

    console.log("After updating: ", document.getElementById("cust_order").value);

    this.submit();
  });
};
