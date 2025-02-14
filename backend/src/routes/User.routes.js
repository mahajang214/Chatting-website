const express = require('express');
const { registerUser, login, logout, setProfile } = require('../controllers/user.controller.js');
const { protectedRoute } = require('../middlewares/proctedRoute.js');


const router = express.Router();


router.post('/register', registerUser);
router.post('/login',login);
router.get('/logout',logout);
router.post('/setProfile',protectedRoute,setProfile); // it is a protected route, protected route always send {userId:objectID,someting}=req.user

module.exports= router;