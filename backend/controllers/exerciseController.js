const Exercise = require('../models/exerciseModel');
const User = require('../models/userModel');
const Set = require('../models/setModel')

module.exports.index = async(req,res) => {
    try{
        const exercises = await Exercise.find()
        res.status(200).json(exercises);
    } catch(err){
        console.log('index error: '+err.message)
    }
}

module.exports.delete = async(req,res) => {
    res.json({'message':'delete route'})
}

module.exports.update = async(req,res) => {
    res.json({'message':'update route'})
}

module.exports.create = async(req,res) => {
    res.json({'message':'create route'})
}

module.exports.show = async(req,res) => {
    res.json({'message':'show route'})
}