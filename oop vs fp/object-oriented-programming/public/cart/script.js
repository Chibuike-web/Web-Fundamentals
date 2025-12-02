const productList = document.querySelector(".product-list");
const cartItemsContainer = document.querySelector(".cart-items");
const cartCount = document.querySelector(".cart-count");
const total = document.querySelector(".total");

const products = [
	{ id: "product-one", name: "Wireless Bluetooth Earbuds", price: 39.99 },
	{ id: "product-two", name: "Portable Power Bank 10000mAh", price: 24.99 },
	{ id: "product-three", name: "Smart LED Desk Lamp", price: 29.99 },
	{ id: "product-four", name: "USB-C Fast Charging Cable", price: 9.99 },
	{ id: "product-five", name: "Mechanical Keyboard", price: 69.99 },
	{ id: "product-six", name: "Ergonomic Office Mouse", price: 19.99 },
	{ id: "product-seven", name: "Laptop Stand Adjustable", price: 34.5 },
	{ id: "product-eight", name: "Noise-Cancelling Headphones", price: 89.0 },
	{ id: "product-nine", name: "Fitness Smartwatch", price: 59.9 },
	{ id: "product-ten", name: "128GB USB Flash Drive", price: 14.99 },
];

class Product {
	constructor(products) {
		this.products = products;
	}

	renderItem(product) {
		return `
			<div class="product-card" id="${product.id}">
				<h1>${product.name}</h1>
				<p>$${product.price}</p>
				<button class="add-to-cart-btn" data-id="${product.id}">Add to cart</button>
			</div>
		`;
	}

	render() {
		return this.products.map((product) => this.renderItem(product)).join("");
	}
}

productList.innerHTML = new Product(products).render();

class Cart {
	constructor() {
		this.items = [];
	}

	getCartItems() {
		return this.items;
	}

	addItem(product) {
		if (this.items.some((item) => item.id === product.id)) {
			return;
		}
		this.items.push(product);
	}

	removeItem(productId) {
		this.items = this.items.filter((item) => item.id !== productId);
	}

	renderCartItem(item) {
		return `
      <div class="cart-item" data-id="${item.id}">
        <h2>${item.name}</h2>
        <p>$${item.price}</p>
        <button class="remove-btn" data-id="${item.id}">Remove</button>
      </div>
    `;
	}
	getCartCount() {
		return this.items.length;
	}

	getTotalAmount() {
		return this.items.reduce((acc, item) => acc + item.price, 0);
	}

	render() {
		if (this.items.length === 0) {
			return `<p class="empty">Cart is empty</p>`;
		}
		return this.items.map((item) => this.renderCartItem(item)).join("");
	}
}

const cart = new Cart();
cartItemsContainer.innerHTML = cart.render();

document.body.addEventListener("click", (e) => {
	if (e.target.classList.contains("add-to-cart-btn")) {
		const productCard = e.target.closest(".product-card");
		const productId = productCard.id;
		const selectedProduct = products.find((p) => p.id === productId);

		cart.addItem(selectedProduct);
		cartItemsContainer.innerHTML = cart.render();
		cartCount.textContent = cart.getCartCount();
		total.textContent = cart.getTotalAmount().toFixed(2);

		e.target.classList.add("disabled");
		e.target.disabled = true;
	}

	if (e.target.classList.contains("remove-btn")) {
		const productId = e.target.dataset.id;

		cart.removeItem(productId);
		cartItemsContainer.innerHTML = cart.render();
		cartCount.textContent = cart.getCartCount();
		total.textContent = cart.getTotalAmount().toFixed(2);

		const isExist = cart.getCartItems().some((p) => p.id === productId);
		const btn = document.querySelector(`.add-to-cart-btn[data-id="${productId}"]`);
		if (!isExist && btn) {
			btn.classList.remove("disabled");
			btn.disabled = false;
		}
	}
});
