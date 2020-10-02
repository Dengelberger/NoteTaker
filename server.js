const fs = require("fs");
const path = require("path");
const express = require("express");
const { runInNewContext } = require("vm");
const app = express();

//port information

const PORT = process.env.PORT || 8001;

// Parsing code for middleware
//API's
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//HTML's
app.use(express.static("public"));


// API Routes

// GET/api/notes THIS GETS THE NOTES THAT HAVE ALREADY BEEN STORED IN THE DATABASE AND SENDS THEM TO BUILD THE LEFT SIDEBAR.
app.get("/api/notes", (req, res) => {
    fs.readFile("./db/db.json", "utf8", function (err, data) {
        var db = JSON.parse(data);
        return res.json(db);
    });

});
// POST/api/notes THIS TAKES WHATEVER THE USER SETS UP AS A NEW SET OF NOTES AND SENDS IT TO THE DATABASE AND ADDS IT TO THE SIDEBAR. THIS IS THE "SAVE" BUTTON ON THE NOTES PAGE.
app.post("/api/notes", function (req, res) {
    //take "Tilte" and "text" from req.body and make a newNote with them including a new ID
    fs.readFile("./db/db.json", "utf8", function (err, data) {
        var db = JSON.parse(data);
        var newNote = req.body;
        newNote.id = db.length == 0 ? 0 : db[db.length - 1].id + 1
        console.log(newNote);
        //push to database
        db.push(newNote);
        console.log(db);
        //return updated database
        fs.writeFile(path.join(__dirname, 'db/db.json'), JSON.stringify(db), (err) => {
            if (err) throw err;
            return res.json(newNote);
        })
        // Display database in json format.

    });
});

// DELETE/api/notes/:id  ==> id is which notes to delete. THIS DELETES WHATEVER NOTES ARE SELECTED FROM THE SIDEBAR FROM THE SIDEBAR AND FROM THE DATABASE. THIS IS THE GARBAGE CAN ICON.

app.delete("/api/notes/:id", function (req, res) {
    fs.readFile("./db/db.json", "utf8", function (err, data) {
        var delNote = req.params.id;
        var db = JSON.parse(data);
        console.log(delNote);
        var newDb = [];
        for (i = 0; i < db.length; i++) {
            if (delNote != db[i].id) {
                console.log("found it!");
                newDb.push(db[i]);
            }

        }
        console.log(newDb);

        fs.writeFile(path.join(__dirname, 'db/db.json'), JSON.stringify(newDb), (err) => {
            if (err) throw err;
            console.log("deleted!")
            return res.json(newDb)
        });

    });

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

})