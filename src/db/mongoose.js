const mongoose = require('mongoose');

const dbName = 'task-manager-api';
const connectionUrl = 'mongodb://127.0.0.1:27017/'+dbName;

mongoose.connect(connectionUrl, {
    useNewUrlParser: true,
    useCreateIndex: true
}).then((result)=>{
    console.log("Mongoose Connected")
}).catch((err)=>{
    console.log(err)
})

