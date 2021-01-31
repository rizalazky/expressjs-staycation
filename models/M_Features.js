const mongoose=require('mongoose')
const {ObjectId}=mongoose.Schema

const featuresScema=new mongoose.Schema({
    descriptions:{
        type:String,
        required:true
    },qty:{
        type:Number,
        required:true
    },imageUrl:{
        type:String,
        required:true
    },itemId:{
        type:ObjectId,
        ref:'Items'
    }
})

module.exports=new mongoose.model('Features',featuresScema)