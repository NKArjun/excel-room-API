const mongoose = require('mongoose');
const Joi = require('joi');
const appDebugger = require('debug')('app:startup');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    }
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id, email: this.email }, config.get('jwtPrivateKey'));
    return token;
}

const User = mongoose.model('Users', userSchema);

const validateUser = (user) => {
    try {
        const schema = Joi.object().keys({
            name: Joi.string().min(5).max(50).required(),
            email: Joi.string().min(5).max(255).required().email(),
            password: Joi.string().min(5).max(1024).required(),
        });
        const result = schema.validate(user);
        return result;
    } catch (err) {
        appDebugger(err);
    }
}

exports.User = User;
exports.validate = validateUser;