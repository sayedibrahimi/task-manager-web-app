import User from "../models/users.js";
import Invite from "../models/invites.js";

const invite = async (req, res) => {
  const inviterId = req.user.id;
  const { email, message } = req.body;

  try {
    const invitee = await User.findOne({ email });
    if (!invitee) {
      return res.status(404).json({ error: "User not found" });
    }

    // Create a new invite document
    const newInvite = new Invite({
      inviteeId: invitee._id, // The user being invited
      inviterId: inviterId, // The user who is sending the invite
      status: "pending", // Status can be "pending" by default
      message: message,
    });

    // Save the new invite document
    await newInvite.save();

    res.status(200).json({ message: "Invite sent successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const respondToInvite = async (req, res) => {
  const inviteeId = req.user.id;
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
      const inviter = await User.findById(invite.inviterId);
      if (!inviter) {
        return res.status(404).json({ error: "Inviting user not found" });
      }

      const invitee = await User.findById(inviteeId);
      if (!invitee) {
        return res.status(404).json({ error: "User not found" });
      }

      // Avoid duplicates in the team array
      if (!inviter.team.includes(inviteeId)) {
        inviter.team.push(inviteeId);
        await inviter.save();
      }

      if (!invitee.team.includes(invite.inviterId)) {
        invitee.team.push(invite.inviterId); // Add the inviting user to the accepted user's team
        await invitee.save();
      }
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
      $or: [{ inviterId: userId }, { inviteeId: userId }], // Find invites where the user is either the invitee or the in inviter
    })
      .populate("inviterId", "firstName") // Populate inviter's name and email
      .populate("inviteeId", "firstName") // Optionally populate the invitee's details too
      .sort({ createdAt: -1 }) // Sort by newest first
      .exec();

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
