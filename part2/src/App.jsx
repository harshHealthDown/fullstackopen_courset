import {useState, useEffect} from 'react'
import Note from './components/Note'
import {getAll, create, update} from './services/notes'
import Notification from './components/Notification'
import Footer from './components/Footer'

const App = () => {
  const [notes,setNotes] = useState([])//never provide null to this kind of state otherwise have fun with debugging and maybe it will take you years to figure out.
  const [newNote,setNewNote] = useState('a new note...')
  const [showAll,setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  /*
  Note that the key attribute must now be defined for the Note components, and not for the li tags like before.
  */
  
  useEffect(()=>{
    getAll()
      .then(initialNotes=>{
        setNotes(initialNotes)
      })
  },[])

  const toggleImportance = (id) => {
    const note = notes.find(n=>n.id==id)
    const changedNote = {...note, important: !note.important}

    /*
    shallow copy: meaning that the values of the new object are the same as the values of the old object.
    If the values of the old object were objects themselves, then the copied values in the new object would reference the same objects that were in the old object.
    */
    
    update(id,changedNote)
      .then(returnedNote=>{
        setNotes(notes.map(note=>note.id==id?returnedNote:note))
      })
      .catch(()=>{
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(()=>{
          setErrorMessage(null)
        },5000)
        setNotes(notes.filter(n=>n.id!==id))
      })

  }

  const addNote = (event) => {
    event.preventDefault()
    
    /*
    prevents default action of submitting a form. (default action would, among other things cause the page to reload)
    */
    
    const noteObject = {
      content: newNote,
      important: Math.random()<0.5,
    }

    /*
    id created by server itself
    */
    
    create(noteObject)
      .then(returnedNote=>{
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }
  
  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const notesToShow = showAll ? notes : notes.filter(note=>note.important)
  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage}/>
      <div>
        <button onClick={()=>setShowAll(!showAll)}>show {showAll?'important':'all'}</button>
      </div>
      <ul>
        {notesToShow.map((note)=><Note key={note.id} note={note} toggleImportance={()=>toggleImportance(note.id)}/>)}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange}/>
        <button type="submit">save</button>
      </form>
      <Footer/>
    </div>
  )
}
export default App