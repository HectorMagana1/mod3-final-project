const User = require('../models/userModel');

module.exports.show = async(req,res) => {
    console.log(req.id)
    res.json({message:'successful'})
    // try{
    //     const foundUser = await User.findById(req.id)
    // }
    // catch(err){
    //     console.log(err.message)
    //     res.status(400).json({error:err.message})
    // }
}