import React, { Component } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { SidebarWithBurgerMenu } from "../components/navBar";
import { Link } from "react-router-dom";
import { Breadcrumbs, Button } from "@material-tailwind/react";
import ProfileMenu from "../components/Profile";
import { Footer } from "../components/Footer";

export default class Add_Driver extends Component {
  constructor(props) {
    super(props);
    this.state = {
      d_name: "",
      d_mobile: "",
      dob: "",
      category: "",
      nic: "",
      vehicle_No: "",
      vehicle_type: "",
      confirmation: false,
      errors: {},

      confirmation: false,
    };
  }

  // Validation functions
  validateName = () => {
    const { d_name } = this.state;
    if (!d_name) {
      return "Name is required";
    }

    // Check if the name contains any uppercase letters
    if (/[A-Z]/.test(d_name)) {
      return "Please enter name in lowercase letters";
    }

    return "";
  };

  validateMobile = () => {
    const { d_mobile } = this.state;
    if (!d_mobile) {
      return "Mobile number is required";
    }
    if (d_mobile.length !== 10) {
      return "Mobile number must be 10 digits";
    }
    return "";
  };

  validateAge = () => {
    const { dob } = this.state;
    if (!dob) {
      return "Age is required";
    }
    if (dob < 18 || dob > 60) {
      return "Age must be between 18 and 60";
    }
    return "";
  };

  validateCategory = () => {
    const { category } = this.state;
    if (!category) {
      return "Category is required";
    }
    return "";
  };

  

  validateNic = () => {
    const { nic } = this.state;
    if (!nic) {
      return "National ID is required";
    }
    const nicFormat = /^[0-9]{9}(v|V)?$|^[0-9]{12}$/; // Regular expression for NIC format
    if (!nicFormat.test(nic)) {
      return "National ID must contain either 9 digits followed by an optional 'v' or 'V', or exactly 12 digits";
    }
    return "";
  };


  validateVehicleNumber = () => {
    const { vehicle_No } = this.state;
    if (!vehicle_No) {
      return "Vehicle number is required";
    }
    const regex = /^[A-Z]{2,3}\d{4}$/;
    if (!regex.test(vehicle_No)) {
      return "Please enter a valid Sri Lankan vehicle number (e.g., XX1234 or XXX1234)";
    }
    return "";
};

  validateVehicleType = () => {
    const { vehicle_type } = this.state;
    if (!vehicle_type) {
      return "Vehicle Type is required";
    }
    return "";
  };

 
  handleInputChange = (e) => {
    const {name, value } = e.target;

    this.setState({
      [name]: value,
      errors: {
        ...this.state.errors,
        [name]: "", // Clear previous error when the field is updated
      },
    });
  };

