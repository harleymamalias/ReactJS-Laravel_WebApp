import { registerUser, loginUser, logoutUser } from "../api-service/authApi";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if the token and user data exist in localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (token && user) {
      setCurrentUser(user); // Restore user state if token and user data exist
    }
    setLoading(false); // Set loading to false after checking localStorage
  }, []);

  const handleRegister = async (userData) => {
    try {
      const response = await registerUser(userData);
    } catch (error) {
      console.log(error);
      console.error("Registration Error:", error.response.data);
    }
  };

  const handleLogin = async (userData) => {
    try {
      const response = await loginUser(userData);
      const { token, user } = response.data;

      // Store token and user data in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setCurrentUser(user);
      console.log("Login Success:", response.data);
      console.log("Current User:", user);
    } catch (error) {
      console.error("Login Error:", error.response.data);
      throw error;
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setCurrentUser(null);
    } catch (error) {
      console.error("Logout Error:", error.response.data);
    }
  };

  // Wait until loading is complete before rendering any children
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{ currentUser, handleRegister, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
