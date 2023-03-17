let mongoose  = require('mongoose');
let dbConnect = require('./dbConnect');
dbConnect();  //for creating connection between mongoose and node.js

let loginform = mongoose.Schema({
    fname:String,
    lname:String,
    email:String,
    password:String

})

module.exports = loginform;