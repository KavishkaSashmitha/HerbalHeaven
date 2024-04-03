import React, { useState } from "react";
import axios from "axios";
import { SidebarWithBurgerMenu } from "../components/navBar";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";

function CreateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [rawMaterial, setRawMaterial] = useState("");
  const [country, setCountry] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!name) {
      errors.name = "Name is required";
      isValid = false;
    }

    if (!email) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
      isValid = false;
    }

    if (!age) {
      errors.age = "Age is required";
      isValid = false;
    } else if (!/^\d+$/.test(age) || age < 0 || age > 100) {
      errors.age = "Age must be a positive number less than 100";
      isValid = false;
    }

    if (!rawMaterial) {
      errors.rawMaterial = "Raw Material is required";
      isValid = false;
    }

    if (!country) {
      errors.country = "Country is required";
      isValid = false;
    }

    if (!mobile) {
      errors.mobile = "Mobile is required";
      isValid = false;
    } else if (!/^\d{10}$/.test(mobile)) {
      errors.mobile = "Mobile must be 10 digits";
      isValid = false;
    }

    if (!/^\d+$/.test(mobile)) {
      errors.mobile = "Mobile must contain only numbers";
      isValid = false;
    }

    if (!address) {
      errors.address = "Address is required";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const confirmed = window.confirm(
        "Are you sure you want to add a new supplier?"
      );
      if (confirmed) {
        axios
          .post("http://localhost:8070/sup/addsup", {
            name,
            email,
            age,
            rawMaterial,
            country,
            mobile,
            address,
          })
          .then((result) => {
            console.log(result);
            navigate("/sup");
          })
          .catch((err) => console.log(err));
      }
    }
  };

  return (
    <div className="bg-image01">
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
              Add New Suppliers
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input
              label="Name"
              size="lg"
              value={name}
              onChange={(e) => {
                const value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
                setName(value);
              }}
              error={errors.name}
            />
            <Input
              label="Email"
              size="lg"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
            />
            <Input
              label="Age"
              size="lg"
              type="number"
              value={age}
              onChange={(e) => {
                let value = e.target.value.replace(/\D/, ""); // Remove non-numeric characters
                value = value === "" ? "" : Math.min(Math.max(value, 1), 100);
                setAge(value);
              }}
              error={errors.age}
            />
            <Input
              label="Raw Material"
              size="lg"
              value={rawMaterial}
              onChange={(e) => {
                const value = e.target.value.replace(/[^A-Za-z]/gi, "");
                setRawMaterial(value);
              }}
              error={errors.rawMaterial}
            />
            <Input
              label="Country"
              size="lg"
              value={country}
              onChange={(e) => {
                const value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
                setCountry(value);
              }}
              error={errors.country}
            />

            <Input
              label="Mobile"
              size="lg"
              value={mobile}
              onChange={(e) => {
                if (/^\d{0,10}$/.test(e.target.value)) {
                  setMobile(e.target.value);
                }
              }}
              error={errors.mobile}
            />
            <Input
              label="Address"
              size="lg"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              error={errors.address}
            />
          </CardBody>
          <CardFooter className="pt-0">
            <button
              className="m-2 relative select-none rounded-lg bg-orange-500 py-3.5 px-14 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="submit"
              onClick={handleSubmit}
            >
              &nbsp;Add New Supplier
            </button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default CreateUser;
