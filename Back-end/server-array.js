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
  console.log(note);
  res.json(note);
});
app.delete('/notes/:id', (req, res) => {
  notes = notes.filter(note => note.id !== parseInt(req.params.id));
  res.json({ message: 'Note deleted' });
});

app.put('/notes/:id', (req, res) => {
  const noteId = parseInt(req.params.id);
  const updatedData = req.body;

  if (!updatedData.text) {
    return res.status(400).json({ message: 'Text field is required' });
  }

  const note = notes.find(note => note.id === noteId);
  note.text = updatedData.text;

  res.json(note);
}
);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

