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

// module.exports.delete = async(req,res) => {
//     try{
//         await User.findByIdAndDelete(req.id)
//         res.status(200).json({message: "user deleted"})
//     }
//     catch(err){
//         console.log(err.message)
//         res.status(400).json({error:err.message})
//     }
// }

module.exports.update = async(req,res) => {
    try{
        const encryptedPassword = await bcrypt.hash(req.body.password, Number(process.env.SALT_ROUNDS))
        let updatedUser = await User.findOneAndUpdate({_id:req.id}, {...req.body,password:encryptedPassword})
        const token = generateToken(updatedUser)
        res.status(200).json({token})
    }
    catch(err){
        console.log(err.message)
        res.status(400).json({error:err.message})
    }
}