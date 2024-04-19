import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../middleware/authContext';
import { Button, Card, CardBody, CardHeader } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import { SidebarWithBurgerMenu } from '../components/navBar';
import { Footer } from "../components/Footer";

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
    navigate('/edit-profile');
  };

  const handleDeleteProfile = async () => {
    const isConfirmed = window.confirm("Are you sure you want to delete this account?");
  
    if (isConfirmed) {
      try {
        await axios.delete('http://localhost:8070/api/customer/delete', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            customerId: customer._id
          }
        });
        logout();
        navigate('/login');
        alert('User deleted successfully');
      } catch (error) {
        console.error('Error deleting customer account:', error);
        setError('Error deleting customer account');
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
      <div className="container mx-auto py-10 ">
        {isLoggedIn && customer ? (
          <Card className="bg-green-100">
            <CardHeader color="blueGray">
              <h2 className="text-xl font-bold">Welcome, {customer.name}!</h2>
            </CardHeader>
            <CardBody>
              {/* User Details */}
              <div className="mb-4 ">
                <p className="text-lg text-gray-700 font-semibold">Email:</p>
                <p className="text-base text-gray-600">{customer.email}</p>
              </div>
              <div className="mb-4">
                <p className="text-lg text-gray-700 font-semibold">Mobile Number:</p>
                <p className="text-base text-gray-600">{customer.mobileNumber}</p>
              </div>
              <div className="mb-4">
                <p className="text-lg text-gray-700 font-semibold">Address:</p>
                <p className="text-base text-gray-600">{customer.address}</p>
              </div>
              <div className="mb-4">
                <p className="text-lg text-gray-700 font-semibold">Gender:</p>
                <p className="text-base text-gray-600">{customer.gender}</p>
              </div>
              <div className="mb-4">
                <p className="text-lg text-gray-700 font-semibold">Age:</p>
                <p className="text-base text-gray-600">{customer.age}</p>
              </div>

              {/* Buttons */}
              <div className="flex justify-between mt-6">
                <Button color="red" onClick={handleLogout}>Logout</Button>
                <div>
                  <Button color="blue" onClick={handleEditProfile}>Edit Profile</Button>
                  <Button color="yellow" onClick={handleDeleteProfile}>Delete Account</Button>
                </div>
              </div>
            </CardBody>
          </Card>
        ) : (
          <p className="text-base text-gray-700">Please log in to access the user profile.</p>
        )}
      </div>
      <Footer />
    </>
  );
}

export default DashBoard;
