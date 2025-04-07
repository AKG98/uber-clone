const userModel = require('../models/userModel');
const { createUser } = require('../services/userServices');
const { validationResult } = require('express-validator');

module.exports.registerUser = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { firstName, lastName, email, password } = req.body;

        const isExistingUser = await userModel.findOne({ email });
        if (isExistingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        const hashedPassword = await userModel.hashPassword(password);

        const newUser = await createUser({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });

        const token = newUser.generateAuthToken();

        return res.status(201).json({ token, user: newUser });
    } catch (error) {
        next(error); 
    }
};

module.exports.loginUser = async(req,res,next) =>{
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        const isExistingUser = await userModel.findOne({ email }).select('+password');
        if (!isExistingUser) {
            return res.status(401).json({ message: 'User not found' });
        }

        const isMatch = isExis


    } catch (error) {
        
    }
}
