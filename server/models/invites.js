// Invite Schema (Separate collection)
const inviteSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User", // Reference to the user the invite is for
      required: true,
    },
    from: {
      type: Schema.Types.ObjectId,
      ref: "User", // Reference to the user who sent the invite
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Invite = mongoose.model("Invite", inviteSchema);

export default Invite;
