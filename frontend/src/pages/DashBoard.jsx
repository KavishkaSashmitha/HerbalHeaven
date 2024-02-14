import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../middleware/authContext';
import { Button } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';

function DashBoard() {
  const [user, setUser] = useState(null);
  const { logout, isLoggedIn, token } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
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
          console.log('User Data:', response.data);
          setUser(response.data);
        })
        .catch((error) => {
          console.error('Error fetching user details:', error);
        });
    }
  }, [isLoggedIn, token]);

  return (
    <div>
      {isLoggedIn && user ? (
        <div>
          <h2>Welcome, {user.name}!</h2>
          <p>Email: {user.email}</p>
          {/* Display other user details as needed */}
        </div>
      ) : (
        <p>Please log in to access the user profile.</p>
      )}

      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
}

export default DashBoard;
