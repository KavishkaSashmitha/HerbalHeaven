import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function UpdateUser() {
  const { id } = useParams();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [age, setAge] = useState();
  const [jobRole, setJobRole] = useState();
  const [mobile, setMobile] = useState();
  const [address, setAddress] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8070/emp/getEmployee/" + id)
      .then((result) => {
        console.log(result);
        setName(result.data.name);
        setEmail(result.data.email);
        setAge(result.data.age);
        setJobRole(result.data.jobRole);
        setMobile(result.data.mobile);
        setAddress(result.data.address);
      })
      .catch((err) => console.log(err));
  }, []);

  const Update = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:8070/emp/updateEmployee/" + id, {
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
    <div>
      {/* <div className="d-flex vh-100 bg-primary justify-content-center align-items-center"> */}
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={Update}>
          <h2>Update Supplier</h2>

          <div className="mb-2">
            <label htmlFor="">Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="">Age</label>
            <input
              type="text"
              placeholder="Enter Age"
              className="form-control"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="">Category</label>
            <input
              type="text"
              placeholder="Enter Job Role"
              className="form-control"
              value={jobRole}
              onChange={(e) => setJobRole(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="">Mobile</label>
            <input
              type="mobile"
              placeholder="Enter Mobile"
              className="form-control"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="">Address</label>
            <input
              type="text"
              placeholder="Enter Address"
              className="form-control"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <button className="btn btn-success">Update</button>
        </form>
      </div>
    </div>
    // </div>
  );
}

export default UpdateUser;
