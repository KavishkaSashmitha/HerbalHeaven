// Navbar.js
import {
  Avatar,
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import ProfileMenu from "./Profile";
import { Link } from "react-router-dom";
import AdminProfileMenu from "./AdminProfile";

function AdminNavbar({ toggleSidebar }) {
  return (
    <div
      className="sticky top-0  h-16 px-6 sm:px-10 py-4   flex items-center justify-between z-50"
      style={{ backgroundColor: "#02353c" }}
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
            className="p-1 font-normal  hover:text-amber-400"
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
              className="p-1 font-normal hover:text-amber-400"
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
            <Link to="/sup">
              <MenuItem>Supplier</MenuItem>
            </Link>
            <Link to="/inventory">
              <MenuItem>Inventory</MenuItem>
            </Link>
            <Link to="/transport">
              <MenuItem>Transport</MenuItem>
            </Link>
            <Link to="/admin-orders">
              <MenuItem>Order</MenuItem>
            </Link>
            <Link to="/netincome">
              <MenuItem>Finance</MenuItem>
            </Link>
            <Link to="/all">
              <MenuItem>Customer</MenuItem>
            </Link>
          </MenuList>
        </Menu>
      </div>
      <AdminProfileMenu />
    </div>
  );
}

export default AdminNavbar;
