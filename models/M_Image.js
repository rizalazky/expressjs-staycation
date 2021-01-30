const mongoose=require('mongoose')
const {ObjectId}=mongoose.Schema

const imageSchema=new mongoose.Schema({
    imageUrl:{
        type:String,
        required:true
    },
    itemsId:{
        type:ObjectId,
        ref:'Items'
    }
})

module.exports=new mongoose.model('Images',imageSchema)
