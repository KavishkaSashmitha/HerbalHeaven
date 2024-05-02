import React, { useEffect, useState } from "react";
import axios from "axios";
import { Breadcrumbs, Select } from "@material-tailwind/react";
import { Footer } from "../components/Footer";
import AdminNavbar from "../components/AdminNavbar";
import { DefaultSidebar } from "../components/Manager-Sidebar";

import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
} from "@material-tailwind/react";

function UpdateUser() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  // const [age, setAge] = useState("");
  const [rawMaterial, setRawMaterial] = useState("");
  // const [country, setCountry] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(0);
  const toggleSidebar = () => {
    setOpen(!open);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8070/sup/getSupplier/${id}`)
      .then((result) => {
        const userData = result.data;
        setName(userData.name);
        setEmail(userData.email);
        // setAge(userData.age);
        setRawMaterial(userData.rawMaterial);
        // setCountry(userData.country);
        setMobile(userData.mobile);
        setAddress(userData.address);
      })
      .catch((err) => console.log(err));
  }, [id]);

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

    // if (!age) {
    //   errors.age = "Age is required";
    //   isValid = false;
    // } else if (!/^\d+$/.test(age) || age < 0 || age > 100) {
    //   errors.age = "Age must be a positive number less than 100";
    //   isValid = false;
    // }

    if (!rawMaterial) {
      errors.rawMaterial = "Raw Material is required";
      isValid = false;
    }

    // if (!country) {
    //   errors.country = "Country is required";
    //   isValid = false;
    // }

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

  const handleUpdate = () => {
    if (validateForm()) {
      const confirmed = window.confirm("Are you sure you want to update?");
      if (confirmed) {
        axios
          .put(`http://localhost:8070/sup/updateSupplier/${id}`, {
            name,
            email,
            // age,
            rawMaterial,
            // country,
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
      <div
        className="flex flex-col h-screen overflow-hidden overflow-x-hidden"
        style={{ backgroundColor: "#02353c" }}
      >
        <div className="flex flex-1 overflow-hidden">
          <div
            className={`sidebar w-68 bg-custom-color text-white ${
              open ? "block" : "hidden"
            }`}
          >
            <DefaultSidebar open={open} handleOpen={setOpen} />
          </div>

          <div className="flex flex-col flex-1 overflow-hidden">
            <AdminNavbar toggleSidebar={toggleSidebar} />
            <div className="">
              <Breadcrumbs className="mb-4">
                {/* Breadcrumb Links */}
              </Breadcrumbs>
              <Card className="flex flex-col flex-1 ml-20 mr-20">
                <div className="text-center mt-4">
                  <Typography variant="h3" color="black">
                    Update Supplier
                  </Typography>
                </div>

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
                    {/* <div className="mt-4 mb-4">
                      <Input
                        label="Age"
                        size="lg"
                        type="number"
                        value={age}
                        onChange={(e) => {
                          let value = e.target.value.replace(/\D/, ""); // Remove non-numeric characters
                          value =
                            value === ""
                              ? ""
                              : Math.min(Math.max(value, 1), 60);
                          setAge(value);
                        }}
                        error={errors.age}
                      />
                    </div> */}
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
                         <Select.Option value="Cinnomon">Cinnomon</Select.Option>
                          <Select.Option value="Ginger">Ginger</Select.Option>
                          <Select.Option value="Alovera">Alovera</Select.Option>
                          <Select.Option value="Weniwalgata">Weniwalgata</Select.Option>
                          <Select.Option value="Tumeric">Turmeric</Select.Option>
                          <Select.Option value="Ginson">Ginson</Select.Option>
                          <Select.Option value="SandalWood">SandalWood</Select.Option>
                          <Select.Option value="Rath Hadun">Rath Hadun</Select.Option>

                      </Select>
                    </div>
                    {errors.rawMaterial && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.rawMaterial}
                      </p>
                    )}
                    {/* <div className="mt-4 mb-4">
                      <Select
                        size="lg"
                        label="Select Country"
                        value={country}
                        onChange={(value) => setCountry(value)}
                        error={errors.country ? true : false}
                      >
                        <Select.Option value="Sri Lanka">
                          Sri Lanka
                        </Select.Option>
                        <Select.Option value="India">India</Select.Option>
                        {/* <Select.Option value="Pakistan">Pakistan</Select.Option>
                      <Select.Option value="China">China</Select.Option>
                      <Select.Option value="Japan">Japan</Select.Option> */}
                    {/* </Select>
                      {errors.country && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.country}
                        </p>
                      )}
                    </div>  */}
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
                  <div className="flex justify-center">
                    <button
                      className="w-1/2 py-3.5 px-14 rounded-lg bg-orange-500 text-center font-sans text-sm font-bold uppercase text-white shadow-md hover:shadow-lg focus:opacity-85 active:opacity-85 disabled:opacity-50 disabled:pointer-events-none"
                      type="submit"
                      onClick={handleUpdate}
                    >
                      Update Supplier
                    </button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default UpdateUser;
