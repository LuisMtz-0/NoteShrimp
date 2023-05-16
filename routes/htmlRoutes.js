const path = require("path");
const router = require("express").Router();
// this will take the user to our html page located in teh '/notes' api
router.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./../public/notes.html"));
});
// it will first load to index.html homepage once the local host is access
router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/index.html"));
});

module.exports = router;