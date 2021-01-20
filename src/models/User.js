const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Error!!! Invalid email");
            }
        }
    },
    age: {
        type: Number,
        validate(value) {
            if (value < 18) {
                throw new Error("Age must be greater than 18")
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (!validator.isLength(value, {
                min: 7
            })) {
                throw new Error("Error!!! Password length is shorter than 7 character");
            } else if (validator.equals(value, "password")) {
                throw new Error("error")
            }
        }
    },
    tokens: [
        {
            token: {
                type: String,
            }
        }
    ]
})

userSchema.statics.generateAccessToken = async (userId, password) => {
    const user = await User.findById(userId);
    const token = jwt.sign({_id: user._id}, password);
    user.tokens = user.tokens.concat({token})
    await user.update({tokens: user.tokens})
    return token;
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email});
    if (!user)
        return false;
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
        return false;

    return user;
}

userSchema.pre('save', async function (next) {
    const user = this;
    user.password = await bcrypt.hash(user.password, 8);
    next()
})

const User = mongoose.model("users", userSchema)

module.exports = User;