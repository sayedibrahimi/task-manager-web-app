import Board from "../models/boards.js";
import messages from "../config/messages.js";

/*********************************************/
// Controller: getAllBoards
// Description: Get all active boards for the authenticated user
// Access: Authorized Users
/*********************************************/
const getAllBoards = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log(userId);
    const boards = await Board.find({ status: "Active", createdBy: userId });
    console.log(boards);
    if (boards.length === 0)
      return res
        .status(404)
        .json({ success: false, msg: messages.BOARD_NOT_FOUND });

    res.status(200).json({ boards });
  } catch (error) {
    console.error("Error fetching boards:", error);
    res.status(500).json({ msg: error });
  }
};

const createBoard = async (req, res) => {
  const { boardName } = req.body;
  // Validation for mandatory parameters
  if (!boardName) {
    // Bad request
    return res
      .status(400)
      .json({ success: false, msg: messages.BOARD_CREATE_BAD_REQUEST });
  }

  try {
    const board = await Board.create(req.body);
    res.status(201).json(board);
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

export { getAllBoards, createBoard };
