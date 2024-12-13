import React from "react";
import Home from "./components/Patient/Home";
import { Route, Routes } from "react-router-dom";
import About from "./components/Patient/About.jsx";

import PatientPortal from "./components/Patient/PatientPortal";

import MainLogin from "./components/Login/MainLogin";
import DoctorLogin from "./components/Doctor/DoctorLogin";
import PatientLogin from "./components/Patient/PatientLogin";
import SignUp from "./components/Patient/SignUp.jsx";
import ProtectedRoutes from "./components/Procted Routes/ProtectedRoutes";
import PublicRoutes from "./components/Procted Routes/PublicRoutes";
import DoctorHome from "./components/Doctor/DoctorHome";
import PatientMedicalHistory from "./components/Doctor/MedicalRecords.jsx";

import AddOrEditPatientDetails from "./components/Doctor/UpdateHistory.jsx";
import SinglePatient from "./components/Doctor/SinglePatient.jsx";
import AboutMe from "./components/Doctor/AboutMe.jsx";
import TodayAppointments from "./components/Doctor/TodayAppointments.jsx";

import ChatPage from "./components/Doctor/Message/ChatPage.jsx";
import PatientChatBox from "./components/Patient/Message/Chatbox.jsx";
import EmergencyContacts from "./components/Doctor/Emergency.jsx";
import ForgotPassword from "./components/Patient/ForgetPassword.jsx";
import ResetPassword from "./components/Patient/ResetPassword.jsx";
import AppointmentBooking from "./components/Patient/AppointmentBooking.jsx";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoutes>
            <Home />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/doc"
        element={
          <ProtectedRoutes>
            <DoctorHome />
          </ProtectedRoutes>
        }
      />
      <Route path="/about" element={<About />} />

      <Route
        path="/mainlogin"
        element={
          <PublicRoutes>
            <MainLogin />
          </PublicRoutes>
        }
      />
      <Route
        path="/doctorlogin"
        element={
          <PublicRoutes>
            <DoctorLogin />
          </PublicRoutes>
        }
      />
      <Route
        path="/patientlogin"
        element={
          <PublicRoutes>
            <PatientLogin />
          </PublicRoutes>
        }
      />
      <Route path="/chatbox" element={<PatientChatBox />} />
      <Route path="/medical-records" element={<PatientMedicalHistory />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/patient-portal" element={<PatientPortal />} />
      <Route path="/updatehistory" element={<AddOrEditPatientDetails />} />
      <Route path="/aboutme" element={<AboutMe />} />
      <Route path="/todayAppointment" element={<TodayAppointments />} />
      <Route path="/patient-communication" element={<ChatPage />} />
      <Route path="/single" element={<SinglePatient />} />

      <Route path="/emergency-contacts" element={<EmergencyContacts />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/bookappointment" element={<AppointmentBooking />} />
    </Routes>
  );
}

export default App;
