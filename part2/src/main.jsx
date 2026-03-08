// import axios from 'axios'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
// axios
//   .get('http://localhost:3001/notes')
//   .then(response=>{
//     const notes = response.data
//     ReactDOM.createRoot(document.getElementById('root')).render(<App notes={notes}/>)
//   })
//using axios here is problematic. let's instead move the fetching of the data into the App component.
ReactDOM.createRoot(document.getElementById('root')).render(<App/>)