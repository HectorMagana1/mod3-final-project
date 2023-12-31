const Exercise = require('../models/exerciseModel');
const User = require('../models/userModel')
const Set = require('../models/setModel')

module.exports.index = async(req,res) => {
    try{
        const user_id = req.id
        const exercises = await Exercise.find({ user_id })
        res.status(200).json(exercises);
    } catch(err){
        console.log('index error: '+err.message)
    }
}

module.exports.delete = async(req,res) => {
    try{
        const exercise = await Exercise.findOneAndDelete({_id:req.params.exerciseId})
        res.status(200).json({message:'Successfully deleted'})
        // will still need to add logic to delete sets
    }
    catch(err){
        console.log(err.message)
        res.status(400).json({error:err.message})
    }
}

module.exports.update = async(req,res) => {
    try{
        const updatedExercise = await Exercise.findOneAndUpdate({_id:req.params.exerciseId}, req.body)
        
        if (!updatedExercise){
            throw new Error('Access denied')
        }
        
        res.status(200).json(updatedExercise)
    }
    catch(err){
        console.log(err.message)
        res.status(400).json({error:err.message})
    }
}

module.exports.create = async(req,res) => {

    try{
        const exercise = await Exercise.create({...req.body,user_id:req.id})
        await User.findByIdAndUpdate(req.id, {
            $push:{
                exercises:exercise._id
            }
        })
        res.status(200).json(exercise)
    }
    catch(err){
        console.log(err.message)
        res.status(400).json({error:err.message})
    }
}

module.exports.show = async(req,res) => {
    try{
        const exercise = await Exercise.findById(req.params.exerciseId).populate('sets')
        res.status(200).json(exercise)
    }
    catch(err){
        console.log(err.message)
        res.status(400).json({error:err.message})
    }
}