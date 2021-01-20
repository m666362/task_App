// todo: Read the note
// path = C:\Program Files\MongoDB\Server\4.2\bin>
// open cmd and command list
// 1. mongo
// 2. show dbs
// 3. use task-manager-api // dbName
// 4. show collections
// 5. db.users.find().pretty() or any correct function
const mongoose = require('mongoose');

const dbName = 'task-manager-api';
const connectionUrl = 'mongodb://127.0.0.1:27017/'+dbName;

mongoose.connect(connectionUrl, {
    useNewUrlParser: true,
    useCreateIndex: true
})

const User = mongoose.model("User", {
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        validate(value){
            if (value<0){
                throw new Error("Age must be greater than 18")
            }
        }
    }
})

const rayhan = new User({
    name: 123,
    age: 2
})

rayhan.save()
    .then(()=>{
        console.log(rayhan)
    }).catch((error)=>{
    console.log(error)
})


const Task = mongoose.model("Task", {
    description: {
        type: String
    },
    completed: {
        type: Boolean
    }
})

const nodeJsBoilerplate = new Task({
    description: "Make it",
    completed: false
})

nodeJsBoilerplate.save()
    .then((result)=>{
        console.log(nodeJsBoilerplate)
    }).catch((error)=>{
    console.log(error)
})