const _ = require('lodash');
const bcrypt = require('bcrypt');
const { User, validate } = require('../models/user');

const addUser = async (req, res, next) => {
    try {
        const { error } = validate(req.body);
        if (error) {
            return res.status(400).json(error.details[0].message)
        }

        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).json("User already exists");
        user = new User(_.pick(req.body, ['name', 'email', 'password']));

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();

        const token = user.generateAuthToken();
        res.header('x-auth-token', token).status(201).json(_.pick(user, ['_id', 'name', 'email']));
    } catch (err) {
        res.status(400).json(err);
    }
}

const getUser = async (req, res, next) => {
    try {
        const email = req.user.email;
        let user = await User.findOne({ email })
            .select('-password');
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json(err);
    }
}

const getUsers = async (req, res, next) => {
    try {
        let users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(400).json(err);
    }
}

module.exports = {
    addUser,
    getUser,
    getUsers
}