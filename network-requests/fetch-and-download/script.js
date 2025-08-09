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
		const totalSize = contentLength ? parseInt(contentLength, 10) : 0;

		const reader = response.body.getReader();
		const stream = new ReadableStream({
			async start(controller) {
				let loaded = 0;
				while (true) {
					const { done, value } = await reader.read();
					await delay(50);

					if (done) break;

					loaded += value.length;
					const progress = totalSize ? (loaded / totalSize) * 100 : 0;

					progressBar.value = progress;
					progressText.textContent = `${progress.toFixed(0)}%`;

					controller.enqueue(value);
				}

				controller.close();
			},
		});
		await createDownloadLink(url, stream);
		progressText.textContent = "Download Complete";
	} catch (err) {
		progressText.textContent = "Download Failed!";
	} finally {
		downloadBtn.disabled = false;
	}
}

/**@param {string} url*/
const createDownloadLink = async (url, stream) => {
	const responseStream = new Response(stream);
	const blob = await responseStream.blob();

	const link = document.createElement("a");
	link.href = URL.createObjectURL(blob);
	link.download = url.split("/").pop();
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
};
