import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useParams } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Breadcrumbs } from "@material-tailwind/react";
import {
  Avatar,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";
import { Upload } from "react-feather";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import AdminNavbar from "../components/AdminNavbar";
import { DefaultSidebar } from "../components/Manager-Sidebar";
import createLoadingScreen from "./LoadingScreen";
import firebase from "../middleware/firebaseConfig";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function EditPost() {
  const { id } = useParams();
  const [formData, setFormData] = useState();

  const [open, setOpen] = React.useState(0);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadImage, setUploadImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const toggleSidebar = () => {
    setOpen(!open);
  };
  // State variables for validation errors
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8070/api/posts/posts/${id}`
        );
        if (response.data.success) {
          setFormData(response.data.post);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 800);
      }
    };

    fetchData();
  }, [id]);

  const [confirmation, setConfirmation] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear the validation error when user starts typing
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  function handleKeyPress(event) {
    // Get the character that the user is trying to type
    const char = event.key;

    // Regular expression to allow only letters (A-Z, a-z) and spaces
    const regex = /^[A-Za-z ]$/;

    // If the character does not match the regex, prevent the default behavior
    if (!regex.test(char)) {
      event.preventDefault(); // Prevents the non-letter or non-space character from being typed
    }
  }

  function handleKeyPressEmail(event) {
    // Get the character that the user is trying to type
    const char = event.key;
    const input = event.target;

    const endsWithDotCom = input.value.endsWith(".com");
    const endsWithDotLk = input.value.endsWith(".lk");

    if ((endsWithDotCom && char !== "Backspace")||(endsWithDotLk && char !== "Backspace")) {
      event.preventDefault(); // Prevents further characters after ".com"
      return;
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();

    // Validate form fields
    const validationErrors = {};
    if (!formData.name) {
      validationErrors.name = "Name is required";
    } else if (formData.name !== formData.name.toLowerCase()) {
      validationErrors.name = "Please enter the name in lowercase letters";
    }

    if (!formData.jobrole) {
      validationErrors.jobrole = "Jobrole is required";
    }

    if (!formData.gender) {
      validationErrors.gender = "Gender is required";
    }

    if (!formData.mobile) {
      validationErrors.mobile = "Mobile is required";
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      validationErrors.mobile = "Mobile must contain exactly 10 digits";
    }

    if (!formData.nic) {
      validationErrors.nic = "NIC is required";
    } else {
      const nicDigits = formData.nic.replace(/\D/g, ""); // Remove non-digit characters
      if (nicDigits.length !== 9 && nicDigits.length !== 12) {
        validationErrors.nic = "NIC must contain exactly 9 or 12 digits";
      }
    }

    if (!formData.email) {
      validationErrors.email = "Email is required";
    } else if (!formData.email.includes("@")) {
      validationErrors.email = "Email must contain @ symbol";
    } else if (formData.email.toLowerCase() !== formData.email) {
      validationErrors.email = "Please enter the email in lowercase letters";
    }

    if (!formData.address) {
      validationErrors.address = "Address is required";
    } else if (formData.address.toLowerCase() !== formData.address) {
      validationErrors.address =
        "Please enter the address in lowercase letters";
    }

    if (!formData.age) {
      validationErrors.age = "Age is required";
    } else {
      const age = parseInt(formData.age);
      if (isNaN(age) || age < 18 || age > 60) {
        validationErrors.age = "Age must be between 18 and 60";
      }
    }

    // If there are validation errors, update the state and return
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      setUploading(false);
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: "This will update the Employee information.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, update it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        setUploading(true);
        const interval = setInterval(() => {
          setProgress((prevProgress) =>
            prevProgress >= 100 ? 0 : prevProgress + 25
          );
        }, 500);

        if (uploadImage) {
          const storage = getStorage(firebase);
          const storageRef = ref(
            storage,
            `employees/${formData?.name ?? "profile_picture"}`
          );
          uploadBytes(storageRef, uploadImage)
            .then(() => {
              return getDownloadURL(storageRef);
            })
            .then((url) => {
              return axios.put(
                `http://localhost:8070/api/posts/post/update/${id}`,
                {
                  ...formData,
                  image: url,
                }
              );
            })
            .then((res) => {
              if (res.data.success) {
                setFormData({
                  name: "",
                  jobrole: "",
                  gender: "",
                  mobile: "",
                  nic: "",
                  email: "",
                  address: "",
                  age: "",
                  image: "",
                });

                setConfirmation(true);
                // Redirect after confirmation is set
                window.location.replace("/emp");
              }
            })
            .catch((error) => {
              console.error("Error updating post:", error);
            })
            .finally(() => {
              // Set loading to false after asynchronous operations are completed
              setUploading(false);
              clearInterval(interval);
            });
        } else {
          axios
            .put(`http://localhost:8070/api/posts/post/update/${id}`, formData)
            .then((res) => {
              if (res.data.success) {
                setFormData({
                  name: "",
                  jobrole: "",
                  gender: "",
                  mobile: "",
                  nic: "",
                  email: "",
                  address: "",
                  age: "",
                  image: "",
                });

                setConfirmation(true);
                // Redirect after confirmation is set
                window.location.replace("/emp");
              }
            })
            .catch((error) => {
              console.error("Error updating post:", error);
            })
            .finally(() => {
              // Set loading to false after asynchronous operations are completed
              setUploading(false);
              clearInterval(interval);
            });
        }
      }
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // Check if file exists
    if (file) {
      setUploadImage(file);

      const imageURL = URL.createObjectURL(file);
      setImagePreview(imageURL);
    } else {
      // Handle case where no file is selected
      setUploadImage(null);
      setImagePreview(null);
    }
  };

  if (loading) {
    return <div>{createLoadingScreen(loading)}</div>;
  }

  if (uploading) {
    return (
      <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-custom-color">
        <div className="w-32 h-32">
          <div className=" pl-3 w-16 h-16">
            <Upload className=" w-full h-full text-blue-500 animate-spin" />
          </div>
          <div className="text-center mt-2">
            <p className="text-amber-800 font-bold text-xl">
              Uploading... {progress}%
            </p>
            <div className="bg-blue-500 h-2 rounded-lg overflow-hidden mt-1">
              <div
                className="h-full bg-amber-800 transition-all duration-1000"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className="flex h-screen overflow-scroll "
        style={{ backgroundColor: "#02353c" }}
      >
        <div
          className={`sidebar w-68 bg-custom-color text-white ${
            open ? "block" : "hidden"
          }`}
        >
          <DefaultSidebar open={open} handleOpen={setOpen} />
        </div>
        <div className="w-full h-full ">
          <AdminNavbar toggleSidebar={toggleSidebar} />
          <Card className="bg-blue-gray-100">
            <CardHeader
              floated={false}
              shadow={false}
              className="rounded-none bg-blue-gray-100"
            >
              <div className="m-4">
                <Breadcrumbs>
                  <Link to="/">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                  </Link>
                  <Link to="/Employee_Dashboard">
                    <li class="flex items-center font-sans text-sm antialiased font-normal leading-normal transition-colors duration-300 cursor-pointer text-blue-gray-900 hover:text-amber-800">
                      <span>Dashboard</span>

                      <span class=" font-sans text-sm antialiased font-normal leading-normal pointer-events-none select-none text-blue-gray-500"></span>
                    </li>
                  </Link>
                  <Link to="/emp">
                    <li class="flex items-center font-sans text-sm antialiased font-normal leading-normal transition-colors duration-300 cursor-pointer text-blue-gray-900 hover:text-amber-800">
                      <span>Employee</span>

                      <span class=" font-sans text-sm antialiased font-normal leading-normal pointer-events-none select-none text-blue-gray-500"></span>
                    </li>
                  </Link>
                  <Link to="">
                    <li class="flex items-center font-sans text-sm antialiased font-normal leading-normal transition-colors duration-300 cursor-pointer text-blue-gray-900 hover:text-amber-800">
                      <span>Edit Employee</span>

                      <span class=" font-sans text-sm antialiased font-normal leading-normal pointer-events-none select-none text-blue-gray-500"></span>
                    </li>
                  </Link>
                </Breadcrumbs>
              </div>
            </CardHeader>
            <CardBody className="flex items-center justify-center">
              <div className="flex flex-row">
                <div className="grid gap-5 w-auto md:grid-cols-2">
                  <Card>
                    <CardHeader></CardHeader>
                    <CardBody>
                      <p className="pt-10 text-xl flex flex-center justify-center mt-2 mb-1 font-sans text-x1 antialiased font-medium leading-normal text-blue-gray-900">
                        Employee Image
                      </p>
                      <div className="flex justify-center pt-5">
                        <Avatar
                          src={imagePreview || formData.image}
                          size="custom"
                          style={{
                            width: "200px",
                            height: "200px",
                          }} // Adjust the width and height as desired
                          className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain"
                        />
                        {/* <img src={state.image} /> */}
                      </div>
                      <div>
                        <div className="pt-12 flex justify-center relative h-10 w-full min-w-[200px]">
                          <div className="flex items-center space-x-2">
                            <input
                              type="file"
                              name="image"
                              accept="image/*"
                              id="imageUpload"
                              onChange={handleImageChange}
                              className="hidden"
                            />
                            <button
                              type="button"
                              className=" bg-custom-color hover:bg-amber-900 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-amber-400 transition duration-300 ease-in-out transform hover:scale-105 active:scale-95 shadow-lg flex items-center space-x-2"
                              onClick={() =>
                                document.getElementById("imageUpload").click()
                              }
                            >
                              {/* SVG icon with a plus mark */}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 4v16m8-8H4"
                                />
                              </svg>
                              <span className="">Change Image</span>
                            </button>
                          </div>

                          {errors.image && (
                            <p className="text-red-500 ml-1 text-sm">
                              {errors.image}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="w-auto pt-3 text-center text-3xl font-bold font-sans">
                        {/* {capitalizeSecondPart(state.name)} */}
                      </div>
                      <div className="pt-1 text-center text-lg font-sans">
                        {/* {capitalizeSecondPart(state.jobrole)} */}
                      </div>
                    </CardBody>
                  </Card>
                  <Card className="pr-8">
                    <CardHeader></CardHeader>
                    <CardBody>
                      <div class="flex items-center justify-center pb-2 pt-8">
                        <div class="w-auto">
                          <div class="grid grid-cols-2 gap-3">
                            <div class="px-6">
                              <div class="grid overflow-visible gap-4 ">
                                <div>
                                  <p class="block mt-2 mb-1 font-sans text-x1 antialiased font-medium leading-normal text-blue-gray-900">
                                    <label>Employee Name</label>
                                  </p>
                                  <div class="relative h-10 w-full min-w-[200px]">
                                    <input
                                      value={formData.name}
                                      type="text"
                                      name="name"
                                      placeholder="Enter Employee Name"
                                      onChange={handleInputChange}
                                      onKeyPress={handleKeyPress}
                                      className={`${
                                        errors.name && "border-red-500"
                                      }peer bg-white h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                              `}
                                    />
                                    {errors.name && (
                                      <span className="text-red-500 ml-1 text-sm sans">
                                        {errors.name}
                                      </span>
                                    )}

                                    <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                                  </div>
                                </div>
                                {errors.name && <div class=""></div>}
                                <div>
                                  <p class="block mt-2 mb-1 font-sans text-x1 antialiased font-medium leading-normal text-blue-gray-900">
                                    <label>Jobrole</label>
                                  </p>
                                  <div class="relative h-10 w-full min-w-[200px]">
                                    <select
                                      value={formData.jobrole}
                                      type="text"
                                      name="jobrole"
                                      placeholder="Enter Jobrole"
                                      onChange={handleInputChange}
                                      className={`${
                                        errors.jobrole && "border-red-500"
                                      }peer bg-white h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                              `}
                                    >
                                      <option value="">Select Job Role</option>
                                      <option value="Manager">Manager</option>
                                      <option value="Supervisor">
                                        Supervisor
                                      </option>
                                      <option value="Technician">
                                        Technician
                                      </option>
                                      <option value="Driver">Driver</option>
                                      <option value="Worker">Worker</option>
                                    </select>
                                    {errors.jobrole && (
                                      <span className="text-red-500 ml-1 text-sm sans">
                                        {errors.jobrole}
                                      </span>
                                    )}

                                    <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                                  </div>
                                </div>
                                {errors.jobrole && <div class=""></div>}
                                <div>
                                  <p class="block mt-2 mb-1 font-sans text-x1 antialiased font-medium leading-normal text-blue-gray-900">
                                    <label>Gender</label>
                                  </p>
                                  <div class="relative h-10 w-full min-w-[200px]">
                                    <select
                                      value={formData.gender}
                                      type="text"
                                      name="gender"
                                      placeholder="Enter Gender"
                                      onChange={handleInputChange}
                                      className={`${
                                        errors.gender && "border-red-500"
                                      }peer bg-white h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                              `}
                                    >
                                      <option value="">Select Gender</option>
                                      <option value="Male">Male</option>
                                      <option value="Female">Female</option>
                                      <option value="Other">Other</option>
                                    </select>
                                    {errors.gender && (
                                      <span className="text-red-500 ml-1 text-sm sans">
                                        {errors.gender}
                                      </span>
                                    )}
                                    <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                                  </div>
                                </div>
                                {errors.gender && <div class=""></div>}

                                <div>
                                  <p class="block mt-2 mb-1 font-sans text-x1 antialiased font-medium leading-normal text-blue-gray-900">
                                    <label>National ID</label>
                                  </p>
                                  <div class="relative h-10 w-full min-w-[200px]">
                                    <input
                                      value={formData.nic}
                                      type="number"
                                      name="nic"
                                      placeholder="Enter National ID"
                                      onChange={handleInputChange}
                                      className={`${
                                        errors.nic && "border-red-500"
                                      }peer bg-white h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                              `}
                                    />
                                    {errors.nic && (
                                      <span className="text-red-500 ml-1 text-sm sans">
                                        {errors.nic}
                                      </span>
                                    )}
                                    <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                                  </div>
                                </div>
                                {errors.gender && <div class=""></div>}
                              </div>
                            </div>

                            <div class="px-6">
                              <div class="grid gap-4 overflow-visible">
                                <div>
                                  <p class="block mt-2 mb-1 font-sans text-x1 antialiased font-medium leading-normal text-blue-gray-900">
                                    <label for="email">Mobile</label>
                                  </p>
                                  <div class="relative h-10 w-full min-w-[200px]">
                                    <input
                                      value={formData.mobile}
                                      type="number"
                                      name="mobile"
                                      placeholder="Enter Mobile Number"
                                      onChange={handleInputChange}
                                      className={`${
                                        errors.mobile && "border-red-500"
                                      }peer bg-white h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                              `}
                                    />
                                    {errors.mobile && (
                                      <span className="text-red-500 ml-1 text-sm sans">
                                        {errors.mobile}
                                      </span>
                                    )}
                                    <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                                  </div>
                                </div>
                                {errors.mobile && <div class=""></div>}
                                <div>
                                  <p class="block mt-2 mb-1 font-sans text-x1 antialiased font-medium leading-normal text-blue-gray-900">
                                    <label for="address">Email</label>
                                  </p>
                                  <div class="relative h-10 w-full min-w-[200px]">
                                    <input
                                      value={formData.email}
                                      type="email"
                                      name="email"
                                      placeholder="Enter Employee Email"
                                      onKeyPress={handleKeyPressEmail}
                                      onChange={handleInputChange}
                                      className={`${
                                        errors.email && "border-red-500"
                                      }peer bg-white h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                              `}
                                    />
                                    {errors.email && (
                                      <span className="text-red-500 ml-1 text-sm sans">
                                        {errors.email}
                                      </span>
                                    )}
                                    <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                                  </div>
                                </div>
                                {errors.email && <div class=""></div>}
                                <div>
                                  <p class="block mt-2 mb-1 font-sans text-x1 antialiased font-medium leading-normal text-blue-gray-900">
                                    <label>Address</label>
                                  </p>
                                  <div class="relative h-10 w-full min-w-[200px]">
                                    <input
                                      value={formData.address}
                                      type="text"
                                      name="address"
                                      placeholder="Enter Employee Address"
                                      onChange={handleInputChange}
                                      className={`${
                                        errors.address && "border-red-500"
                                      }peer bg-white h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                              `}
                                    />
                                    {errors.address && (
                                      <span className="text-red-500 ml-1 text-sm sans">
                                        {errors.address}
                                      </span>
                                    )}
                                    <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                                  </div>
                                </div>
                                {errors.address && <div class=""></div>}

                                <div>
                                  <p class="block mt-2 mb-1 font-sans text-x1 antialiased font-medium leading-normal text-blue-gray-900">
                                    <label>Age</label>
                                  </p>
                                  <div class="relative h-10 w-full min-w-[200px]">
                                    <input
                                      value={formData.age}
                                      type="number"
                                      name="age"
                                      min={18}
                                      max={60}
                                      placeholder="Enter Age"
                                      onChange={handleInputChange}
                                      className={`${
                                        errors.age && "border-red-500"
                                      }peer bg-white h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                              `}
                                    />
                                    {errors.age && (
                                      <span className="text-red-500 ml-1 text-sm sans">
                                        {errors.age}
                                      </span>
                                    )}
                                    <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                                  </div>
                                </div>
                                {errors.age && <div class=""></div>}
                              </div>
                            </div>
                          </div>
                          <div class="flex justify-center  gap-4 mt-10">
                            <button
                              class=" m-2 select-none rounded-lg bg-green-500 py-3.5 px-14 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                              type="submit"
                              onClick={onSubmit}
                            >
                              &nbsp;
                              <i className="fas fa-pencil mr-2"></i>Update
                            </button>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </div>
              </div>
            </CardBody>
            <CardFooter>
              <Footer />
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}
