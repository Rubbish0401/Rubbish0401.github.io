const ID_LIST = "list-pane";
const ID_DETAILS = "details-pane";

const themeHue = 165; // 0 to 255

var list;
var listItems = [];
var details;

var listData;

function showDescription(data) {
	for (let i = 0; details.children.length; i++) {
		details.children[i].remove();
	}

	let pane = document.createElement("div");
	pane.classList.add("pane");

	let titlePane = document.createElement("div");
	titlePane.style.display = "flex";
	titlePane.style.flexDirection = "row";
	titlePane.style.alignItems = "center";

	let backBtn = document.createElement("img");
	backBtn.src = "images/arrow.svg";
	backBtn.classList.add("btn-back");
	backBtn.addEventListener("click", function (event) {
		document.body.classList.remove("show-details");
		document.body.classList.add("show-list");
	});

	let title = document.createElement("p");
	title.classList.add("title");
	title.innerText = data.title;

	let descriptions = document.createElement("p");
	descriptions.classList.add("descriptions")
	descriptions.innerHTML = data.descriptions;

	let links = document.createElement("div");
	links.classList.add("links");
	for (let link of data.links) {
		let anchor = document.createElement("a");
		anchor.href = link.url;
		anchor.target = "_blank";

		let btn = document.createElement("button");
		btn.style.background = `hsl(${themeHue}deg, 50%, 70%)`;
		btn.style.color = "hsl(0deg, 0%, 30%)";
		btn.innerText = link.title;
		btn.addEventListener("mouseover", function (event) {
			btn.style.background = `hsl(${themeHue}deg, 50%, 75%)`;
			showDescription(itemData);
		});
		btn.addEventListener("mouseout", function (event) {
			btn.style.background = `hsl(${themeHue}deg, 50%, 70%)`;
		});


		anchor.appendChild(btn);
		links.appendChild(anchor)
	}

	titlePane.appendChild(backBtn);
	titlePane.appendChild(title);

	pane.appendChild(titlePane);
	pane.appendChild(descriptions);
	pane.appendChild(links);

	details.appendChild(pane);
}

(function () {
	document.body.style.background = `hsl(${themeHue}deg, 50%, 85%)`;

	list = document.getElementById(ID_LIST);
	details = document.getElementById(ID_DETAILS);

	let request = new XMLHttpRequest();
	request.onreadystatechange = function () {
		if (request.readyState == 4) {
			listData = JSON.parse(request.response);

			for (let i = 1; i < listData.length; i++) {
				let group = listData[i];

				let groupName = document.createElement("p");
				groupName.style.background = `hsl(${themeHue}deg, 50%, 85%)`;
				groupName.classList.add("group-name");
				groupName.innerText = group.name;
				list.appendChild(groupName);

				for(let j = 0; j < group.items.length; j++){
					let itemData = group.items[j];

					let item = document.createElement("div");
					item.classList.add("list-item");
					item.style.background = `hsl(${themeHue}deg, 50%, 85%)`;
					item.addEventListener("click", function (event) {
						showDescription(itemData);

						document.body.classList.remove("show-list");
						document.body.classList.add("show-details");
					});
					item.addEventListener("mouseover", function (event) {
						item.style.background = `hsl(${themeHue}deg, 50%, 90%)`;
						showDescription(itemData);
					});
					item.addEventListener("mouseout", function (event) {
						item.style.background = `hsl(${themeHue}deg, 50%, 85%)`;
					});

					let title = document.createElement("p");
					title.classList.add("title");
					title.innerText = itemData.title;

					let descriptions = document.createElement("p");
					descriptions.classList.add("descriptions");
					descriptions.innerText = itemData.descriptions.replace(/<(".*?"|'.*?'|[^'"])*?>/g, "");

					item.appendChild(title);
					item.appendChild(descriptions);

					list.appendChild(item);
					listItems.push(item);
				}
			}
		}
	};

	request.open("GET", "https://rubbish0401.github.io/data/list.json", true);
	request.send("");
})();