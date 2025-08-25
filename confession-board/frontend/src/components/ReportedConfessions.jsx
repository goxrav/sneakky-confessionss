import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import PageWrapper from "../components/PageWrapper";

const ReportedConfessions = () => {
  const [reported, setReported] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/confess/reported")
      .then((res) => res.json())
      .then((data) => setReported(data))
      .catch(() => toast.error("Failed to load reported confessions"));
  }, []);

  const handleAction = async (id, action) => {
    try {
      const res = await fetch(`http://localhost:5000/api/confess/${id}/${action}`, {
        method: "PATCH",
      });
      const data = await res.json();

      if (res.ok) {
        toast.success(data.message);
        setReported((prev) => prev.filter((item) => item._id !== id));
      } else {
        toast.error(data.error || "Action failed");
      }
    } catch (err) {
      toast.error("Server error");
    }
  };

  return (
    <PageWrapper>
    <div className="p-6 space-y-4">
      <h2 className="text-3xl font-bold text-red-500 text-center">🚨 Reported Confessions</h2>
      {reported.length === 0 ? (
        <p className="text-center text-gray-500">No reported confessions.</p>
      ) : (
        reported.map((confess) => (
          <div key={confess._id} className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md">
            <p className="text-lg mb-2">{confess.message}</p>
            <p className="text-xs text-gray-500">Reported {confess.reports} times</p>

            <div className="mt-4 flex gap-3">
              <button
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                onClick={() => handleAction(confess._id, "approve")}
              >
                Approve
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                onClick={() => handleAction(confess._id, "delete")}
              >
                Delete
              </button>
              <button
                className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                onClick={() => handleAction(confess._id, "reset-report")}
              >
                Reset Report
              </button>
            </div>
          </div>
        ))
      )}
    </div>
    </PageWrapper>
  );
};

export default ReportedConfessions;
