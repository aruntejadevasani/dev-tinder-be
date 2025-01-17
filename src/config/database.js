const mongoose = require('mongoose');

const connectDB = async () => {
    mongoose.connect('mongodb+srv://arunsocial1001:teja1013@nodetest.vgxvv.mongodb.net/devTinder')
}

module.exports = connectDB;