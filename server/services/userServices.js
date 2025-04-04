const userModel = require('../models/userModel');

async function createUser({ firstName, lastName, email, password }) {
    if (!firstName || !email || !password) {
        throw new Error('All required fields must be provided');
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
        throw new Error('User already exists with this email');
    }

    const hashedPassword = await userModel.hashPassword(password);

    const user = await userModel.create({
        fullName: {
            firstName,
            lastName,
        },
        email,
        password: hashedPassword,
    });

    return user;
}

module.exports = {createUser};
