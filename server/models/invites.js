import mongoose, { Schema } from "mongoose";

// Invite Schema (Separate collection)
const inviteSchema = new Schema(
  {
    inviteeId: {
      type: Schema.Types.ObjectId,
      ref: "User", // Reference to the user the invite is for
      required: true,
    },
    inviterId: {
      type: Schema.Types.ObjectId,
      ref: "User", // Reference to the user who sent the invite
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
    message: {
      type: String,
    },
  },
  { timestamps: true }
);

const Invite = mongoose.model("Invite", inviteSchema);

export default Invite;
