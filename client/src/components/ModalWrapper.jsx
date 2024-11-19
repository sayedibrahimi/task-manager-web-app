import React, { memo, useEffect, useRef } from "react";

const ModalWrapper = ({ open, setOpen, children }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    // Close modal on pressing Escape key
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };
    if (open) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, setOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, setOpen]);

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-60 transition-opacity" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div
          ref={modalRef}
          className="relative w-full max-w-lg bg-white rounded-lg shadow-xl transition-all transform"
        >
          <div className="px-4 py-5 sm:p-6">{children}</div>
        </div>
      </div>
    </>
  );
};

// Memoize the component
const MemoizedModalWrapper = memo(ModalWrapper);

MemoizedModalWrapper.displayName = "ModalWrapper";

export default MemoizedModalWrapper;
