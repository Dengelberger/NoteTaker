const path = require("path");
const express = require("express");
const app = express();

//port information

const PORT = process.env.PORT || 8080;

// API Routes

// GET/api/notes
// get data somehow from db.json;
// return res.json(data);

// POST/api/notes
// receive JSON obj from the front end
// return res.status(200);

// DELETE/api/notes/:id  ==> id is which notes to delete.

// HTML Routes
app.use(express.static("public"));

// GET /notes ==> notes.html
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});
// GET * ==> index.html
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

//this is always at the end

app.listen(PORT, () => {
    console.log(`App is listening on http://localhost:${PORT}/`);

});