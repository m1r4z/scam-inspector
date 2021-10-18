export const topGoogleSearch = async (url) => {
	let res = await fetch("https://www.google.com/search?q=" + url);
	let text = await res.text();
	let dom = new DOMParser().parseFromString(text, "text/html");
	let searchResults = [...dom.querySelectorAll(".g")].filter(
		(item) =>
			item.querySelector("cite") &&
			item.querySelector("h3") &&
			item !== dom.querySelector(".g .g")
	);
	console.log(searchResults);

	return searchResults.slice(0, 3).map((item) => ({
		url: item.querySelector("a").href,
		title: item.querySelector("h3").innerText,
		description: item.textContent,
	}));
};
