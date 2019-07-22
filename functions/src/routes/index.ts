import express = require("express");
import cors = require("cors");

const router = express.Router();

router.get("/", cors(), (req, res) => {
  res.send("<h1>Welcome to the Bunkr API</h1>")
})

module.exports = router;