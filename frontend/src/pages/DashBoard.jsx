import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../middleware/authContext";
import { Button } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { SidebarWithBurgerMenu } from "../components/navBar";

function DashBoard() {
  const [user, setUser] = useState(null);
  const { logout, isLoggedIn, token } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    if (isLoggedIn) {
      axios
        .get(`http://localhost:8070/api/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("User Data:", response.data);
          setUser(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user details:", error);
        });
    }
  }, [isLoggedIn, token]);

  return (
    <div>
      <SidebarWithBurgerMenu />
      {isLoggedIn && user ? (
        <div>
          <h2>Welcome, {user.name}!</h2>
          <p>Email: {user.email}</p>
          {/* Display other user details as needed */}
          <Link to="/my-orders">
            <Button>My Orders</Button>
          </Link>
        </div>
      ) : (
        <>
          <p>Please log in to access the user profile.</p>
          <Link to="/login">
            <Button>Login here</Button>
          </Link>
        </>
      )}
    </div>
  );
}

export default DashBoard;
