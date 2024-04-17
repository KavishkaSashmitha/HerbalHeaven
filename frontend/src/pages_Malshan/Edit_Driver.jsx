import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useParams } from "react-router-dom";
import { SidebarWithBurgerMenu } from "../components/navBar";
import ProfileMenu from "../components/Profile";
import { Footer } from "../components/Footer";
import { Breadcrumbs } from "@material-tailwind/react";

export default function Edit_Driver() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    d_name: "",
    d_mobile: "",
    dob: "",
    category: "",
    nic:"",
    vehicle_No: "",
    vehicle_type: "",
    
  });

  // State variables for validation errors
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8070/api/transports/transport/${id}`
        );
        if (response.data.success) {
          setFormData(response.data.transport);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchData();
  }, [id]);

  const [confirmation, setConfirmation] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear the validation error when user starts typing
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  function handleKeyPress(event) {
    // Get the character that the user is trying to type
    const char = event.key;

    // Regular expression to allow only letters (A-Z, a-z) and spaces
    const regex = /^[A-Za-z ]$/;

    // If the character does not match the regex, prevent the default behavior
    if (!regex.test(char)) {
      event.preventDefault(); // Prevents the non-letter or non-space character from being typed
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();

    // Validate form fields
    const validationErrors = {};
    if (!formData.d_name) {
      validationErrors.d_name = "Name is required";
    }
    
    if (!formData.d_mobile) {
      validationErrors.d_mobile = "Mobile is required";
    } else if (!/^\d{10}$/.test(formData.d_mobile)) {
      validationErrors.d_mobile = "Mobile must contain exactly 10 digits";
    }

    if (!formData.dob) {
      validationErrors.dob = "Age is required";
    } else {
      const dob = parseInt(formData.dob);
      if (isNaN(dob) || dob < 18 || dob > 60) {
        validationErrors.dob = "Age must be between 18 and 60";
      }
    }
    if (!formData.category) {
      validationErrors.category = "Category is required";
    }

    if (!formData.nic) {
      validationErrors.nic = "NIC is required";
    } else {
      const nicFormat = /^[0-9]{9}(v|V)?$|^[0-9]{12}$/; // Regular expression for NIC format
      if (!nicFormat.test(formData.nic)) {
        validationErrors.nic = "NIC must contain either 9 digits followed by an optional 'v' or 'V', or exactly 12 digits";
      }
    }
    
    
    

    if (!formData.vehicle_No) {
      validationErrors.vehicle_No = "Vehicle NO. is required";
    } else {
      const regex = /^[A-Z]{2,3}\d{4}$/;
      if (!regex.test(formData.vehicle_No)) {
        validationErrors.vehicle_No = "Please enter a valid Sri Lankan vehicle number (e.g., XX1234 or XXX1234)";
      }
    }
  

    if (!formData.vehicle_type) {
      validationErrors.vehicle_type = "Vehicle type is required";
    }
   

    // If there are validation errors, update the state and return
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const { d_name, d_mobile, dob, category,nic, vehicle_No, vehicle_type} = formData;

    const data = {
      d_name: d_name,
      d_mobile: d_mobile,
      dob: dob,
      category: category,
      nic: nic,
      vehicle_No: vehicle_No,
      vehicle_type: vehicle_type,
    };

    Swal.fire({
      title: "Are you sure?",
      text: "This will update the Driver information.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, update it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(`http://localhost:8070/api/transports/transport/update/${id}`, data)
          .then((res) => {
            if (res.data.success) {
              setFormData({
                d_name: '',
                d_mobile: '',
                dob: '',
                category: '',
                nic: '',
                vehicle_No: '',
                vehicle_type: '',
              });

              setConfirmation(true);
            }
          })
          .catch((error) => {
            console.error("Error updating post:", error);
          });
      }
    });
  };

  if (confirmation) {
    window.location.href = "/transport";
  }

  return (
    <>
      <div className="edit-post-bg ">
        <div className="relative flex justify-between">
          <SidebarWithBurgerMenu />
          <ProfileMenu />
        </div>
        <div className="m-4">
          <Breadcrumbs>
            <Link to="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </Link>
            <Link to="#">
              <li class="flex items-center font-sans text-sm antialiased font-normal leading-normal transition-colors duration-300 cursor-pointer text-blue-gray-900 hover:text-cyan-100">
                <span>Dashboard</span>

                <span class=" font-sans text-sm antialiased font-normal leading-normal pointer-events-none select-none text-blue-gray-500"></span>
              </li>
            </Link>
            <Link to="/transport">
              <li class="flex items-center font-sans text-sm antialiased font-normal leading-normal transition-colors duration-300 cursor-pointer text-blue-gray-900 hover:text-cyan-100">
                <span>Transport</span>

                <span class=" font-sans text-sm antialiased font-normal leading-normal pointer-events-none select-none text-blue-gray-500"></span>
              </li>
            </Link>
            <Link to="">
              <li class="flex items-center font-sans text-sm antialiased font-normal leading-normal transition-colors duration-300 cursor-pointer text-blue-gray-900 hover:text-cyan-100">
                <span>Update Transport</span>

                <span class=" font-sans text-sm antialiased font-normal leading-normal pointer-events-none select-none text-blue-gray-500"></span>
              </li>
            </Link>
          </Breadcrumbs>
        </div>

        <div class="flex items-center justify-center h-screen mt-7 mb-7">
          <div class="relative flex  w-full max-w-[56rem] mx-auto flex-col rounded-xl opacity-90 bg-blue-gray-100  bg-clip-border text-gray-700 shadow-md">
            <div class="relative grid px-10 py-1 m-1 overflow-hidden  border-blue-gray-100 bg-blue-gray-50/50text-center text-white bg-gray-700 place-items-center rounded-xl bg-clip-border shadow-gray-900/20">
              <div class="h-1 p-8 mb-4 text-white ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 35 35"
                  fill="currentColor"
                  aria-hidden="true"
                  class="w-12 h-12 text-white"
                >
                  <path d="M4.5 3.75a3 3 0 00-3 3v.75h21v-.75a3 3 0 00-3-3h-15z "></path>
                </svg>
              </div>
              <h5 class="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-white">
                Update Transport Information
              </h5>
            </div>
            <div class="grid grid-cols-2 gap-6">
              <div class="p-6">
                <div class="block overflow-visible">
                  <div class="relative block w-full overflow-hidden !overflow-x-visible !overflow-y-visible bg-transparent">
                    <div>
                      <form class="flex flex-col gap-4 mt-12">
                        <div>
                          <p class="block mt-2 mb-1 font-sans text-x1 antialiased font-medium leading-normal text-blue-gray-900">
                            <label>Owner Name</label>
                          </p>
                          <div class="relative h-10 w-full min-w-[200px]">
                            <input
                              value={formData.d_name}
                              type="text"
                              name="d_name"
                              onChange={handleInputChange}
                              onKeyPress={handleKeyPress}
                              className={`${
                                errors.d_name && "border-red-500"
                              }peer bg-white h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            `}
                            />
                            {errors.d_name && (
                              <span className="ml-1 text-sm text-red-500 sans">
                                {errors.d_name}
                              </span>
                            )}

                            <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                          </div>
                        </div>
                        {errors.d_name && <div class=""></div>}

                        <div>
                          <p class="block mt-2 mb-1 font-sans text-x1 antialiased font-medium leading-normal text-blue-gray-900">
                            <label>Mobile</label>
                          </p>
                          <div class="relative h-10 w-full min-w-[200px]">
                            <input
                              value={formData.d_mobile}
                              type="number"
                              name="d_mobile"
                              placeholder="Enter Mobile Number"
                              onChange={handleInputChange}
                              className={`${
                                errors.d_mobile && "border-red-500"
                              }peer bg-white h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            `}
                            />
                            {errors.d_mobile && (
                              <span className="ml-1 text-sm text-red-500 sans">
                                {errors.d_mobile}
                              </span>
                            )}
                            <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                          </div>
                        </div>
                        {errors.d_mobile && <div class=""></div>}

                        <div>
                          <p class="block mt-2 mb-1 font-sans text-x1 antialiased font-medium leading-normal text-blue-gray-900">
                            <label>Age</label>
                          </p>
                          <div class="relative h-10 w-full min-w-[200px]">
                            <input
                              value={formData.dob}
                              type="number"
                              name="dob"
                              placeholder="Enter Age"
                              onChange={handleInputChange}
                              className={`${
                                errors.age && "border-red-500"
                              }peer bg-white h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            `}
                            />
                            {errors.dob && (
                              <span className="ml-1 text-sm text-red-500 sans">
                                {errors.dob}
                              </span>
                            )}
                            <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                          </div>
                        </div>
                        {errors.dob && <div class=""></div>}

                        <div>
                          <p class="block mt-2 mb-1 font-sans text-x1 antialiased font-medium leading-normal text-blue-gray-900">
                            <label>Category</label>
                          </p>
                          <div class="relative h-10 w-full min-w-[200px]">
                            <select
                              value={formData.category}
                              type="text"
                              name="category"
                              placeholder="Enter Category"
                              onChange={handleInputChange}
                              className={`${
                                errors.category && "border-red-500"
                              }peer bg-white h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            `}
                            >
                              <option value="Rent">Rent</option>
                              <option value="Own">Own</option>
                            </select>
                            {errors.category && (
                              <span className="ml-1 text-sm text-red-500 sans">
                                {errors.category}
                              </span>
                            )}
                            <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                          </div>
                        </div>
                        {errors.category && <div class=""></div>}

                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div class="p-6">
                <div class="block overflow-visible">
                  <div class="relative block w-full overflow-hidden !overflow-x-visible !overflow-y-visible bg-transparent">
                    <div>
                      <form class="flex flex-col gap-4 mt-12">

                      <div>
                          <p class="block mt-2 mb-1 font-sans text-x1 antialiased font-medium leading-normal text-blue-gray-900">
                            <label>National ID</label>
                          </p>
                          <div class="relative h-10 w-full min-w-[200px]">
                            <input
                              value={formData.nic}
                              type="text"
                              name="nic"
                              placeholder="Enter NIC"
                              onChange={handleInputChange}
                              className={`${
                                errors.nic && "border-red-500"
                              }peer bg-white h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            `}
                            />
                            {errors.nic && (
                              <span className="ml-1 text-sm text-red-500 sans">
                                {errors.nic}
                              </span>
                            )}
                            <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                          </div>
                      </div>

                       <div>
                          <p class="block mt-2 mb-1 font-sans text-x1 antialiased font-medium leading-normal text-blue-gray-900">
                            <label>Vehicle Type</label>
                          </p>
                          <div class="relative h-10 w-full min-w-[200px]">
                            <select
                              value={formData.vehicle_type}
                              type="text"
                              name="vehicle_type"
                              placeholder="Enter Vehhicle Type"
                              onChange={handleInputChange}
                              className={`${
                                errors.vehicle_type && "border-red-500"
                              }peer bg-white h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            `}
                            >
                              <option value="Car">Car</option>
                              <option value="Van">Van</option>
                              <option value="Lorry">Lorry</option>
                              <option value="MotorBike">Motor Bike</option>
                              <option value="T-Weel">T-Weel</option>
                            </select>
                            {errors.vehicle_type && (
                              <span className="ml-1 text-sm text-red-500 sans">
                                {errors.vehicle_type}
                              </span>
                            )}
                            <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                          </div>
                        </div>
                        {errors.vehicle_type && <div class=""></div>}
                        
                      
                        <div>
                          <p class="block mt-2 mb-1 font-sans text-x1 antialiased font-medium leading-normal text-blue-gray-900">
                            <label>Vehicle Number</label>
                          </p>
                          <div class="relative h-10 w-full min-w-[200px]">
                            <input
                              value={formData.vehicle_No}
                              type="text"
                              name="vehicle_No"
                              placeholder="Enter Vehicle Number"
                              onChange={handleInputChange}
                              className={`${
                                errors.vehicle_No && "border-red-500"
                              }peer bg-white h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            `}
                            />
                            {errors.vehicle_No && (
                              <span className="ml-1 text-sm text-red-500 sans">
                                {errors.vehicle_No}
                              </span>
                            )}
                            <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                          </div>
                        </div>
                        {errors.vehicle_No && <div class=""></div>}

                        
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex justify-center  gap-4 mt-10">
              <button
                class=" m-2 select-none rounded-lg bg-green-500 py-3.5 px-14 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="submit"
                onClick={onSubmit}
              >
                &nbsp;
                <i className="mr-2 fas fa-pencil"></i>Update
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
