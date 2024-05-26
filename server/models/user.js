const mongoose = require('mongoose')
const Schema = mongoose.Schema
const jwt = require('jsonwebtoken')
require('dotenv').config()

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        trim: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
    return token
}


const User = mongoose.model('User', userSchema);
module.exports = User