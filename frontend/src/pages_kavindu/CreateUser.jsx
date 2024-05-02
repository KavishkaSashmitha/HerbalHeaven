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
} from "@material-tailwind/react";

function CreateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rawMaterial1, setRawMaterial1] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);
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

    if (!rawMaterial1) {
      errors.rawMaterial = "Raw Material is required";
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
            rawMaterial1,
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
            className={`sidebar w-68 bg-custom-color text-white ${open ? "block" : "hidden"}`}
          >
            <DefaultSidebar open={open} handleOpen={setOpen} />
          </div>

          <div className="flex flex-col flex-1 overflow-hidden">
            <AdminNavbar toggleSidebar={toggleSidebar} />
            <div className="">
              <Breadcrumbs className="mb-4">
                {/* Breadcrumb Links */}
              </Breadcrumbs>
              <form onSubmit={handleSubmit}>
                <Card className="flex flex-col flex-1 ml-20 mr-20">
                  <div className="text-center mt-4">
                    <Typography variant="h3" color="black">
                      Add New Supplier
                    </Typography>
                  </div>

                  <CardBody className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    </div>
                    <div className="">
                      <div className="mt-4 mb-4">
                        <Select
                          size="lg"
                          label="Select Raw Material_01"
                          value={rawMaterial1}
                          onChange={(value) => setRawMaterial1(value)}
                          error={errors.rawMaterial1 ? true : false}
                        >
                          <Select.Option value="Cinnomon">
                            Cinnomon
                          </Select.Option>
                          <Select.Option value="Ginger">Ginger</Select.Option>
                          <Select.Option value="Alovera">Alovera</Select.Option>
                          <Select.Option value="Weniwalgata">
                            Weniwalgata
                          </Select.Option>
                          <Select.Option value="Tumeric">
                            Turmeric
                          </Select.Option>
                          <Select.Option value="Ginson">Ginson</Select.Option>
                          <Select.Option value="SandalWood">
                            SandalWood
                          </Select.Option>
                          <Select.Option value="Rath Hadun">
                            Rath Hadun
                          </Select.Option>
                        </Select>
                      </div>
                      {errors.rawMaterial1 && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.rawMaterial}
                        </p>
                      )}
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
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CreateUser;
