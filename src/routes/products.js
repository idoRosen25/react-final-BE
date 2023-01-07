const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({ message: "get all products" });
});

router.post("/", (req, res) => {
  res.json({ message: "add products" });
});

router.put("/", (req, res) => {
  res.json({ message: "update products" });
});

router.delete("/", (req, res) => {
  res.json({ message: "delete products" });
});

module.exports = router;
