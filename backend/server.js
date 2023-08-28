const express = require('express');
const app = express();
const PORT = 3000;

const exerciseRoutes = require('./routes/exerciseRoutes')

app.use(express.json())

app.use('/api/exercises', exerciseRoutes);

app.listen(PORT, ()=>{
    console.log('listening on port: '+PORT)
})