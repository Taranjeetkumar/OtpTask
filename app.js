const express = require('express');
const app = express();
const ejs = require('ejs');
const sequelize = require('./utils/database');
const user = require('./Models/user');
const bodyParser = require('body-parser');
const router  = require('./Routes/user');



// parser for forms undefined problem when submit form
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// views 
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use('/',router);

sequelize.sync({force : true}).then(resp=>{
    app.listen(3000,()=>console.log("server is listening at port 3000"));
}).catch(err=>{
    console.log(err);
})

