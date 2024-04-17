import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@material-tailwind/react';
import backgroundImage from '../assets/sign-in.jpg';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const OTPVerification = () => {
  const [email, setEmail] = useState('');
  const [otp, setOTP] = useState('');
  const [isAdminLog, setIsAdminLog] = useState(false);
  const [userImage, setUserImage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve user data from localStorage
    const userData = localStorage.getItem('manager');

    if (userData) {
      // Parse JSON string to JavaScript object
      const user = JSON.parse(userData);
      // Access user image URL and set it to state
      setUserImage(user.avatar);
    }
  }, []);

  const sendOTP = async () => {
    try {
      // Check if user exists and is an admin
      const userCheckResponse = await axios.post(
        'http://localhost:8070/api/posts/check-user',
        { email }
      );

      if (userCheckResponse.data.exists) {
        // User exists and is an admin, send OTP
        const otpResponse = await axios.post(
          'http://localhost:8070/api/send-otp',
          {
            email,
          }
        );
        console.log(otpResponse.data);
      } else {
        // User does not exist or is not an admin, show toast
        toast.error('Not a Manager here');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const verifyOTP = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8070/api/verify-otp',
        { email, otp }
      );
      console.log(response.data);
      if (response.data.success) {
        setIsAdminLog(true);
        localStorage.setItem('manager', JSON.stringify(response.data.manager));
        navigate('/admin-dashboard');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div>
            <img src={backgroundImage} className="w-full" alt="image" />
          </div>
          <div className="mt-12 flex flex-col items-center">
            <div className="w-full flex-1 mt-8">
              <div className="mx-auto max-w-xs">
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button onClick={sendOTP}>Send OTP</Button>
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="password"
                  placeholder="Password"
                  value={otp}
                  onChange={(e) => setOTP(e.target.value)}
                />
                <button
                  onClick={verifyOTP}
                  className="mt-5 tracking-wide font-semibold bg-green-400 text-white-500 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                >
                  <svg
                    className="w-6 h-6 -ml-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <path d="M20 8v6M23 11h-6" />
                  </svg>
                  <span className="ml-">Sign In</span>
                </button>
                <p className="mt-6 text-xs text-gray-600 text-center">
                  I agree to abide by Cartesian Kinetics
                  <a
                    href="#"
                    className="border-b border-gray-500 border-dotted"
                  >
                    Terms of Service
                  </a>
                  and its
                  <a
                    href="#"
                    className="border-b border-gray-500 border-dotted"
                  >
                    Privacy Policy
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-green-100 text-center hidden lg:flex">
          {userImage && (
            <div
              className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${userImage})`,
              }}
            ></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
