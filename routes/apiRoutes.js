const router = require("express").Router();
// This npm dependencies will create a random number will use for ID
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

router.get("/notes", (req, res) => {
  // This will retrieve the data from the db file with a variable
  let notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  return res.json(notes);
});

router.post("/notes", (req, res) => {
  let newNote = req.body;
  // will use uuid to create id's for each note
  newNote.id = uuidv4();
  //create variable from db.json file
  let notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  notes.push(newNote);
  //write notes variable to db.json file
  fs.writeFileSync("./db/db.json", JSON.stringify(notes));
  return res.json(notes);
});

// This is in charge of deleting a specific note created by a specific id
router.delete("/notes/:id", (req, res) => {
    //The selected note will retrieve its id and pass it on as a deleted note 
    let deletedNote = req.params.id;
    //This will be fetched in the javascript and create an array for it
    let arr = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    //new arr without deleteFile
    let newArr = arr.filter((file) => file.id !== deletedNote);
    //rewrite json file with new arr
    fs.writeFileSync("./db/db.json", JSON.stringify(newArr));
    //return without deleted note
    return res.json(newArr);
  });

module.exports = router;