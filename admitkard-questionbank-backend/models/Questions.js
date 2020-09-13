const mongoose=require('mongoose');

const questionSchema=new mongoose.Schema({
    query:{
        type:String,
        required:true
    },
    topic:{
        type:String,
        required:true
    },
    tags:{
        type:[String],
        required:true
    }
},{timestamps:true})


const Question=mongoose.model('question',questionSchema);

module.exports= Question;