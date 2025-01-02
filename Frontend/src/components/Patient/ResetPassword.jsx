import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  useEffect(() => {
    if (!token) {
      setMessage("Invalid or expired reset token.");
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      setLoading(false);
      return;
    }

    if (!token) {
      setMessage("Invalid or expired reset token.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "https://hospital-drcp.onrender.com/patient/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token, password }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message || "Password has been reset successfully!");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || "An error occurred.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-100">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-8 relative">
        <h1 className="text-3xl font-extrabold text-center text-blue-600 mb-6">
          Reset Password
        </h1>

        {/* Message */}
        {message && (
          <div
            className={`text-sm p-4 mb-4 ${
              message.includes("error")
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            } rounded-lg`}
          >
            {message}
          </div>
        )}

        {/* Reset Password Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold">
              New Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              placeholder="Enter your new password"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              placeholder="Confirm your password"
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full bg-blue-500 text-white py-3 rounded-lg font-bold text-lg hover:bg-blue-600 transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
