const Task = require('./../models/Task');
const express = require('express');
var bodyParser = require('body-parser');
const mongoose = require("mongoose");

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

const router = new express.Router();
router.use(express.json());

// todo: Get-All
router.get('/', async (req, res)=>{
    try{
        const tasks = await Task.find({});
        res.send(tasks)
    }catch (e) {
        res.send(e)
    }
})

// todo: Get-One
router.get('/:id', urlencodedParser,async (req, res)=>{
    try{
        const taskId = req.params.id;
        const task = await Task.findById(taskId)
        task.save();
        res.send(task)
    }catch (e) {
        res.send(e)
    }
})

// todo: Update
router.put('/:id', urlencodedParser,async (req, res)=>{
    try{
        const taskId = req.params.id;
        const updates = await req.body;
        const task = await Task.findByIdAndUpdate(taskId, updates)
        task.save();
        res.send(task)
    }catch (e) {
        res.send(e)
    }
})

// todo: Create
router.post('/', urlencodedParser, async (req, res)=>{
    try{
        const task = new Task(req.body);
        await task.save();
        res.send(task)
    }catch (e) {
        res.send(e)
    }
})

// todo: Delete All
router.delete('/', urlencodedParser, async (req, res)=>{
    try{
        const tasks = await Task.collection.drop();
        res.send(tasks)
    }catch (e) {
        res.send(e)
    }
})

// todo: Delete One
router.delete('/:id', urlencodedParser, async (req, res)=>{
    try{
        const taskId = req.params.id;
        var task = await Task.findByIdAndDelete(taskId);
        const result = {
            tasksInfo: task._doc,
            message: "This task has been deleted successfully!!!"
        }
        res.send(result);
    }catch (e) {
        res.send(e)
    }
})

module.exports = router;