// Navbar.js
import { Avatar } from '@material-tailwind/react';
import React from 'react';
import ProfileMenu from './Profile';

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
      <ProfileMenu />
    </div>
  );
}

export default AdminNavbar;
