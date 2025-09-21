async function getUser() {
	const res = await fetch("http://localhost:4284/user", {
		method: "GET",
		credentials: "include",
	});

	const data = await res.json();

	if (!res.ok) {
		throw new Error("Issue fetching user");
	}
	console.log(data);
}

getUser();
