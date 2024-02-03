// src/components/Login.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Input, Button } from '@material-tailwind/react';
import axios from 'axios';

const Login = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    try {
      // Send login request to your backend with axios
      const response = await axios.post(
        'YOUR_BACKEND_LOGIN_ENDPOINT',
        formData
      );

      // Assuming your backend returns a JWT token
      const { token } = response.data;

      // Store the token in localStorage or secure storage
      localStorage.setItem('token', token);

      // Redirect to the home page or any desired route
      history.push('/');
    } catch (error) {
      console.error('Login failed:', error);
      // Handle login failure, e.g., show error message
    }
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="w-96">
        <h1 className="text-4xl font-semibold mb-6">Login</h1>
        <div className="mb-4">
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <Button
          color="blue"
          buttonType="filled"
          size="regular"
          rounded={false}
          block={false}
          iconOnly={false}
          ripple="light"
          onClick={handleLogin}
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default Login;
