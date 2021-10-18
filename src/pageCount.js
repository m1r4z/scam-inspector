const countSitemap = async (sitemapUrls, index) => {
	console.log(sitemapUrls);
	let totalCount = 0;

	let res = await fetch(sitemapUrls[index]);
	let text = await res.text();
	let dom = new DOMParser().parseFromString(text, "text/html");
	console.log(text);
	if (dom.querySelector("sitemap")) {
		console.log("in sitemap");
		let allSitemapsUrls = [...dom.querySelectorAll("sitemap")].map(
			(item) => item.querySelector("loc").innerText
		);
		totalCount += await countSitemap(allSitemapsUrls, 0);
	} else if (dom.querySelector("url")) {
		console.log("in url");
		let allPagesUrl = [...dom.querySelectorAll("url")].map(
			(item) => item.querySelector("loc").innerText
		);
		return allPagesUrl.length;
	}
	if (index + 1 < sitemapUrls.length) {
		totalCount += await countSitemap(sitemapUrls, index + 1);
	}
	return totalCount;
};

export const calculatePageCount = async (url) => {
	try {
		let sitemapCount = 0;
		sitemapCount = await countSitemap(["http://" + url + "/sitemap.xml"], 0);
		console.log(sitemapCount);
		if (sitemapCount === 0) {
			sitemapCount = await countSitemap(["http://" + url + "/sitemap_index.xml"], 0);
		}
		return sitemapCount;
	} catch (err) {
		return 0;
	}
};
