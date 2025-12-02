const productList = document.querySelector(".product-list");
const cartItemsContainer = document.querySelector(".cart-items");
const cartCount = document.querySelector(".cart-count");
const total = document.querySelector(".total");

const products = [
	{ id: "product-one", productName: "Wireless Bluetooth Earbuds", price: 39.99 },
	{ id: "product-two", productName: "Portable Power Bank 10000mAh", price: 24.99 },
	{ id: "product-three", productName: "Smart LED Desk Lamp", price: 29.99 },
	{ id: "product-four", productName: "USB-C Fast Charging Cable", price: 9.99 },
	{ id: "product-five", productName: "Mechanical Keyboard", price: 69.99 },
	{ id: "product-six", productName: "Ergonomic Office Mouse", price: 19.99 },
	{ id: "product-seven", productName: "Laptop Stand Adjustable", price: 34.5 },
	{ id: "product-eight", productName: "Noise-Cancelling Headphones", price: 89.0 },
	{ id: "product-nine", productName: "Fitness Smartwatch", price: 59.9 },
	{ id: "product-ten", productName: "128GB USB Flash Drive", price: 14.99 },
];

const cart = [];

function renderProductList() {
	productList.innerHTML = products
		.map((p) => {
			return `
				<div class="product-card" id="${p.id}">
					<h1>${p.productName}</h1>
					<p>$${p.price}</p>
					<button class="add-to-cart-btn" data-id="${p.id}">Add to cart</button>
				</div>
    `;
		})
		.join("");
}

function renderCartItems() {
	if (cart.length === 0) {
		cartItemsContainer.innerHTML = `<p class="empty">Cart is empty</p>`;
		return;
	}

	cartItemsContainer.innerHTML = cart
		.map((item) => {
			return `
				<div class="cart-item" id="${item.id}">
					<h2>${item.productName}</h2>
					<p class="price">$${item.price}</p>
					<button class="remove-btn" data-id="${item.id}">Remove</button>
				</div>
    `;
		})
		.join("");
}

document.body.addEventListener("click", (e) => {
	if (e.target.classList.contains("add-to-cart-btn")) {
		const productId = e.target.dataset.id;
		const selectedProduct = products.find((p) => p.id === productId);
		addToCart(selectedProduct);

		e.target.classList.add("disabled");
		e.target.disabled = true;
	}

	if (e.target.classList.contains("remove-btn")) {
		const productId = e.target.dataset.id;
		removeFromCart(productId);
		const isExist = cart.some((p) => p.id === productId);

		const addToCartBtns = document.querySelectorAll(".add-to-cart-btn");

		addToCartBtns.forEach((btn) => {
			if (!isExist && btn.dataset.id === productId) {
				btn.classList.remove("disabled");
				btn.disabled = false;
			}
		});
	}
});

renderProductList();
renderCartItems();

function addToCart(item) {
	const exists = cart.some((c) => c.id === item.id);
	if (exists) return;

	cart.push(item);
	renderCartItems();
	getCartCount();
	calculateTotal();
}

function removeFromCart(id) {
	const index = cart.findIndex((i) => i.id === id);
	if (index !== -1) cart.splice(index, 1);
	renderCartItems();
	getCartCount();
	calculateTotal();
}

function getCartCount() {
	cartCount.textContent = cart.length;
}

function calculateTotal() {
	total.textContent = cart.reduce((acc, item) => acc + item.price, 0).toFixed(2);
}
