const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    exerciseName:{
        type:String
    },
    user_id:{
        type:String
    },
    sets:[{
        type:mongoose.Types.ObjectId,
        ref:'sets'
    }]
},{ timestamps:true })

const Exercise = mongoose.model('exercises',exerciseSchema);

module.exports = Exercise;