const path = require('path')
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const express = require('express');
const server = express();
server.use(express.json());
dotenv.config({path:'./config.env'});
const db = process.env.DB;
mongoose.connect(db, { useNewUrlParser: true })
const user = require('./model/user');
const fav = require('./model/fav');
const port = process.env.PORT || 8000;
app.use('/', express.static(__dirname + '/client/public'));
server.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    user.findOne({ email: email })
        .then((exist) => {
            if (exist) {
                return res.json({ error: "Email Exist" });
            }
            else {
                const data = new user({
                    username: username,
                    email: email,
                    password: password
                })
                data.save();
                return res.json({ message: "Email Exist" });
            }
        })
});
server.post('/signin', (req, res) => {
    const { email, password } = req.body;
    user.findOne({ email: email, password: password },{username:1,email:1,profile_photo:1})
        .then((exist) => {
            if (exist) {
                return res.json({ data: exist });
            }
            else {
                return res.json({ message: "User Does Not Exist" });
            }
        })
});
server.post('/addfav', (req, res) => {
    const { email, user_data,movieid } = req.body;
    fav.findOne({ email: email, movieid: movieid })
        .then((exist) => {
            if (exist) {
                return res.json({ error: "Already Exists" });
            }
            else {
                const data = new fav({
                    email: email,
                    data: user_data,
                    movieid:movieid
                })
                data.save();
                return res.json({ message: "Success" });
            }
        })
});
server.post('/getfav', (req, res) => {
    const { email } = req.body;
    fav.find({ email: email }, { data: 1, _id: 0 })
        .then((exist) => {
            if (exist) {
                return res.json({ favo: exist });
            }
            else {
                return res.json({ message: "No favourite exist" });
            }
        })
});
console.log("welcome");
server.use(express.static(path.join(__dirname, "client", "build")))
server.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
server.listen(process.env.PORT || 8000, () => {
    console.log("server at port 8000");
});