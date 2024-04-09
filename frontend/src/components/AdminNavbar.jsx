// Navbar.js
import {
  Avatar,
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from '@material-tailwind/react';
import React from 'react';
import ProfileMenu from './Profile';
import { Link } from 'react-router-dom';

function AdminNavbar({ toggleSidebar }) {
  return (
    <div
      className="sticky top-0  h-16 px-6 sm:px-10 py-4   flex items-center justify-between z-50"
      style={{ backgroundColor: '#02353c' }}
    >
      <div className="flex items-center space-x-8 text-sm text-white">
        <i
          className="fas fa-bars text-xl cursor-pointer"
          onClick={toggleSidebar}
        ></i>
        <Link to="/admin-dashboard">
          <Typography
            as="li"
            variant="small"
            color="white"
            className="p-1 font-normal "
          >
            Dashboard
          </Typography>
        </Link>
        <Menu>
          <MenuHandler>
            <Typography
              as="li"
              variant="small"
              color="white"
              className="p-1 font-normal"
            >
              Managing Areas
            </Typography>
          </MenuHandler>
          <MenuList>
            <Link to="/cart-Admin">
              <MenuItem>Cart</MenuItem>
            </Link>
            <Link to="/Employee_Dashboard">
              <MenuItem>Employee</MenuItem>
            </Link>
            <MenuItem>Menu Item 2</MenuItem>
            <MenuItem>Menu Item 3</MenuItem>
          </MenuList>
        </Menu>
      </div>
      <ProfileMenu />
    </div>
  );
}

export default AdminNavbar;
