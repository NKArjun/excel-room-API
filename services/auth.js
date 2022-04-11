const Joi = require('joi');
const { User } = require('../models/user');
const bcrypt = require('bcrypt');

const authUser = () => {
    return async (req, res) => {
        const schema = Joi.object().keys({
            email: Joi.string().min(5).max(255).required().email(),
            password: Joi.string().min(5).max(1024).required(),
        });
        const { error } = schema.validate(req.body);

        if (error) return res.status(400).json({ message: error.details[0].message });

        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).json({ message: 'Invalid email or password' });

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).json({ message: 'Invalid email or password' });

        const token = user.generateAuthToken();
        res.status(200).json(token);
    }
}

module.exports = {
    authUser
}