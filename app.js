const express=require('express');
const bodyParser=require('body-parser');

const app=express();

app.use(bodyParser.json({extended: false}));
app.use(bodyParser.urlencoded({ extended: false}));

const sequelize=require('./util/database');

const userRoutes=require('./routes/user');

var cors=require('cors');
app.use(cors());

app.use('/user',userRoutes);

sequelize.sync()
    .then(result=>{
        app.listen(3000);
    })
    .catch(err=>{
        console.log(err);
    });