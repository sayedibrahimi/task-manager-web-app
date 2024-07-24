import mongoose from "mongoose";
const Schema = mongoose.Schema;

//Create Schema
const BoardSchema = new Schema({
  boardName: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "Active",
  },
  //   invitedUsers: {
  //     type: [String],
  //   },
  //   memberUsers: {
  //     type: [String],
  //   },
  //   adminUsers: {
  //     type: [String],
  //   },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: String,
  },
  //   lastUpdatedDate: {
  //     type: Date,
  //     default: Date.now,
  //   },
  //   lastUpdatedBy: {
  //     type: String,
  //   },
});

const Board = mongoose.model("Board", BoardSchema);
export default Board;
