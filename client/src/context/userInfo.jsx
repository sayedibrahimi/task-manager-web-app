import { createContext, useState, useContext, useEffect } from "react";
import fetchUser from "../actions/usersActions";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const userData = await fetchUser();
        setUserInfo(userData);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    const token = localStorage.getItem("token");
    if (token) {
      getUser(); // Call getUser only if token is available
    } else {
      setLoading(false); // Set loading to false if token is not available
    }
  }, []); // Empty dependency array ensures that this effect runs only once on component mount

  return (
    <UserContext.Provider value={{ userInfo, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
