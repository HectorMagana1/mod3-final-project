require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;
const connectDB = require('./config');

connectDB();

const exerciseRoutes = require('./routes/exerciseRoutes')
const userRoutes = require('./routes/userRoutes')
const authRoutes = require('./routes/authRoutes')

app.use(express.json())
app.use(cors())

app.use('/api/exercises', exerciseRoutes);
app.use('/api/users', userRoutes);
app.use('/auth', authRoutes);

app.listen(PORT, ()=>{
    console.log('listening on port: '+PORT)
})