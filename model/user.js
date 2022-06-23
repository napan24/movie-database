const mongoose=require('mongoose');

const user=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    profile_picture:{
        type:String
    }
});
const scheme=mongoose.model('USERS',user);
module.exports=scheme;