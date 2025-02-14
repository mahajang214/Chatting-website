const express=require('express');
const { sendUserDataToFrontend, getMessages, sendMessages } = require('../controllers/message.controller');
const { protectedRoute } = require('../middlewares/proctedRoute');

const router=express.Router();

router.get('/',protectedRoute,sendUserDataToFrontend);
router.post('/send/:id',protectedRoute,sendMessages);
router.get('/get/:id',protectedRoute,getMessages);







module.exports=router;