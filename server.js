const express = require("express");
const app = express();

//port information

const PORT = process.env.PORT || 8080;

//landing page

app.get("/", (req, res) => {
    res.send("This is the start of my app file!");
});


//this is always at the end

app.listen(PORT, () => {
    console.log(`App is listening on http://localhost:${PORT}!`);

});