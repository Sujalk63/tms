const express = require("express");
const router = express.Router();
const employeeLoginHandler = require("./employee");
const adminLoginHandler = require("./admin");

router.use("/admin", adminLoginHandler);
router.use("/employee", employeeLoginHandler);

module.exports = router;
