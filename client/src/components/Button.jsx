import clsx from "clsx";
import { memo } from "react";

const Button = ({ icon, className, label, type, onClick = () => {} }) => {
  return (
    <button
      type={type || "button"}
      className={clsx("px-3 py-2 outline-none", className)}
      onClick={onClick}
    >
      <span>{label}</span>
      {icon && icon}
    </button>
  );
};

// Memoize the component
const MemoizedButton = memo(Button);

// Set the display name
MemoizedButton.displayName = "Button";

export default MemoizedButton;
