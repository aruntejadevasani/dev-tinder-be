const express = require('express');
const connectDB = require('./config/database');
const UserModel = require('./models/user');
const app = express();

app.post('/signup', async (req, res) => {
    // Creating new instance of the UserModel.
    const user = new UserModel({
        firstName: 'Teja',
        lastName: 'Deva',
        email: 'teja@deva.com',
        password: 'teja@123'
    });

    try {
        await user.save();
        res.send('User Added!')
    } catch (err) {
        res.status(400).send('Error occured when saving data: ' + err.message);
    }

})

connectDB()
.then(()=>{
    console.log('DB Connection Succesfull...');
    app.listen(3000, ()=> {
        console.log('Server listening to port 3000...');
    });
})
.catch(()=>{
    console.log('DB Connection Error!');
})