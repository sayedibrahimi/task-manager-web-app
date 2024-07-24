import { useState, useRef, useEffect } from "react";
import { FaUser, FaUserLock } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { getInitials } from "../utils";
import Password from "./Password";
import { useUser } from "../context.js/userInfo";

const UserAvatar = () => {
  const [open, setOpen] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);
  const { userInfo } = useUser();
  const menuRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const initials = getInitials(userInfo?.firstName, userInfo?.lastName);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="relative inline-block text-left">
        <div>
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="w-10 h-10 2xl:w-12 2xl:h-12 items-center justify-center rounded-full bg-blue-600"
          >
            <span className="text-white font-semibold">{initials}</span>
          </button>
        </div>
        {open && (
          <div
            ref={menuRef}
            className="absolute right-0 mt-2 w-56 origin-top-right divide-gray-100 rounded-md bg-white shadow-2xl ring-1 ring-black/5 focus:outline-none"
          >
            <div className="p-4">
              <button className="text-gray-700 flex w-full items-center rounded-md px-2 py-2 text-base">
                <FaUser className="mr-2" aria-hidden="true" />
                Profile
              </button>

              <button
                onClick={() => setOpenPassword(true)}
                className="text-gray-700 flex w-full items-center rounded-md px-2 py-2 text-base"
              >
                <FaUserLock className="mr-2" aria-hidden="true" />
                Change Password
              </button>

              <button
                onClick={handleLogout}
                className="text-red-600 flex w-full items-center rounded-md px-2 py-2 text-base"
              >
                <IoLogOutOutline className="mr-2" aria-hidden="true" />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
      <Password open={openPassword} setOpen={setOpenPassword} />
    </>
  );
};

export default UserAvatar;
