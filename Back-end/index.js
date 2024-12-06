const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());

let notes = [];

app.get('/notes', (req, res) => res.json(notes));
app.post('/notes', (req, res) => {
  const note = req.body;
  notes.push(note);
  res.json(note);
});
app.delete('/notes/:id', (req, res) => {
  notes = notes.filter(note => note.id !== parseInt(req.params.id));
  res.json({ message: 'Note deleted' });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

