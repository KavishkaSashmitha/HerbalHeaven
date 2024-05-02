import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Card, IconButton } from "@material-tailwind/react";
import backgroundImage from "../assets/sign-in.webp";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { SidebarWithBurgerMenu } from "../components/navBar";
import ProfileMenu from "../components/Profile";
import { Footer } from "../components/Footer";

const OTPVerification = () => {
  const [agreed, setAgreed] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [isAdminLog, setIsAdminLog] = useState(false);
  const [userImage, setUserImage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleCheckboxChange = () => {
    setAgreed(!agreed);
  };

  useEffect(() => {
    const userData = localStorage.getItem("manager");

    if (userData) {
      const user = JSON.parse(userData);
      setUserImage(user.avatar);
    }
  }, []);

  const sendOTP = async () => {
    setLoading(true);
    try {
      const userCheckResponse = await axios.post(
        "http://localhost:8070/api/posts/check-user",
        { email }
      );

      if (userCheckResponse.data.exists) {
        const otpResponse = await axios.post(
          "http://localhost:8070/api/send-otp",
          { email }
        );
        console.log(otpResponse.data);
        toast.success("OTP Sent To Your Email");
      } else {
        toast.error("Not a Manager here");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "#02353c",
          backgroundSize: "cover",
        }}
      />
      <div className="relative flex justify-between">
        <SidebarWithBurgerMenu />
        <div className="relative flex w-1/2 gap-2 mt-2 mb-2 md:auto justify-center mx-auto"></div>
        <ProfileMenu />
      </div>
      <Card>
        <div className="min-h-screen py-8  bg-gray-200 text-gray-900 flex justify-center">
          <div className="max-w-screen-xl m-0 sm:m-10 shadow sm:rounded-lg flex justify-center flex-1">
            <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
              <div className="lg:w-1/2 xl:w-5/12 flex items-center justify-center p-2 sm:p-12">
                <img
                  src={backgroundImage}
                  style={{
                    width: "90%",
                    maxHeight: "90%",
                    borderRadius: "8px",
                  }}
                  alt="image"
                />
              </div>

              <div className="lg:w-1/2 xl:w-7/12 p-6 sm:p-12">
                <div className="mt-5 flex flex-col items-center">
                  <img
                    src="logo/logo.png"
                    alt="Company Logo"
                    className=" custom-img"
                  />
                  <h2 className="text-3xl font-extrabold text-gray-800 mb-5">
                    Welcome to Herbal Heaven
                  </h2>
                </div>
                <div className="w-auto flex-1 mt-5">
                  <div className="mx-auto max-w-sm w-auto">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <input
                        className="w-full px-3 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ marginRight: "10px" }}
                      />
                      <button
                        onClick={sendOTP}
                        className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-12  max-w-[40px] h-12 max-h-[50px] rounded-lg text-xs bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                        type="button"
                      >
                        <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                          <i
                            className="fas fa-arrow-right"
                            aria-hidden="true"
                            style={{ fontSize: "20px" }}
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
                      className="mt-8 tracking-wide font-semibold bg-amber-800 text-white-500 w-full py-4 rounded-lg hover:bg-amber-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
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
                  style={{ backgroundImage: `url(${userImage})` }}
                ></div>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </Card>
      {loading && (
        // Display loading spinner while request is being processed
        <div className="fixed top-0 left-0 z-50 w-screen h-screen flex items-center justify-center bg-custom-color bg-opacity-50">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-400"></div>
        </div>
      )}
    </div>
  );
};

export default OTPVerification;
