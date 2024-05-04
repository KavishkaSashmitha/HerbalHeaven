import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Input, Button } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../middleware/authContext';

function EditProfile() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileNumber: '',
    address: '',
    currentPassword: '',
    newPassword: '',
  });
   
  useEffect(() => {
    axios.get(`http://localhost:8070/api/customer/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      setFormData(response.data);
    })
    .catch((error) => {
      console.error('Error fetching customer details:', error);
    });
  }, [token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const [error, setError] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    let error = '';
  
    // Mobile number validation
    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(formData.mobileNumber)) {
      error = 'Mobile number should be exactly 10 digits';
    }
  
    // If there are any errors, set the error state and return without submitting
    if (error) {
      setError(error);
      return;
    }
  
    try {
      await axios.put('http://localhost:8070/api/customer/profile', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      window.alert('Saved successfully');
      navigate('/dashboard');
      console.log('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };
  

  return (
    <div className="flex justify-center items-center h-screen bg-green-100">
      <Card className="w-full max-w-md px-6 py-8 bg-gray-100">
        <h2 className="text-2xl font-semibold mb-4 text-center">Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              color="lightBlue"
              size="regular"
              outline={true}
            />
          </div>
          <div className="mb-4">
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              color="lightBlue"
              size="regular"
              outline={true}
            />
          </div>
          <div className="mb-4">
            <Input
              type="text"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              placeholder="Mobile Number"
              color="lightBlue"
              size="regular"
              outline={true}
            />
          </div>
          <div className="mb-4">
            <Input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              color="lightBlue"
              size="regular"
              outline={true}
            />
          </div>
          <div className="mb-4">
            <Input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              placeholder="Current Password"
              color="lightBlue"
              size="regular"
              outline={true}
            />
          </div>
          <div className="mb-4">
            <Input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="New Password"
              color="lightBlue"
              size="regular"
              outline={true}
            />
          </div>
          <Button
            type="submit"
            color="lightBlue"
            ripple="light"
            className="w-full mt-4"
          >
            Save Changes
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default EditProfile;
