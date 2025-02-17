const mongoose= require('mongoose');
const User=require('./User.modal');

const globalSchema=new mongoose.Schema({
    from:{
        type:String,
        require:true,
        ref:User
    },
    to:{
        type:String,
        require:false,
        ref:User
    },
    fromName:{
        type:String,
        require:true
    },
    textData:{
        type:String,
    },
    image:{
        type:String,
    }
},{timestamps:true});

const Global=mongoose.model('global',globalSchema);

module.exports=Global;