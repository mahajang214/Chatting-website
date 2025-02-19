const express=require('express');
const { sendUserDataToFrontend, getMessages, sendMessages, fetchUsers, globalMessage, getGlobalMessage, setOnline } = require('../controllers/message.controller');
const { protectedRoute } = require('../middlewares/proctedRoute');

const router=express.Router();

router.get('/',protectedRoute,sendUserDataToFrontend);
router.post('/send/:id',protectedRoute,sendMessages);
router.get('/get/:id',protectedRoute,getMessages);
router.get('/users',protectedRoute,fetchUsers);
router.get('/setOnline',protectedRoute,setOnline);










module.exports=router;