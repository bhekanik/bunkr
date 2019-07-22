import express = require("express");
import cors = require("cors");

const router = express.Router();

router.get("/", cors(), async (req: any, res: any) => {
  res.set("Cache-Control", "public, max-age=3000, s-maxage=6000");

})

module.exports = router;