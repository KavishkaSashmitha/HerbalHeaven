import React, { useEffect, useState } from "react";
import axios from "axios";
import { SidebarWithBurgerMenu } from "../components/navBar";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";

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
      .get(`http://localhost:8070/sup/getSupplier/${id}`)
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
      .put(`http://localhost:8070/sup/updateSupplier/${id}`, {
        name,
        email,
        age,
        jobRole,
        mobile,
        address,
      })
      .then((result) => {
        console.log(result);
        navigate("/sup");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="bg-image01 h-screen">
      <SidebarWithBurgerMenu />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "",
        }}
      >
        <Card className="w-96">
          <CardHeader
            variant="gradient"
            color="white"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="black">
              Update Supplier
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input
              label="Name"
              size="lg"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              label="Email"
              size="lg"
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label="Age"
              size="lg"
              placeholder="Enter Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            <Input
              label="Category"
              size="lg"
              placeholder="Enter Job Role"
              value={jobRole}
              onChange={(e) => setJobRole(e.target.value)}
            />
            <Input
              label="Mobile"
              size="lg"
              type="tel"
              placeholder="Enter Mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
            <Input
              label="Address"
              size="lg"
              placeholder="Enter Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </CardBody>
          <CardFooter className="pt-0">
            <button
              class="m-2 relative select-none rounded-lg bg-orange-500 py-3.5 px-14 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="submit"
              onClick={Update}
            >
              &nbsp;Update Supplier
            </button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default UpdateUser;
