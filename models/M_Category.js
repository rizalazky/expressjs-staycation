const mongoose=require('mongoose')
const {ObjectId}=mongoose.Schema

const Category=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    itemsId:[{
        type:ObjectId,
        ref:'Items'
    }]
})

const modelCategory=new mongoose.model('Categories',Category)

module.exports=modelCategory