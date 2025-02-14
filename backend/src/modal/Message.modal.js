const mongoose = require("mongoose");
const User = require("./User.modal");

const messageSchema = mongoose.Schema(
  {
    from: {
      type: String,
      require: true,
      ref: User,
    },
    to: { type: String, 
        require: true, 
        ref: User },
    text: { type: String },
    image: { type: String },
  },
  { timestamps: true }
);
const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
