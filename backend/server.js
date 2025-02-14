const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const ConnectDB = require('./src/DB/ConnectDB.js');
const authRoutes = require('./src/routes/User.routes.js');
const messageRoutes=require('./src/routes/message.routes.js');
const web = express();

ConnectDB();
web.use(cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
web.use(express.json());
web.use(cookieParser());

web.use('/api/auth', authRoutes);
web.use('/api/chat',messageRoutes);
// web.get('/', (req, res) => {
//     console.log("welcome to server");
//     res.status(200).json({ msg: "welcome to server" });
// });

web.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
});