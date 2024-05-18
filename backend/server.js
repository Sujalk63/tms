require('dotenv').config();
const express = require("express");
const mainRouter = require("./routes/index");
const { json } = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URL);  // from .env

app.use("/api/v1", mainRouter);

app.listen(4000);
console.log("server runnning at port 4000");
