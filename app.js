let mongoose = require('mongoose');
let express = require('express');
let alert = require('alert'); 
let path = require('path');
require('dotenv').config();
let app = express();
app.use(express.static(path.join(__dirname, 'views')));
let currentPath = path.join(__dirname, 'views');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

let userSchema = require('./userSchema');
let loginForm = require('./loginSchema') 
let user = mongoose.model('User',userSchema);
let loginDetails = mongoose.model('logindetails', loginForm);



app.get('/',(req,res)=>{
    res.sendFile(`${currentPath}/home.html`)
})

app.get('/contact',(req,res)=>{
    res.sendFile(`${currentPath}/contact.html`)
})

app.post('/contact',async (req,res)=>{
    let data = await user(req.body);
    let result = await data.save();
    let rese = await  user.find();
    console.log(rese)
    res.send("done")
})

let loginAuth = false;
app.get('/user',(req,res)=>{
    if(loginAuth){
        res.sendFile(`${currentPath}/user.html`);
    }
    else{
       res.send('<h1>Please login first to see this page</h1>');
    }
})

app.get('/register',(req,res)=>{
    res.sendFile(`${currentPath}/register.html`);

})
app.post('/register',async (req,res)=>{
    let data = await loginDetails(req.body);
    let result = await data.save()
    console.log(result);
    res.send("<h1>Registration Successfully </h1>")
})

app.get('/login',(req,res)=>{
    res.sendFile(`${currentPath}/login.html`);
})

app.post('/login',async(req,res)=>{
    try {
        const userdata = await loginDetails.findOne({email: req.body.username});
        if (userdata) {
            const result = (req.body.password === userdata.password);
            if (result) {
                loginAuth = true;
                res.sendFile(`${currentPath}/user.html`)
            } else {
                res.status(400).json({ error: "password doesn't match" });
            }
        } else {
            res.status(400).json({ error: "User doesn't exist" });
        }
    } catch (error) {
        res.status(400).json({ error });
    }
})

app.get('/logout',(req,res)=>{
    loginAuth = false;
    res.redirect('/');
})


let port =process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`server is runnig at port ${port}`);
})