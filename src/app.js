// todo: Read these comment
// path = C:\Program Files\MongoDB\Server\4.2\bin>
// open cmd and command list
// 1. mongo
// 2. show dbs
// 3. use task-manager // dbName
// 4. show collections
// 5. db.users.find().pretty() or any correct function

const express = require('express');
const validator = require('validator')
const mongoose = require('mongoose');

const router = express()

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
    email: {
        type: String,
        required: true,
        validate(value){
            if (!validator.isEmail(value)){
                throw new Error("Invalid email");
            }
        }
    },
    age: {
        type: Number,
        validate(value){
            if (value<0){
                throw new Error("Age must be greater than 18")
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value){
            if (!validator.isLength(value, {
                min:7,
                max: 40
            })){
                throw new Error("Password length error")
            }
            else if (validator.equals(value, "password")){
                throw new Error("Password error")
            }
        }
    }
})

const rayhan = new User({
    name: "m666362",
    email: "mdrayhan9464@gmail.com",
    password: "dfdsdfdfdsf "
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
