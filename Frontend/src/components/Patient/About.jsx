import React from "react";
import Navbar from "./Navbar";
import Footer from "../Footer";

function About() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-blue-600">
              Meet Dr. Geetanshu
            </h1>
            <p className="text-lg text-gray-500 mt-2">
              Dental Surgeon & Cardiologist
            </p>
          </div>

          {/* Content: Left Section - Doctor Image and Basic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="flex flex-col items-center">
              <img
                src="/images/doctor.jpeg"
                alt="Dr. Michaele Jordan"
                className="w-48 h-48 object-cover rounded-full shadow-xl border-4 border-blue-600 mb-6"
              />
              <h2 className="text-3xl font-semibold text-blue-600">
                Dr. Geetanshu
              </h2>
              <p className="text-gray-600 text-lg mt-2">Dental Surgeon</p>
              <p className="text-gray-600 text-lg">Cardiologist</p>
            </div>

            {/* Right Section - Profile Details, Specialties, and Education */}
            <div>
              {/* Profile */}
              <h2 className="text-xl font-semibold text-blue-600 mb-4">
                Profile
              </h2>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-blue-500">
                  Dr. Geetanshu
                </h3>
                <p className="text-gray-600">Dental Surgeon & Cardiologist</p>

                {/* Experience and Languages */}
                <div className="space-y-2">
                  <h4 className="font-medium">Experience:</h4>
                  <p className="text-gray-500">19+ Years of Experience</p>

                  <h4 className="font-medium">Languages Spoken:</h4>
                  <p className="text-gray-500">English, Hindi</p>
                </div>

                {/* Specialties */}
                <div className="my-6">
                  <h4 className="font-medium mb-2">Specialties</h4>
                  <div className="flex flex-wrap gap-4">
                    <span className="px-4 py-2 bg-blue-100 rounded-full text-blue-600 border border-blue-200">
                      Dentistry
                    </span>
                    <span className="px-4 py-2 bg-blue-100 rounded-full text-blue-600 border border-blue-200">
                      Surgery
                    </span>
                    <span className="px-4 py-2 bg-blue-100 rounded-full text-blue-600 border border-blue-200">
                      Implantology
                    </span>
                    <span className="px-4 py-2 bg-blue-100 rounded-full text-blue-600 border border-blue-200">
                      Paediatrics
                    </span>
                  </div>
                </div>

                {/* Education */}
                <div className="my-6">
                  <h4 className="font-medium mb-2">
                    Education & Qualifications
                  </h4>
                  <p className="text-gray-500">MBBS - AIIMS Delhi, 2005</p>
                  <p className="text-gray-500">
                    MD (Cardiology) - AIIMS Delhi, 2010
                  </p>
                  <p className="text-gray-500">
                    Fellowship in Dental Surgery - 2015
                  </p>
                </div>

                {/* Contact Info */}
                <div className="my-6">
                  <h4 className="font-medium mb-2">Contact Information</h4>
                  <p className="text-gray-500">Phone: 0123 456 789</p>
                  <p className="text-gray-500">Email: dr.jordan@example.com</p>
                  <p className="text-gray-500">
                    Clinic Address: Gorakhpur U.P, India
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
}

export default About;
