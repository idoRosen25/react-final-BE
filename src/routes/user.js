const router = require("express").Router();

router.get("/:id", (req, res) => {
  const { auth_token } = req.headers;
  const { id } = req.params;
  if (!auth_token) {
    res.status(401).json({ message: "unauthorized" });
  }
  if (!id) {
    res.status(400).json({ message: "bad request" });
  }

  res.json({ message: "get user by id: " + id });
});

router.get("*", (req, res) => {
  res.status(404).json({ message: "not found" });
});
module.exports = router;
