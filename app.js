const { v4: uuidv4 } = require('uuid');

const path = require('path');
var fs = require('fs');
var express = require('express');
var app = express();
const router = express.Router();

app.use(express.static('Develop/public'));
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

app.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname + '/Develop/public/notes.html'));
});

app.get('/api/notes', function (req, res) {
    var notes = fs.readFileSync(path.join(__dirname + '/Develop/db/db.json'));
    if (notes) {
        notes = JSON.parse(notes)
    }
    
    res.send(notes);
});

app.delete('/api/notes/:id', function (req, res) {
    var notes = fs.readFileSync(path.join(__dirname + '/Develop/db/db.json'));
    if (notes) {
        notes = JSON.parse(notes)
    }
    var index = notes.findIndex(note => note.id === req.params.id)
        if (index > -1) {
            notes.splice(index, 1)
            const notesStr = JSON.stringify(notes);
            fs.writeFileSync(path.join(__dirname + '/Develop/db/db.json'), notesStr);
        }
    res.send(notes);
});

app.post('/api/notes', function (req, res) {
    var notes = fs.readFileSync(path.join(__dirname + '/Develop/db/db.json'));
    if (notes) {
        notes = JSON.parse(notes)
    }
    var note = req.body;
    note.id = uuidv4();
    notes.push(note);
    const notesStr = JSON.stringify(notes);
    fs.writeFileSync(path.join(__dirname + '/Develop/db/db.json'), notesStr);

    res.send(notes);
});

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/Develop/public/index.html'));
});


app.listen(3000);