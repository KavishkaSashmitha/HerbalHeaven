import React, { Component } from 'react';
import axios from 'axios';

export default class CreateOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Ord_name: "",
      c_name: "",
      c_mobile: "",
      c_mail:"",
      Ord_Quantity:"",
      Shipping_Address:"",
      isMobileValid: true, // State to manage mobile number validation
      isEmailValid: true, // State to manage email validation
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      ...this.state,
      [name]: value,
      isMobileValid: name === "c_mobile" ? true : this.state.isMobileValid, // Reset validation status for mobile number input
      isEmailValid: name === "c_mail" ? true : this.state.isEmailValid, // Reset validation status for email input
    });
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { Ord_name, c_name, c_mobile, c_mail, Ord_Quantity, Shipping_Address } = this.state;

    // Validation for mobile number
    if (!this.isValidMobileNumber(c_mobile)) {
      this.setState({
        isMobileValid: false
      });
      return;
    }

    // Validation for email address
    if (!this.isValidEmail(c_mail)) {
      this.setState({
        isEmailValid: false
      });
      return;
    }

    const data = {
      Ord_name: Ord_name,
      c_name: c_name,
      c_mobile: c_mobile,
      c_mail: c_mail,
      Ord_Quantity: Ord_Quantity,
      Shipping_Address: Shipping_Address,
    };

    console.log(data);

    axios.post("http://localhost:8000/order/save", data).then((res) => {
      if (res.data.success) {
        this.setState({
          Ord_name: "",
          c_name: "",
          c_mobile: "",
          c_mail: "",
          Ord_Quantity: "",
          Shipping_Address: "",
          isMobileValid: true, // Reset validation status after successful submission
          isEmailValid: true, // Reset validation status after successful submission
        });
        this.props.history.push("/"); // Navigate to home page after successful submission
        window.location.reload(); // Reload the page
      }
    });
  }

  isValidMobileNumber = (mobileNumber) => {
    // Regular expression for validating mobile number
    const mobileNumberRegex = /^(0|7)(\d{9})$/;
    return mobileNumberRegex.test(mobileNumber);
  }

  isValidEmail = (email) => {
    // Regular expression for validating email address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  render() {
    const { isMobileValid, isEmailValid } = this.state; // Destructure isMobileValid and isEmailValid from state
    return (
      <div>
        <div className="col-md-8 mt-4 mx-auto">
          <h1 className="h3 mb-3 font-weight-normal">Add New Orders</h1>
          <form className="needs-validation" noValidate>
            <div className="form-group" style={{ marginBottom: '15px' }}>
              <label style={{ marginBottom: '5px' }}>Item</label>
              <input
                type="text"
                className="form-control"
                name="Ord_name"
                placeholder="Enter Item Name"
                value={this.state.Ord_name}
                onChange={this.handleInputChange}
              />
            </div>

            <div className="form-group" style={{ marginBottom: '15px' }}>
              <label style={{ marginBottom: '5px' }}>Customer Name</label>
              <input
                type="text"
                className="form-control"
                name="c_name"
                placeholder="Enter Customer Name"
                value={this.state.c_name}
                onChange={this.handleInputChange}
              />
            </div>

            <div className="form-group" style={{ marginBottom: '15px' }}>
              <label style={{ marginBottom: '5px' }}>Mobile Number</label>
              <input
                type="text"
                className={`form-control ${!isMobileValid ? "is-invalid" : ""}`} // Add "is-invalid" class if validation fails
                name="c_mobile"
                placeholder="Enter Mobile Number"
                value={this.state.c_mobile}
                onChange={this.handleInputChange}
                required/>

              {/* Display error message if mobile number is invalid */}
              {!isMobileValid && <div className="invalid-feedback">Please enter a valid Sri Lankan mobile number.</div>}
            </div>

            <div className="form-group" style={{ marginBottom: '15px' }}>
              <label style={{ marginBottom: '5px' }}>Customer E-mail</label>
              <input
                type="text"
                className={`form-control ${!isEmailValid ? "is-invalid" : ""}`} // Add "is-invalid" class if validation fails
                name="c_mail"
                placeholder="Enter Customer E-mail"
                value={this.state.c_mail}
                onChange={this.handleInputChange}
              />

              {/* Display error message if email is invalid */}
              {!isEmailValid && <div className="invalid-feedback">Please enter a valid email address.</div>}
            </div>

            <div className="form-group" style={{ marginBottom: '15px' }}>
              <label style={{ marginBottom: '5px' }}>Quantity</label>
              <input
                type="number"
                className="form-control"
                name="Ord_Quantity"
                placeholder="Enter Quantity"
                value={this.state.Ord_Quantity}
                onChange={this.handleInputChange}
                min={1}
              />
            </div>

            <div className="form-group" style={{ marginBottom: '15px' }}>
              <label style={{ marginBottom: '5px' }}>Shipping Address</label>
              <input
                type="text"
                className="form-control"
                name="Shipping_Address"
                placeholder="Enter Shipping Address"
                value={this.state.Shipping_Address}
                onChange={this.handleInputChange}
              />
            </div>

            <button className="btn btn-success" type="submit" style={{ marginTop: '15px' }} onClick={this.onSubmit}>
              <i className="far fa-check-square"></i>
              &nbsp; Save
            </button>
          </form>
        </div>
      </div>
    );
  }
}
