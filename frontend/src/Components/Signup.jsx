import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SnackbarProvider, enqueueSnackbar } from "notistack";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/user/signup",
        {
          username,
          email,
          password,
        }
      );
    //   enqueueSnackbar("Sign up Successful 🎉", { variant: "success" });

      console.log(response);


      if (response.status === 200) {
        enqueueSnackbar("Sign up Successful 🎉", { variant: "success" });
          navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Failed to sign up");
      enqueueSnackbar("Failed to sign up. Please try again.", {
        variant: "error",
      });
      console.error("Signup error:", err.response || err);
    }
  };

  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      autoHideDuration={2000}
    >
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
          <div className="text-center mb-6">
            <i className="fas fa-check-circle text-green-500 text-4xl"></i>
            <h2 className="text-2xl font-bold mt-2">Sign Up</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <div className="relative">
                <i className="fas fa-user absolute left-3 top-3 text-gray-400"></i>
                <input
                  type="text"
                  className="w-full py-2 pl-10 pr-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <div className="relative">
                <i className="fas fa-envelope absolute left-3 top-3 text-gray-400"></i>
                <input
                  type="email"
                  className="w-full py-2 pl-10 pr-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <div className="relative">
                <i className="fas fa-lock absolute left-3 top-3 text-gray-400"></i>
                <input
                  type="password"
                  className="w-full py-2 pl-10 pr-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                />
              </div>
            </div>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <div className="mb-4">
              <button
                type="submit"
                className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Sign Up
              </button>
            </div>
          </form>
          <p className="text-center text-gray-600 text-sm">
            Already have an account?{" "}
            <a href="/" className="text-blue-500 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </SnackbarProvider>
  );
};

export default SignUp;
