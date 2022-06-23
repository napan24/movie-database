const mongoose = require('mongoose');
const dotenv = require('dotenv');
const express = require('express');
const app = express();
app.use(express.json());
dotenv.config({path:'./config.env'});
const db = process.env.DB;
mongoose.connect(db, { useNewUrlParser: true })
const user = require('./model/user');
const fav = require('./model/fav');
const port = process.env.PORT || 8000;
app.get('/', (req, res) => {
    res.send("hello world");
});
app.post('/register', (req, res) => {
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
app.post('/signin', (req, res) => {
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
app.post('/addfav', (req, res) => {
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
app.post('/getfav', (req, res) => {
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
app.use(express.static(path.join(__dirname, "client", "build")))
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
app.listen(process.env.PORT || 8000, () => {
    console.log("server at port 8000");
});