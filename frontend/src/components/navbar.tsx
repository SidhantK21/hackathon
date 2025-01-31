import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export const Navbar = () => {
  // State to control the mobile menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Hook for navigation
  const navigate = useNavigate();

  // Handle "Try for Free" button click
  const handleTryForFreeClick = () => {
    navigate('/signup'); // Navigate to the signup page
  };

  return (
    <>
      {/* Navbar Container */}
      <div className="w-full fixed top-0 left-0 z-50 flex items-center justify-between px-10 py-3 bg-black bg-opacity-60 backdrop-blur-lg shadow-lg border-b border-[#181818]">
        {/* Left Section - Logo and Nav Links */}
        <div className="flex items-center gap-8">
          {/* Logo */}
          <div className="text-2xl font-semibold text-white">
            <img className="w-16 h-16" src="src/assets/logoai.svg" alt="" />
          </div>

          {/* Nav Links for Larger Screens */}
          <div className="hidden sm:flex gap-6">
            <a href="#product" className="text-white hover:text-blue-400 transition duration-300">Product</a>
            <a href="#use-cases" className="text-white hover:text-blue-400 transition duration-300">Use Cases</a>
            <a href="#tutorial" className="text-white hover:text-blue-400 transition duration-300">Tutorial</a>
            <a href="#affiliation" className="text-white hover:text-blue-400 transition duration-300">Affiliation</a>
          </div>
        </div>

        {/* Right Section - About, Login, Try for Free Button */}
        <div className="flex gap-6 items-center ml-auto">
          {/* About Link */}
          <a href="#about" className="text-white hover:text-blue-400 transition duration-300 text-sm">About</a>

          {/* Try for Free Button */}
          <button
            className="flex items-center justify-center gap-6 bg-[#5e5eed] text-white font-semibold rounded-lg py-2.5 px-4 transition-all duration-150 ease-in-out cursor-pointer hover:bg-[#4c4be2] text-sm"
            onClick={handleTryForFreeClick} // Add click handler
          >
            Try for Free
          </button>
        </div>

        {/* Hamburger Menu for Mobile Screens */}
        <div className="sm:hidden flex items-center">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="sm:hidden flex flex-col items-center bg-black bg-opacity-60 p-6">
          <a href="#product" className="text-white py-2 hover:text-blue-400 transition duration-300">Product</a>
          <a href="#use-cases" className="text-white py-2 hover:text-blue-400 transition duration-300">Use Cases</a>
          <a href="#tutorial" className="text-white py-2 hover:text-blue-400 transition duration-300">Tutorial</a>
          <a href="#affiliation" className="text-white py-2 hover:text-blue-400 transition duration-300">Affiliation</a>
          <a href="#about" className="text-white py-2 hover:text-blue-400 transition duration-300">About</a>
          <a href="#login" className="text-white py-2 hover:text-blue-400 transition duration-300">Login</a>
          <button
            className="text-white py-2 bg-[#5e5eed] rounded-lg w-full text-sm"
            onClick={handleTryForFreeClick} // Add click handler for mobile menu
          >
            Try for Free
          </button>
        </div>
      )}
    </>
  );
};