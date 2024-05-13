
const { JWT_SECRET } = require("../config");
const jwt = require("jsonwebtoken");
const {User} = require("../models/schema")

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(403)
      .json({ error: "Missing or invalid authorization header" });
  }

  const token = authHeader.split(" ")[1];
//   console.log(token);

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log(decoded);

    const userId = decoded.userId;
    const user = await User.findById(userId);
    // const employeeId = user._id
    console.log(user.role);
    console.log(user.username);
    console.log(user._id);

    req.user = {
        _id: user._id,
        role: user.role,
      };

    next();
  } catch (err) {
    console.error("Error verifying token:", err);
    return res.status(403).json({ error: "Invalid or expired token" });
  }
};

module.exports = {
  authMiddleware,
};