import React, { useState } from "react";
import { Link } from "react-router-dom";

function SignUp({ closeLogin }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    newPassword: "",
    confirmPassword: "",
    profilePhoto: null, // Field for storing the file
  });

  const handleChange = (e) => {
    if (e.target.name === "profilePhoto") {
      setFormData({ ...formData, profilePhoto: e.target.files[0] }); // Handle file input
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("fullName", formData.fullName);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.newPassword);
    if (formData.profilePhoto) {
      formDataToSend.append("profilePhoto", formData.profilePhoto);
    }

    try {
      const response = await fetch(
        "https://clinic-6-hxpa.onrender.com//patient/signup",
        {
          method: "POST",
          body: formDataToSend,
        }
      );
      const data = await response.json();
      if (response.ok) {
        alert("Signup successful");
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (err) {
      console.error("Error during signup:", err);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-500">Sign Up</h1>
          <Link
            to="/"
            className="text-gray-500 hover:text-gray-700 text-xl font-bold"
          >
            ✖
          </Link>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your full name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Confirm your password"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Profile Photo (Optional)
            </label>
            <input
              type="file"
              name="profilePhoto"
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300 shadow-md"
          >
            Sign Up
          </button>
        </form>
        <div className="flex justify-between items-center mt-6">
          <p className="text-gray-600 text-sm">Already have an account?</p>
          <Link to="/patientlogin" className="text-blue-500 font-medium">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
