import React from "react";

import DrNavbar from "./DrNavbar";
import Footer from "../Footer";

function AboutMe() {
  return (
    <>
      <DrNavbar />
      <div className="flex flex-col sm:flex-row  justify-evenly items-center bg-white rounded-xl space-y-6 ">
        {/* Left Section: Doctor Image and Basic Info */}
        <div className="left flex flex-col ">
          <div className="flex justify-center">
            <img
              src="/images/doctor.jpeg"
              alt="Doctor Profile"
              className="shadow-2xl rounded-full border-4 border-blue-500 w-64 h-64 object-cover"
            />
          </div>
          <div className="my-8 text-center">
            <h1 className="text-3xl font-bold">DR. GEETANSHU</h1>

            <h1 className="text-gray-400">Dental Surgeon</h1>
            <h1 className="text-gray-400">Cardiologist</h1>
          </div>
        </div>

        {/* Right Section: Doctor's Profile and Specialties */}
        <div className="right w-full sm:w-1/2">
          <h2 className="text-xl font-medium mb-2">PROFILE</h2>
          <h1 className="text-3xl text-blue-500 font-bold">DR. GEETANSHU</h1>
          <h1 className="text-gray-400 mt-2">Dental Surgeon, Cardiologist</h1>

          {/* Experience and Languages */}
          <div className="my-8">
            <h1 className="font-medium my-8">
              EXPERIENCE <span className="text-gray-400 pl-12">19 Years</span>
            </h1>
            <h1 className="font-medium">
              LANGUAGES{" "}
              <span className="text-gray-400 pl-12">English, Hindi</span>
            </h1>
          </div>

          {/* Specialties Section */}
          <div>
            <h1 className="font-medium">SPECIALITY</h1>
            <div className="my-4 flex flex-wrap  justify-center items-center text-gray-400">
              <p className="rounded-full w-full sm:w-1/3 border-2 text-center py-2 mx-2 my-2">
                Dentistry
              </p>
              <p className="rounded-full w-full sm:w-1/3 border-2 text-center py-2 mx-2 my-2">
                Surgery
              </p>
              <p className="rounded-full w-full sm:w-1/3 border-2 text-center py-2 mx-2 my-2">
                Implantology
              </p>
              <p className="rounded-full w-full sm:w-1/3 border-2 text-center py-2 mx-2 my-2">
                Paediatric
              </p>
            </div>
          </div>
          <div className="education my-8">
            <h1 className="font-medium">EDUCATION & QUALIFICATIONS</h1>
            <p className="text-gray-400">MBBS - AIIMS DELHI, 2005</p>
            <p className="text-gray-400">MD (Cardiology) - AIIMS DELHI, 2010</p>
            <p className="text-gray-400">Fellowship in Dental Surgery - 2015</p>
          </div>
          <div className="contact-info my-8">
            <h1 className="font-medium">CONTACT</h1>
            <p className="text-gray-400">Phone: 0123 456 789</p>
            <p className="text-gray-400">Email: dr.jordan@example.com</p>
            <p className="text-gray-400">
              Clinic Address: Gorakhpur U.P, INDIA
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AboutMe;
