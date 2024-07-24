import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Textbox from "../components/Textbox";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
// import { setCredentials } from "../redux/slices/authSlice";
// import { useLoginMutation } from "../redux/slices/api/authApiSlice";
// import { useForm } from "react-hook-form";
import { toast } from "sonner";

const apiUrl = import.meta.env.VITE_API_URL;

const Login = () => {
  // const { user } = useSelector((state) => state.auth); // entire Redux store state as 'state'

  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setUserInfo({ ...userInfo, [input.name]: input.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
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
        throw new Error(res.message || "Failed to authenticate");
      }
    } catch (error) {
      setError("An error occurred while authenticating");
    }
  };

  // useEffect(() => {
  //   user && navigate("/dashboard");
  // }, [user]);

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
              placeholder="you@example.com"
              type="email"
              name="email"
              label="Email Address"
              className="w-full rounded-full"
              value={userInfo.email}
              onChange={handleChange}
              error={error.email ? error.email : ""}
            />
            <Textbox
              placeholder="password"
              type="password"
              name="password"
              label="Password"
              className="w-full rounded-full"
              value={userInfo.password}
              onChange={handleChange}
              error={error.password ? error.password : ""}
            />
            <span className="text-sm text-gray-600 hover:underline cursor-pointer">
              Forget Password?
            </span>
          </div>
          <Button
            type="submit"
            label="Log in"
            className="w-full h-10 bg-blue-700 text-white rounded-full"
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
