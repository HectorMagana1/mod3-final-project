const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email:{
        type:String
    },
    name:{
        type:String
    },
    password:{
        type:String
    },
    username:{
        type:String
    },
    exercises:[{
        type:mongoose.Types.ObjectId,
        ref:'exercises'
    }]
},{ timestamps:true })

const User = mongoose.model('users', userSchema);

module.exports = User;