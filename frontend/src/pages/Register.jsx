import React, { useState } from 'react';
import axios from 'axios';
import { Card, Input, Checkbox, Button, Typography } from '@material-tailwind/react';
import { Link, useNavigate } from 'react-router-dom';
import { SidebarWithBurgerMenu } from '../components/navBar';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    mobileNumber: '',
    gender: '',
    age: '',
    address: '',
    agreeTerms: false,
  });
  const [error, setError] = useState('');
   
  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Email validation
    if (name === 'email') {
      // Regular expression for email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setError('Please enter a valid email address');
      } else {
        setError(''); // Clear the error if email is valid
      }
    }
  
    // Mobile number validation
    if (name === 'mobileNumber') {
      // Regular expression to allow only digits
      const regex = /^\d*$/;
      if (!regex.test(value)) {
        setError('Mobile number should contain only digits');
      } else if (value.length > 10) {
        setError('Mobile number should be exactly 10 digits');
      } else {
        setError(''); // Clear error if validation passed
      }
    }
  
    // Name validation
    if (name === 'name') {
      // Regular expression to allow only letters
      const nameRegex = /^[A-Za-z]+$/;
      if (!nameRegex.test(value)) {
        setError('Name should contain only letters');
      } else {
        setError(''); // Clear error if validation passed
      }
    }
  
    // Update form data
    setFormData({ ...formData, [name]: value });
  };
  

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if there are any error messages
    if (error) {
      window.alert('Please fix the errors before submitting');
      return;
    }
  
    // Validation
    if (!formData.name || !formData.email || !formData.password || !formData.mobileNumber || !formData.address || !formData.gender || !formData.age || !formData.agreeTerms) {
      setError('Please fill in all fields');
      return;
    }
  
    if (formData.age == 0) {
      setError('Give a valid age');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:8070/api/customer/register', formData);
  
      console.log('Registration successful:', response.data);
      window.alert('Registration success');
      window.alert('Login to access');
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error.response.data);
      window.alert('Registration failed');
    }
  };
  

  return (
    <>
      <SidebarWithBurgerMenu />
      <div className="flex justify-center items-center h-screen">
        <Card color="transparent" shadow={false} className="bg-green-100 w-full max-w-md p-8" >
          <Typography variant="h4" color="blue-gray">
            Sign Up
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Nice to meet you! Enter your details to register.
          </Typography>

          {/* Display error message if any */}
          {error && <Typography variant="body" color="red" className="mb-4">{error}</Typography>}

          <form onSubmit={handleSubmit} className="mt-8 mb-2">
            <Typography variant="h6" color="blue-gray" className="mb-3">
              Your Name
            </Typography>
            <Input
              size="lg"
              placeholder="Enter your name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900 mb-4"
            />
            
            <Typography variant="h6" color="blue-gray" className="mb-3">
              Your Email
            </Typography>
            <Input
              size="lg"
              placeholder="Enter your email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900 mb-4"
            />
            <Typography variant="h6" color="blue-gray" className="mb-3">
              Password
            </Typography>
            <Input
              size="lg"
              type="password"
              placeholder="Enter your password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900 mb-4"
            />
            <Typography variant="h6" color="blue-gray" className="mb-3">
              Mobile Number
            </Typography>
            <Input
              size="lg"
              placeholder="Enter your mobile number"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900 mb-4"
            />
            <Typography variant="h6" color="blue-gray" className="mb-3">
              Gender
            </Typography>
            <div className="flex items-center mb-4">
              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                checked={formData.gender === "male"}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="male" className="mr-4">
                Male
              </label>
              <input
                type="radio"
                id="female"
                name="gender"
                value="female"
                checked={formData.gender === "female"}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="female" className="mr-4">
                Female
              </label>
              <input
                type="radio"
                id="other"
                name="gender"
                value="other"
                checked={formData.gender === "other"}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="other">Other</label>
            </div>
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Age
              </Typography>
              <Input
                size="lg"
                placeholder="Enter your age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900 mb-4"
              />
            </div>
            
            <Typography variant="h6" color="blue-gray" className="mb-3">
              Address
            </Typography>
            <Input
              size="lg"
              placeholder="Enter your address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900 mb-4"
            />
            <Checkbox
              label={
                <Typography
                  variant="small"
                  color="gray"
                  className="flex items-center font-normal"
                >
                  I agree to the
                  <Link
                    to="#"
                    className="font-medium transition-colors hover:text-gray-900"
                  >
                    &nbsp;Terms and Conditions
                  </Link>
                </Typography>
              }
              containerProps={{ className: '-ml-2.5 mb-4' }}
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleCheckboxChange}
            />
            <Button fullWidth type="submit">
              Sign up
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-gray-900">
                Sign In
              </Link>
            </Typography>
          </form>
        </Card>
      </div>
    </>
  );
}
