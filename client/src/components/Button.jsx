/**
 * A reusable button component with loading state, icon support, and customizable styling.
 * The component is memoized to prevent unnecessary re-renders.
 *
 * @component
 * @param {Object} props - The component props
 * @param {React.ReactNode} [props.icon] - Optional icon element to display alongside the label
 * @param {string} [props.className] - Additional CSS classes to apply to the button
 * @param {string} [props.label] - Text to display inside the button
 * @param {string} [props.type='button'] - HTML button type ('button', 'submit', 'reset')
 * @param {boolean} [props.disabled] - Whether the button is disabled
 * @param {boolean} [props.loading] - Whether to show a loading indicator
 * @param {Function} [props.onClick] - Click event handler
 * @returns {React.ReactElement} A memoized button component
 */
import clsx from "clsx";
import { memo } from "react";

const Button = ({
  icon,
  className,
  label,
  type,
  disabled,
  loading,
  onClick = () => {},
}) => {
  return (
    <button
      type={type || "button"}
      className={clsx("px-3 py-2 outline-none", className)}
      onClick={onClick}
      disabled={disabled}
    >
      {loading ? (
        <div className="flex items-center justify-center gap-2">
          <div className="loader"></div>
          Logging in...
        </div>
      ) : (
        label
      )}
      {icon && icon}
    </button>
  );
};

// Memoize the component
const MemoizedButton = memo(Button);

// Set the display name
MemoizedButton.displayName = "Button";

export default MemoizedButton;
