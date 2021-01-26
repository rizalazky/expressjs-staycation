const mongoose=require('mongoose')


const Category=new mongoose.Schema({
    name:{
        type:String,
        required:true
    }
})

const modelCategory=new mongoose.model('Categories',Category)

module.exports=modelCategory