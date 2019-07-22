import express = require("express");

const router = express.Router();

router.get('/', async (req: any, res: any) => {
  res.set("Cache-Control", "public, max-age=3000, s-maxage=6000");

});

module.exports = router;