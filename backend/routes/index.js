const express = require("express");
const router = express.Router();
const user = require("./user");
const taskRoom = require("./taskRoom");

router.use("/users", user);
router.use("/taskroom", taskRoom);


module.exports = router;
