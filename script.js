// products prices for the customization
const componentPrices = {
    cpu: { "Intel i5": 200, "Intel i7": 350, "AMD Ryzen 5": 250, "AMD Ryzen 7": 400 },
    gpu: { "NVIDIA RTX 3060": 400, "NVIDIA RTX 3070": 600, "AMD RX 6700": 500 },
    ram: { "16GB DDR4": 100, "32GB DDR4": 180, "64GB DDR5": 300 },
    storage: { "1TB SSD": 150, "2TB SSD": 250, "512GB SSD": 100 }
};

// Update price when selecting components
function updatePrice() {
    let cpu = document.getElementById("cpu-select").value;
    let gpu = document.getElementById("gpu-select").value;
    let ram = document.getElementById("ram-select").value;
    let storage = document.getElementById("storage-select").value;

    let totalPrice = componentPrices.cpu[cpu] + componentPrices.gpu[gpu] + componentPrices.ram[ram] + componentPrices.storage[storage];

    document.getElementById("total-price").innerText = `$${totalPrice}`;
    return totalPrice;
}

// cart array
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// "Add to Cart" button 
function addToCart(productName, price) {
    cart.push({ name: productName, price: price });
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartDisplay();
    alert(`${productName} added to cart!`);
}

// Add customized PC to cart
function addCustomPCToCart() {
    let cpu = document.getElementById("cpu-select").value;
    let gpu = document.getElementById("gpu-select").value;
    let ram = document.getElementById("ram-select").value;
    let storage = document.getElementById("storage-select").value;
    let totalPrice = updatePrice();
    
    let customPCName = `Custom PC (${cpu}, ${gpu}, ${ram}, ${storage})`;
    addToCart(customPCName, totalPrice);
}

// Update cart display and total
function updateCartDisplay() {
    let cartItems = document.getElementById("cart-items");
    let cartTotalElem = document.getElementById("cart-total");
    if (!cartItems || !cartTotalElem) return;

    cartItems.innerHTML = "";
    let total = 0;
    cart.forEach((item, index) => {
        let listItem = document.createElement("li");
        listItem.innerText = `${item.name} - $${item.price}`;
        let removeBtn = document.createElement("button");
        removeBtn.innerText = "Remove";
        removeBtn.onclick = () => removeFromCart(index);
        listItem.appendChild(removeBtn);
        cartItems.appendChild(listItem);
        total += item.price;
    });

    cartTotalElem.innerText = `Total: $${total}`;
}

// Remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartDisplay();
}

function checkout() {
    const messageDiv = document.getElementById("message");
    
    // Check if cart is empty and display message on the page
    if (cart.length === 0) {
        messageDiv.innerText = "Your cart is empty! Please add items before placing an order.";
        messageDiv.style.color = "red";
        return;
    }
    
    // Calculate total price
    let total = cart.reduce((sum, item) => sum + item.price, 0);
    
    // Display thank you message 
    messageDiv.innerText = `Thank you for your purchase! Your total is $${total}`;
    messageDiv.style.color = "green";
    
    // Clear the cart 
    cart = [];
    localStorage.removeItem("cart");
    updateCartDisplay();
}


// Load cart from storage
window.onload = function() {
    cart = JSON.parse(localStorage.getItem("cart")) || [];
    updateCartDisplay();
};
