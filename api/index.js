const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const Transaction = require("./models/Transaction.js");
const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());
app.get("/api/test", (req, res) => {
	res.json("test ok");
});

app.post("/api/transaction", async (req, res) => {
	await mongoose.connect(process.env.MONGO_URL);
	const { name, description, datetime, price } = req.body;
	const transaction = Transaction.create({
		name,
		description,
		datetime,
		price,
	});
	res.json(transaction);
});

app.get("/api/transactions", async (req, res) => {
	await mongoose.connect(process.env.MONGO_URL);
	const transactions = await Transaction.find();
	res.json(transactions);
});
app.listen(process.env.PORT || 4000, () =>
	console.log("Server Listening on PORT: 4000")
);
