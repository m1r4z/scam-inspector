import {
	CircularProgress,
	Container,
	Divider,
	IconButton,
	InputBase,
	List,
	ListItem,
	ListItemText,
	Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import "./App.css";
import { calculatePageCount } from "./pageCount";
import { getRegistrationDate } from "./registrationDate";
import { topGoogleSearch } from "./topGoogleSearch";

function App() {
	const [searchText, setSearchText] = useState("");
	const [regDate, setRegDate] = useState("");
	const [pageCount, setPageCount] = useState(0);
	const [topGoogleSearchResults, setTopGoogleSearchResults] = useState([]);
	const [scamGoogleSearchResults, setScamGoogleSearchResults] = useState([]);
	const [showTable, setShowTable] = useState(false);

	const handleRegistrationDate = async (URL) => {
		setRegDate("-1");
		setRegDate(await getRegistrationDate(URL));
	};

	const handlePageCount = async (URL) => {
		setPageCount(-1);
		setPageCount(await calculatePageCount(URL));
	};

	const handleTopGoogleSearchResult = async (URL) => {
		setTopGoogleSearchResults(await topGoogleSearch(URL));
	};

	const handleScamGoogleSearchResult = async (URL) => {
		setScamGoogleSearchResults(await topGoogleSearch(URL));
	};

	const handleOnsubmit = (e) => {
		e.preventDefault();
		let URL = searchText.match(/[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)+/g)[0];
		console.log(URL);
		handleRegistrationDate(URL);
		handlePageCount(URL);
		handleTopGoogleSearchResult(URL);
		handleScamGoogleSearchResult(URL + " scam");
		setShowTable(true);
	};

	const headingText = (
		<h1 style={{ fontSize: 35, fontFamily: "Roboto-medium" }}>SCAM INSPECTOR</h1>
	);

	const firstColumn = (
		<List component={Paper}>
			<ListItem>
				<ListItemText>
					<Divider textAlign="left" style={{ color: "#999" }}>
						Websites info
					</Divider>
				</ListItemText>
			</ListItem>
			<ListItem>
				<ListItemText>
					<span>
						<b style={{ padding: 5 }}>Registration date:</b>
						{regDate === "-1" ? <CircularProgress size={20} /> : regDate}
					</span>
				</ListItemText>
			</ListItem>
			<ListItem>
				<ListItemText>
					<span>
						<b style={{ padding: 5 }}>Page Count:</b>
						{pageCount > 0 ? (
							pageCount
						) : pageCount === 0 ? (
							"No public sitemap found!!"
						) : (
							<CircularProgress size={20} />
						)}
					</span>
				</ListItemText>
			</ListItem>
		</List>
	);

	const secondColumn = (
		<List component={Paper}>
			<ListItem>
				<ListItemText>
					<Divider textAlign="left" style={{ color: "#999" }}>
						Top Google Search
					</Divider>
				</ListItemText>
			</ListItem>

			{topGoogleSearchResults.length > 0 ? (
				topGoogleSearchResults.map((item) => (
					<ListItem style={{ paddingTop: 0, paddingBottom: 0 }} key={item.url}>
						<ListItemText
							primary={
								<>
									<a href={item.url}>
										<h3 style={{ marginBottom: 0 }}>{item.title}</h3>
									</a>
									<span
										style={{
											color: "black",
											fontSize: "12px",
										}}
									>
										{<span style={{ wordWrap: "break-word" }}>{item.url}</span>}
									</span>
								</>
							}
							secondary={item.description}
						/>
					</ListItem>
				))
			) : (
				<ListItem>
					<ListItemText>No google search found</ListItemText>
				</ListItem>
			)}
		</List>
	);

	const thirdColumn = (
		<List component={Paper}>
			<ListItem>
				<ListItemText>
					<Divider textAlign="left" style={{ color: "#999" }}>
						Scam Reports
					</Divider>
				</ListItemText>
			</ListItem>
			{scamGoogleSearchResults.length > 0 ? (
				scamGoogleSearchResults.map((item) => (
					<ListItem style={{ paddingTop: 0, paddingBottom: 0 }} key={item.url}>
						<ListItemText
							primary={
								<>
									<a href={item.url}>
										<h3 style={{ marginBottom: 0 }}>{item.title}</h3>
									</a>
									<span
										style={{
											color: "black",
											fontSize: "12px",
										}}
									>
										{item.url.includes("reddit.com") ||
										item.url.includes("scamfoo.com") ||
										item.url.includes("scamadviser.com") ? (
											<b style={{ color: "red", wordWrap: "break-word" }}>
												{item.url}
											</b>
										) : (
											<span style={{ wordWrap: "break-word" }}>
												{item.url}
											</span>
										)}
									</span>
								</>
							}
							secondary={item.description}
						/>
					</ListItem>
				))
			) : (
				<ListItem>
					<ListItemText>No google search found related to scam</ListItemText>
				</ListItem>
			)}
		</List>
	);

	const mainTable = (
		<Container style={{ padding: 10 }} maxWidth={"sm"}>
			<div style={{ margin: 10 }}>{firstColumn}</div>
			<div style={{ margin: 10 }}>{secondColumn}</div>
			<div style={{ margin: 10 }}>{thirdColumn}</div>
		</Container>
	);

	const searchBar = (
		<Paper
			component="form"
			sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
			onSubmit={handleOnsubmit}
		>
			<InputBase
				sx={{ ml: 1, flex: 1 }}
				placeholder="Inspect URL"
				inputProps={{ "aria-label": "inspect url" }}
				value={searchText}
				onChange={(e) => setSearchText(e.target.value)}
			/>
			<IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
				<SearchIcon />
			</IconButton>
		</Paper>
	);

	return (
		<div className="App">
			<center>
				{headingText}
				{searchBar}
				{showTable ? (
					mainTable
				) : (
					<div style={{ fontSize: "30px", margin: "60px" }}>NO RESULT YET!!</div>
				)}
			</center>
		</div>
	);
}

export default App;
