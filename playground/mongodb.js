// todo: Read the note
// path = C:\Program Files\MongoDB\Server\4.2\bin>
// open cmd and command list
// 1. mongo
// 2. show dbs
// 3. use task-manager // dbName
// 4. show collections
// 5. db.users.find().pretty() or any correct function
const express = require('express');
const router = express()

const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient;

const connectionURL = 'mongodb://127.0.0.1:27017';
const dbName = 'task-manager';
MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client)=> {
    if (error) {
        return console.log('Unable to connect to database!');
    }
    const db = client.db(dbName)
    db.collection('users').insertOne({
        name: "Md Rayhan",
        age: 28
    })

    // Start to interact with the database


    router.get('/', (req, res)=>{
        db.collection('users').find({}).toArray((error, result)=>{
            if (error)
                return res.send("Not working")
            res.send(result);
        })
    })

    router.get('/:name', (req, res)=>{
        console.log(req.params.name)
        db.collection('users').findOne({
            name: "MEGAMIND"
        },(error, result)=>{
            if(error)
                return console.log(error)
            else
                res.send(result)
        })
    })

    router.listen(3000)
})
