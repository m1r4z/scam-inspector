export const topGoogleSearch = async (url) => {
	let res = await fetch("https://www.google.com/search?q=" + url);
	let text = await res.text();
	let dom = new DOMParser().parseFromString(text, "text/html");
	console.log(dom);
	let searchResults = [...dom.querySelectorAll(".g")].filter(
		(item) =>
			item.querySelector("cite") &&
			item.querySelector("h3") &&
			item !== dom.querySelector(".g .g")
	);

	if (searchResults.length <= 0) {
		searchResults = [...dom.querySelectorAll("div[data-hveid]")].filter(
			(i) => !i.querySelector("[data-hveid] [data-hveid]") && i.querySelector("a")
		);
		return searchResults.slice(0, 3).map((item) => ({
			url: item.querySelector("a").href,
			title: item.querySelector("a div[role='heading']").innerText,
		}));
	} else {
		return searchResults.slice(0, 3).map((item) => ({
			url: item.querySelector("a").href,
			title: item.querySelector("h3").innerText,
		}));
	}
};
