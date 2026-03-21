require('dotenv').config()
const express = require('express')
const Note = require('./models/note')
const app = express()

// const cors = require('cors')
/*
To access the data easily, we need the help of the Express json-parser that we can use with the command 
app.use(express.json())
let's activate the json-parser and implement an intial handler for dealing with the HTTP POST request.
Without the json-parser, the body property would be undefined. The json parser takes the JSON data of a request, transforms it into a Javascript object and then attaches it to the body property of the request object before the route handler is called.
*/
app.use(express.static('dist'))
// app.use(cors())
app.use(express.json())
//app.use(requestLogger) #correct order
//It's also important that the middleware for handling unsupported routes is loaded only after all the endpoints have been defined, just before the error handler.
/*
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
*/
app.get('/',(request,response) => {
    response.send('<h1>Hello World!</h1>')
    /*
        byDefault, set the Content-Type header to be text/html and status code of the response defaults to 200.
    */
})
app.get('/api/notes',(request,response) => {
    Note.find({}).then(notes=>{
        response.json(notes)
    })
})

app.get('/api/notes/:id',(request,response,next)=>{
    /* 
    const id = request.params.id
    const note = notes.find(note=>note.id == id)
    if (note) {
        response.json(note)
    } else {
        response.status(404).end()
        //responding to request without sending any data. unlike we can send something to show like 404 discord error.
        //anyway, it's possible to give a clue about the reason for sending a 404 error by overriding the default NOT FOUND message.
    }
    */
    Note.findById(request.params.id).then(note => {
        if (note) {
            response.json(note)
        } else {
            response.status(404).end()
        }
    })
    .catch(error => next(error))
    /*
    There's one more error situation that needs to be handled. In this situation, we are tryping to fetch a note with the wrong kind of id, meaning an id that doesn't match the Mongo identifier format.
    */
})

app.put('/api/notes/:id',(request,response,next) => {
    const {content, important} = request.body

    Note.findById(request.params.id)
        .then(note => {
            if (!note) {
                return response.status(404).end()
            }

            note.content = content
            note.important = important

            return note.save().then((updatedNote) => {
                response.json(updatedNote)
            })
        })
        .catch(error => next(error))
})

app.delete('/api/notes/:id',(request,response) => {
    /*
    const id = request.params.id
    notes = notes.filter(note => note.id !== id)
    response.status(204).end()
    */
    Note.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})
/*
const generateId = () => {
    const maxId = notes.length > 0
        ? Math.max(...notes.map(n => Number(n.id)))
        : 0
    return String(maxId + 1)
}
*/
app.post('/api/notes',(request,response) => {
    const body = request.body
    /*
    if (!body.content) {
        return response.status(400).json({
            error: 'content missing'
        })
    }
    */
    const note = new Note({
        content: body.content,
        important: body.important||false,
    })
    /*
    {
        content: body.content,
        important: body.important || false,
        id: generateId(),
    }
    notes = notes.concat(note)
    response.json(note)
    */
    /*
    A potential cause for issues is an incorrectly set Content-Type header in requests. This can happen with Postman if the type of body is not defined correctly.(change content-type from text/plain to application/json)
    */
    note.save().then(savedNote => {
        response.json(savedNote)
    }).catch(error => next(error))
})

app.use((request,response) => {response.status(404).send({error:'unknown endpoint'})})

const errorHandler = (error,request,response,next) => {
    console.error(error.message)

    if (error.name == 'CastError') {
        return response.status(400).send({error: 'malformatted id'})
    } else if (error.name == 'ValidationError') {
        return response.status(400).json({error: error.message})
    }
    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
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
