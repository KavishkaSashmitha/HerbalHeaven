import React, { Component } from 'react';
import axios from 'axios';
import {
  Typography,
  Input,
} from "@material-tailwind/react";

export default class Add_Driver extends Component {
  constructor(props) {
    super(props);
    this.state = {
      d_name: "",
      d_mobile: "",
      dob: "",
      gender: "",
      vehicle_type: "",
      vehicle_No: "",
      isMobileValid: true,
      isVehicleNoValid: true,
      isAgeValid: true
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    const capitalizedValue = value.replace(/\b\w/g, (char) => char.toUpperCase());

    this.setState({
      [name]: capitalizedValue
    });

    if (name === "d_mobile") {
      this.setState({
        isMobileValid: true
      });
    }

    if (name === "vehicle_No") {
      this.setState({
        isVehicleNoValid: true
      });
    }

    if (name === "dob") {
      this.setState({
        isAgeValid: true
      });
    }
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { d_name, d_mobile, dob, gender, vehicle_type, vehicle_No } = this.state;

    if (!this.isValidMobileNumber(d_mobile)) {
      this.setState({
        isMobileValid: false
      });
      return;
    }

    if (!this.isValidVehicleNumber(vehicle_No)) {
      this.setState({
        isVehicleNoValid: false
      });
      return;
    }

    if (!this.isValidAge(dob)) {
      this.setState({
        isAgeValid: false
      });
      return;
    }

    const data = {
      d_name: d_name,
      d_mobile: d_mobile,
      dob: dob,
      gender: gender,
      vehicle_type: vehicle_type,
      vehicle_No: vehicle_No
    };

    axios.post('http://localhost:8070/api/transport/save', data).then((res) => {
      if (res.data.success) {
        this.setState({
          d_name: "",
          d_mobile: "",
          dob: "",
          gender: "",
          vehicle_type: "",
          vehicle_No: "",
          isMobileValid: true,
          isVehicleNoValid: true,
          isAgeValid: true
        });
        this.props.history.push("/");
        window.location.reload();
      }
    });
  }

  isValidMobileNumber = (mobileNumber) => {
    const mobileNumberRegex = /^(0|7)(\d{9})$/;
    return mobileNumberRegex.test(mobileNumber);
  }

  isValidVehicleNumber = (vehicleNo) => {
    const vehicleNumberRegex = /^[A-Z]{2,3}\d{4}$/;
    return vehicleNumberRegex.test(vehicleNo);
  }

  isValidAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1 >= 20 && age - 1 <= 60;
    } else {
      return age >= 20 && age <= 60;
    }
  }

  render() {
    const { isMobileValid, isVehicleNoValid, isAgeValid } = this.state;

    return (
      <div className="max-w-screen-md mx-auto mt-4" style={{alignContent:'center'}}>
        <h3 className="mb-3 text-3xl font-bold">Add New Drivers</h3>
        <form className="space-y-4" onSubmit={this.onSubmit}>
          <div className="space-y-4">
            <Typography variant="h6" color="blue-gray" className="-mb-3">Name</Typography>
            <Input
              size="lg"
              placeholder="Enter Name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              name="d_name"
              value={this.state.d_name}
              onChange={this.handleInputChange}
            />
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-semibold" htmlFor="d_mobile">Mobile No.</label>
            <input
              type="text"
              id="d_mobile"
              className={`border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none ${!isMobileValid ? "border-red-500" : ""}`}
              name="d_mobile"
              placeholder="Enter Mobile Number"
              value={this.state.d_mobile}
              onChange={this.handleInputChange}
            />
            {!isMobileValid && <p className="text-xs text-red-500">Please Enter a Valid Mobile Number.</p>}
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-semibold" htmlFor="dob">Date of Birth</label>
            <input
              type="date"
              id="dob"
              className={`border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none ${!isAgeValid ? "border-red-500" : ""}`} style={{width:'50%'}}
              name="dob"
              placeholder="Enter Date of Birth"
              value={this.state.dob}
              onChange={this.handleInputChange}
            />
            {!isAgeValid && <p className="text-xs text-red-500">Driver's age must be between 20 and 60 years.</p>}
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-semibold">Gender</label>
            <div>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={this.state.gender === "Male"}
                  onChange={this.handleInputChange}
                  className="w-5 h-5 text-blue-600 form-radio"
                />
                <span className="ml-2">Male</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={this.state.gender === "Female"}
                  onChange={this.handleInputChange}
                  className="w-5 h-5 text-blue-600 form-radio"
                />
                <span className="ml-2">Female</span>
              </label>
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-semibold" htmlFor="vehicle_type">Vehicle Type</label>
            <select
              id="vehicle_type"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
              name="vehicle_type"
              value={this.state.vehicle_type}
              onChange={this.handleInputChange}
            >
              <option value="">Select Vehicle Type</option>
              <option value="Car">Car</option>
              <option value="Van">Van</option>
              <option value="MotorBike">Motor Bike</option>
              <option value="T-wheel">T-Wheel</option>
            </select>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-semibold" htmlFor="vehicle_No">Vehicle Number</label>
            <input
              type="text"
              id="vehicle_No"
              className={`border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none ${!isVehicleNoValid ? "border-red-500" : ""}`}
              name="vehicle_No"
              placeholder="Enter Vehicle Number (e.g., XX-1234 or XXX-1234)"
              value={this.state.vehicle_No}
              onChange={this.handleInputChange}
            />
            {!isVehicleNoValid && <p className="text-xs text-red-500">Please enter a Valid Sri Lankan Vehicle Number.</p>}
          </div>

          <button
            className="px-4 py-2 font-bold text-white bg-green-600 rounded hover:bg-green-700 focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Save
          </button>
        </form>
      </div>
    );
  }
}
