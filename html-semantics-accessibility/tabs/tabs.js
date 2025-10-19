import { tabData } from "./data.js";

const tabsContainer = document.querySelector(".tabs");

const tabList = document.createElement("div");
tabList.classList.add("tab-list");
tabList.setAttribute("role", "tablist");
tabList.setAttribute("aria-label", "Tabs");

const tabPanels = document.createElement("div");
tabPanels.classList.add("tab-panels");

tabList.innerHTML = tabData
	.map(
		(item, index) => /*html*/ `
      <button id="tab-${index}" role="tab" class="tab-btn ${index === 0 ? "active" : ""}">${
			item.label
		}</button>
    `
	)
	.join("");

tabPanels.innerHTML = tabData
	.map(
		(item, index) => /*html*/ `
      <div class="tab-panel ${
				index !== 0 ? "hidden" : ""
			}" id="panel-${index}" aria-labelledby="tab-${index}">
        <h2>${item.heading}</h2>
        <ul>${item.subheadings.map((i) => `<li>${i}</li>`).join("")}</ul>
      </div>
    `
	)
	.join("");

tabsContainer.appendChild(tabList);
tabsContainer.appendChild(tabPanels);

tabsContainer.addEventListener("click", (e) => {
	if (e.target.matches(".tab-btn")) {
		const tabBtns = document.querySelectorAll(".tab-btn");

		tabBtns.forEach((btn) => btn.classList.remove("active"));

		e.target.classList.add("active");
		const tabPanels = document.querySelectorAll(".tab-panel");
		tabPanels.forEach((panel) => {
			const tabIndex = e.target.id.split("tab-")[1];
			const panelIndex = panel.id.split("panel-")[1];
			if (tabIndex == panelIndex) {
				panel.classList.remove("hidden");
				panel.setAttribute("aria-hidden", "false");
			} else {
				panel.classList.add("hidden");
				panel.setAttribute("aria-hidden", "true");
			}
		});
	}
});

const tabButtons = document.querySelectorAll(".tab-btn");

tabButtons.forEach((btn) => {
	btn.addEventListener("keydown", (e) => {});
});
