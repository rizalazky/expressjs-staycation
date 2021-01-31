const mongoose=require('mongoose')
const {ObjectId}=mongoose.Schema

const featuresScema=new mongoose.Schema({
    desc:{
        type:String,
        required:true
    },type:{
        type:Number,
        required:true
    },imageUrl:{
        type:String,
        required:true
    },isPopular:{
        type:Boolean,
        
    },itemId:{
        type:ObjectId,
        ref:'Items'
    }
})

module.exports=new mongoose.model('Features',featuresScema)