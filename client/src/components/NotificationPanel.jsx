import React, { useEffect, useRef, useState } from "react";
import { respondToInvite, fetchAllInvites } from "../actions/teamActions";

const NotificationPanel = () => {
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [invites, setInvites] = useState([]);
  const [error, setError] = useState("");

  const fetchInvites = async () => {
    try {
      const allInvites = await fetchAllInvites();
      setInvites(allInvites); // Set invites here
      console.log(allInvites);
    } catch (err) {
      setError("Failed to fetch invites");
    }
  };

  useEffect(() => {
    fetchInvites();
  }, []);

  const handleOnResponse = async (inviteId, inviteRes) => {
    try {
      await respondToInvite(inviteId, inviteRes);
      setInvites(invites.filter((invite) => invite._id !== inviteId));
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.error);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };
  return (
    <>
      <div className="relative inline-block text-left">
        <div>
          <button
            ref={buttonRef}
            onClick={() => setOpen((prev) => !prev)}
            className="w-10 h-10 2xl:w-12 2xl:h-12 items-center justify-center rounded-full bg-blue-600"
          ></button>
        </div>
        {open && (
          <div
            ref={menuRef}
            className="absolute right-0 mt-2 w-56 origin-top-right divide-gray-100 rounded-md bg-white shadow-2xl ring-1 ring-black/5 focus:outline-none"
          >
            <div className="p-4">
              {invites.map((invite) => (
                <div key={invite._id}>
                  <p>
                    Invite from:
                    {/* /*Display the email and name of the user who sent the
                    invite*/}
                  </p>
                  <button
                    onClick={() => handleOnResponse(invite._id, "accepted")}
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleOnResponse(invite._id, "rejected")}
                  >
                    Reject
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default NotificationPanel;
