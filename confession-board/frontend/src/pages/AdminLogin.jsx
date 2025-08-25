import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../contexts/AdminAuthContext";
import { toast } from "sonner";
import PageWrapper from "../components/PageWrapper";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
   const { login } = useAdminAuth();

  const handleLogin = (e) => {
    e.preventDefault();

    
    if (password === "admin123") {
      
      

       toast.success("Login successful! 🚀");
      navigate("/dashboard");
    } else {
      toast.error("Invalid password");
    }
  };

  return (
    <PageWrapper>
    <div className="min-h-screen flex items-center justify-center bg-white/30 dark:bg-black/30 backdrop-blur-md p-4">
      <form
        onSubmit={handleLogin}
        className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center text-pink-600 mb-4">
          Admin Login
        </h2>
         <input
          type="text"
          placeholder=" Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 rounded  mb-4 border focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white/60 dark:bg-gray-700 "
        />
        <input
          type="password"
          className="w-full p-3 rounded mb-4 border focus:outline-none focus:ring-2 focus:ring-pink-300"
          placeholder="Enter Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && (
          <p className="text-red-500 text-sm text-center mb-2">{error}</p>
        )}
        <button
          type="submit"
          className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 rounded"
        >
          Login
        </button>
        
      </form>
    </div>
    </PageWrapper>
  );
};

export default AdminLogin;
