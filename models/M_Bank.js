const mongoose=require('mongoose')
const {Schema}=mongoose

const Bank=new Schema({
    name:{
        type:String,
        required:true
    },
    nameBank:{
        type:String,
        required:true
    },
    noRekening:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    }
})

module.exports=new mongoose.model('bank',Bank)