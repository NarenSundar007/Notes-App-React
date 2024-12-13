//sudo systemctl start mongod

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/notesApp')
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB:', err));

// Define the Note schema and model
const noteSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  text: { type: String, required: true },
});

const Note = mongoose.model('Note', noteSchema);

// Routes
app.get('/notes', async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (err) {db.notes.find().pretty()

    res.status(500).json({ message: 'Error fetching notes' });
  }
});

app.post('/notes', async (req, res) => {
  try {
    const note = new Note(req.body);
    await note.save();
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: 'Error saving note' });
  }
});

app.delete('/notes/:id', async (req, res) => {
  try {
    await Note.deleteOne({ id: parseInt(req.params.id) });
    res.json({ message: 'Note deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting note' });
  }
});

app.put('/notes/:id', async (req, res) => {
  try {
    const noteId = parseInt(req.params.id); // Extract the note ID
    const updatedData = req.body; // Get updated data from request body

    // Ensure the updated data has the required fields
    if (!updatedData.text) {
      return res.status(400).json({ message: 'Text field is required' });
    }

    // Update the note in the database
    const updatedNote = await Note.findOneAndUpdate(
      { id: noteId }, // Filter the note by ID
      { text: updatedData.text }, // Update only the text field
      { new: true } // Return the updated document
    );

    if (!updatedNote) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.json(updatedNote); // Respond with the updated note
  } catch (err) {
    console.error('Error updating note:', err);
    res.status(500).json({ message: 'Error updating note' });
  }
});



// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
