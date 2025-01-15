// controllers/teamController.js
import User from "../models/users.js";

const getTeamMembers = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find user and populate team members with selected fields
    const user = await User.findById(userId)
      .populate("team", "firstName lastName email isActive")
      .lean(); // Convert to plain JavaScript object for better performance

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Filter active team members and format response
    const teamMembers = user.team
      .filter((member) => member.isActive)
      .map((member) => ({
        id: member._id,
        firstName: member.firstName,
        lastName: member.lastName,
        email: member.email,
      }));

    res.status(200).json({
      success: true,
      data: teamMembers,
    });
  } catch (error) {
    console.error("Error fetching team members:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export { getTeamMembers };
