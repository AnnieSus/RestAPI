const path = require('path');
const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

const feedRoutes = require('./routes/feed');

const app = express();

app.use(bodyparser.json());
app.use('/images', express.static(path.join(__dirname,'images')));

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');
    next();
});

app.use('/feed', feedRoutes);

app.use((error, req, res)=>{
    console.log(error);
    const status = error.statusCode || 500;
    const message= error.message;
    res.status(status).json({message:message});
});

mongoose.connect(
    'mongodb+srv://maximilian:CLWwmxZwHdVvP1lc@cluster0.hhwvbkv.mongodb.net/messages?retryWrites=true&w=majority')
    .then()
    .catch(

    );

app.listen(8080);