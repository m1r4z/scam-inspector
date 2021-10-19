export const topGoogleSearch = async (url) => {
	try {
		let res = await fetch(
			"https://www.googleapis.com/customsearch/v1?key=AIzaSyCWYOghgM4m0LqADdYJp0rOgRm9Tk8ZBGw&cx=82e67679f76cfad49&q=" +
				url
		);
		let jsonData = await res.json();
		return jsonData["items"].slice(0, 3).map((item) => ({
			url: item.link,
			title: item.title,
			description: item.snippet,
		}));
	} catch (err) {
		console.log(err);
		return {};
	}
};
