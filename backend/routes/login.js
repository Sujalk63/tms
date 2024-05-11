const express = require("express");
const router = express.Router();
// const employeeLoginHandler = require("./employee");
const user = require("./user");

router.use("/user", user);
// router.use("/employee", employeeLoginHandler);

module.exports = router;
