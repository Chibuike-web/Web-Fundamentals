export async function fetch(formdata) {
	try {
		const res = await fetch("validate-form", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(formdata),
		});

		if (!res.ok) {
			throw new Error("Issue validating the form");
		}

		const data = await res.json();
		console.log(data);
	} catch (err) {
		console.error("Issue validating form", err);
	}
}
