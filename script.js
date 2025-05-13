const products = [ 
{ name: "Shark Slime", price: 169, category: "Brand New Stock", image: "images/shark.png" }, 
{ name: "Peach Slime", price: 175, category: "Brand New Stock", image: "images/peach.png" }, 
{ name: "Rice Krispies Slime", price: 140, category: "Brand New Stock", image: "images/ricekrispies.png" }, 
{ name: "Donut Slime", price: 150, category: "Brand New Stock", image: "images/donut.png" }, 
{ name: "Lemon Cake Slime", price: 150, category: "Brand New Stock", image: "images/lemon.png" }, 
{ name: "Honeycomb Slime", price: 128, category: "Signature Slimes", image: "images/Honeycomb.png" }, 
{ name: "Unicorn Slime", price: 143, category: "Signature Slimes", image: "images/Unicorn.png" }, 
{ name: "Candyland Slime", price: 152, category: "Signature Slimes", image: "images/CandyLand.png" },
{ name: "Chicken Slime", price: 130, category: "Signature Slimes", image: "images/chicken.png" }, 
{ name: "Rainbow Sherbet Slime", price: 160, category: "Signature Slimes", image: "images/sherbet.png" },   
{ name: "Mango Sticky Rice", price: 161, category: "Regular Slimes", image: "images/MangoStickyRice.png" }, 
{ name: "Mermaid Glitter Slime", price: 80, category: "Regular Slimes", image: "images/Mermaid.png" }, 
{ name: "Galaxy Slime", price: 91, category: "Regular Slimes", image: "images/Galaxy.png" },
{ name: "Gummy Worms Slime", price: 100, category: "Regular Slimes", image: "images/gummy.png" },
{ name: "Pancake Slime", price: 95, category: "Regular Slimes", image: "images/pancake.png" },    
{ name: "1L White Glue", price: 71, category: "Ingredients", image: "images/WhiteGlue.png" }, 
{ name: "500mL Clear Glue", price: 81, category: "Ingredients", image: "images/ClearGlue.png" }, 
{ name: "500mL Slime Activator", price: 63, category: "Ingredients", image: "images/SlimeActivator.png" }, 
{ name: "Unicorn Slime Kit", price: 200, category: "Ingredients", image: "images/UnicornSlimeKit.png" }, 
{ name: "Ice Cream Slime Kit", price: 200, category: "Ingredients", image: "images/IceSlimeKit.png" } 

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
