import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaFilePrescription,
  FaComments,
  FaVideo,
  FaPhoneAlt,
  FaFileMedical,
} from "react-icons/fa";

import Footer from "../Footer";
import DrNavbar from "./DrNavbar";

const DoctorHome = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    // Get doctor data from localStorage
    const doctorData = JSON.parse(localStorage.getItem("doctor"));
    if (doctorData && doctorData.fullName) {
      setFullName(doctorData.fullName); // Set the fullName state
    }
  }, []);

  return (
    <>
      <DrNavbar />

      <div className="flex flex-col items-center text-center md:flex-row md:items-start">
        {/* Left Section */}
        <div className="w-full md:w-1/2 mt-14 pt-2 md:pt-8">
          <h1 className="text-4xl font-bold text-blue-500 mb-8">
            Welcome, Dr. {fullName || "Guest"}!
          </h1>

          <span
            className={`text-white text-5xl font-bold cursor-pointer ${
              isHovered ? "animate__animated animate__tada" : ""
            }`}
            style={{
              animationDuration: "2s",
              animationIterationCount: "1",
              display: "inline-block",
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            My Clinic!
          </span>
          <p className="text-xl text-gray-700 mt-6">
            Providing exceptional care to keep you healthy and happy. Your
            health is our priority, and we strive to offer the highest standard
            of medical care.
          </p>
          <div className="relative flex space-x-4 justify-center mt-6">
            <a
              href="/medical-records"
              className="relative button bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition duration-300"
            >
              Manage Medical Records
            </a>
            <Link
              to="/patient-communication"
              className="relative button bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Chat with Patient
            </Link>
          </div>
        </div>

        {/* Right Section with Image */}
        <div className="w-full md:w-1/2 px-4 m-4 mt-14 md:ml-10">
          <img
            src="/images/hero.jpg"
            alt="A welcoming view of the clinic"
            className="w-full h-auto rounded-lg shadow-2xl object-cover transform transition duration-500 hover:scale-105"
          />
        </div>
      </div>

      {/* About Section */}
      <div className="mt-12 bg-gray-100 py-12 text-center w-full px-4">
        <h2 className="text-3xl font-semibold mb-4">About Our Clinic</h2>
        <p className="text-gray-700 max-w-6xl mx-auto leading-relaxed">
          At My Clinic, we specialize in personalized healthcare tailored to
          your needs. Our experienced team provides a wide range of services
          including general consultations, specialized treatments, and health
          checkups. We prioritize your well-being and strive to ensure you
          receive the best care possible.
        </p>
      </div>
      <Footer />
    </>
  );
};

export default DoctorHome;
