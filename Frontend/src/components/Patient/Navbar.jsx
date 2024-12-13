import React, { useState } from "react";
import "animate.css";
import { Link, useNavigate } from "react-router-dom";
import Logout from "../Logout";

function Navbar() {
  const navItems = [
    <li key="home">
      <Link to="/">Home</Link>
    </li>,
    <li key="about">
      <Link to="/about">About</Link>
    </li>,
    <li key="appointment">
      <Link to="/patient-portal">Appointments</Link>
    </li>,
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      setIsLoggingOut(true); // Set logging out state
      localStorage.removeItem("token");
      localStorage.clear();
      alert("You have been logged out successfully!");
      navigate("/mainlogin"); // Redirect to the login page
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav className="bg-blue-500 max-w-screen-2xl h-14 flex justify-between items-center sticky top-0 z-50 shadow-md bg-opacity-90">
        <div
          className="text-white text-3xl font-bold p-4 animate__animated animate__tada"
          style={{ animationDuration: "2s", animationIterationCount: "1" }} // Customizing animation duration
        >
          <a href="#">My Clinic</a>
        </div>

        {/* Hamburger Menu Icon for mobile */}
        <div className="lg:hidden relative">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <svg
              className="w-32 pl-14 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="absolute -left-2 right-0 w-full bg-white shadow-lg z-10 py-2">
              <ul className="p-4 space-y-2 text-blue-500">
                {" "}
                {/* Text changed to blue for better contrast */}
                {navItems}
                <li
                  onClick={handleLogout}
                  className="cursor-pointer bg-red-500 text-white border rounded p-2 text-center"
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex wrap items-center space-x-6 pl-4">
          <ul className="flex space-x-8 mr-4 text-white text-xl">
            {navItems}
            <li
              onClick={handleLogout}
              className="cursor-pointer bg-red-400 hover:bg-red-500 text-white text-sm border rounded p-2 text-center m-0"
            >
              Logout
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
