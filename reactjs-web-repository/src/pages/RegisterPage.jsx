import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import LoadingSpinner from "../components/LoadingSpinner";
import Toast from "../components/Toast"; 
import { FiCheckCircle, FiX } from "react-icons/fi"; 

const RegisterPage = () => {
  const { handleRegister } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setConfirmPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Check if passwords match
    if (password !== password_confirmation) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    const userData = { name, email, password, password_confirmation };
    try {
      await handleRegister(userData);
      // Show toast on successful registration
      setShowToast(true); 
      setTimeout(() => {
        setShowToast(false);
        navigate("/");
      }, 3000); 
      console.log("Account successfully registered. ", userData);
    } catch (error) {
      setLoading(false);
      setError("Unsuccessful registration");
    }
  };

  return (
    <div
      className="flex h-screen items-center justify-center"
      style={{
        backgroundImage: "url('../src/assets/images/christmas4.svg')",
      }}
    >
      {/* Right Section with Registration Form */}
      <div className="w-full max-w-sm bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">
          Sign Up
        </h1>
        <p className="text-sm text-center text-gray-500 font-medium mb-4">
          Sign Up to Celebrate the Joy of XMas!
        </p>
        <form onSubmit={handleSubmit}>
          <div className="space-y-3">
            <InputField
              label="Full Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
            />
            <InputField
              label="Email Address"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example.com"
            />
            <InputField
              label="Password"
              type={isPasswordVisible ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              isPasswordVisible={isPasswordVisible}
              togglePasswordVisibility={() =>
                setIsPasswordVisible(!isPasswordVisible)
              }
            />
            <InputField
              label="Confirm Password"
              type={isPasswordVisible ? "text" : "password"}
              value={password_confirmation}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              isPasswordVisible={isPasswordVisible}
              togglePasswordVisibility={() =>
                setIsPasswordVisible(!isPasswordVisible)
              }
            />
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="w-full h-10 py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-[#32935d] text-white hover:bg-[#297149] focus:outline-none focus:bg-[#297149] disabled:opacity-50 disabled:pointer-events-none"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <LoadingSpinner />
                    <span>Signing up...</span>
                  </>
                ) : (
                  "Sign up"
                )}
              </button>
            </div>
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-neutral-600">
                Already have an account?{" "}
                <a
                  className="text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-blue-500"
                  onClick={() => navigate("/")}
                >
                  Sign in here
                </a>
              </p>
            </div>
          </div>
        </form>
      </div>
      {showToast && (
        <Toast
          message="Account successfully registered!"
          icon={<FiCheckCircle className="text-green-500" />}
          actionIcon={<FiX />}
          actionIconAlt="Close"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};

export default RegisterPage;