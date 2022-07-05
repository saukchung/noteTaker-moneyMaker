// DEPENDENCIES
const express = require('express');
const path = require('path');
const api = require('./routes/index.js');
const notes = require("./db/db.json");
const fs = require('fs');

// Set up the port
const PORT = process.env.PORT || 3001;
// Call in express and store in app(var)
const app = express();

// Middlewares
//custom logging middleware
//parsing JSON and urlencoded form data middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// middleware to access the public file
app.use(express.static('public'));


// GET route for the public page
app.get('/notes', (req, res) => {
  console.log(notes);
  res.sendFile(path.join(__dirname, '/public/notes.html'))
});

// GET route for all saved note
app.get('/api/notes', (req, res) => {
  res.json(notes);
});


// POST route for when the save button is clicked
app.post('/api/notes', (req, res) => {
  req.body = {"id":notes.length, ...req.body}
  notes.push(req.body);
  fs.writeFile("./db/db.json", JSON.stringify(notes, null, 2), "utf8", (err) =>{
    if (err) return console.err;
    })
  res.json(notes);
});
  
  
// DELETE /api/notes/:id 
app.delete('/api/notes/:id', (req, res) => {
  res.json(notes.pop(req.params.id));
});
  

// GET * return index.html
app.get('/*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);



app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);

