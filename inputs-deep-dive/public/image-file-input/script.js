const uploadZone = document.getElementById("image-input-wrapper");
const fileInput = document.getElementById("image-input");
const appContainer = document.getElementById("app");
import { imageIcon, uploadIcon, cancelIcon } from "./icon.js";
import { formatFileSize } from "./utils.js";

function createUploadPrompt() {
	const container = document.createElement("div");
	container.className = "image-upload";

	const icon = document.createElement("span");
	icon.className = "upload-icon";
	icon.innerHTML = uploadIcon;

	const title = document.createElement("p");
	title.className = "title";
	title.textContent = "Click to upload image";

	const subtitle = document.createElement("p");
	subtitle.className = "subtitle";
	subtitle.textContent = "JPG or JPEG, PNG format, up to 50MB";

	container.appendChild(icon);
	container.appendChild(title);
	container.appendChild(subtitle);

	return container;
}

function createImageInfoCard(fileName, fileSizeText) {
	const infoWrapper = document.createElement("div");
	infoWrapper.className = "file-content-wrapper";

	const iconSpan = document.createElement("span");
	iconSpan.innerHTML = imageIcon;
	iconSpan.className = "file-icon";

	const textWrapper = document.createElement("div");
	textWrapper.className = "file-content";

	const nameText = document.createElement("p");
	nameText.className = "file-name";
	nameText.textContent = fileName;

	const sizeText = document.createElement("p");
	sizeText.className = "file-size";
	sizeText.textContent = fileSizeText;

	textWrapper.appendChild(nameText);
	textWrapper.appendChild(sizeText);
	infoWrapper.appendChild(iconSpan);
	infoWrapper.appendChild(textWrapper);

	const displayCard = document.createElement("div");
	displayCard.className = "file-display";
	displayCard.appendChild(infoWrapper);

	const cancelButton = document.createElement("button");
	cancelButton.className = "cancel-btn";
	cancelButton.innerHTML = cancelIcon;

	displayCard.appendChild(cancelButton);
	return displayCard;
}

uploadZone.appendChild(createUploadPrompt());

fileInput.addEventListener("change", (e) => {
	const file = e.target.files[0];

	if (!["image/jpg", "image/jpeg", "image/png"].includes(file.type)) {
		console.log("Upload only jpg or png");
		return;
	}

	const imageElement = document.createElement("img");
	imageElement.className = "img";
	imageElement.src = URL.createObjectURL(file);

	const readableSize = formatFileSize(file.size);
	const infoCard = createImageInfoCard(file.name, readableSize);

	const uploadGroup = document.createElement("div");
	uploadGroup.className = "upload-preview";

	uploadGroup.appendChild(imageElement);
	uploadGroup.appendChild(infoCard);

	appContainer.appendChild(uploadGroup);

	fileInput.value = "";
});

appContainer.addEventListener("click", (e) => {
	const cancelBtn = e.target.closest(".cancel-btn");
	if (!cancelBtn) return;

	const uploadPreview = cancelBtn.closest(".upload-preview");
	const fileDisplay = cancelBtn.closest(".file-display");

	if (fileDisplay && uploadPreview) {
		fileDisplay.remove();
		uploadPreview.remove();
	}
});
