const express = require("express");
const zod = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { User, Employee, TaskRoom } = require("../models/schema");
const router = express.Router();
const upload = require("../middleware/multer");

// creating zod schema for validating inputs
const signUpSchema = zod.object({
  username: zod.string().min(3).max(20),
  password: zod.string().min(6).max(20),
  role: zod.enum(["admin", "employee"]), // Validate role as enum
});

router.post("/signup", upload.single("image"), async (req, res) => {
  try {
    //extracting user details from the body
    const { username, password, role } = req.body;
    // const profilePic = req.file.filename;
    const profilePic = req.file ? req.file.filename : null;
    const { success } = signUpSchema.safeParse({ username, password, role });

    if (!success) {
      res.status(400).json({
        message: "Invalid format",
      });
    }

    // checking if user already exists
    const existingUser = await User.findOne({
      username: username,
    });

    if (existingUser) {
      return res.status(400).json({ //if not given return it will runn the program and let create user with same username
        message: "User already exists",
      });
    }

    // hashing password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // creating user
    const user = await User.create({
      username,
      password: hashedPassword,
      role,
      profilePic
    });

    if (role === "employee") {
      const employee = await Employee.create({
        userId: user._id,
        username: user.username,
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
      },
      JWT_SECRET
    );

    if (user) {
      res.status(200).json({
        message: "user created succesfully",
        user: {
          username: user.username,
          role: user.role,
        },
        token,
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

//  user login
//  craeting login schema with zod for validation
// const loginSchema = zod.object({
//   username: zod.string().min(3).max(20),
//   password: zod.string().min(6).max(20),
// });

router.post("/signin", async (req, res) => {
  try {
    const { username, password } = req.body;
    // const { success } = loginSchema.safeParse({ username, password });

    // if (!success) {
    //   res.status(400).json({
    //     message: "Invalid format",
    //   });
    // }

    
    const user = await User.findOne({
      username,
    });
    
    console.log(user);
    

    if (!user) {
      return res.status(400).json({
        message: "User doesn't exists",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    if (user) {
      const token = jwt.sign(
        {
          userId: user._id,
        },
        JWT_SECRET
      );

      res.json({
        message: "user login successfull",
        token: token,
      });
      return;
    }

    res.status(411).json({
      message: "Error while logging in",
    });
  } catch (err) {
    console.error("error occured: ", err);
    res.status(400).json({
      message: err.errors,
    });
  }
});

module.exports = router;
