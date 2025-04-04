const mongoose = require('mongoose');

function connectToDb (){
    try {
        mongoose
        .connect(process.env.DB_URL)
        .then 
            console.log('DB Connected succesfully')
        
    } catch (error) {
        throw(error)
    }
}

module.exports = connectToDb;