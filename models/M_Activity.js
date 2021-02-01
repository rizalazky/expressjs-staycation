const mongoose=require('mongoose')
const {ObjectId}=mongoose.Schema

const ActivitiesSchema=new mongoose.Schema({
    descriptions:{
        type:String,
        required:true
    },type:{
        type:String,
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

module.exports=new mongoose.model('Activities',ActivitiesSchema)