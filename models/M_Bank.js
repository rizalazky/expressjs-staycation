const mongoose=require('mongoose')
const {Schema}=mongoose

const Bank=new Schema({
    name:{
        type:String,
        required:true
    }
})

module.exports=Bank