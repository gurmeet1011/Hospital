import React from 'react';
import { FaInstagram, FaFacebook, FaLinkedin } from 'react-icons/fa';
import 'animate.css';

function Footer() {
  return (
    <>
      <div className="bg-black h-auto">
        {/* Top Section */}
        <div className="py-6 flex justify-between p-12 gap-4">
          {/* Clinic name with animation for 2 seconds */}
          <div
            className="text-white text-3xl font-bold mb-4 animate__animated animate__tada"
            style={{ animationDuration: '2s', animationIterationCount: '1' }}
          >
            <a href="#">My Clinic</a>
          </div>

          {/* Social Media Icons */}
          <div className="flex justify-center gap-12">
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram size={40} style={{ color: 'white' }} />
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook size={40} style={{ color: 'white' }} />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin size={40} style={{ color: 'white' }} />
            </a>
          </div>
        </div>

        {/* Divider */}
        <hr className="border border-gray-300 my-4 m-6" />

        {/* Contact and Donations Section */}
        <div className="flex justify-evenly">
          {/* Contact Us */}
          <div className="font-semibold text-gray-400">
            <h2 className="text-xl text-gray-300 mb-2">Contact Us</h2>
            <ul className="space-y-1">
              <li>Clinic Appointments: +91 7668220147</li>
              <li>Administrative Office: +91 7060881050</li>
              <li>247340 Nakur, Saharanpur, UP, India</li>
            </ul>
          </div>

          {/* Donations */}
          <div className="font-semibold text-gray-400">
            <h2 className="text-xl text-gray-300 mb-2">Donations</h2>
            <div style={{ whiteSpace: 'pre-line' }}>
              {`Thank you for supporting our
               work to provide the highest
               level of care.`}
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="border border-gray-300 my-4 m-6" />

        {/* Copyright */}
        <div className="text-sm text-white text-center">
          &copy; {new Date().getFullYear()} My Clinic. All rights reserved.
        </div>
      </div>
    </>
  );
}

export default Footer;
