import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DrNavbar from "./DrNavbar";
import Footer from "../Footer";

function UpdateHistory() {
  const location = useLocation();
  const navigate = useNavigate();
  const patient = location.state?.patient;
  const id = patient?._id;

  const [formData, setFormData] = useState({
    date: patient?.medicalHistory?.length
      ? new Date(patient.medicalHistory[patient.medicalHistory.length - 1].date)
          .toISOString()
          .substr(0, 10)
      : "",
    diagnosis: patient?.medicalHistory?.length
      ? patient.medicalHistory[patient.medicalHistory.length - 1].diagnosis
      : "",
    medication: patient?.medicalHistory?.length
      ? patient.medicalHistory[patient.medicalHistory.length - 1].medication
      : "",
    prohibitions: patient?.prohibitions || "", // Updated for patient prohibitions as a string field
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedHistory = {
      date: formData.date,
      diagnosis: formData.diagnosis,
      medication: formData.medication,
      prohibitions: formData.prohibitions, // Include prohibitions in update
    };

    try {
      const response = await fetch(
        `https://hospital-drcp.onrender.com/patient/update/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            medicalHistory: [updatedHistory],
            prohibitions: formData.prohibitions,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        alert("Medical history and prohibitions updated successfully!");
        navigate("/medical-records"); // Redirect to medical records page
      } else {
        console.error("Failed to update:", result.error);
        alert("Failed to update medical history and prohibitions");
      }
    } catch (error) {
      console.error("Error:", error);
      alert(
        "An error occurred while updating the medical history and prohibitions."
      );
    }
  };

  return (
    <>
      <DrNavbar />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Edit Medical History & Prohibitions
          </h2>
          {patient ? (
            <>
              <h3 className="text-center mb-4">
                Patient:
                <span className="text-blue-500 font-bold text-xl">
                  {patient.fullName}
                </span>
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Date:
                  </label>
                  <input
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Diagnosis:
                  </label>
                  <input
                    name="diagnosis"
                    type="text"
                    value={formData.diagnosis}
                    onChange={handleChange}
                    placeholder="Enter diagnosis"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Medication:
                  </label>
                  <textarea
                    name="medication"
                    value={formData.medication}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>

                {/* Prohibitions Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Prohibitions:
                  </label>
                  <textarea
                    name="prohibitions"
                    value={formData.prohibitions}
                    onChange={handleChange}
                    placeholder="Enter prohibitions details"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Update Medical History & Prohibitions
                </button>
              </form>
            </>
          ) : (
            <p className="text-center text-red-500">No patient selected.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default UpdateHistory;
