import React from "react";
import Navbar from "../Patient/Navbar";
import Footer from "../Footer";
import { Link } from "react-router-dom";
import { FaUserMd, FaUser } from "react-icons/fa"; // Importing icons

const MainLogin = () => {
  return (
    <>
      <Navbar />
      <div
        className="min-h-screen bg-cover bg-center flex flex-col justify-center items-center text-white"
        style={{ backgroundImage: 'url("/images/background.jpeg")' }} // Background image from public folder
      >
        <div className="bg-black bg-opacity-70 p-10 rounded-xl shadow-2xl text-center w-11/12 max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">
            Welcome! Who Are You?
          </h1>
          <p className="text-gray-300 mb-8">
            Choose your role to proceed to the login page. We ensure a smooth
            and secure experience for both doctors and patients.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            {/* Doctor Login Card */}
            <div className="flex-1 bg-blue-100 text-blue-800 p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="flex flex-col items-center">
                <FaUserMd className="text-6xl mb-4" />
                <h2 className="text-xl font-bold mb-4">Doctor</h2>
                <p className="text-center text-sm text-gray-700 mb-6">
                  Manage patient records, view appointments, and update medical
                  histories.
                </p>
                <Link
                  to="/doctorlogin"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition"
                >
                  Login as Doctor
                </Link>
                {/* Demo Details */}
                <div className="mt-4 text-sm bg-blue-200 text-blue-700 p-3 rounded-lg">
                  <p className="font-bold">Demo Login Details:</p>
                  <p>
                    Email:{" "}
                    <span className="font-mono">gurmeet2024@gmail.com</span>
                  </p>
                  <p>
                    Password: <span className="font-mono">123456</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Patient Login Card */}
            <div className="flex-1 bg-green-100 text-green-800 p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="flex flex-col items-center">
                <FaUser className="text-6xl mb-4" />
                <h2 className="text-xl font-bold mb-4">Patient</h2>
                <p className="text-center text-sm text-gray-700 mb-6">
                  Access your medical records, book appointments, and connect
                  with your doctor.
                </p>
                <Link
                  to="/patientlogin"
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-full transition"
                >
                  Login as Patient
                </Link>
                {/* Demo Details */}
                <div className="mt-4 text-sm bg-green-200 text-green-700 p-3 rounded-lg">
                  <p className="font-bold">Demo Login Details:</p>
                  <p>
                    Email: <span className="font-mono">guru1011@gmail.com</span>
                  </p>
                  <p>
                    Password: <span className="font-mono">123456</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MainLogin;
