const fs = require("fs");
const path = require("path")
const express = require("express");
const logger = require("morgan")
const { v4: uuidv4 } = require("uuid")
const app = express();
const PORT = process.env.PORT || 8080;

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"))
app.use(logger("dev"));

app.get("/", function (req, res) {

    res.sendFile(__dirname + "/public/index.html");

});


//View all notes
app.get("/api/notes", function (req, res) {
    fs.readFile(__dirname + "/db/db.json", "utf8", function (err, data) {

        const notes = JSON.parse(data)

        res.json(notes)
    });
});

//POST - add new notes
app.post("/api/notes", function (req, res) {
    const note = {
        id: uuidv4(),
        ...req.body,
    };

    fs.readFile(__dirname + "/db/db.json", "utf8", function (err, data) {
        const notes = JSON.parse(data);
        notes.push(note);

        const stringifiedData = JSON.stringify(notes, null, 2);

        fs.writeFile(__dirname + "/db/db.json", stringifiedData, function () {
           res.json(note);
        });
    });


   
});

