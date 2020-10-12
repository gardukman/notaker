const { v4: uuidv4 } = require('uuid');
const path = require('path');
var fs = require('fs');
var express = require('express');
var app = express();
const router = express.Router();

// allows the public file to be used
app.use(express.static('Develop/public'));
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

// creates the path to join the notes.html to the server
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname + '/Develop/public/notes.html'));
});

// reads the notes entered into the front end and parses them into an object in db.json
app.get('/api/notes', (req, res) => {
    var notes = fs.readFileSync(path.join(__dirname + '/Develop/db/db.json'));
    if (notes) {
        notes = JSON.parse(notes)
    }
    res.send(notes);
});

// allows us to delete the notes
app.delete('/api/notes/:id', (req, res) => {
    var notes = fs.readFileSync(path.join(__dirname + '/Develop/db/db.json'));
    if (notes) {
        notes = JSON.parse(notes)
    }
    // selects the notes by the id's given in the app.post function in order to select them for deletion
    var index = notes.findIndex(note => note.id === req.params.id)
        if (index > -1) {
            notes.splice(index, 1)
            const notesStr = JSON.stringify(notes);
            fs.writeFileSync(path.join(__dirname + '/Develop/db/db.json'), notesStr);
        }
    res.send(notes);
});

// 
app.post('/api/notes', (req, res) => {
    var notes = fs.readFileSync(path.join(__dirname + '/Develop/db/db.json'));
    if (notes) {
        notes = JSON.parse(notes)
    }
    // gives each note an individual id
    var note = req.body;
    note.id = uuidv4();
    notes.push(note);
    const notesStr = JSON.stringify(notes);
    fs.writeFileSync(path.join(__dirname + '/Develop/db/db.json'), notesStr);
    res.send(notes);
});

// creates a path linking the main page index.html to the server
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/Develop/public/index.html'));
});


app.listen(3000);