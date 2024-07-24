import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Textbox from "../components/Textbox";
import Button from "../components/Button";
import { useForm } from "react-hook-form";
// import { useSignupMutation } from "../redux/slices/api/authApiSlice";
import { toast } from "sonner";
const apiUrl = import.meta.env.VITE_API_URL;

const Signup = () => {
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setUserInfo({ ...userInfo, [input.name]: input.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    console.log(userInfo);
    try {
      const response = await fetch(`${apiUrl}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });
      const res = await response.json();
      if (response.ok) {
        navigate("/login");
      } else {
        throw new Error(res.message || "Failed to sign up");
      }
    } catch (error) {
      setError(error.message || "An error occurred while signing up");
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-[#f3f4f6]">
      <div className="w-full md:w-1/3 p-4 md:p-1 flex flex-col justify-center items-center">
        <form
          onSubmit={handleSignup}
          className="form-container w-full md:w-[400px] flex flex-col gap-y-8 bg-white px-10 pt-14 pb-14"
        >
          <div>
            <p className="text-blue-600 text-3xl font-bold text-center">
              Sign up to continue
            </p>
          </div>

          <div className="flex flex-col gap-y-2">
            <Textbox
              placeholder="First Name"
              type="text"
              name="firstName"
              label="First Name"
              className="w-full rounded-full"
              value={userInfo.firstName}
              onChange={handleChange}
              error={errors.firstName ? errors.firstName : ""}
            />
            <Textbox
              placeholder="Last Name"
              type="text"
              name="lastName"
              label="Last Name"
              className="w-full rounded-full"
              value={userInfo.lastName}
              onChange={handleChange}
              error={errors.lastName ? errors.lastName : ""}
            />
            <Textbox
              placeholder="you@example.com"
              type="email"
              name="email"
              label="Email Address"
              className="w-full rounded-full"
              value={userInfo.email}
              onChange={handleChange}
              error={errors.email ? errors.email : ""}
            />
            <Textbox
              placeholder="password"
              type="password"
              name="password"
              label="Password"
              className="w-full rounded-full"
              value={userInfo.password}
              onChange={handleChange}
              error={errors.password ? errors.password : ""}
            />
          </div>
          <Button
            type="submit"
            label="Sign up"
            className="w-full h-10 bg-blue-700 text-white rounded-full"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Link
            to="/login"
            className="text-sm text-gray-500 hover:text-blue-600 hover:underline cursor-pointer text-center"
          >
            Already have an account? Log in
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
