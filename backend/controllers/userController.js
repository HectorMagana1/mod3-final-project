const User = require('../models/userModel');

module.exports.show = async(req,res) => {
    try{
        const foundUser = await User.findById(req.id).populate('exercises')
        res.status(200).json(foundUser)
    }
    catch(err){
        console.log(err.message)
        res.status(400).json({error:err.message})
    }
}