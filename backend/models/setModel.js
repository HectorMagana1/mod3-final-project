const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const setSchema = new Schema({
    reps:{
        type:Number
    },
    weight:{
        type:Number
    }
},{ timestamps:true })

const Set = mongoose.model('sets',setSchema);
module.exports = Set