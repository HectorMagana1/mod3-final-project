const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/userModel')

function generateToken (user) {
    const payload = {id:user._id, username:user.username}
    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn:'1h'})
    return token
}

module.exports.register = async(req,res) => {
    try{
        const foundUser = await User.findOne({username:req.body.username})
        if(foundUser){
            return res.status(400).json({error:'User already exists'})
        }
        const encryptedPassword = await bcrypt.hash(req.body.password, Number(process.env.SALT_ROUNDS))
        const newUser = await User.create({...req.body, password: encryptedPassword})
        const token = generateToken(newUser)
        res.status(200).json({token})
    }
    catch(err){
        console.log(err.message)
        res.status(400).json({error:err.message})
    }
}