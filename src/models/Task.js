const mongoose = require('mongoose')
const validator = require('validator')

const taskSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

taskSchema.pre('save', async function (next) {
    const task = this;

    next();
})

const Task = mongoose.model("tasks", taskSchema);

module.exports = Task;