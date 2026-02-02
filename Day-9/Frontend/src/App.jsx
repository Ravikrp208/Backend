import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([])

  console.log("hello intrigation")

  function fetchNotes() {
    axios.get("http://localhost:3000/api/notes")

    .then(res=>{
      setNotes(res.data.notes)
    })
  }

  useEffect(() =>{
    fetchNotes ()
  },[])

 function handleSumit(e) {
  e.preventDefault() 

  const {title, description } =e.traget.elements
  console.log(title.value, description.value)
  axios.post("http://localhost:3000/api/notes",{
    title:title.value,
    description:description
  })
  .then(res=>{
    console.log(res.data)

    fetchNotes()
  })
 }

   /**
    * delete handle index id se delete ho rah hai notes data
    */
   function handleDeleteNote(noteId) {
     axios.delete("http://localhost:3000/api/notes/" + noteId).then((res) => {
       console.log(res.data);
       fetchNotes();
     });
   }

  return (
    <>
      <form className=" notes-create-from" >
        <input type="text" placeholder="Enter-title"></input>
        <input type="text" placeholder="Enter-description"></input>
        <button>create note</button>
      </form>
      <div className="notes">
        {notes.map((note) => {
          return (
            <div className="note">
              <h1>{note.title}</h1>
              <p>{note.description}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
