const modelItem=require('./../models/M_Items')
const modelFeatures=require('./../models/M_Features')
const fs=require('fs-extra')
const path=require('path')



module.exports={
    add:async (req,res)=>{
        const {descriptions,qty,id}=req.body
        try {
            console.log(req.file)
            const item=await modelItem.findOne({_id:id})
            let newFeature={
                descriptions,
                qty,
                itemId:item._id,
                imageUrl:req.file.filename
            }
            let feature=await modelFeatures.create(newFeature)
            await item.featuresId.push({_id:feature._id})
            await item.save()
            res.redirect('/admin/items/detail/'+item._id)
        } catch (error) {
            console.log(error)
            res.redirect('/admin/items/detail/'+id)
        }
    },
    edit:async (req,res)=>{
        const {descriptions,qty,id,featuresid}=req.body
        try {  
            const item=await modelFeatures.findOne({_id:featuresid})
            if(req.file !== undefined){
                await fs.unlink(path.join('public/images/features/'+item.imageUrl)) 
                item.imageUrl=req.file.filename
            }
            item.descriptions=descriptions
            item.qty=qty
            await item.save()
            
            res.redirect('/admin/items/detail/'+id)
        } catch (error) {
            console.log(error)
            res.redirect('/admin/items/detail/'+id)
        }
    },delete:async(req,res)=>{
        const id=req.params.id
        const idItem=req.params.iditem
        const dataItem=await modelItem.findOne({_id:idItem})
        const data=await modelFeatures.findOne({_id:id})
        dataItem.featuresId.pull(data._id)
        await dataItem.save()
        await fs.unlink(path.join('public/images/features/'+data.imageUrl)) 
        await data.remove()
        res.redirect('/admin/items/detail/'+idItem)
    }
}