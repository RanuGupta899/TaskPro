import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SnackbarProvider, enqueueSnackbar } from "notistack";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading state
    setError(null); // Reset error state on new submission

    try {
      // API call to sign in
      const response = await axios.post(
        "http://localhost:5000/user/login",
        { email, password }
      );

      if (response.status === 200) {
        // Store email in local storage (or other tokens as needed)
        localStorage.setItem("email", email);
        
        // Clear form fields after successful login
        setEmail("");
        setPassword("");

        // Display success message
        enqueueSnackbar("Login Successful 🎉", { variant: "success" });

        setTimeout(() => {
          navigate("/todo");
        }, 1000);
      }
    } catch (err) {
      // Capture error and display a snackbar notification
      setError(err.response?.data?.error || "Failed to sign in");
      enqueueSnackbar("Failed to sign in. Please try again.", {
        variant: "error",
      });
      console.error(err); // Log the error for debugging
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-6">
          <i className="fas fa-check-circle text-green-500 text-4xl"></i>
          <h2 className="text-2xl font-semibold text-gray-700">LOGIN</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 mb-1">Email</label>
            <div className="relative">
              <i className="fas fa-envelope absolute left-3 top-3 text-gray-400"></i>
              <input
                type="email"
                id="email"
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600 mb-1">Password</label>
            <div className="relative">
              <i className="fas fa-lock absolute left-3 top-3 text-gray-400"></i>
              <input
                type="password"
                id="password"
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <button
            type="submit"
            className={`w-full py-2 px-4 rounded-lg text-white ${loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "LOGIN"}
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-gray-600">
            Don't have an account? <a href="/signup" className="text-blue-500 hover:underline">Sign Up</a>
          </p>
        </div>
      </div>
      <SnackbarProvider
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={2000}
      />
    </div>
  );
};

export default Login;
