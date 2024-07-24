import messages from "../config/messages.js";
import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const authHeader = req.header("Authorization");

  // Check for token
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ success: false, msg: messages.AUTH_NO_TOKEN });
  }

  // Extract the token from the header
  const token = authHeader.split(" ")[1];

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Add User from payload
    req.user = decoded;
    next();
  } catch (exception) {
    res
      .status(401)
      .json({ success: false, msg: messages.AUTH_TOKEN_NOT_VALID + exception });
  }
};

export default auth;
