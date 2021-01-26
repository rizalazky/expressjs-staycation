const router=require('express').Router()
const adminController=require('../controllers/adminController')

router.get('/dashboard',adminController.viewDashoard)
// categories
router.get('/categories',adminController.viewCategories)
router.post('/categories',adminController.addCategories)
router.put('/categories',adminController.editCategories)
router.delete('/categories/:id',adminController.deleteCategories)

module.exports=router