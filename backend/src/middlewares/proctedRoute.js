const jwt = require("jsonwebtoken");

module.exports.protectedRoute = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ msg: "Unauthorise user" });
  }
  try {
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decode;
    // console.log("procted Route decode:",decode);
    next();
  } catch (err) {
    console.log("procted route error", err);
    return res.status(401).json({ msg: "Invalid token" });
  }
};
