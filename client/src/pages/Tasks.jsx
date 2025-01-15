import { useCallback, useEffect, useState } from "react";
import { FaList } from "react-icons/fa";
import { MdGridView } from "react-icons/md";
import { useParams, useSearchParams } from "react-router-dom";
import Loading from "../components/Loader";
import Title from "../components/Title";
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";
import Tabs from "../components/Tabs";
// import TaskTitle from "../components/tasks/TaskTitle";
// import BoardView from "../components/tasks/BoardView";
// import { tasks } from "../assets/data";
import Table from "../components/Table";
import AddTask from "../components/task/AddTask";
import { fetchTasks } from "../actions/tasksActions";
import BoardView from "../components/task/BoardView";
const apiUrl = import.meta.env.VITE_API_URL;

const TABS = [
  { title: "Board View", icon: <MdGridView /> },
  { title: "List View", icon: <FaList /> },
];

const TASK_TYPE = {
  todo: "bg-blue-600",
  "in progress": "bg-yellow-600",
  completed: "bg-green-600",
};

const Tasks = () => {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const [searchTerm] = useState(searchParams.get("search") || "");

  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);

  const stage = params?.stage || "";

  const [tasks, setTasks] = useState([]);

  const fetchTasksData = useCallback(async () => {
    const { success, tasks: fetchedTasks, error } = await fetchTasks(stage);
    if (success) {
      setTasks(fetchedTasks);
    } else {
      console.error("Error fetching tasks:", error);
    }
  }, [stage]);

  useEffect(() => {
    fetchTasksData();
  }, [fetchTasksData]);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <Title title={stage ? `${stage} Tasks` : "Tasks"} />

        {!stage && (
          <Button
            onClick={() => setOpen(true)}
            label="Create Task"
            icon={<IoMdAdd className="text-lg" />}
            className="flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5"
          />
        )}
      </div>

      <Tabs tabs={TABS} setSelected={setSelected}>
        {/* {!status && (
          <div className="w-full flex justify-between gap-4 md:gap-x-12 py-4">
            <TaskTitle label="To Do" className={TASK_TYPE.todo} />
            <TaskTitle
              label="In Progress"
              className={TASK_TYPE["in progress"]}
            />
            <TaskTitle label="completed" className={TASK_TYPE.completed} />
          </div>
        )} */}

        {selected === 0 ? (
          <div className="w-full">
            {<BoardView tasks={tasks} fetchAllTasks={fetchTasksData} />}
          </div>
        ) : (
          <div className="w-full">
            {<Table tasks={tasks} fetchAllTasks={fetchTasksData} />}
          </div>
        )}
      </Tabs>

      <AddTask open={open} setOpen={setOpen} fetchAllTasks={fetchTasksData} />
    </div>
  );
};

export default Tasks;
