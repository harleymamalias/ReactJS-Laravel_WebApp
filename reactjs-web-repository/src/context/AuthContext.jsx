import { registerUser, loginUser, logoutUser } from "../api-service/authApi";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const handleRegister = async (userData) => {
    try {
      const response = await registerUser(userData);
      // console.log(response.data);
      alert(response.data.message);
    } catch (error) {
      console.log(error);
      console.error("Registration Error:", error.response.data);
    }
  };

  const handleLogin = async (userData) => {
    try {
      const response = await loginUser(userData);
      const { authToken, currentUser } = response.data;

      localStorage.setItem("token", authToken);
      setCurrentUser(currentUser);
    } catch (error) {
      console.error("Login Error:", error.response.data);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      localStorage.removeItem("token");
      setCurrentUser(null);
    } catch (error) {
      console.error("Logout Error:", error.response.data);
    }
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, handleRegister, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
