/**
 * AddTeam Component
 *
 * This component renders a modal form that allows users to invite others to a team by entering their email address and a message.
 * It uses the `ModalWrapper` component to display the form in a modal dialog.
 *
 * The component maintains local state for the email, message, error, and success messages using React's `useState` hook.
 *
 * When the form is submitted, it calls the `inviteUserToTeam` action to send the invitation. If the invitation is successful,
 * a success message is displayed; otherwise, an error message is shown.
 *
 * Props:
 * - `open` (boolean): Controls the visibility of the modal.
 * - `setOpen` (function): Function to set the visibility of the modal.
 */

import React, { useState } from "react";
import ModalWrapper from "./ModalWrapper";
import { inviteUserToTeam } from "../actions/teamActions";

const AddTeam = ({ open, setOpen }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const inviteMeta = { email, message };
      console.log(inviteMeta);

      const response = await inviteUserToTeam(inviteMeta, setOpen);
      setSuccess(response.data.message);
      setError("");
    } catch (err) {
      setError(err.response.data.error);
      setSuccess("");
    }
  };

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email Address:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Message:</label>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <button type="submit">Send</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
      </form>
    </ModalWrapper>
  );
};

export default AddTeam;
