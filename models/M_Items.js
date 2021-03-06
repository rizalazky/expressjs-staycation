const mongoose=require('mongoose')
const {ObjectId}=mongoose.Schema

const itemSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },price:{
        type:Number,
        required:true
    },city:{
        type:String,
        required:true
    },country:{
        type:String,
        default:'Indonesia'
    },isPopular:{
        type:Boolean
    },desc:{
        type:String,
        required:true
    },categoryId:{
        type:ObjectId,
        ref:'Categories'
    },imageId:[{
        type:ObjectId,
        ref:'Images'
    }],featuresId:[{
        type:ObjectId,
        ref:'Features'
    }],activityId:[{
        type:ObjectId,
        ref:'Activities'
    }]
})

module.exports=new mongoose.model('Items',itemSchema)