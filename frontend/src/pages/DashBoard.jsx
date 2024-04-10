import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../middleware/authContext';
import { Button, Card, CardBody, CardHeader } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import { SidebarWithBurgerMenu } from '../components/navBar';

function DashBoard() {
  const [customer, setUser] = useState(null);
  const [error, setError] = useState(null);
  const { logout, isLoggedIn, token } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleEditProfile = () => {
    // Redirect user to edit profile page
    navigate('/edit-profile');
  };

  const handleDeleteProfile = async () => {
    // Display confirmation dialog
    const isConfirmed = window.confirm("Are you sure you want to delete this user?");
  
    if (isConfirmed) {
      try {
        // Make a request to delete the user account
        await axios.delete('http://localhost:8070/api/customer/delete', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            customerId: customer._id // Assuming `customer` object contains customer details
          }
        });
        // Logout the user after account deletion
        logout();
        navigate('/login');

        alert('User deleted successfully');
      } catch (error) {
        console.error('Error deleting customer account:', error);
        setError('Error deleting customer account'); // Set error message state
      }
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      axios
        .get(`http://localhost:8070/api/customer/profile`, {
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
    <>
      <SidebarWithBurgerMenu />
      <div className="container mx-auto py-10">
        {isLoggedIn && customer ? (
          <Card>
            <CardHeader color="blueGray">
              <h2 className="text-xl font-bold">Welcome, {customer.name}!</h2>
            </CardHeader>
            <CardBody>
              {/* Display user details including mobile number and address */}
              <p className="text-base">Email: {customer.email}</p>
              <p className="text-base">Mobile Number: {customer.mobileNumber}</p>
              <p className="text-base">Address: {customer.address}</p>
              <p className="text-base">Gender: {customer.gender}</p>
              <p className="text-base">Age: {customer.age}</p>

              {/* Add Edit and Delete Buttons */}
              <div className="flex justify-between mt-4">
                <Button color="red" onClick={handleLogout}>Logout</Button>
                <div>
                  <Button color="blue" onClick={handleEditProfile}>Edit Profile</Button>
                  <Button color="yellow" onClick={handleDeleteProfile}>Delete Account</Button>
                </div>
              </div>
            </CardBody>
          </Card>
        ) : (
          <p className="text-base">Please log in to access the user profile.</p>
        )}
      </div>
    </>
  );
}

export default DashBoard;
