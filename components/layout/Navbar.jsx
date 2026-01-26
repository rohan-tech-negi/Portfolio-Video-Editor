import Link from 'next/link';
import React from 'react';
// import LeafLogo from '../items/page';
// import Logo from '../items/page';

const Navbar = () => {

 
  return (
    <nav className="flex items-center justify-between p-8 bg-white border-b">
      {/* Left side (empty or add logo later) */}
      <div></div>

      {/* Center: Main navigation */}
      <ul className="flex space-x-8 text-xl">
        <Link href="">
        
        </Link>
        <li className="cursor-pointer hover:text-gray-700">Projects</li>

        <Link href="/contact">
        <li className="cursor-pointer hover:text-gray-700">About & Contact</li>
        </Link>
        
      </ul>

      {/* Right side: Email + Contact */}
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-500">Email: Lorem ipsum dolor sit amet.</span>
        <button className="px-4 py-2 bg-gray-800 text-white rounded-full text-sm font-medium hover:bg-gray-900">
          Contact Me
        </button>
      </div>
    </nav>
  );
};

export default Navbar;