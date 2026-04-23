import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);
  const [editText, setEditText] = useState("");

  const API = "http://localhost:3000/api/notes";

  function fetchNotes() {
    axios
      .get(API)
      .then((res) => setNotes(res.data.notes))
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const { title, description } = e.target.elements;

    axios
      .post(API, {
        title: title.value,
        description: description.value,
      })
      .then(() => {
        fetchNotes();
        e.target.reset();
      })
      .catch((err) => console.error(err));
  }

  function handleDelete(id) {
    axios
      .delete(API + "/" + id)
      .then(() => fetchNotes())
      .catch((err) => console.error(err));
  }

  function handleUpdate(id) {
    axios
      .patch(API + "/" + id, {
        description: editText,
      })
      .then(() => {
        setEditText("");
        fetchNotes();
      })
      .catch((err) => console.error(err));
  }

  return (
    <>
      <h1>Notes App</h1>

      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Enter title" required />
        <input name="description" placeholder="Enter description" required />
        <button type="submit">Create Note</button>
      </form>

      <hr />

      {notes.map((note) => (
        <div
          key={note._id}
          style={{ border: "1px solid black", padding: 10, margin: 10 }}
        >
          <h3>{note.title}</h3>
          <p>{note.description}</p>

          <input
            placeholder="New description"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />

          <br />
          <br />

          <button onClick={() => handleUpdate(note._id)}>Rename</button>
          <button onClick={() => handleDelete(note._id)}>Delete</button>
        </div>
      ))}
    </>
  );
}

export default App;
