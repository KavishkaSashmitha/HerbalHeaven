import React, { Component } from 'react';
import axios from 'axios';

export default class Edit_Driver extends Component {
  constructor(props) {
    super(props);
    this.state = {
      d_name: "",
      d_mobile: "",
      dob: "",
      gender: "",
      vehicle_No: "",
      vehicle_type: "",
      isMobileValid: true,
      isVehicleNoValid: true
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;

    // Capitalize the first letter of each word in the input value
    const capitalizedValue = value.replace(/\b\w/g, (char) => char.toUpperCase());

    this.setState({
      [name]: capitalizedValue
    });

    // If mobile number is being changed, reset validation status
    if (name === "d_mobile") {
      this.setState({
        isMobileValid: true
      });
    }

    // If vehicle number is being changed, reset validation status
    if (name === "vehicle_No") {
      this.setState({
        isVehicleNoValid: true
      });
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    const id = this.props.match.params.id;

    const { d_name, d_mobile, dob, gender, vehicle_type, vehicle_No } = this.state;

    // Validation for mobile number
    if (!this.isValidMobileNumber(d_mobile)) {
      this.setState({
        isMobileValid: false
      });
      return;
    }

    // Validation for vehicle number
    if (!this.isValidVehicleNumber(vehicle_No)) {
      this.setState({
        isVehicleNoValid: false
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

    console.log(data);

    axios.put(`/transport/update/${id}`, data).then((res) => {
      this.props.history.push("/");
      window.location.reload();

      if (res.data.success) {
        alert("Driver Update Successfully")
        this.setState({
          d_name: "",
          d_mobile: "",
          dob: "",
          gender: "",
          vehicle_type: "",
          vehicle_No: "",
          isMobileValid: true,
          isVehicleNoValid: true
        });
      }
    });
  }

  componentDidMount() {
    const id = this.props.match.params.id;

    axios.get(`/transport/${id}`).then((res) => {
      if (res.data.success) {
        this.setState({
          d_name: res.data.transport.d_name,
          d_mobile: res.data.transport.d_mobile,
          dob: res.data.transport.dob,
          gender: res.data.transport.gender,
          vehicle_type: res.data.transport.vehicle_type,
          vehicle_No: res.data.transport.vehicle_No
        });

        console.log(this.state.transport);
      }
    })
  }

  isValidMobileNumber = (mobileNumber) => {
    // Regular expression for validating Sri Lankan mobile number
    const mobileNumberRegex = /^(0|7)(\d{9})$/;
    return mobileNumberRegex.test(mobileNumber);
  }

  isValidVehicleNumber = (vehicleNo) => {
    // Regular expression for validating Sri Lankan vehicle number
    const vehicleNumberRegex = /^[A-Z]{2,3}\d{4}$/;
    return vehicleNumberRegex.test(vehicleNo);
  }

  render() {
    return (
      <div className="max-w-screen-md mx-auto mt-4">
        <h1 className="mb-6 text-3xl font-bold">Edit Driver Details</h1>
        <form className="space-y-4" onSubmit={this.onSubmit}>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-semibold">Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              name="d_name"
              placeholder="Enter Name"
              value={this.state.d_name}
              onChange={this.handleInputChange}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-semibold">Mobile Number</label>
            <input
              type="text"
              className={`border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none ${!this.state.isMobileValid ? "border-red-500" : ""}`}
              name="d_mobile"
              placeholder="Enter Mobile Number"
              value={this.state.d_mobile}
              onChange={this.handleInputChange}
            />
            {!this.state.isMobileValid && <p className="text-xs text-red-500">Please enter a valid Sri Lankan mobile number.</p>}
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-semibold">Date of Birth</label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
              name="dob"
              placeholder="Enter Date of Birth"
              value={this.state.dob}
              onChange={this.handleInputChange}
            />
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

          <div className="mb-4">
            <label className="block mb-1 text-sm font-semibold">Vehicle Type</label>
            <select
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

          <div className="mb-4">
            <label className="block mb-1 text-sm font-semibold">Vehicle Number</label>
            <input
              type="text"
              className={`border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none ${!this.state.isVehicleNoValid ? "border-red-500" : ""}`}
              name="vehicle_No"
              placeholder="Enter Vehicle Number (e.g., XX-1234 or XXX-1234)"
              value={this.state.vehicle_No}
              onChange={this.handleInputChange}
            />
            {!this.state.isVehicleNoValid && <p className="text-xs text-red-500">Please enter a valid Sri Lankan vehicle number.</p>}
          </div>

          <button
            className="px-4 py-2 font-bold text-white bg-green-600 rounded hover:bg-green-700 focus:outline-none"
            type="submit"
          >
            Update
          </button>
        </form>
      </div>
    );
  }
}
