import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

function Startuppage() {
  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: "url('/Startpage5_edited_2.png')",
        }}
      />
      
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        {/* Logo and Title */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 mb-8">
          <Image
            src="/alumniforSignup-logo.png"
            alt="DSSC Alumni Logo"
            width={140}
            height={140}
            className="rounded-full"
          />
          <div>
            <h1 className="text-xl sm:text-2xl md:text-2xl font-bold text-blue-900 mb-2">
              DAVAO DEL SUR STATE COLLEGE
            </h1>
            <h2 className="text-3xl sm:text-3xl md:text-4xl font-bold text-blue-900">
              ALUMNI COMMUNITY
            </h2>
          </div>
        </div>

        {/* Button */}
        <div className="mt-4 sm:mt-8">
          <Link 
            href="/Loginpage"
            className="px-6 sm:px-8 py-2 sm:py-3 text-center rounded-lg bg-blue-900 text-white 
            hover:bg-blue-800 transition-all duration-200 transform hover:scale-105 
            font-medium shadow-lg text-md sm:text-lg"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Startuppage;