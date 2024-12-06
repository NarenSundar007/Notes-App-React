import React, { useState, useEffect } from 'react';
import axios from 'axios';


function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

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

  return (
    <div className="Container">
      <div className='box'>
      <h1 className='heading'>Notes App</h1>
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
      <ol >
        {notes.map(note => (
          <li key={note.id}>
            {note.text} 
            <button className='delete' onClick={() => deleteNote(note.id)}>Delete</button>
          </li>
        ))}
      </ol>
      </div>
    </div>
  );
}

export default App;
