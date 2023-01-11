const express = require("express");
const path = require("path");
// const fs = require("fs");
const app = express();
const mongoose = require('mongoose');
mongoose.set("debug", true);
mongoose.set("strictQuery", false);
const options = {
  strict: "throw",
  strictQuery: false
};
const bodyparser = require("body-parser");
mongoose.connect('mongodb://localhost:27017/contactDancce', {useNewUrlParser:true});
const port = 8000;

//Define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String,
  });

const Contact = mongoose.model('Contact', contactSchema);


//EXPRESS SPECIFIC STUFF
app.use('/static',express.static('static'))//for serving static file
app.use(express.urlencoded())

//PUG SPECIFIC STUFF
app.set('view engine' , 'pug')//Set the template engine as pug
app.set('views' , path.join(__dirname, 'views')) //Set the views directory

//ENDPOINT
app.get('/' ,(req,res)=>{
    const params = { }//'title': 'Learn With anisha madam',"content":con
    res.status(200).render('home.pug',params);
})

app.get('/contact' ,(req,res)=>{
    const params = { }//'title': 'Learn With anisha madam',"content":con
    res.status(200).render('contact.pug',params);
})

app.post('/contact' ,(req,res)=>{
    var mydata = new Contact(req.body);
    mydata.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    });

    // res.status(200).render('contact.pug');
})

//START THE SERVER
app.listen(port, ()=>{
    console.log(`This application started successfully on port ${port}`);
})