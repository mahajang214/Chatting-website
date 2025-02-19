const Global = require("../modal/Global.modal");
const Message = require("../modal/Message.modal");
const User = require("../modal/User.modal");

module.exports = {
  sendUserDataToFrontend: async (req, res) => {
    const userId = req.user._id;
    try {
      const updatOnline=await User.findByIdAndUpdate({_id:userId});
      updatOnline.onlineUsers.push({userId});
      const user = await User.findById(userId).select(["name", "_id","email","onlineUsers"]);
      res.status(200).json({ msg: "welcome to chatting website", user });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Internal server error" });
    }
    // res.status(200).json({msg:'woking'});
  },
  sendMessages: async (req, res) => {
    const userId = req.user._id;
    const recieverId = req.params.id;
    // console.log("userID: ",userId,"recieverId:",recieverId);

    const { text, image, } = req.body;
    try {
      const user = await User.findById(userId);
      const newMsg = await Message.create({
        from: user._id,
        to: recieverId,
        text,
        image: image ? image : null,
      });
      res.status(200).json({ msg: "message sent successfully", newMsg });
    } catch (error) {
      console.log("sending message error ", error);
      res.status(500).json({ msg: "Internal server error" });
    }
  },
  getMessages: async (req, res) => {
    const userId = req.user._id;
    const recieverId = req.params.id;
    try {
      const messages = await Message.find({
        $or: [
          { from: userId, to: recieverId },
          { from: recieverId, to: userId },
        ],
      }).sort({ createdAt: 1 });
      res.status(200).json({ msg: "messages fetched successfully", messages });
    } catch (err) {
      console.log("getting msg error", err);
      res.status(400).json({ msg: "Internal server error" });
    }
  },
  fetchUsers: async (req, res) => {
    const userId = req.user._id;
    try {
      const users = await User.find({ _id: { $ne: userId } }).select([
        "name",
        "_id",
        "profilePic",
        "onlineUsers"
      ]); //'profilePic' import nahi ki he abi tak
      if (!users) {
        return res.status(404).json({ msg: "no user found" });
      }
      res.status(200).json({ msg: "users fetched successfully", users });
    } catch (error) {
      console.log(error);
      res.status(404).json({ msg: "Not found users" });
    }
  },
  globalMessage: async (req, res) => {
    const { textData, image, from,to,fromName } = req.body;
    
    try {
      const globalList = await Global.create({
        textData,
        image:image?image:null,
        from,
        fromName
      });
      
      console.log("text data",textData);
      
      res.status(200).json({ msg: "message sent successfully", globalList });
    } catch (error) {
      console.log("Error sending global message: ", error);
      res.status(400).json({ msg: "Failed to send global message" });
    }
  },
  getGlobalMessage:async (req,res) => {
    const userId = req.user._id;
    try {
      const globalMessages = await Global.find().sort({ createdAt: 1 });

      res.status(200).json({ msg: "messages fetched successfully", globalMessages });
    
  }catch(err){
    console.log(err);
    res.status(404).json({ msg: "global message not found" });
  }}
};
