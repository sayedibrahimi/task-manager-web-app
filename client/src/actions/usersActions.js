const apiUrl = import.meta.env.VITE_API_URL;

/*********************************************/
// Function: fetchUser
// Description: Fetch the current authenticated user's details from the server
// Access: Private
/*********************************************/
const fetchUser = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token missing!"); // Throw an error if token is missing
    }

    const response = await fetch(`${apiUrl}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user"); // Throw an error for failed response
    }

    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error; // Re-throw the error for handling in the calling component
  }
};

export default fetchUser;
