const express = require('express')
const app = express()
const cors = require('cors')

/*
To access the data easily, we need the help of the Express json-parser that we can use with the command 
app.use(express.json())
let's activate the json-parser and implement an intial handler for dealing with the HTTP POST request.
Without the json-parser, the body property would be undefined. The json parser takes the JSON data of a request, transforms it into a Javascript object and then attaches it to the body property of the request object before the route handler is called.
*/
app.use(cors())
app.use(express.json())

let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]

app.get('/',(request,response) => {
    response.send('<h1>Hello World!</h1>')

    /*
    byDefault, set the Content-Type header to be text/html and status code of the response defaults to 200.
    */

})

app.get('/api/notes',(request,response) => {
    response.json(notes)
})

app.get('/api/notes/:id',(request,response)=>{
    const id = request.params.id
    const note = notes.find(note=>note.id == id)
    if (note) {
        response.json(note)
    } else {
        response.status(404).end()
        /*
        responding to request without sending any data. unlike we can send something to show like 404 discord error.
        anyway, it's possible to give a clue about the reason for sending a 404 error by overriding the default NOT FOUND message.
        */
    }
})

app.delete('/api/notes/:id',(request,response) => {
    const id = request.params.id
    notes = notes.filter(note => note.id !== id)
    response.status(204).end()
})

const generateId = () => {
    const maxId = notes.length > 0
        ? Math.max(...notes.map(n => Number(n.id)))
        : 0
    return String(maxId + 1)
}

app.post('/api/notes',(request,response) => {
    const body = request.body
    
    if (!body.content) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const note = {
        content: body.content,
        important: body.important || false,
        id: generateId(),
    }

    notes = notes.concat(note)

    /*
    A potential cause for issues is an incorrectly set Content-Type header in requests. This can happen with Postman if the type of body is not defined correctly.(change content-type from text/plain to application/json)
    */

    response.json(note)
})

const PORT = process.env.PORT || 3001
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})

/*
using node --watch to track changes and automatically restarting the application but you need to restart browser to see changes.
add "dev" : "node --watch index.js"
we can now start the server in development mode with the command : npm run dev
unlike when running the start or test scripts, the command must include run.
*/

/*
for testing you can use command line program curl or Postman for testing the application
*/
