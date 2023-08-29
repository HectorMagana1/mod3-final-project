const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    
})

const User = mongoose.model('users', userSchema);

module.exports = User;