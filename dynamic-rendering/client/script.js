const url = new URL("https://example.com/products?category=books&sort=asc");
console.log(url.hostname);
console.log(url.pathname);
console.log(url.search);
console.log(url.protocol);

const params = new URLSearchParams(url.search);
console.log(params);
console.log(params.get("category"));
