let mongoose  = require('mongoose');

let url = process.env.HOST;



let dbConnect = async()=>{
   await mongoose.connect(url);
}

module.exports = dbConnect;







