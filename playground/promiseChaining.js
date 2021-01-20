// todo: Read these comment
// path = C:\Program Files\MongoDB\Server\4.2\bin>
// open cmd and command list
// 1. mongo
// 2. show dbs
// 3. use task-manager // dbName
// 4. show collections
// 5. db.users.find().pretty() or any correct function


const express = require('express');
require('./db/mongoose')
const User = require('./models/User');
var bodyParser = require('body-parser');

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

const router = express()
router.use(express.json());
const port = process.env.PORT || 3000;

// Get all
router.get('/', (req, res)=>{
    User.find({}).then((users)=>{
        res.send(users)
    }).catch((error)=>{
        res.send(error)
    })
})

// get by id & promise chaining
router.put('/:id', urlencodedParser, (req, res)=>{
    User.findByIdAndUpdate(req.params.id, {
        name: "m666362"
    }).then((user)=>{
        return User.countDocuments({
            name: "Md Rayhan"
        }).then((count)=>{
            res.send(user)
            console.log(count)
        }).catch((err)=>{
            res.send(err)
        })
    })
})

router.post('/', urlencodedParser, (req, res)=>{
    const user = new User(req.body);
    user.save().then((result)=>{
        res.send(user);
    }).catch((error)=>{
        res.status(400).send(error)
    })
})

router.listen(port, ()=>{
    console.log("listening!!!")
})