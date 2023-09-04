const User = require('../models/setModel')

module.exports.show = async(req,res) => {
    res.status(200).json({message:'set show'})
}