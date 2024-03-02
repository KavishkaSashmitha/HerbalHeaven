import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Input, Button, Typography } from "@material-tailwind/react";

function UpdateUser() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8070/emp/getEmployee/${id}`)
      .then((result) => {
        const userData = result.data;
        setName(userData.name);
        setEmail(userData.email);
        setAge(userData.age);
        setJobRole(userData.jobRole);
        setMobile(userData.mobile);
        setAddress(userData.address);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const Update = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8070/emp/updateEmployee/${id}`, {
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
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Update Supplier
      </Typography>
      <div className="w-80 max-w-screen-lg sm:w-96">
        <form onSubmit={Update}>
          <div className="mb-4">
            <Typography variant="h6" color="blue-gray">
              Name
            </Typography>
            <Input
              size="lg"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <Typography variant="h6" color="blue-gray">
              Email
            </Typography>
            <Input
              size="lg"
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <Typography variant="h6" color="blue-gray">
              Age
            </Typography>
            <Input
              size="lg"
              placeholder="Enter Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <Typography variant="h6" color="blue-gray">
              Category
            </Typography>
            <Input
              size="lg"
              placeholder="Enter Job Role"
              value={jobRole}
              onChange={(e) => setJobRole(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <Typography variant="h6" color="blue-gray">
              Mobile
            </Typography>
            <Input
              size="lg"
              type="tel"
              placeholder="Enter Mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <Typography variant="h6" color="blue-gray">
              Address
            </Typography>
            <Input
              size="lg"
              placeholder="Enter Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <Button type="submit" color="success" ripple="light" block>
            Update
          </Button>
        </form>
      </div>
    </Card> //comment
  );
}

export default UpdateUser;
