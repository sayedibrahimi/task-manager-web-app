import messages from "../config/messages.js";
import config from "../config/config.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import User from "../models/users.js";

const getUser = async (req, res) => {
  try {
    // Retrieve the user ID
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Send only necessary user details to the client
    const userToSend = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      // status: user.status,
      // userPic: user.userPic,
    };

    // If the user is found, send their details as a response
    res.status(200).send(userToSend);
  } catch (error) {
    // Handle any errors
    console.error("Error fetching user:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

/*********************************************/
// Controller: createUser
// Description: Register a new user
// Route: POST api/v1/users
// Access: Public
/*********************************************/
const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    // Validation: Check if all required fields are provided
    if (!firstName || !lastName || !email || !password) {
      return res
        .status(400)
        .json({ success: false, msg: messages.USER_CREATE_BAD_REQUEST });
    }

    // Check if user with the given email already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, msg: messages.USER_CREATE_EXISTS });
    }

    // Hash the password before storing it in the database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user object with hashed password
    const newUser = {
      firstName,
      lastName,
      email,
      password: hashedPassword, // Set the hashed password
    };

    // Create a new user in the database
    const user = await User.create(newUser);

    // Generate JWT token for the new user
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      process.env.JWT_SECRET,
      { expiresIn: config.tokenExpire }
    );

    // Send success response with token and user details
    res.status(201).json({
      success: true,
      token: token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    // Handle any errors
    console.error("Error creating user:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

export { createUser, getUser };
