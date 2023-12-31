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

module.exports.login = async(req,res) => {
    try{
        const foundUser = await User.findOne({email:req.body.email})
        if(!foundUser){
            return res.status(400).json({error:'No such user exists'})
        }
        const validPass = await bcrypt.compare(req.body.password, foundUser.password)
        if(!validPass){
            return res.status(400).json({error: 'Invalid credentials'})
        }
        const token = generateToken(foundUser)
        res.status(200).json({token})
    }
    catch(err){
        console.log(err.message)
        res.status(400).json({error:err.message})
    }
}

module.exports.delete = async(req,res) => {
    try{
        await User.findByIdAndDelete(req.id)
        res.status(200).json({message:'deleted user'})
    }
    catch(err){
        console.log(err.message)
        res.status(400).json({error:err.message})
    }
}

module.exports.update = async(req,res) => {
    try{
        const encryptedPassword = await bcrypt.hash(req.body.password, Number(process.env.SALT_ROUNDS))
        const updatedUser = await User.findByIdAndUpdate(req.id,{...req.body,password:encryptedPassword})
        const token = generateToken(updatedUser)
        res.status(200).json({token})
    }
    catch(err){
        console.log(err.message)
        res.status(400).json({error:err.message})
    }
}