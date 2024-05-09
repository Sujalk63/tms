const express = require("express");
const loginHandler = require("./routes/login");
const { json } = require("body-parser");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", loginHandler);

app.listen(4000);
console.log("server runnning at port 4000");
