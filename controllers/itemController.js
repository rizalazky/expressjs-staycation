const modelCategory=require('./../models/M_Category')
const modelItem=require('./../models/M_Items')
const modelImages=require('../models/M_Image.js')
const modelFeatures=require('../models/M_Features')
const fs=require('fs-extra')
const path=require('path')

module.exports={
    viewItems:async (req,res)=>{
        const data=await modelItem.find()
            .populate({path:'imageId',select:'id imageUrl'})
            .populate({path:'categoryId',select:'_id name'})
        const categories=await modelCategory.find()
        
        res.render('./../views/admin/items/view_items',{
            data:data,
            title:'Items',
            categories:categories,
            render:'table'
        })
    },add:async(req,res)=>{
        try {
            const {title,categoryId,price,city,country,desc}=req.body
            const category=await modelCategory.findOne({_id:categoryId})
            console.log(category)
            let files=req.files
            if(files.length >0){
                let newItem={
                    title,
                    categoryId,
                    price,
                    city,
                    country,
                    desc
                }
                
                const item=await modelItem.create(newItem)

                category.itemsId.push({_id:item._id})
                await category.save()
                for(let i=0;i<files.length;i++){
                    const image=await modelImages.create({
                        imageUrl:files[i].filename,
                        itemsId:item._id
                    })
                    item.imageId.push(image._id)
                }
                await item.save()
                res.redirect('/admin/items')
            }    
        } catch (error) {
            res.redirect('/admin/items')
        }
    },edit:async (req,res)=>{
        try {
            let files=req.files
            let {title,price,city,country,desc,categoryId,id}=req.body
            let itemDummy=await modelItem.findOne({_id:id})
            let item=await modelItem.findOne({_id:id})
            
            if(files.length >0){
                // res.json(item)
                if(item.imageId.length>0){
                    for(let y=0;y<itemDummy.imageId.length;y++){
                        let image=await modelImages.findOne({_id:itemDummy.imageId[y]})
                        
                        await item.imageId.pull(itemDummy.imageId[y])
                        console.log(itemDummy.imageId[y],'imageId '+y)
                        await fs.unlink(path.join(`public/images/items/${image.imageUrl}`))
                        await image.remove()
                        
                    }
                }
                

                for(let i=0;i<files.length;i++){
                    
                    const imageBaru=await modelImages.create({
                        imageUrl:files[i].filename,
                        itemsId:item._id
                    })
                    await item.imageId.push(imageBaru._id)
                }      
            }

            item.title=title
            item.price=price
            item.city=city
            item.country=country
            item.desc=desc
            item.categoryId=categoryId 
            await item.save()
            
            res.redirect('/admin/items')
        } catch (error) {
            console.log(error)
            // res.end(error)
            res.redirect('/admin/items')
        }
    },delete:async(req,res)=>{
        const id=req.params.id
        console.log(id)
        const item=await modelItem.findOne({_id:id})

        item.imageId.map(async (img)=>{

            console.log(img,'id')
            let image=await modelImages.findOne({_id:img})
            await fs.unlink(path.join(`public/images/items/${image.imageUrl}`))
            await image.remove()
        })

        await item.remove()
        res.redirect('/admin/items')
    },detail:async (req,res)=>{
        let id=req.params.id
        const data=await modelItem.findOne({_id:id})
            .populate({path:'imageId',select:'id imageUrl'})
            .populate({path:'categoryId',select:'_id name'})
            .populate({path:'featuresId',select:'_id descriptions qty imageUrl'})
            .populate({path:'activityId',select:'_id descriptions type imageUrl'})
        const categories=await modelCategory.find()

        
        
        res.render('./../views/admin/items/view_items',{
            data:data,
            title:'Items',
            categories:categories,
            render:'tab-nav'
        })
    }
}