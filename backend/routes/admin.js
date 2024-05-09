const express = require("express");

const router = express.Router();

router.get("/login", (req, res) => {
  res.send("this is admin login");
});

module.exports = router;
