import { useState } from "react";
import ModalWrapper from "../ModalWrapper";
import Textbox from "../Textbox";
import { BiImages } from "react-icons/bi";
import Button from "../Button";
import { dateFormatter } from "../../utils";
import { toast } from "sonner";
import {
  createTaskHandler,
  updateTaskHandler,
} from "../../actions/tasksActions";
import SelectList from "../SelectList";
const apiUrl = import.meta.env.VITE_API_URL;

const LISTS = ["todo", "inprogress", "completed"];
const PRIORITY = ["high", "medium", "normal", "low"];

const AddTask = ({ open, setOpen, task, fetchAllTasks }) => {
  const [taskInfo, setTaskInfo] = useState({
    title: task?.title || "",
    team: task?.team || [],
    date: dateFormatter(task?.date || new Date()),
  });

  const [stage, setStage] = useState(task?.stage?.toLowerCase() || LISTS[0]);
  // const [team, setTeam] = useState(task?.team || []);
  const [priority, setPriority] = useState(
    task?.priority?.toLowerCase() || PRIORITY[2]
  );
  // const [assets, setAssets] = useState([]);
  // const [uploading, setUploading] = useState(false);

  const handleChange = ({ currentTarget: input }) => {
    setTaskInfo({ ...taskInfo, [input.name]: input.value });
  };

  // const [createTask, { isLoading }] = useCreateTaskMutation();
  // const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();
  // const URLS = task?.assets ? [...task.assets] : [];

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const taskMeta = {
        ...taskInfo,
        stage,
        priority,
      };
      if (task?._id) {
        // Merge the existing team members with the new id
        // const updatedTeam = [...taskInfo.team, id];
        await updateTaskHandler(taskMeta, fetchAllTasks, setOpen, task);
      } else {
        await createTaskHandler(taskMeta, fetchAllTasks, setOpen);
      }
    } catch (error) {
      console.error("Error handling form submission:", error);
    }
  };

  console.log("AddTask component rendered");

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleOnSubmit}>
          <h2 className="text-base font-bold leading-6 text-gray-900 mb-4">
            {task ? "UPDATE TASK" : "ADD TASK"}
          </h2>

          <div className="mt-2 flex flex-col gap-6">
            <Textbox
              placeholder="Task Title"
              type="text"
              name="title"
              label="Task Title"
              className="w-full rounded"
              value={taskInfo.title}
              onChange={handleChange}
            />

            {/* 
            <UserList setTeam={setTeam} team={team} />
            */}

            <div className="flex gap-4">
              <SelectList
                label="Task Stage"
                lists={LISTS}
                selected={stage}
                setSelected={setStage}
              />
              <SelectList
                label="Priority Level"
                lists={PRIORITY}
                selected={priority}
                setSelected={setPriority}
              />
            </div>

            <div className="flex gap-4">
              <div className="w-full">
                <Textbox
                  placeholder="Date"
                  type="date"
                  name="date"
                  label="Task Date"
                  className="w-full rounded"
                  value={taskInfo.date}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* <div className="flex gap-4">
              <div className="w-full flex items-center justify-center mt-4">
                <label
                  className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer my-4"
                  htmlFor="imgUpload"
                >
                  <input
                    type="file"
                    className="hidden"
                    id="imgUpload"
                    onChange={(e) => handleSelect(e)}
                    accept=".jpg, .png, .jpeg"
                    multiple={true}
                  />
                  <BiImages />
                  <span>Add Assets</span>
                </label>
              </div>
            </div> */}

            <div className="bg-gray-50 py-6 sm:flex sm:flex-row-reverse gap-4">
              <Button
                label="Submit"
                type="submit"
                className="bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700  sm:w-auto rounded-full"
              />

              <Button
                type="button"
                className="bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto rounded-full"
                onClick={() => setOpen(false)}
                label="Cancel"
              />
            </div>
          </div>
        </form>
      </ModalWrapper>
    </>
  );
};

export default AddTask;
