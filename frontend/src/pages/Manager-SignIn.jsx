import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Card, IconButton } from "@material-tailwind/react";
import backgroundImage from "../assets/sign-in.jpg";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const OTPVerification = () => {
  const [agreed, setAgreed] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [isAdminLog, setIsAdminLog] = useState(false);
  const [userImage, setUserImage] = useState("");
  const navigate = useNavigate();
  const handleCheckboxChange = () => {
    setAgreed(!agreed); // Toggle the agreed state when the checkbox is clicked
  };

  useEffect(() => {
    // Retrieve user data from localStorage
    const userData = localStorage.getItem("manager");

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
        "http://localhost:8070/api/posts/check-user",
        { email }
      );

      if (userCheckResponse.data.exists) {
        // User exists and is an admin, send OTP
        const otpResponse = await axios.post(
          "http://localhost:8070/api/send-otp",
          {
            email,
          }
        );
        console.log(otpResponse.data);
        toast.success("OTP Send To Your Email");
      } else {
        // User does not exist or is not an admin, show toast
        toast.error("Not a Manager here");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const verifyOTP = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8070/api/verify-otp",
        { email, otp }
      );
      console.log(response.data);
      if (response.data.success) {
        setIsAdminLog(true);
        localStorage.setItem("manager", JSON.stringify(response.data.manager));
        navigate("/admin-dashboard");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card>
      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
          <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
            <div className="lg:w-1/2 xl:w-5/12 flex items-center justify-center p-6 sm:p-12">
              <img
                src={backgroundImage}
                className="w-full max-h-full"
                alt="image"
              />
            </div>
            <div className="lg:w-1/2 xl:w-7/12 p-6 sm:p-12">
              {/* Welcome Message and Logo */}
              <div className="mt-12 flex flex-col items-center">
                <img
                  src="logo/logo.png"
                  alt="Company Logo"
                  className=" custom-img"
                />
                <h2 className="text-3xl font-extrabold text-gray-800 mb-5">
                  Welcome to Herbal Heaven
                </h2>
              </div>

              {/* Sign-In Form */}
              <div className="w-auto flex-1 mt-8">
                <div className="mx-auto max-w-sm w-auto">
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <input
                      className="w-full px-3 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{ marginRight: "10px" }} // Adjust spacing between input and button
                    />
                    <button
                      onClick={sendOTP}
                      class="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-12  max-w-[40px] h-12 max-h-[50px] rounded-lg text-xs bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                      type="button"
                    >
                      <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                        <i
                          className="fas fa-arrow-right"
                          aria-hidden="true"
                          style={{ fontSize: "20px" }} // Use an object to specify style
                        ></i>
                      </span>
                    </button>
                  </div>

                  <input
                    className="w-full px-3 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    type="password"
                    placeholder="Password"
                    value={otp}
                    onChange={(e) => setOTP(e.target.value)}
                  />
                  <div className="mt-6 text-xs text-gray-600 text-center">
                    <label
                      htmlFor="termsCheckbox"
                      className="flex items-center cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        id="termsCheckbox"
                        checked={agreed}
                        onChange={handleCheckboxChange}
                        className="form-checkbox border-gray-300 ml-2 h-4 w-4 text-blue-500 focus:ring-blue-400"
                      />
                      <span className="ml-1">
                        I agree to the terms and conditions.
                        <a
                          href="#"
                          className="border-b border-gray-500 border-dotted"
                        >
                          Privacy Policy
                        </a>
                      </span>
                    </label>
                  </div>
                  <button
                    onClick={verifyOTP}
                    className="mt-8 tracking-wide font-semibold bg-green-400 text-white-500 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
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
                    <span className="">Sign In</span>
                  </button>
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
    </Card>
  );
};

export default OTPVerification;
