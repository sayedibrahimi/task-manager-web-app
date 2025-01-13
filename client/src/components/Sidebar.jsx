/**
 * Sidebar Component
 *
 * A responsive navigation sidebar component for RavâlFlow task management application.
 * Renders a list of navigation links with icons for different sections of the app
 * including Dashboard, Tasks, Task Status views (Completed, In Progress, To Do),
 * Team management,Trash, and Settings.
 *
 * Features:
 * - Responsive design with Tailwind CSS
 * - Active route highlighting
 * - Consistent icon usage with react-icons
 *
 * @component
 * @uses {react-router-dom} For navigation and route matching
 * @uses {react-icons} For navigation and interface icons
 * @uses {clsx} For conditional class name handling
 */
import React from "react";
import {
  MdDashboard,
  MdOutlineAddTask,
  MdOutlinePendingActions,
  MdSettings,
  MdTaskAlt,
} from "react-icons/md";
import { GrInProgress } from "react-icons/gr";
import { FaTasks, FaTrashAlt, FaUsers } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";

const sideBarLinks = [
  {
    label: "Dashboard",
    link: "dashboard",
    icon: <MdDashboard />,
  },
  {
    label: "Tasks",
    link: "tasks",
    icon: <FaTasks />,
  },
  {
    label: "Completed",
    link: "completed/completed",
    icon: <MdTaskAlt />,
  },
  {
    label: "In Progress",
    link: "inprogress/inprogress",
    icon: <GrInProgress />,
  },
  {
    label: "To Do",
    link: "todo/todo",
    icon: <MdOutlinePendingActions />,
  },
  {
    label: "Team",
    link: "team",
    icon: <FaUsers />,
  },
  {
    label: "Trash",
    link: "trashed",
    icon: <FaTrashAlt />,
  },
];

const Sidebar = () => {
  const location = useLocation(); // object that contains property pathname
  const path = location.pathname.split("/")[1];

  const NavLink = ({ el }) => {
    return (
      <Link
        to={el.link}
        className={clsx(
          "w-full lg:w-3/4 flex gap-2 px-3 py-2 rounded-full items-center text-gray-800 text-base hover:bg-[#2564ed2d]",
          path === el.link.split("/")[0] ? "bg-blue-700 text-neutral-100" : ""
        )}
      >
        {el.icon}
        <span className="hover:text-[#2564ed]">{el.label}</span>
      </Link>
    );
  };
  return (
    <div className="w-full  h-full flex flex-col gap-6 p-3">
      <h1 className="flex gap-1 items-center">
        <p className="bg-blue-600 p-2 rounded-full">
          <MdOutlineAddTask className="text-white text-2xl font-black" />
        </p>
        <span className="text-2xl font-bold text-black">RavâlFlow</span>
      </h1>

      <div className="flex-1 flex flex-col gap-y-5 py-8">
        {sideBarLinks.map((link) => (
          <NavLink el={link} key={link.label} />
        ))}
      </div>

      <div className="">
        <button className="w-full flex gap-2 p-2 items-center text-lg text-gray-800">
          <MdSettings />
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
