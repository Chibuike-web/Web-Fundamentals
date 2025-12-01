const productList = document.querySelector(".product-list");
const cartItemsContainer = document.querySelector(".cart-items");

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

class Product {
	constructor(id, name, price) {
		this.id = id;
		this.name = name;
		this.price = price;
	}

	renderItem() {
		return `
			<div class="product-card" id="${this.id}">
				<h1>${this.name}</h1>
				<p>$${this.price}</p>
				<button class="add-to-cart-btn">Add to cart</button>
			</div>
		`;
	}
}

class ProductList {
	constructor(products) {
		this.products = products;
	}

	render() {
		return this.products.map((p) => p.renderItem()).join("");
	}
}
