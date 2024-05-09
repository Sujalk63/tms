const express = require("express");

const router = express.Router();

router.get("/login", (req, res) => {
  res.send("this is employee login");
});

module.exports = router
