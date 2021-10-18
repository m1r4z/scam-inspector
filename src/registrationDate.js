export const getRegistrationDate = async (url) => {
	try {
		let res = await fetch(`https://rdap.verisign.com/com/v1/domain/${url}`, {
			credentials: "omit",
		});
		let jsonObject = await res.json();
		return new Date(jsonObject.events[0].eventDate).toString();
	} catch (err) {
		return "No data found!!";
	}
};
