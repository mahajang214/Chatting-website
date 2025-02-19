const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const ConnectDB = require("./src/DB/ConnectDB.js");
const authRoutes = require("./src/routes/User.routes.js");
const messageRoutes = require("./src/routes/message.routes.js");
const globalRoute = require("./src/routes/Global.route.js");
const { createServer } = require("http");
const { Server } = require("socket.io");

const web = express();
const nodeServer = createServer(web);
const io = new Server(nodeServer, {
  cors: {
    origin: true,
    methods: ["GET", "POST"],
    credentials: true,
  },
});
ConnectDB();
web.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
web.use(express.json());
web.use(express.urlencoded({ extended: true }));
web.use(cookieParser());

web.use("/api/auth", authRoutes);
web.use("/api/chat", messageRoutes);
web.use("/api", globalRoute);

io.on(
  "connection",
  (socket) => {
    console.log("Client is connected on soket : ", socket.id); //start
    socket.on("clientConnected", () => {
        console.log("Client is connected to chat");
    }),
    
    socket.on("socketMessage", (msg) => {
        console.log("Socket Message : ", msg); //idhar message aayege
        socket.emit("socketMessage", msg);
    }),
    socket.on("disconnect", async(socket,userId) => {
        const removeOnline = await User.findById(userId); // Find user by _id

        if (!removeOnline) {
            alert("Client is not found");
        }
        // Remove the userId from the onlineUsers array
        removeOnline.onlineUsers.pull({ userId });
      
        // Save the updated user document
        await removeOnline.save();

        console.log("Client is disconnected on socket : ", socket.id); //jab socket disconnected honga tab
    })
},
);

nodeServer.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
