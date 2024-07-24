import messages from "../config/messages.js";
import config from "../config/config.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/users.js";

/*********************************************/
// Controller: loginUser
// Description: Authenticate and login a user
// Route: POST api/v1/auth
// Access: Public
/*********************************************/
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation: Check if email and password are provided
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, msg: messages.AUTH_BAD_REQUEST });
    }

    // Find user by email
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res
        .status(401)
        .json({ success: false, msg: messages.USER_NOT_FOUND });
    // if (user.status !== "Active")
    //   return res
    //     .status(400)
    //     .json({ success: false, msg: messages.USER_NOT_ACTIVE });
    console.log(password);
    console.log(user.password);
    // Validate user password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);
    if (!isMatch)
      return res
        .status(401)
        .json({ success: false, msg: messages.AUTH_INVALID_CREDENTIALS });

    // Sign JWT token
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
    res.status(200).json({
      success: true,
      token: token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        // userPic: user.userPic,
      },
    });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

export default loginUser;
