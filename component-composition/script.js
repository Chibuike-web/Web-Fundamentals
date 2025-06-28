function createButton(label) {
	return `
<button type="button" class="my-button">${label}</button>
  `;
}

function createCard(title, content, button) {
	return `
<div class="card">
  <h3 class="heading">${title}</h3>
  <p class="paragraph">${content}</p>
  ${button}
</div>
  `;
}
const button = createButton("Read More");
const card = createCard("Hello", "This is a sample card", button);

document.body.innerHTML = card;
