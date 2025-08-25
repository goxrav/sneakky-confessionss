import React, { useState } from "react";
import { useAdminAuth } from "../contexts/AdminAuthContext";
import { toast } from "sonner";
import PageWrapper from "../components/PageWrapper";
const ChangePassword = () => {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const { changePassword } = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = changePassword(oldPass, newPass);
    if (success) {
      toast.success("Password changed successfully!");
      setOldPass("");
      setNewPass("");
    } else {
      toast.error("Old password is incorrect!");
    }
  };

  return (
    <PageWrapper>
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white/30 dark:bg-gray-800/40 p-6 rounded-lg shadow-md"
    >
      <h2 className="text-xl font-bold mb-4 text-center">Change Password</h2>
      <input
        type="password"
        placeholder="Old Password"
        value={oldPass}
        onChange={(e) => setOldPass(e.target.value)}
        className="w-full mb-3 p-2 rounded bg-white/70 dark:bg-gray-700"
      />
      <input
        type="password"
        placeholder="New Password"
        value={newPass}
        onChange={(e) => setNewPass(e.target.value)}
        className="w-full mb-4 p-2 rounded bg-white/70 dark:bg-gray-700"
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Change Password
      </button>
    </form>
    </PageWrapper>
  );
};

export default ChangePassword;
