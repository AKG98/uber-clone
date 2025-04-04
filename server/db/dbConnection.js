const mongoose = require('mongoose');

function dbConnection (){
    try {
        mongoose.connect(process.env.DB_URL,()=>{
            console.log('DB Connected succesfully')
        })
    } catch (error) {
        throw(error)
    }
}

module.exports = dbConnection;