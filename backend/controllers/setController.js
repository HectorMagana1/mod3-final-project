const User = require('../models/setModel')
const Exercise = require('../models/exerciseModel')
const Set = require('../models/setModel')

module.exports.show = async(req,res) => {
    try{
        const set = await Set.findOne({_id:req.params.setId})
        res.status(200).json(set)
    }
    catch(err){
        console.log(err.message)
        res.status(400).json({error:err.message})
    }
}

module.exports.delete = async(req,res) => {
    try{
        await Set.findOneAndDelete({_id:req.params.setId})
        await Exercise.findByIdAndUpdate(req.params.setId,{
            $pull:{
                comments: req.params.setId
            }
        })
    }
    catch(err){
        console.log(err.message)
        res.status(400).json({error:err.message})
    }
}

module.exports.update = async(req,res) => {
    try{
        const set = await Set.findOneAndUpdate({_id:req.params.setId},req.body)
        if(!set){
            throw new Error('Access denied')
        }
        res.status(200).json({message:'Success'})
    }
    catch(error){
        console.log(err.message)
        res.status(400).json({error:err.message})
    }
}

module.exports.create = async(req,res) => {
    try{
        const set = await Set.create({...req.body})
        await Exercise.findByIdAndUpdate(req.params.exerciseId, {
            $push:{
                sets:set._id
            }
        })
        res.status(200).json(set);
    }
    catch(err){
        console.log(err.message)
        res.status(400).json({error:err.message})
    }
}