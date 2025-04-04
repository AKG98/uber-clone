const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullName:{
        firstName:{
            type:String,
            minlength:[3,'First name must be at least 3 characters long'],
            required:true,
        },
        lastName:{
            type:String,
            minlength:[3,'First name must be at least 3 characters long'],
        }
    },
    email:{
        type:String,
        required:true,
        minlength:[5, 'Email must be at least 5 characters long'],
        unique:true,
    },
    password:{
        type:String,
        required:true,
        select:false,
    },
    socketId:{
        type:String,
    }
},{timestamps:true})

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id},process.env.JWT_SECRET_KEY);
    return token;
}

userSchema.methods.comparePassword = async function(password){
    return await bcryptjs.compare(password,this.password);
}

userSchema.statics.hashPassword = async function(password){
    return await bcryptjs.hash(password,10)
}

const userModel = mongoose.model('user',userSchema);
module.exports = userModel;