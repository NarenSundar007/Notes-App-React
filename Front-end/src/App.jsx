import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [editId, setEditId] = useState(null); // Track the ID of the note being edited
  const [editText, setEditText] = useState(''); // Track the updated note text

  useEffect(() => {
    axios.get('http://localhost:5000/notes').then(res => setNotes(res.data));
  }, []);

  const addNote = () => {
    if (!newNote.trim()) {
      alert('Note cannot be empty!');
      return;
    }
    const note = { id: Date.now(), text: newNote };
    axios.post('http://localhost:5000/notes', note).then(res => {
      setNotes([...notes, res.data]);
      setNewNote('');
    });
  };

  const deleteNote = (id) => {
    axios.delete(`http://localhost:5000/notes/${id}`).then(() => {
      setNotes(notes.filter(note => note.id !== id));
    });
  };

  const editNote = (id) => {
    const noteToEdit = notes.find(note => note.id === id);
    setEditId(id);
    setEditText(noteToEdit.text); 
  };

  const saveEdit = (id) => {
    axios.put(`http://localhost:5000/notes/${id}`, { text: editText })
      .then(res => {
        setNotes(notes.map(note => (note.id === id ? res.data : note))); // Update local state
        setEditId(null);
        setEditText('');
      })
      .catch(err => {
        console.error('Error saving note:', err.response?.data || err.message);
        alert('Failed to save the note. Please try again.');
      });
  };
  

  const cancelEdit = () => {
    setEditId(null);
    setEditText('');
  };

  return (
    <div className="Container">
      <div className="box">
        <h1 className="heading">Notes App</h1>
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Write a note..."
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              addNote();
            }
          }}
        />
        <button onClick={addNote}>Add Note</button>
        <ol>
          {notes.map(note => (
            <li key={note.id}>
              {editId === note.id ? (
                <>
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <button onClick={() => saveEdit(note.id)}>Save</button>
                  <button onClick={cancelEdit}>Cancel</button>
                </>
              ) : (
                <>
                  {note.text}
                  <button className="delete" onClick={() => deleteNote(note.id)}>
                    Delete
                  </button>
                  <button className="edit" onClick={() => editNote(note.id)}>
                    Edit
                  </button>
                </>
              )}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default App;
