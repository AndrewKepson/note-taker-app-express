const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 3000;

// * The following HTML routes should be created:

//   * GET `/notes` - Should return the `notes.html` file.
// app.get('/notes', (req, res) => res.send('../../notes.html'));
//   * GET `*` - Should return the `index.html` file
// app.get('*', (req, res) => res.send('../../index.html'));


// * The following API routes should be created:
//   * GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.
app.get('/api/notes', (req, res) => {
    fs.readFile('../../../db/db.json', (err, data) => {
        if (err) throw err;

        res.json(data);
    });
});


//   * POST `/api/notes` - Should receive a new note to save on 
// the request body, add it to the `db.json`
// file, and then return the new note to the client.
app.post('./api/notes', (req, res) => {
    const newNote = req.body;

    const noteWithId = {...newNote, id: uuidv4()}

    fs.appendFile('../../../db/db.json', noteWithId, function (err) {
        if (err) throw err;

        res.json(newNote);
    });
});

//   * DELETE `/api/notes/:id` - 
// Should receive a query parameter containing 
//the id of a note to delete. This means you'll need to
// find a way to give each note a unique `id` when it's saved. 
//In order to delete a note, you'll need to read all notes
// from the `db.json` file, remove the note with the given 
//`id` property, and then rewrite the notes to the `db.json` file.
app.delete('/api/notes/:id', () => {
    // const { id } = req.params; // 1

    // map, filter, express basics, url foundations,
    // http verbs, http status code, postman
    // [{id: 1, "title":"Test Title",} {id: 2, "text":"Test text"}]

    fs.readFile('../db/db.json', (err, data) => {
        if (err) throw err;

        const filteredNotes = data.filter((note) => note.id !== id);

        fs.writeFile('../db/db.json', filteredNotes,  (err, data) => {
            console.log('done');
        });

        res.json(data);
    });
});



app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))