const userModel = require('../models/userModel');
const userServices = require('../services/userServices');
const { validationResult } = require('express-validator');

module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, email, password } = req.body;

    const hashedPassword = await userModel.hashPassword(password);

    const newUser = await userServices.createUser({
        firstName,
        lastName,
        email,
        password: hashedPassword,
    });


    const token = newUser.generateAuthToken();

    res.status(201).json({ token, user: newUser });
};
