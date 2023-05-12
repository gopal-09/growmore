const express=require('express')
const auth=require('../middleware/auth');
const {login,deletetask,updatetask,signup,createtask,getalltasks,logout}= require('../controllers/user')
const { check, validationResult } = require("express-validator");
const router=express.Router()
router.get('/',getalltasks);
router.post('/signup',[
    check("email", "Please input a valid email")
        .isEmail(),
    check("password", "Please input a password with a min length of 6")
        .isLength({min: 6})
],signup)//creation of user done in signup function
router.post('/task',createtask)
router.post('/login',login);
router.delete('/delete/:id',deletetask)
router.put('/updateuser/:id',updatetask)
router.post('/logout',auth,logout)

module.exports=router;