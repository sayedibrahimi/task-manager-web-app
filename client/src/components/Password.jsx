import React, { useState, useCallback, memo } from "react";
import ModalWrapper from "./ModalWrapper";
import Button from "./Button";
import Textbox from "./Textbox";
import { toast } from "sonner";

const apiUrl = import.meta.env.VITE_API_URL;

const Password = ({ open, setOpen }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleReset = useCallback(() => {
    setNewPassword("");
    setConfirmPassword("");
    setError("");
    setOpen(false);
  }, [setOpen]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (newPassword !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      try {
        const response = await fetch(`${apiUrl}/reset-password`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password: newPassword }),
        });
        const res = await response.json();
        if (response.ok) {
          toast.success("Password changed successfully");
          handleReset();
        } else {
          throw new Error(res.message || "Failed to change password");
        }
      } catch (error) {
        setError("An error occurred while changing the password");
      }
    },
    [newPassword, confirmPassword, handleReset]
  );

  const handleNewPasswordChange = useCallback((e) => {
    setNewPassword(e.target.value);
  }, []);

  const handleConfirmPasswordChange = useCallback((e) => {
    setConfirmPassword(e.target.value);
  }, []);

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <h2 className="text-base font-bold leading-6 text-gray-900 mb-4">
        CHANGE PASSWORD
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <Textbox
              placeholder="New Password"
              type="password"
              name="password"
              label="New Password"
              className="w-full rounded"
              value={newPassword}
              onChange={handleNewPasswordChange}
            />
          </div>
          <div className="flex flex-col gap-4">
            <Textbox
              placeholder="Confirm New Password"
              type="password"
              name="password"
              label="Confirm Password"
              className="w-full rounded"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </div>
          {error && <p className="text-red-600">{error}</p>}
          <div className="bg-gray-50 py-6 sm:flex sm:flex-row-reverse gap-4">
            <Button
              label="Submit"
              type="submit"
              className="bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700 sm:w-auto rounded-full"
            />
            <Button
              type="button"
              className="bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto rounded-full"
              onClick={handleReset}
              label="Cancel"
            />
          </div>
        </div>
      </form>
    </ModalWrapper>
  );
};

// Memoize the component
const MemoizedPassword = memo(Password);

// Set the display name
MemoizedPassword.displayName = "Password";

export default MemoizedPassword;
