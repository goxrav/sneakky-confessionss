import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import AdminLogin from "./pages/AdminLogin";
import ConfessionForm from "./components/ConfessionForm";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "sonner";
import LearnMore from "./components/LearnMore";
import { AdminAuthProvider } from "./contexts/AdminAuthContext";
import ReportedConfessions from "./components/ReportedConfessions";
import AdminDashboard from "./pages/AdminDashboard";
import ChangePassword from "./components/ChangePassword";
import ModerateConfessions from "./components/ModerateConfessions";
import ConfessionFeed from "./components/ConfessionFeed";
import {   useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Wrap main layout to use navigate in keyboard listener
function AppWithShortcut() {
  const navigate = useNavigate();
const location = useLocation();

  useEffect(() => {
    const handleShortcut = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') {
        navigate("/admin");
      }
    };

    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-pink-100 via-yellow-100 to-purple-100 dark:from-gray-600 dark:via-gray-600 dark:to-gray-600">
      <Navbar />
      <Toaster richColors position="top-right" />
      <div className="flex-grow">
       <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/feed" element={<ConfessionFeed />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/moderate" element={<ModerateConfessions />} />
          <Route path="/dashboard" element={ <AdminDashboard />} />
          <Route path="/confess" element={<ConfessionForm />} />
          <Route path="/learnmore" element={<LearnMore />} />
          <Route path="/reported" element={<ReportedConfessions />} />
         </Routes>
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
}

// Final Export with AdminAuthProvider and Router
function App() {
  return (
    <AdminAuthProvider>
      <Router>
        <AppWithShortcut />
      </Router>
    </AdminAuthProvider>
    
  );
}

export default App;
