const router=require('express').Router()
const adminController=require('../controllers/adminController')
const bankController=require('../controllers/bankController')
const itemsController=require('../controllers/itemController')
const {upload}=require('../middleware/multer')

router.get('/dashboard',adminController.viewDashoard)
// categories
router.get('/categories',adminController.viewCategories)
router.post('/categories',adminController.addCategories)
router.put('/categories',adminController.editCategories)
router.delete('/categories/:id',adminController.deleteCategories)
// bank
router.get('/bank',bankController.viewBank)
router.post('/bank',upload,bankController.addBank)
router.put('/bank',upload,bankController.editBank)
router.delete('/bank/:id',upload,bankController.deleteBank)
// items
router.get('/items',itemsController.viewItems)

module.exports=router