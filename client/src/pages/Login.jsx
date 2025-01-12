/**
 * Login component that handles user authentication
 *
 * Features:
 * - Email and password validation
 * - Rate limiting (5 attempts before 60-second cooldown)
 * - Loading states to prevent double submission
 * - Error handling and user feedback via toast notifications
 * - Responsive layout that works on mobile and desktop
 *
 * On successful login:
 * - Stores authentication token in localStorage
 * - Redirects user to dashboard
 *
 * Component State:
 * - userInfo: Tracks email and password input values
 * - error: Stores validation errors for form fields
 * - loginAttempts: Counts failed login attempts
 * - cooldown: Enables rate limiting after too many failed attempts
 * - loading: Prevents multiple form submissions while processing
 *
 * Required Environment Variables:
 * - VITE_API_URL: Base URL for the authentication API
 */
import { useState } from "react";
import { Link } from "react-router-dom";
import Textbox from "../components/Textbox";
import Button from "../components/Button";
import { toast } from "sonner";

const apiUrl = import.meta.env.VITE_API_URL;

const Login = () => {
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  const [error, setError] = useState({});
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [cooldown, setCooldown] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = ({ currentTarget: input }) => {
    setUserInfo({ ...userInfo, [input.name]: input.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (cooldown) {
      toast.error("Please wait before trying again.");
      return;
    }

    // Prevent multiple clicks while loading
    if (loading) return;

    const errors = {};
    if (!userInfo.email) errors.email = "Email is required.";
    if (!userInfo.password) errors.password = "Password is required.";

    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }

    setLoginAttempts((prev) => prev + 1);

    setLoading(true); // Set loading state to true

    try {
      const response = await fetch(`${apiUrl}/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });
      const res = await response.json();
      if (response.ok) {
        localStorage.setItem("token", res.token);
        window.location = `/dashboard`;
      } else {
        toast.error(res.message || "Email or password is incorrect.");
      }
    } catch (error) {
      toast.error("An error occurred while authenticating.");
    } finally {
      if (loginAttempts + 1 >= 5) {
        setCooldown(true);
        setTimeout(() => setCooldown(false), 60000); // Cooldown for 60 seconds
        setLoginAttempts(0); // Reset attempts
      }
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-[#f3f4f6]">
      <div className="w-full md:w-1/3 p-4 md:p-1 flex flex-col justify-center items-center">
        <form
          onSubmit={handleLogin}
          className="form-container w-full md:w-[400px] flex flex-col gap-y-8 bg-white px-10 pt-14 pb-14"
        >
          <div>
            <p className="text-blue-600 text-3xl font-bold text-center">
              Log in to continue
            </p>
          </div>

          <div className="flex flex-col gap-y-2">
            <Textbox
              placeholder="john.doe@example.com"
              type="email"
              name="email"
              label="Email Address"
              className="w-full rounded-full"
              value={userInfo.email}
              onChange={handleChange}
              error={error.email || ""}
            />
            <Textbox
              placeholder="********"
              type="password"
              name="password"
              label="Password"
              className="w-full rounded-full"
              value={userInfo.password}
              onChange={handleChange}
              error={error.password || ""}
            />
            <span className="text-sm text-gray-600 hover:underline cursor-pointer">
              Forget Password?
            </span>
          </div>
          <Button
            type="submit"
            label="Log in"
            className="w-full h-10 bg-blue-700 text-white rounded-full"
            disabled={loading}
            loading={loading}
          />
          <Link
            to="/signup"
            className="text-sm text-gray-500 hover:text-blue-600 hover:underline cursor-pointer text-center"
          >
            Create an account
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
