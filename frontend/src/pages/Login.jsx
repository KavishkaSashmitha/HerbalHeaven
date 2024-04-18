import React, { useState } from 'react';
import axios from 'axios';
import { Button, Checkbox, Input, Typography } from '@material-tailwind/react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../middleware/authContext';
import 'react-toastify/dist/ReactToastify.css';
import backgroundImage from '../assets/Login-Page-Background.jpg';
import { SidebarWithBurgerMenu } from '../components/navBar';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false); // State to track checkbox
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        toast.error('Empty Fields');
        return;
      }

      if (!isChecked) { // Check if the checkbox is checked
        toast.error('Please accept the terms and conditions');
        return;
      }

      const response = await axios.post('http://localhost:8070/api/customer', {
        email,
        password,
      });

      const token = response.data.token;
      const isAdmin = response.data.isAdmin;

      // Save the token to local storage or a state management solution
      localStorage.setItem('token', token);

      if (isAdmin) {
        // Handle admin-specific navigation
        navigate('/admin-dashboard');
      } else {
        // Redirect regular users to the dashboard
        navigate('/dashboard');
      }
      // Update the global authentication state
      login(token);
    } catch (error) {
      console.error('Login failed:', error.response.data);
      toast.error('Login Failed');
      setEmail('');
      setPassword('');
    }
  };

  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    // Re-enable body overflow when component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
        }}
      >
        <SidebarWithBurgerMenu />
        <div className="Signin flex w-full justify-center items-center h-screen">
          <div
            className="card-container mx-4 md:mx-0 md:w-96 p-8 rounded-lg"
            style={{
              backdropFilter: 'blur(5px)',
              backgroundColor: 'rgba(255, 255, 255, 0.5)',
            }}
          >
            <Typography variant="h4" className="text-green-900">
              Sign In
            </Typography>

            <Typography color="gray" className="mt-1 font-normal">
              Nice to meet you! Enter your details to Login.
            </Typography>
            <form className="w-full">
              <div className="flex flex-col gap-6">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Your Email
                </Typography>
                <Input
                  size="lg"
                  placeholder="name@mail.com"
                  value={email}
                  color="green"
                  onChange={(e) => setEmail(e.target.value)}
                  className="border border-gray-400 rounded-lg p-2"
                />
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Password
                </Typography>
                <Input
                  type="password"
                  size="lg"
                  placeholder="********"
                  color="green"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border border-gray-400 rounded-lg p-2"
                />
              </div>
              <Checkbox
                label={
                  <Typography
                    variant="small"
                    color="gray"
                    className="flex items-center font-normal"
                  >
                    I agree the
                    <Link
                      to="#"
                      className="font-medium transition-colors hover:text-gray-900"
                    >
                      &nbsp;Terms and Conditions
                    </Link>
                  </Typography>
                }
                containerProps={{ className: '-ml-2.5' }}
                checked={isChecked} // Pass checked state
                onChange={(e) => setIsChecked(e.target.checked)} // Update checked state
              />
              <Button
                className="mt-6"
                color="green"
                fullWidth
                onClick={handleLogin}
              >
                Sign In
              </Button>
              <Typography color="gray" className="mt-4 text-center font-normal">
                Don't have an account?{' '}
                <Link to="/signUp" className="font-medium text-gray-900">
                  Sign up
                </Link>
              </Typography>
              <Typography color="gray" className="mt-4 text-center font-normal">
                Manager?{' '}
                <Link to="/otp" className="font-medium text-gray-900">
                  Sign In
                </Link>
              </Typography>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
