import Task from "../models/tasks.js";
// for now...
//const messages = require("../config/messages");

const getAllTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    const { stage } = req.query; // Extract stage from query parameters
    let query = { team: userId }; // Initial query

    // If stage parameter is provided, add it to the query
    if (stage) {
      query.stage = stage;
    }
    const tasks = await Task.find(query).sort({
      _id: -1,
    });
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const createTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, team, stage, date, priority, assets } = req.body;
    const task = await Task.create({
      title,
      team: [userId],
      date,
      stage,
      priority,
    });
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const dashboardStatistics = async (req, res) => {
  try {
    const { userId } = req.user;

    const allTasks = isAdmin
      ? await Task.find({
          isTrashed: false,
        })
          .populate({
            path: "team",
            select: "name role title email",
          })
          .sort({ _id: -1 })
      : await Task.find({
          isTrashed: false,
          team: { $all: [userId] },
        })
          .populate({
            path: "team",
            select: "name role title email",
          })
          .sort({ _id: -1 });

    const users = await User.find({ isActive: true })
      .select("name title role isAdmin createdAt")
      .limit(10)
      .sort({ _id: -1 });

    //   group task by stage and calculate counts
    const groupTasks = allTasks.reduce((result, task) => {
      const stage = task.stage;

      if (!result[stage]) {
        result[stage] = 1;
      } else {
        result[stage] += 1;
      }

      return result;
    }, {});

    // Group tasks by priority
    const groupData = Object.entries(
      allTasks.reduce((result, task) => {
        const { priority } = task;

        result[priority] = (result[priority] || 0) + 1;
        return result;
      }, {})
    ).map(([name, total]) => ({ name, total }));

    // calculate total tasks
    const totalTasks = allTasks?.length;
    const last10Task = allTasks?.slice(0, 10);

    const summary = {
      totalTasks,
      last10Task,
      users: isAdmin ? users : [],
      tasks: groupTasks,
      graphData: groupData,
    };

    res.status(200).json({
      status: true,
      message: "Successfully",
      ...summary,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

// WORK on error messages such as taskID and userId should have different messages
// for all controllers
const getTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id: taskID } = req.params;

    const task = await Task.findOne({ createdBy: userId, _id: taskID });
    // will return null if not found but correct structure (nums of char)
    if (!task) {
      // always return something inorder to avoid JS executing the res after condition
      return res.status(404).json({ msg: `No task with id: ${taskID}` });
    }
    res.status(200).json({ task });
    // this catch is for the incorrect structure
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const updateTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id: taskID } = req.params;
    const task = await Task.findOneAndUpdate(
      { team: { $in: [userId] }, _id: taskID },
      req.body,
      {
        new: true, // Return the modified doc
        runValidators: true, // Run validators during the update
      }
    );
    if (!task) {
      return res.status(404).json({ msg: `No task with id ${taskID}` });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const deleteTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id: taskID } = req.params;

    const task = await Task.findOneAndDelete({
      team: { $in: [userId] },
      _id: taskID,
    });
    if (!task) {
      return res.status(404).json({ msg: `No task with id: ${taskID}` });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

export {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
  dashboardStatistics,
};
