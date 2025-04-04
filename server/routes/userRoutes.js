const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const {registerUser} = require('../controllers/userController');


router.post("/register",[
    body('email').isEmail().withMessage("Invalid Email"),
    body('firstName').isLength({min:3}).withMessage("First name must be at least 3 characters long"),
    body('password').isLength({min:6}).withMessage('Password must be 6 characters')
],registerUser)


module.exports = router;