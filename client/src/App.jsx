import { Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import fetchUser from "./actions/usersActions";
import { UserProvider } from "../src/context.js/userInfo.jsx";

import { Dashboard, Login, Signup, Tasks, Trash, Users } from "./pages";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import { useUser } from "./context.js/userInfo.jsx";

function Layout() {
  // const { user } = useSelector((state) => state.auth.user);
  // const { isLoading } = useSelector((state) => state.auth.loading);
  const location = useLocation();

  // const token = localStorage.getItem("token");

  const { userInfo, loading } = useUser();

  if (loading) {
    // Return loading indicator or placeholder
    return <div>Loading...</div>;
  }

  if (!userInfo) {
    // Token not available, redirect to login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <div className="w-full h-screen flex flex-col md:flex-row">
      <div className="w-1/6 h-screen bg-white sticky top-0 hidden md:block">
        {<Sidebar />}
      </div>

      {/* <MobileSidebar /> */}

      <div className="flex-1 overflow-y-auto">
        <Navbar />

        <div className="p-4 2xl:px-10">{<Outlet />}</div>
      </div>
    </div>
  );
}

function App() {
  return (
    <main className="w-full min-h-screen bg-[#f3f4f6]">
      <UserProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/completed/:stage?" element={<Tasks />} />
            <Route path="/inprogress/:stage?" element={<Tasks />} />
            <Route path="/todo/:stage?" element={<Tasks />} />
            <Route path="/team" element={<Users />} />
            <Route path="/trashed" element={<Trash />} />
            {/* <Route path="/task/:id" element={<TaskDetails />} /> */}
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>

        <Toaster
          richColors
          toastOptions={{
            style: {
              padding: "1rem",
            },
          }}
        />
      </UserProvider>
    </main>
  );
}

export default App;