  handleIsAdminChange = (e) => {
    this.setState({
      isAdmin: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    // Validate all fields before submission
    const errors = {
      d_name: this.validateName(),
      d_mobile: this.validateMobile(),
      dob: this.validateAge(),
      category: this.validateCategory(),
      nic: this.validateNic(),
      vehicle_No: this.validateVehicleNumber(),
      vehicle_type: this.validateVehicleType(),
      
  
    };

    // Check if any errors exist
    if (Object.values(errors).some((error) => error !== "")) {
      this.setState({ errors });
      return;
    }

    const { d_name, d_mobile, dob, category, nic, vehicle_No, vehicle_type} =
      this.state;

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
      text: "This will add a new Employee.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, add it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post("http://localhost:8070/api/transports/transport/save", data)
          .then((res) => {
            if (res.data.success) {
              this.setState({
                confirmation: true,
                d_name: "",
                d_mobile: "",
                dob: "",
                category: "",
                nic:"",
                vehicle_No: "",
                vehicle_type: "",
              });
            }
          });
      }
      if (this.state.confirmation) {
        window.location.href = "/transport";
      }
    });
  };

  render() {
    const { errors } = this.state;
    return (
      <>
        <div className="create-post-bg ">
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
              <Link to="/transport/add">
                <li class="flex items-center font-sans text-sm antialiased font-normal leading-normal transition-colors duration-300 cursor-pointer text-blue-gray-900 hover:text-cyan-100">
                  <span>Add New Driver</span>

                  <span class=" font-sans text-sm antialiased font-normal leading-normal pointer-events-none select-none text-blue-gray-500"></span>
                </li>
              </Link>
            </Breadcrumbs>
          </div>
          <div class=" w-full max-w-[56rem] mx-auto mt-7 mb-7 ">
            <div class="relative flex flex-col rounded-xl bg-blue-gray-100 shadow-md opacity-90">
              <div class="relative grid px-1 py-1 m-1 overflow-center text-center text-white bg-gray-800 place-items-center rounded-xl bg-clip-border shadow-gray-900/20">
                <div class="h-1 p-8 mb-4 text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 25 25"
                    fill="currentColor"
                    aria-hidden="true"
                    class="w-10 h-10 text-white"
                  >
                    <path d="M4.5 3.75a3 3 0 00-3 3v.75h21v-.75a3 3 0 00-3-3h-15z"></path>
                    <path
                      fill-rule="evenodd"
                      d="M22.5 9.75h-21v7.5a3 3 0 003 3h15a3 3 0 003-3v-7.5zm-18 3.75a.75.75 0 01.75-.75h6a.75.75 0 010 1.5h-6a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <h5 class="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-white">
                  Add New Driver
                </h5>
              </div>
              <div class="grid grid-cols-2 gap-6">
                <div class="p-6">
                  <div class="block overflow-visible">
                    <div class="relative block w-full overflow-visible  !overflow-y-visible bg-transparent">
                      <form class="flex flex-col gap-4 mt-12">
                        <div>
                          <p class="block mt-2 mb-1 font-sans text-x1 antialiased font-medium leading-normal text-blue-gray-900">
                            <label>Owner Name</label>
                          </p>
                          <div class="relative h-10 w-full min-w-[200px]">
                            <input
                              value={this.state.d_name}
                              type="text"
                              name="d_name"
                              onChange={this.handleInputChange}
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
                              value={this.state.d_mobile}
                              type="number"
                              name="d_mobile"
                              placeholder="Enter Mobile Number"
                              onChange={this.handleInputChange}
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
                              value={this.state.dob}
                              type="number"
                              name="dob"
                              placeholder="Enter Age"
                              onChange={this.handleInputChange}
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
                              value={this.state.category}
                              type="text"
                              name="category"
                              placeholder="Enter Category"
                              onChange={this.handleInputChange}
                              class={`${
                                errors.category
                                  ? "border-red-500"
                                  : "border-blue-gray-200"
                              }peer bg-white h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50`}
                            >
                              <option value="">Select Category</option>
                              <option value="Rent">Rent</option>
                              <option value="Own">Own</option>
                            </select>
                            {errors.category && (
                              <p className="ml-1 text-sm text-red-500 sans">
                                {errors.category}
                              </p>
                            )}
                            <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                          </div>
                        </div>
                        {errors.category && <div class=""></div>}

                      </form>
                    </div>
                  </div>
                </div>
                <div class="p-6">
                  <div class="block overflow-visible">
                    <div class="relative block w-full overflow-visible !overflow-x-visible !overflow-y-visible bg-transparent">
                      <form class="flex flex-col gap-4 mt-12">
                      <div>
                          <p class="block  mt-2 mb-1 font-sans text-x1 antialiased font-medium leading-normal text-blue-gray-900">
                            <label>National ID</label>
                          </p>
                          <div class="relative h-10 w-full min-w-[200px]">
                            <input
                              value={this.state.nic}
                              type="text"
                              name="nic"
                              placeholder="Enter National ID"
                              onChange={this.handleInputChange}
                              class={`${
                                errors.nic
                                  ? "border-red-500"
                                  : "border-blue-gray-200"
                              }peer bg-white h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50`}
                            />
                            {errors.nic && (
                              <p className="ml-1 text-sm text-red-500 sans">
                                {errors.nic}
                              </p>
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
                              value={this.state.vehicle_type}
                              type="text"
                              name="vehicle_type"
                              placeholder="Enter Vehhicle Type"
                              onChange={this.handleInputChange}
                              className={`${
                                errors.vehicle_type && "border-red-500"
                              }peer bg-white h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            `}
                            >
                              <option value="">Select Vehicle</option>
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
                              value={this.state.vehicle_No}
                              type="text"
                              name="vehicle_No"
                              placeholder="Enter Vehicle Number"
                              onChange={this.handleInputChange}
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
              <div class="flex justify-center  gap-4 mt-10">
                <button
                  class="m-2 relative select-none rounded-lg bg-green-500 py-3.5 px-14 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  type="submit"
                  onClick={this.onSubmit}
                >
                  &nbsp;
                  <i className="mr-2 fas fa-user-plus"></i>Add
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}
