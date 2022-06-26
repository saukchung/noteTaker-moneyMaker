// DEPENDENCIES
const express = require('express');
const path = require('path');
const { clog } = require('./middleware/clog');
const api = require('./routes/index.js');
const notes = require("./db/db.json")

// Set up the port
const PORT = process.env.PORT || 3001;
// Call in express and store in app(var)
const app = express();

// Middlewares
//custom logging middleware
app.use(clog);
//parsing JSON and urlencoded form data middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// route for landing page
app.use(express.static('public'));

// CREATE a new note

// GET route for all the notes
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET route for specific note
app.get('/api/notes', (req, res) =>
  res.json(notes)
);


// POST route for when the save button is clicked

// GET * return index.html
app.get('/*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);

