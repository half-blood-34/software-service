let mongoose  = require('mongoose');
let dbConnect = require('./dbConnect');
dbConnect();  //for creating connection between mongoose and node.js


let userDetails = mongoose.Schema({
    email:String,
    disc:String
})

module.exports = userDetails;