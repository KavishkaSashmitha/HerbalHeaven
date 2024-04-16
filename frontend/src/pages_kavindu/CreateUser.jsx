import React, { useState } from "react";
import axios from "axios";
import { Select } from "@material-tailwind/react";
import { Footer } from "../components/Footer";
import AdminNavbar from "../components/AdminNavbar";
import { DefaultSidebar } from "../components/Manager-Sidebar";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  Breadcrumbs,
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
  const [open, setOpen] = React.useState(0);
  const toggleSidebar = () => {
    setOpen(!open);
  };

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
    } else if (!/^\d+$/.test(age) || age < 18 || age > 60) {
      errors.age = "Age must be between 18 and 60";
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
    <>
      <div className="bg-image01">
        <div
          className={`sidebar w-68 bg-custom-color text-white ${
            open ? "block" : "hidden"
          }`}
        >
          <DefaultSidebar open={open} handleOpen={setOpen} />
        </div>
        <AdminNavbar toggleSidebar={toggleSidebar} />
        <div className="flex justify-center">
          <div className="w-full md:w-3/4 lg:w-1/2 p-4 bg-white rounded-lg shadow-md mt-4 mb-4">
            <Breadcrumbs className="mb-4">{/* Breadcrumb Links */}</Breadcrumbs>
            <Card className="">
              <CardHeader
                variant="gradient"
                color="white"
                className="mb-4 grid place-items-center"
              >
                <Typography variant="h3" color="black">
                  Add New Supplier
                </Typography>
              </CardHeader>
              <CardBody className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Form Inputs - Left Part */}
                <div>
                  <div className="mt-4 mb-4">
                    <Input
                      label="Name"
                      size="lg"
                      value={name}
                      onChange={(e) => {
                        const value = e.target.value.replace(
                          /[^a-zA-Z\s]/g,
                          ""
                        );
                        setName(value);
                      }}
                      error={errors.name}
                    />
                  </div>
                  <div className="mt-4 mb-4">
                    <Input
                      label="Email"
                      size="lg"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      error={errors.email}
                    />
                  </div>
                  <div className="mt-4 mb-4">
                    <Input
                      label="Age"
                      size="lg"
                      type="number"
                      min={18}
                      max={60}
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      error={errors.age}
                    />
                  </div>
                </div>
                {/* Form Inputs - Right Part */}
                <div className="">
                  <div className="mt-4 mb-4">
                    <Select
                      size="lg"
                      label="Select Raw Material"
                      value={rawMaterial}
                      onChange={(value) => setRawMaterial(value)}
                      error={errors.rawMaterial ? true : false}
                    >
                      <Select.Option value="Sadalwood">
                        Sandalwood
                      </Select.Option>
                      <Select.Option value="ValerianRoot">
                        Valerian Root
                      </Select.Option>
                      <Select.Option value="Ginkgo Biloba">
                        Ginkgo Biloba
                      </Select.Option>
                      <Select.Option value="Echinacea">Echinacea</Select.Option>
                      <Select.Option value="Tumeric">Turmeric</Select.Option>
                    </Select>
                  </div>
                  {errors.rawMaterial && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.rawMaterial}
                    </p>
                  )}
                  <div className="mt-4 mb-4">
                    <Select
                      size="lg"
                      label="Select Country"
                      value={country}
                      onChange={(value) => setCountry(value)}
                      error={errors.country ? true : false}
                    >
                      <Select.Option value="Sri Lanka">Sri Lanka</Select.Option>
                      <Select.Option value="India">India</Select.Option>
                      {/* <Select.Option value="Pakistan">Pakistan</Select.Option>
                      <Select.Option value="China">China</Select.Option>
                      <Select.Option value="Japan">Japan</Select.Option> */}
                    </Select>
                    {errors.country && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.country}
                      </p>
                    )}
                  </div>
                  <div className="mt-4 mb-4">
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
                  </div>
                </div>
                <div className="w-full flex justify-center">
                  <Input
                    label="Address"
                    size="lg"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    error={errors.address}
                  />
                </div>
              </CardBody>
              <CardFooter className="pt-0">
                <button
                  className="w-full py-3.5 px-14 rounded-lg bg-orange-500 text-center font-sans text-sm font-bold uppercase text-white shadow-md hover:shadow-lg focus:opacity-85 active:opacity-85 disabled:opacity-50 disabled:pointer-events-none"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Add New Supplier
                </button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default CreateUser;
