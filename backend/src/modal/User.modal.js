const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength:[3,'Name must be 3 characters long'],
      unique:true
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: [8, 'Password must be 8 characters long']
    },
    profilePic:{
        type:String,
        default: '../assest/default-profile.jpg'
    }
  },
  { timestamps: true }
);




const User = mongoose.model("User", UserSchema);

module.exports = User;
