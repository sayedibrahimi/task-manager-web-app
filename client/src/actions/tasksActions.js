const apiUrl = import.meta.env.VITE_API_URL;
import { toast } from "sonner";

/*********************************************/
// Function: fetchTasks
// Description: Fetch tasks from the server, optionally filtering by stage
// Access: Private
// Requires: stage (optional)
/*********************************************/
const fetchTasks = async (stage) => {
  try {
    const token = localStorage.getItem("token"); // Retrieve the authentication token
    if (!token) {
      return response
        .status(401)
        .json({ success: false, msg: "Token missing!" });
    }

    // Construct the URL for the API request, including the stage parameter if provided
    let apiURL = `${apiUrl}/tasks`;
    if (stage) {
      apiURL += `?stage=${stage}`;
    }

    const response = await fetch(apiURL, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the request headers
      },
    });
    const data = await response.json();
    return { success: true, tasks: data.tasks };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/*********************************************/
// Function: createTaskHandler
// Description: Create a new task on the server
// Access: Private
// Requires: taskMeta, fetchAllTasks (callback), setOpen (callback)
/*********************************************/
const createTaskHandler = async (taskMeta, fetchAllTasks, setOpen) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token missing!");
    }

    const response = await fetch(`${apiUrl}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(taskMeta),
    });

    if (response.ok) {
      toast.success("Task created successfully");
      fetchAllTasks();
      setOpen(false);
    } else {
      throw new Error("Failed to create task");
    }
  } catch (error) {
    console.error("Error creating task:", error);
    toast.error("Failed to create task");
  }
};

/*********************************************/
// Function: updateTaskHandler
// Description: Update an existing task on the server
// Access: Private
// Requires: taskMeta, fetchAllTasks (callback), setOpen (callback), task
/*********************************************/
const updateTaskHandler = async (taskMeta, fetchAllTasks, setOpen, task) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token missing!");
    }
    // console.log(task._id);

    // Merge the existing team members with the new id
    // const updatedTeam = [...taskInfo.team, task.team];

    // console.log(`task id: ${task._id}`);
    // console.log(`task info: ${taskMeta.team}`);

    const response = await fetch(`${apiUrl}/tasks/${task._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(taskMeta),
    });

    await response.json();
    if (response.ok) {
      toast.success("Task updated successfully");
      fetchAllTasks();
      setOpen(false);
    } else {
      throw new Error("Failed to update task");
    }
  } catch (error) {
    console.error("Error updating task:", error);
    toast.error("Failed to update task");
  }
};

/*********************************************/
// Function: deleteHandler
// Description: Delete a task from the server
// Access: Private
// Requires: selected (task ID), fetchAllTasks (callback), setOpenDialog (callback)
/*********************************************/
const deleteHandler = async (selected, fetchAllTasks, setOpenDialog) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token missing!");
    }

    const response = await fetch(`${apiUrl}/tasks/${selected}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    await response.json();
    fetchAllTasks();
    setOpenDialog(false);
  } catch (error) {
    console.error("Error deleting task:", error);
  }
};

/*********************************************/
// Function: fetchDashboardStatistics
// Description: Fetch statistics for the dashboard from the server
// Access: Private
/*********************************************/
const fetchDashboardStatistics = async () => {
  try {
    const token = localStorage.getItem("token"); // Retrieve the authentication token
    if (!token) {
      return response
        .status(401)
        .json({ success: false, msg: "Token missing!" });
    }

    const response = await fetch(`${apiUrl}/tasks/dashboard`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the request headers
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch dashboard statistics");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching dashboard statistics:", error);
    throw error;
  }
};

export {
  fetchTasks,
  createTaskHandler,
  updateTaskHandler,
  deleteHandler,
  fetchDashboardStatistics,
};
