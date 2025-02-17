const express=require('express');
const { globalMessage, getGlobalMessage } = require('../controllers/message.controller');
const { protectedRoute } = require('../middlewares/proctedRoute');
const router=express.Router();




router.post('/send/global',protectedRoute,globalMessage);
router.get('/getGlobalMessage',protectedRoute,getGlobalMessage);






module.exports=router;





