import React, { useState } from "react";
import { Link } from "react-router-dom";

function DoctorLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const loginData = {
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await fetch("http://localhost:4001/doctor/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.clear();
        localStorage.setItem("token", data.token);
        localStorage.setItem("doctor", JSON.stringify(data.doctor));
        alert("Login successful!");

        // Wait for 600ms before redirecting
        setTimeout(() => {
          window.location.href = "/doc";
        }, 600);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please check your network and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-100">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-8 relative">
        {/* Close Button */}
        <Link
          to="/mainlogin"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
        >
          ✖
        </Link>

        {/* Header */}
        <h1 className="text-3xl font-extrabold text-center text-blue-600 mb-6">
          Doctor Login
        </h1>
        <p className="text-sm text-gray-500 text-center mb-8">
          Login to manage your patient records and appointments.
        </p>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-500 text-red-700 text-sm px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <label className="block text-gray-700 font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-gray-700 font-semibold">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="border w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Forgot Password Link */}
          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-blue-500 text-sm hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full bg-blue-500 text-white py-3 rounded-lg font-bold text-lg hover:bg-blue-600 transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default DoctorLogin;
