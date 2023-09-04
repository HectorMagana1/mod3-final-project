const User = require('../models/setModel')
const Exercise = require('../models/exerciseModel')
const Set = require('../models/setModel')

// module.exports.show = async(req,res) => {
//     console.log(req.body)
//     console.log(req.params)
//     res.status(200).json({message:'set show'})
// }

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
    res.status(200).json({message:'set update'})

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