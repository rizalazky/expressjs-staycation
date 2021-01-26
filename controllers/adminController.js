const modelCategories=require('./../models/M_Category')

module.exports={
    viewDashoard: (req,res)=>{
        
        res.render('admin/dashboard/view_dashboard',{title:'Dashboard'})
    },
    viewCategories:async(req,res)=>{
        let data=await modelCategories.find()
        
        res.render('admin/category/view_categories',{title:'Categories',data:data})
    },
    addCategories:async (req,res)=>{
        try {
            const {name}=req.body
            await modelCategories.create({name})
            res.redirect('/admin/categories')
        } catch (error) {
            res.redirect('/admin/categories')
        }
    },
    editCategories:async (req,res)=>{
        const {id,name}=req.body
        const editCat=await modelCategories.findOne({_id:id})
        editCat.name=name
        await editCat.save()
        res.redirect('/admin/categories')
    },
    deleteCategories:async (req,res)=>{
        const {id}=req.params
        const deleteCat=await modelCategories.findOne({_id:id})
        await deleteCat.remove()
        res.redirect('/admin/categories')
    }
}