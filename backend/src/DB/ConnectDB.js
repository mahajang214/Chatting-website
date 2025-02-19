const mongoose = require("mongoose");

const ConnectDB = async () => {
  try {
     const connect = await mongoose.connect(process.env.CONNECTION_STRING, {
      serverSelectionTimeoutMS: 5000
  });
     console.log(`MongoDB connected: ${connect.connection.host}`);
  } catch (error) {
    console.log("DB connection error", error);
    
  }
}

module.exports=ConnectDB;