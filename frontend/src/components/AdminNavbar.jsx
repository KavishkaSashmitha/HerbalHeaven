// Navbar.js
import React from 'react';

function AdminNavbar({ toggleSidebar }) {
  return (
    <div className="sticky top-0 bg-blue-gray-300 h-14 px-10 py-4 border-b-4 border-purple-900 flex items-center justify-between">
      <div className="flex items-center space-x-12 text-sm text-white">
        <i
          className="fas fa-bars text-xl cursor-pointer"
          onClick={toggleSidebar}
        ></i>
        <a href="#" className="font-thin">
          Dashboard
        </a>
        <a href="#" className="font-thin">
          User
        </a>
        <a href="#" className="font-thin">
          Settings
        </a>
      </div>
      <div className="flex items-center space-x-8 text-gray-400 text-base">
        <span className="relative inline-block cursor-pointer">
          <i className="fas fa-bell"></i>
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1 py-0.5 text-xs font-thin leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
            99
          </span>
        </span>
        <span className="relative inline-block cursor-pointer">
          <i className="fas fa-list"></i>
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1 py-0.5 text-xs font-thin leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-purple-600 rounded-full">
            99
          </span>
        </span>
        <span className="relative inline-block cursor-pointer">
          <i className="fas fa-envelope"></i>
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1 py-0.5 text-xs font-thin leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-yellow-600 rounded-full">
            9
          </span>
        </span>
        <i className="fas fa-user-circle fa-lg cursor-pointer"></i>
        <i className="fas fa-cog fa-2x text-white cursor-pointer animate-spin hover:text-blue-gray-700"></i>
      </div>
    </div>
  );
}

export default AdminNavbar;
