import User from "../models/users.js";
import Invite from "../models/invites.js";

const invite = async (req, res) => {
  const userId = req.user.id;
  const { email, message } = req.body;

  console.log(message);

  try {
    const userToInvite = await User.findOne({ email });
    if (!userToInvite) {
      return res.status(404).json({ error: "User not found" });
    }

    // Create a new invite document
    const newInvite = new invite({
      userId: userToInvite._id, // The user being invited
      from: userId, // The user who is sending the invite
      status: "pending", // Status can be "pending" by default
    });

    // Save the new invite document
    await newInvite.save();

    res.status(200).json({ message: "Invite sent successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const respondToInvite = async (req, res) => {
  const userId = req.user.id;
  const { inviteId, inviteRes } = req.body;
  try {
    const invite = await Invite.findById(inviteId);
    if (!invite) {
      return res.status(404).json({ error: "Invite not found" });
    }

    invite.status = inviteRes;
    await invite.save();

    if (inviteRes === "accepted") {
      // Add the user to the inviting user's team
      const invitingUser = await User.findById(invite.from);
      if (!invitingUser) {
        return res.status(404).json({ error: "Inviting user not found" });
      }

      invitingUser.team.push(userId); // Add the invited user to the inviting user's team
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      user.team.push(invite.from); // Add the inviting user to the accepted user's team
      await invitingUser.save();
      await user.save();
    }

    res.status(200).json({ message: "Invite response recorded" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const getAllInvites = async (req, res) => {
  const userId = req.user.id;

  try {
    // Query the Invite collection for all invites where the userId is either the invited user or the sender
    const invites = await Invite.find({
      $or: [{ userId }, { from: userId }], // Find invites where the user is either the invitee or the sender
    });

    if (!invites || invites.length === 0) {
      return res.status(404).json({ error: "No invites found" });
    }

    res.status(200).json(invites);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching invites", error });
  }
};

export { invite, respondToInvite, getAllInvites };
