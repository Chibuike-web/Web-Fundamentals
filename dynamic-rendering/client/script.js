import { clientData } from "./utils.mjs";

const cardList = document.getElementById("cardList");

function createCard(item) {
	const card = document.createElement("div");
	card.classList.add("card");
	card.id = `card-${item.id}`;
	card.innerHTML = `
    <img src="${item.image}" alt="${item.title}" />
    <div class="card-body">
      <h3 class="card-title">${item.title}</h3>
      <p class="card-desc">${item.shortDesc}</p>
      <a href="details.html?id=${item.id}">View Details</a>
    </div>`;
	return card;
}

clientData.forEach((item) => cardList.appendChild(createCard(item)));
