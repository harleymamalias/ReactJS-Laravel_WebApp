import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import InputField from "../components/InputField";
import LoadingSpinner from "../components/LoadingSpinner";
import ChristmasTreeIcon from "../assets/images/christmas-tree.svg"; // Adjust the path as needed

const LoginPage = () => {
  const [email, setEmail] = useState("harleymamalias@gmail.com");
  const [password, setPassword] = useState("dev12345");
  const [error, setError] = useState("");
  const { handleLogin } = useAuth();
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const userData = { email, password };
    try {
      await handleLogin(userData);
      navigate("/homepage");
      console.log("Token:", localStorage.getItem("token"));
    } catch (err) {
      setLoading(false);
      setError("Invalid email or password");
    }
  };

  return (
    <div
      className="flex h-screen items-center justify-center"
      style={{
        backgroundImage: "url('../src/assets/images/christmas4.svg')",
      }}
    >
      <div className="w-full max-w-sm bg-white shadow-lg rounded-lg p-6">
        <div className="flex flex-col justify-center items-center">
          <img
            src={ChristmasTreeIcon}
            alt="Christmas Tree"
            className="h-12 mb-4"
          />
          <h1 className="block text-2xl font-bold text-gray-800 mb-6">
            Sign in to XMas Countdown
          </h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="max-w-sm space-y-4">
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
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="w-full h-10 py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-[#32935d] text-white hover:bg-[#297149] focus:outline-none focus:bg-[#297149] disabled:opacity-50 disabled:pointer-events-none"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <LoadingSpinner />
                    <span>Signing in...</span>
                  </>
                ) : (
                  "Sign in"
                )}
              </button>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Don't have an account yet?{" "}
                <a
                  className="text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-blue-500"
                  onClick={() => navigate("/register")}
                >
                  Sign up here
                </a>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
