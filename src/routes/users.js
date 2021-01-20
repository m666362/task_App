const User = require('./../models/User');
const express = require('express');
var bodyParser = require('body-parser');
const mongoose = require("mongoose");
const auth = require('./../middlewears/auth')

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({extended: false});

const router = new express.Router();
router.use(express.json());

// todo: Get-All
router.get('/', auth,  async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users)
    } catch (e) {
        res.send(e)
    }
})

// todo: Get-One
router.get('/:id', urlencodedParser, async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId)
        user.save();
        res.send(user)
    } catch (e) {
        res.send(e)
    }
})

// todo: Update
router.put('/:id', urlencodedParser, async (req, res) => {
    try {
        const userId = req.params.id;
        const updates = await req.body;
        const user = await User.findByIdAndUpdate(userId, updates)
        user.save();
        res.send(user)
    } catch (e) {
        res.send(e)
    }
})

// todo: Create
router.post('/', urlencodedParser, async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.send(user)
    } catch (e) {
        res.send(e)
    }
})

// todo: login
router.post('/login/', urlencodedParser, async (req, res) => {
    try {
        const {email, password} = await req.body;
        const user = await User.findByCredentials(email, password)
        console.log(user)
        if (!user)
            return res.send("Something wrong happened")
        const accessToken = await User.generateAccessToken(user._id, password);
        res.send(user);

    } catch (e) {
        res.send(e)
        console.log(e)
    }
})

// todo: Delete All
router.delete('/', urlencodedParser, async (req, res) => {
    try {
        const result = await User.collection.drop();
        res.send(result)
    } catch (e) {
        res.send(e)
    }
})

// todo: Delete One
router.delete('/:id', urlencodedParser, async (req, res) => {
    try {
        const userId = req.params.id;
        var user = await User.findByIdAndDelete(userId);
        const result = {
            userInfo: user._doc,
            message: "This user has been deleted successfully!!!"
        }
        res.send(result);
    } catch (e) {
        res.send(e)
    }
})

module.exports = router;