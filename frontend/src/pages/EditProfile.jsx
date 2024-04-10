import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Input, Button } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useAuth } from '../middleware/authContext';

function EditProfile() {
  const navigate = useNavigate(); // Access useNavigate hook
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
    // Fetch user data from the server and populate the form fields
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send updated user data to the server to update the profile
      await axios.put('http://localhost:8070/api/customer/profile', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Show window alert with "Saved successfully" message
      window.alert('Saved successfully');
      // Navigate to the dashboard
      navigate('/dashboard');
      console.log('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="EditProfile">
      <Card color="transparent" shadow={false}>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
          />
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <Input
            type="text"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            placeholder="Mobile Number"
          />
          <Input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
          />

          {/* Gender and Age fields */}
          <Input
            type="text"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            placeholder="Gender"
           />
          <Input
             type="text"
             name="age"
             value={formData.age}
             onChange={handleChange}
             placeholder="Age"
          />

          {/* Password fields */}
          <Input
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            placeholder="Current Password"
          />
          <Input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            placeholder="New Password"
          />
          <Button type="submit">Save Changes</Button>
        </form>
      </Card>
    </div>
  );
}

export default EditProfile;
