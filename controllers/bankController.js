const modelBank=require('./../models/M_Bank')
const fs=require('fs-extra')
const path=require('path')

module.exports={
    viewBank:async(req,res)=>{
        let data=await modelBank.find()
        res.render('../views/admin/bank/view_bank.ejs',{
            title:'Bank',
            data:data
        })
    },
    addBank:async(req,res)=>{
        const {name,nameBank,noRekening}=req.body
        const imageUrl=req.file.filename
        await modelBank.create({
            name,nameBank,noRekening,imageUrl
        })
        res.redirect('/admin/bank')
    },
    editBank:async(req,res)=>{
        try {
            const {id,name,nameBank,noRekening}=req.body
            const bank=await modelBank.findOne({_id:id})

            console.log(req.file)
            if(req.file==undefined){
                bank.name=name
                bank.nameBank=nameBank
                bank.noRekening=noRekening
                
            }else{
                console.log('ELSE')
                await fs.unlink(path.join('public/images/bank/'+bank.imageUrl))
                bank.name=name
                bank.nameBank=nameBank
                bank.noRekening=noRekening
                bank.imageUrl=req.file.filename
            }
            await bank.save()
            res.redirect('/admin/bank')
        } catch (error) {
            res.redirect('/admin/bank')
        }
    },
    deleteBank:async (req,res)=>{
        const id=req.params.id
        const bank =await modelBank.findOne({_id:id})
        await fs.unlink(path.join('public/images/bank/'+bank.imageUrl))
        await bank.remove()
        res.redirect('/admin/bank')
    }
}