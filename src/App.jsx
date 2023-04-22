import { useEffect, useState } from "react";
import "./App.css";

function App() {
	const [name, setName] = useState("");
	const [datetime, setDatetime] = useState("");
	const [description, setDescription] = useState("");
	const [transactions, setTransactions] = useState([]);

	useEffect(() => {
		getTransactions().then(setTransactions);
	}, []);

	async function getTransactions() {
		const response = await fetch(
			"http://localhost:4000/api" + "/transactions"
		);
		return await response.json();
	}
	function addNewTransaction(e) {
		e.preventDefault();
		const url = "http://localhost:4000/api" + "/transaction";

		const price = name.split(" ")[0];
		fetch(url, {
			method: "POST",
			headers: { "Content-type": "application/json" },
			body: JSON.stringify({
				price,
				name: name.substring(price.length + 1),
				description,
				datetime,
			}),
		})
			.then((res) => res.json())
			.then((json) => {
				setName("");
				setDatetime("");
				setDescription("");
				console.log(json);
			});
	}

	let balance = 0;
	transactions.forEach((t) => {
		balance += t.price;
	});

	balance = balance.toFixed(2);
	console.log(balance);
	const fraction = balance.split(".")[1];
	balance = balance.split(".")[0];

	return (
		<main>
			<h1>
				${balance}
				<span>{fraction}</span>
			</h1>
			<form onSubmit={addNewTransaction}>
				<div className="basic">
					<input
						type="text"
						placeholder={"+200 New Samsung TV"}
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<input
						type="datetime-local"
						name=""
						id=""
						value={datetime}
						onChange={(e) => setDatetime(e.target.value)}
					/>
				</div>
				<div className="description">
					<input
						type="text"
						placeholder={"description"}
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</div>
				<button>Add new transaction</button>
			</form>
			<div className="transactions">
				{transactions?.map((item, index) => (
					<div className="transaction" key={index}>
						<div className="left">
							<div className="name">{item.name}</div>
							<div className="description">
								{item.description}
							</div>
						</div>
						<div className="right">
							<div
								className={
									"price " +
									(item.price < 0 ? "red" : "green")
								}
							>
								{item.price > 0
									? `+$${item.price}`
									: `-$${item.price * -1}`}
							</div>
							<div className="datetime">{item.datetime}</div>
						</div>
					</div>
				))}
			</div>
		</main>
	);
}

export default App;
