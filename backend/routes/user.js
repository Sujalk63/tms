const express = require("express");
const zod = require("zod");
const bcrypt = require('bcrypt');
const { User, Employee, TaskRoom } = require("../models/schema");
const router = express.Router();

// creating zod schema for validating inputs
const signUpSchema = zod.object({
  username: zod.string().min(3).max(20),
  password: zod.string().min(6).max(20),
  role: zod.enum(["admin", "employee"]), // Validate role as enum
});


router.post("/signup", async (req, res) => {
  try {
    //extracting user details from the body
    const { username, password, role } = req.body;
    const {success} = signUpSchema.safeParse({ username, password, role });

    if (!success) {
      res.status(400).json({
        message: "Invalid user data",
      });
    }

    // checking if user already exists
    const existingUser = await User.findOne({
      username: username,
    });

    if (existingUser) {
      res.status(400).json({
        message: "User already exists",
      });
    }

    // hashing password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // creating user
    const user = await User.create({ username, password:hashedPassword, role });

    if (user) {
      res.status(200).json({
        message: "user created succesfully",
        user: {
          username: user.username,
          role: user.role,
        },
      });
    }

    // const userID = user._id;

  } catch (err) {
    console.error("error occured: ", err);
    res.status(400).json({
      message: err.errors,
    });
  }
});

// router.post("/login", (req, res) => {
//   res.send("this is admin login");
// });

module.exports = router;
