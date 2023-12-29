const express = require('express');
const mongoose = require('mongoose');
const homeRoute = require('./routes/home');
const bodyParser = require('body-parser');

const app = express()

const port = 3000;
mongoose.connect('mongodb://localhost:27017/pegawaicrud', {useNewUrlParser: true});
const db = mongoose.connection;
db.on('eror', ()=> {
    console.log("Something went wrong to connect database");
});
db.once('open', ()=>{
    console.log("DB Connection has been made sucsess");
});

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/', homeRoute)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})