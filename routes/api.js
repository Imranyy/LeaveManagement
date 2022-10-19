const express=require('express');
const router=express.Router();
const {
    register,
    Stdlogin,
    Hodlogin,
    Wrdlogin,
    protect
}=require('../controller/controller')
 
router.post('/student/register',register);
router.post('/student/login',Stdlogin);
router.post('/student/login',Hodlogin);
router.post('/student/login',Wrdlogin);
router.get('/verify',protect);

module.exports=router;