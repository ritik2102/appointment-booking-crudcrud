const express=require('express');
const router=express.Router();

const userController=require('../controllers/user');

router.post('/add-user',userController.postUser);
router.post('/delete-user/:userId',userController.deleteUser);
// router.post('/delete-user/:id',userController.deleteUser);
router.get('/show-users',userController.getUsers);
router.get('/get-user/:userId',userController.getUser);

module.exports=router;