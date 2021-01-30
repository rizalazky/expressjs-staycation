const mongoose=require('mongoose')

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
        ref:'images'
    }],featuresId:[{
        type:ObjectId,
        ref:'features'
    }],activityId:[{
        type:ObjectId,
        ref:'activities'
    }]
})

module.exports=new mongoose.model('Items',itemSchema)