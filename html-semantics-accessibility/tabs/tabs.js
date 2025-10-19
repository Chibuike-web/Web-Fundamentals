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

let selectedIndex = 0;

const tabButtons = document.querySelectorAll(".tab-btn");

tabButtons.forEach((btn, index) => {
	btn.addEventListener("click", () => {
		selectedIndex = index;
		updateTabs();
	});
});

tabButtons.forEach((btn, index) => {
	btn.addEventListener("keydown", (e) => {
		selectedIndex = index;
		if (e.key === "ArrowRight") {
			selectedIndex = index < tabButtons.length - 1 ? index + 1 : 0;
		} else if (e.key === "ArrowLeft") {
			selectedIndex = index > 0 ? index - 1 : tabButtons.length - 1;
		} else if (e.key === "Home") {
			selectedIndex = 0;
		} else if (e.key === "End") {
			selectedIndex = tabButtons.length - 1;
		}
		updateTabs();
		tabButtons[selectedIndex].focus();
	});
});

function updateTabs() {
	tabButtons.forEach((btn, i) => {
		const isActive = i === selectedIndex;
		btn.classList.toggle("active", isActive);
		btn.setAttribute("aria-selected", isActive);
	});

	const tabPanels = document.querySelectorAll(".tab-panel");
	tabPanels.forEach((panel, i) => {
		const isActive = i === selectedIndex;
		panel.classList.toggle("hidden", !isActive);
		panel.setAttribute("aria-hidden", !isActive);
	});
}
