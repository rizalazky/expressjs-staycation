
module.exports={
    viewItems:(req,res)=>{
        const data=[]
        res.render('./../views/admin/items/view_items.ejs',{
            data:data,
            title:'Items'
        })
    }
}