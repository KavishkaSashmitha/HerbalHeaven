import React, { useState } from 'react';
import { Button, Input } from '@material-tailwind/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ManagerLogin() {
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Make a GET request to your backend endpoint for verification
      const response = await axios.get(
        `/api/posts/posts?email=${email}&nic=${mobile}`
      );

      // Check if the response indicates successful admin login
      if (response.data.success) {
        // Navigate to the admin dashboard
        navigate('/admin-dashboard');
      } else {
        // Handle unsuccessful login
        console.log('Login failed:', response.data.error);
        // Display appropriate message to the user
      }
    } catch (error) {
      console.error('Error occurred during login:', error);
      // Handle error - display error message to the user
    }
  };

  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <div className="w-1/2 h-screen hidden lg:block">
        <img
          src="../assets/sign-in.jpg"
          alt="Placeholder Image"
          className="object-cover w-full h-full"
        />
      </div>

      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2 justify-center">
        <h1 className="text-2xl font-semibold mb-4">Login</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600">
              Email
            </label>
            <Input
              type="email"
              id="email"
              name="email"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="nic" className="block text-gray-600">
              NIC
            </label>
            <Input
              type="text"
              id="nic"
              name="nic"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              autoComplete="off"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>

          <Button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
