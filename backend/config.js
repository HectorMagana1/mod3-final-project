const mongoose = require('mongoose');

async function mongoConfig(){
    try{
        const result = await mongoose.connect(process.env.MONGO_URL)
        console.log('Database connected: ', result.connection.host)
    } catch(err){
        console.log(err.message)
    }
}

module.exports = mongoConfig