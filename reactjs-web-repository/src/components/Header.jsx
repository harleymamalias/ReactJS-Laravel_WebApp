import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ChristmasTreeIcon from "../assets/images/christmas-tree.svg";

const Header = () => {
  const { currentUser, handleLogout } = useAuth();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await handleLogout();
      navigate("/");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <header className="w-full bg-[#297149] relative text-sm py-3 z-10">
      <nav className="max-w-[85rem] w-full mx-auto px-4 flex flex-wrap items-center justify-between">
        {/* Logo Section */}
        <a
          className="text-xl font-semibold text-white focus:outline-none flex items-center gap-x-2"
          href="#"
        >
          <img src={ChristmasTreeIcon} alt="Christmas Tree" className="h-10" />
          XMas Countdown
        </a>

        {/* User Info and Logout Section */}
        <div className="flex items-center gap-x-4">
          {currentUser && (
            <div className="flex items-center gap-x-2">
              <img
                src={
                  currentUser.profilePicture ||
                  "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                }
                alt={currentUser.name || "User Avatar"}
                className="h-10 w-10 rounded-full"
              />
              <div className="text-white text-sm">
                <p className="font-semibold">{currentUser.name}</p>
                <p className="text-gray-300 text-xs">{currentUser.email}</p>
              </div>
            </div>
          )}

          {/* Logout Button */}
          <button
            type="button"
            onClick={logout}
            className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-red-600 text-white hover:bg-[#9C0202] focus:outline-none focus:bg-red-600 disabled:opacity-50 disabled:pointer-events-none"
          >
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;