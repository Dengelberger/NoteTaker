const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();
const db = require("./db/db.json");
const newReq = req.body;
const newNote = new Note(newReq.title, newReq.text);
const id = req.params.id;

//port information

const PORT = process.env.PORT || 8080;

// Parsing code
//API's
app.use(express.json());
//HTML's
app.use(express.static("public"));

// API Routes

// GET/api/notes THIS GETS THE NOTES THAT HAVE ALREADY BEEN STORED IN THE DATABASE AND SENDS THEM TO BUILD THE LEFT SIDEBAR.
app.get("/api/notes", (req, res) => {
    return res.json(db);
});
// POST/api/notes THIS TAKES WHATEVER THE USER SETS UP AS A NEW SET OF NOTES AND SENDS IT TO THE DATABASE AND ADDS IT TO THE SIDEBAR. THIS IS THE "SAVE" BUTTON ON THE NOTES PAGE.
app.post("/api/notes", (req, res) => {
    await.newNote.addNote()
    res.send(newNote)
});
// DELETE/api/notes/:id  ==> id is which notes to delete. THIS DELETES WHATEVER NOTES ARE SELECTED FROM THE SIDEBAR FROM THE SIDEBAR AND FROM THE DATABASE. THIS IS THE GARBAGE CAN ICON.
app.delete("/api/notes/:id", (req, res) => {
    await deleteNote(id)
    res.send("Note has been deleted.")
});
// HTML Routes

// GET /notes ==> notes.html THIS GETS THE NOTES INFO FROM THE DATABASE AND SENDS IT TO THE HTML FRAMEWORK SO THAT IT IS VISIBLE ON THE PAGE.
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});
// GET * ==> index.html THIS GETS ALL OTHER INFORMATION TAHT NEEDS TO GO TO THE MAIN HTML PAGE SO THAT IT IS VISIBLE ON THE PAGE.
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

//THIS JUST SHOWS THAT THE PORT IS OPENING AND THE APP IS WAITING FOR USER INPUT TO BE SENT TO THE SERVER.

app.listen(PORT, () => {
    console.log(`App is listening on http://localhost:${PORT}/`);

});