import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/authContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // نحذف user لو مش مستعمل
  const { login } = useAuth(); 
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const success = login(email, password);
    if (success) {
      toast.success("Login successful!");
      navigate("/projects");
    } else {
      toast.error("Invalid credentials, please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 dark:from-gray-800 dark:via-gray-700 dark:to-gray-900 text-white">
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-blue-800 opacity-30 rounded-full animate-circle"></div>
      <div className="absolute -bottom-0 -right-0 w-64 h-64 bg-purple-300 opacity-30 rounded-full animate-plus"></div>
      <div className="absolute -top-0 -right-0 w-72 h-72 bg-pink-700 opacity-25 rounded-full animate-circle"></div>

      <div className="bg-gray-800 p-8 rounded-lg opacity-90 shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 bg-gray-700 text-white rounded-md
                 outline-none focus:outline-none focus:ring-0"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block mb-2">
              Password
            </label>
            <input
            type="password"
            id="password"
            className="w-full p-2 bg-gray-700 text-white rounded-md
                      outline-none focus:outline-none focus:ring-0"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 hover:bg-blue-400 text-white rounded-md"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <p>
            Don&apos;t have an account?{" "}
            <a href="/signup" className="text-blue-300 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
