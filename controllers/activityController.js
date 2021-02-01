const modelItem=require('./../models/M_Items')
const modelActivities=require('./../models/M_Activity')
const fs=require('fs-extra')
const path=require('path')


module.exports={
    add:async (req,res)=>{
        const {descriptions,type,id}=req.body
        try {
            
            const item=await modelItem.findOne({_id:id})
            let newFeature={
                descriptions,
                type,
                itemId:item._id,
                imageUrl:req.file.filename
            }
            let activities=await modelActivities.create(newFeature)
            await item.activityId.push({_id:activities._id})
            await item.save()
            res.redirect('/admin/items/detail/'+item._id)
        } catch (error) {
            res.json(error)
            console.log(error)
            res.redirect('/admin/items/detail/'+id)
        }
    },
    edit:async (req,res)=>{
        const {descriptions,type,id,activityId}=req.body
        try {  
            const item=await modelActivities.findOne({_id:activityId})
            if(req.file !== undefined){
                await fs.unlink(path.join('public/images/activities/'+item.imageUrl)) 
                item.imageUrl=req.file.filename
            }
            item.descriptions=descriptions
            item.type=type
            await item.save()
            
            res.redirect('/admin/items/detail/'+id)
        } catch (error) {
            res.redirect('/admin/items/detail/'+id)
        }
    },delete:async(req,res)=>{
        const id=req.params.id
        const idItem=req.params.iditem
        const dataItem=await modelItem.findOne({_id:idItem})
        const data=await modelActivities.findOne({_id:id})
        dataItem.activityId.pull(data._id)
        await dataItem.save()
        await fs.unlink(path.join('public/images/activities/'+data.imageUrl)) 
        await data.remove()
        res.redirect('/admin/items/detail/'+idItem)
    }
}