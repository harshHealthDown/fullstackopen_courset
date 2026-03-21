const mongoose = require('mongoose')
//

if (process.argv.length<3){
    console.log('give password as argument')
    process.exit(1)
}

/*
The practice application assumes that it will be passed the password from the credentials we created in MongoDB Atlas, as a commond line parameter. We can access the command line parameter like this:
*/

/*
When the code is run with the command node mongo.js yourPassword, Mongo will add a new document to the database. NB: the password is the password created for the database user, not your MongoDB Atlas password. Also, if you created a password with special characters, then you'll need to URL encode that password.
*/

const password = process.argv[2]

const url = `mongodb+srv://harshp572004_db_user:${password}@cluster0.84qrjm3.mongodb.net/noteApp?appName=Cluster0`

mongoose.set('strictQuery',false)

/*
(1) connection to the database is established with the command
first argument is the url 
second one is an object that defines the required settings. MongoDB Atlas supports only IPv4 addresses, so with the object {family:4} we specify that the connection should always use IPv4.
*/
mongoose.connect(url,{family:4})

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

Note.find({}).then(result => {
    result.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
})

//the parameter of find describe the search condition
//if it's empty object like this {} then it's means to return all object
//we would restrict our search to only include important notes like this:
/*
Note.find({important:true}).then(result=>{
    //..
})
*/

// const note = new Note({
//   content: 'HTML is Easy',
//   important: false,
// })

// note.save().then(result => {
//     console.log('note saved!',result)
//     mongoose.connection.close()//if the connection is not closed like this then thte connection remains open until the program terminates.
// })