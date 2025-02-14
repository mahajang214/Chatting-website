const User = require("../modal/User.modal.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  // const comparePass = await bcrypt.compare(password, User.password)

  // const cookieforUser = await jwt.sign({ _id }, process.env.SECRET_KEY, {
  // expiresIn: "1d",

  // const verify = await jwt.verify(token, process.env.SECRET_KEY);

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
  setProfile: async (res, req) => {
    const { profilePic } = req.body;
    const userId = req.user.userId;
    try {
      const user = await User.findByIdAndUpdate(userId);
      user.profilePic = profilePic;
      await user.save();
      res.status(200).json({ msg: "Profile updated successfully" });
    } catch (error) {
      console.error("Error setting profile:", error);
      res.status(500).json({ msg: "Error setting profile" });
    }
  },
};
