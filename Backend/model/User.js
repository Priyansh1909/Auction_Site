const mongoose = require('mongoose')

const UsersSchema = new mongoose.Schema({
    Name: String,
    Email: String,
    Password: String,
    Wallet: Number
})

module.exports = mongoose.model('Users',UsersSchema)