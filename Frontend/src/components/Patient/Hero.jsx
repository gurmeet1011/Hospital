import React, { useEffect, useState, useRef } from "react";
import { FaStethoscope, FaPills, FaHeartbeat } from "react-icons/fa";
import { Link } from "react-router-dom";

function Hero() {
  const [isHovered, setIsHovered] = useState(false);
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    // Get patient data from localStorage
    const patientData = JSON.parse(localStorage.getItem("patient"));
    if (patientData && patientData.fullName) {
      setFullName(patientData.fullName); // Set the fullName state
    }
  }, []);

  return (
    <div>
      <div className="flex flex-col items-center text-center md:flex-row md:items-start">
        {/* Left Section */}
        <div className="w-full md:w-1/2 mt-14 pt-2 md:pt-8">
          <h1 className="text-3xl text-gray-700 font-bold mb-6">
            Welcome <span className="text-blue-700">{fullName || "Guest"}</span>{" "}
            to{" "}
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
              href="/bookappointment"
              className="relative button bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition duration-300"
            >
              Book Appointment
            </a>
            <Link
              to="/chatbox"
              className="relative button bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Chat with Doctor
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

      {/* Services Section */}
      <div className="bg-gray-100 py-12">
        <h2 className="text-3xl font-semibold mb-8 text-center">
          Our Services
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <div className="flex flex-col justify-center items-center mb-4">
              <FaStethoscope className="text-5xl text-blue-600 mb-2" />
            </div>
            <h3 className="text-xl font-semibold mb-2">General Consultation</h3>
            <p className="text-gray-700">
              Comprehensive medical consultations to address your health
              concerns.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <div className="flex flex-col justify-center items-center mb-4">
              <FaPills className="text-5xl text-green-600 mb-2" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Specialized Treatments
            </h3>
            <p className="text-gray-700">
              Expert treatments for chronic conditions, mental health, and more.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <div className="flex flex-col justify-center items-center mb-4">
              <FaHeartbeat className="text-5xl text-red-600 mb-2" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Health Checkups</h3>
            <p className="text-gray-700">
              Regular health screenings to keep you in peak condition.
            </p>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="bg-gray-100 py-12 text-center w-full px-4">
          <h2 className="text-3xl font-semibold mb-4">What Our Patients Say</h2>
          <p className="text-gray-700 max-w-6xl mx-auto leading-relaxed mb-8">
            Hear from our satisfied patients who trust us for their healthcare
            needs.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="italic text-gray-700 mb-4">
                "The care I received at My Clinic was outstanding. The doctors
                were attentive and compassionate."
              </p>
              <p className="font-semibold text-gray-800">— Sarah J.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="italic text-gray-700 mb-4">
                "Thanks to My Clinic, I’ve never felt healthier. Their team
                truly cares about their patients."
              </p>
              <p className="font-semibold text-gray-800">— John D.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="italic text-gray-700 mb-4">
                "I appreciate the personalized care I get at My Clinic. They are
                my go-to for all health concerns."
              </p>
              <p className="font-semibold text-gray-800">— Emma K.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
