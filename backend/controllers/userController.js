const User = require('../models/userModel');

module.exports.show = async(req,res) => {
    console.log(req)
    res.json({message:'success'})
    // try{
    //     const foundUser = await User.findById(req.id)
    //     res.status(200).json(foundUser)
    // }
    // catch(err){
    //     console.log(err.message)
    //     res.status(400).json({error:err.message})
    // }
}