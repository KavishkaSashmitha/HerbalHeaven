import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateUser() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [age, setAge] = useState();
  const [jobRole, setJobRole] = useState();
  const [mobile, setMobile] = useState();
  const [address, setAddress] = useState();
  const navigate = useNavigate();

  const Submit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8070/emp/add", {
        name,
        email,
        age,
        jobRole,
        mobile,
        address,
      })
      .then((result) => {
        console.log(result);
        navigate("/emp");
      })
      .catch((err) => console.log(err));
  };

  return (
    // <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
    <div className="w-50 bg-white rounded p-3">
      <form onSubmit={Submit}>
        <h2>Add New Suppliers</h2>

        <div className="mb-2">
          <label htmlFor="">Name</label>
          <input
            type="text"
            placeholder="Enter Name"
            className="form-control"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-2">
          <label htmlFor="">Email</label>
          <input
            type="email"
            placeholder="Enter Email"
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-2">
          <label htmlFor="">Age</label>
          <input
            type="text"
            placeholder="Enter Age"
            className="form-control"
            onChange={(e) => setAge(e.target.value)}
          />
        </div>

        <div className="mb-2">
          <label htmlFor="">Category</label>
          <input
            type="text"
            placeholder="Enter Category"
            className="form-control"
            onChange={(e) => setJobRole(e.target.value)}
          />
        </div>

        <div className="mb-2">
          <label htmlFor="">Mobile</label>
          <input
            type="mobile"
            placeholder="Enter Mobile"
            className="form-control"
            onChange={(e) => setMobile(e.target.value)}
          />
        </div>

        <div className="mb-2">
          <label htmlFor="">Address</label>
          <input
            type="text"
            placeholder="Enter Address"
            className="form-control"
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <button className="btn btn-success">Submit</button>
      </form>
    </div>
    // </div>
  );
}

export default CreateUser;
