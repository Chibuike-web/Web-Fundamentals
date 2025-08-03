/**
 * @param {number} ms
 * */

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const downloadBtn = /** @type {HTMLButtonElement} */ (document.getElementById("download-btn"));
downloadBtn.addEventListener("click", () => {
	const url = "data.txt";
	downloadFile(url);
});
const progressBar = /** @type {HTMLProgressElement} */ (document.getElementById("progress-bar"));
const progressText = /** @type {HTMLSpanElement} */ (document.getElementById("progress-text"));

/**@param {string} url */
async function downloadFile(url) {
	downloadBtn.disabled = true;
	progressBar.value = 0;
	progressText.textContent = "0%";

	try {
		const response = await fetch(url);
		if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

		const contentLength = response.headers.get("content-length");

		/**@type {number} */
		const totalSize = contentLength ? parseInt(contentLength, 10) : 0;

		const reader = response.body.getReader();

		const stream = new ReadableStream({
			async start(controller) {
				let laoded = 0;
				while (true) {
					const { done, value } = await reader.read();
					await delay(200);

					if (done) break;
				}
			},
		});
	} catch (err) {}
}
