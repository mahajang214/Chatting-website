const User = require("../modal/User.modal.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const formidable = require('formidable');
const {IncomingForm} =require('formidable');
// const uploadRepo=require('../assest/Uploads');

module.exports = {
  
  registerUser: async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "Please fill in all fields" });
    }
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ msg: "Email already exists" });
      }
      const hashedPassword = await bcrypt.hash(password, 15);
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
      });
      if (!user) {
        return res.status(500).json({ msg: "Error creating user" });
      }
      return res.status(201).json({ msg: "User created successfully" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ msg: "error in creating user" });
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ msg: "all filds are required" });
    }
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: "User not found" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(400).json({ msg: "something went wrong" });
      }
      const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
        expiresIn: "1d",
      });
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.status(200).json({ msg: "user login successful" });
    } catch (err) {
      console.log(err);
      res.status(400).json({ msg: "User not found" });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("token");
      res.status(200).json({ msg: "Logged out successfully" });
    } catch (error) {
      console.error("Error logging out user:", error);
      res.status(500).json({ msg: "Error logging out user" });
    }
  },
  setProfile: async (req,res) => {
    const form = new IncomingForm();
    
    // Set the upload directory (optional)
    form.uploadDir = '../assest/Uploads';
    form.keepExtensions = true; // Keep file extensions

    // Parse the form data (this is asynchronous)
    form.parse(req,async (err, fields, files) => {
        if (err) {
            return res.status(500).json({ error: 'Error parsing form data' });
        }

        // Log the uploaded files and fields (form data)
        // console.log('Files:', files);
        // console.log('Fields:', fields);

        // If no file was uploaded, return an error
        if (!files.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // You can use the `files` object to get the file info
        const profilePic = files.file[0];  // If multiple files are uploaded, handle them accordingly
        const userId = req.user._id;
        // console.log("profile pic url Path : ",profilePic.filepath);
        try {
          const user = await User.findByIdAndUpdate(userId);
          user.profilePic = profilePic.filepath;
          await user.save();
          res.status(200).json({ msg: "Profile updated successfully" });
        } catch (error) {
          console.error("Error setting profile:", error);
          res.status(500).json({ msg: "Error setting profile" });
        }
        // console.log('Uploaded file:', profilePic);
        
        // Process the file (save to DB, etc.)
        // res.json({ message: 'Profile picture uploaded successfully', file: profilePic });
      });
      
    // const { profilePic } = req.body;
    
  },
};
