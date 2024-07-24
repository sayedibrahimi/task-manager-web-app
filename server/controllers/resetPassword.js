import bcrypt from "bcryptjs";
import User from "../models/users.js";

const resetPassword = async (req, res) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    // Update the user identified by userId
    const userId = req.user.id;
    await User.findByIdAndUpdate(userId, { password: hashedPassword });
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export default resetPassword;
