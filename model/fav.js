const mongoose=require('mongoose');

const favo=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    data:{
        type:Object
    },
    movieid:{
        type:String,
        required:true
    }
});
const scheme=mongoose.model('FAV',favo);
module.exports=scheme;