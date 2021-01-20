// todo: Read these comment
// path = C:\Program Files\MongoDB\Server\4.2\bin>
// open cmd and command list
// 1. mongo
// 2. show dbs
// 3. use task-manager // dbName
// 4. show collections
// 5. db.users.find().pretty() or any correct function


require('./db/mongoose')
const User = require('./models/User');
const Task = require('./models/Task');
const express = require('express');
var bodyParser = require('body-parser');
const userRouter = require('./routes/users')
const taskRouter = require('./routes/tasks')

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

const app = express()
app.use(express.json());
app.use('/users', userRouter);
app.use('/tasks', taskRouter);
const port = process.env.PORT || 3000;



app.listen(port, ()=>{
    console.log("listening!!!")
})