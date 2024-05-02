import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { SidebarWithBurgerMenu } from "../components/navBar";
import { Link } from "react-router-dom";
import {
  Breadcrumbs,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Avatar,
  Typography,
} from "@material-tailwind/react";
import ProfileMenu from "../components/Profile";
import { Footer } from "../components/Footer";
import AdminNavbar from "../components/AdminNavbar";
import { DefaultSidebar } from "../components/Manager-Sidebar";
import createLoadingScreen from "./LoadingScreen";
import { Upload } from "react-feather";
import firebase from "../middleware/firebaseConfig";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function CreatePost() {
  const [state, setState] = useState({
    name: "",
    jobrole: "",
    gender: "",
    mobile: "",
    nic: "",
    email: "",
    address: "",
    isAdmin: "",
    age: "",
    image: "",
    confirmation: false,
    errors: {},
  });

  const [open, setOpen] = React.useState(0);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadImage, setUploadImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const toggleSidebar = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Validation functions
  const validateName = () => {
    const { name } = state;
    if (!name) {
      return "Name is required";
    }

    // Check if the name contains any uppercase letters
    if (/[A-Z]/.test(name)) {
      return "Please enter name in lowercase letters";
    }

    return "";
  };

  const validateJobrole = () => {
    const { jobrole } = state;
    if (!jobrole) {
      return "Job role is required";
    }
    return "";
  };

  const validateGender = () => {
    const { gender } = state;
    if (!gender) {
      return "Gender is required";
    }
    return "";
  };

  const validateMobile = () => {
    const { mobile } = state;
    if (!mobile) {
      return "Mobile number is required";
    }
    if (mobile.length !== 10) {
      return "Mobile number must be 10 digits";
    }
    return "";
  };

  const validateNic = () => {
    const { nic } = state;
    if (!nic) {
      return "National ID is required";
    }
    if (nic.length !== 12 && nic.length !== 9) {
      return "National ID must be either 12 or 9 digits";
    }
    return "";
  };

  const validateEmail = () => {
    let { email } = state;

    // Convert email to lowercase
    const originalEmail = email;
    email = email.toLowerCase();

    if (!email) {
      return "Email is required";
    }
    if (originalEmail !== email) {
      return "Please enter Email in lowercase letters";
    }
    if (!email.includes("@")) {
      return "Email must include @ symbol";
    }
    return "";
  };

  const validateAddress = () => {
    let { address } = state;
    if (!address) {
      return "Address is required";
    }
    // Convert address to lowercase
    address = address.toLowerCase();

    if (state.address !== address) {
      return "Please enter the address in lowercase";
    }

    return "";
  };

  const validateAge = () => {
    const { age } = state;
    if (!age) {
      return "Age is required";
    }
    if (age < 18 || age > 60) {
      return "Age must be between 18 and 60";
    }
    return "";
  };

  // const validateImage = () => {
  //   const { image } = state;
  //   if (!image) {
  //     return "Image is required";
  //   }
  //   return "";
  // };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    // Check if file exists
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadImage(file);
      setImagePreview(imageUrl);
    } else {
      // Handle case where no file is selected
      setUploadImage(null);
      setImagePreview(null);
    }
  };

  const handInputChange = (e) => {
    const { name, value } = e.target;

    setState((cs) => ({
      ...cs,
      [name]: value,
      errors: {
        ...state.errors,
        [name]: "", // Clear previous error when the field is updated
      },
    }));
  };

  function handleKeyPress(event) {
    // Get the character that the user is trying to type
    const char = event.key;

    const regex = /^[A-Za-z ]$/;

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

    if (
      (endsWithDotCom && char !== "Backspace") ||
      (endsWithDotLk && char !== "Backspace")
    ) {
      event.preventDefault(); // Prevents further characters after ".com"
      return;
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();

    // Validate all fields before submission
    const errors = {
      name: validateName(),
      jobrole: validateJobrole(),
      gender: validateGender(),
      mobile: validateMobile(),
      nic: validateNic(),
      email: validateEmail(),
      address: validateAddress(),
      age: validateAge(),
      //image: validateImage(),
    };

    // Check if any errors exist
    if (Object.values(errors).some((error) => error !== "")) {
      setState((cs) => ({ ...cs, errors }));
      setLoading(false);
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: "This will add a new Employee.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, add it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        setCreating(true);
        const interval = setInterval(() => {
          setProgress((prevProgress) =>
            prevProgress >= 100 ? 0 : prevProgress + 25
          );
        }, 500);

        const storage = getStorage(firebase);
        const storageRef = ref(
          storage,
          `employees/${state?.name ?? "profile_picture"}`
        );
        uploadBytes(storageRef, uploadImage)
          .then(() => {
            return getDownloadURL(storageRef);
          })
          .then((url) => {
            return axios.post("http://localhost:8070/api/posts/post/save", {
              ...state,
              image: url,
            });
          })
          .then((res) => {
            if (res.data.success) {
              setState({
                confirmation: true,
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
              setCreating(false);
              window.location.href = "/emp";
            }
          })
          .catch((error) => {
            setCreating(false);
            // Handle error
            Swal.fire("Error", "Failed to add employee", "error");
          })
          .finally(() => {
            setCreating(false);
            clearInterval(interval);
          });
      }
    });
  };

  if (loading) {
    return <div>{createLoadingScreen(loading)}</div>;
  }

  if (creating) {
    return (
      <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-custom-color">
        <div className="w-32 h-32">
          <div className="w-16 h-16">
            <Upload className="w-full h-full text-blue-500 animate-spin" />
          </div>
          <div className="text-center mt-2">
            <p className="text-amber-800 font-bold text-xl">
              Creating... {progress}%
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
  const { errors } = state;
  return (
    <>
      <div
        className="flex h-screen overflow-scroll"
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
                    <li class="flex items-center font-sans text-sm antialiased font-normal leading-normal transition-colors duration-300 cursor-pointer text-blue-gray-900 hover:text-amber-900">
                      <span>Dashboard</span>

                      <span class=" font-sans text-sm antialiased font-normal leading-normal pointer-events-none select-none text-blue-gray-500"></span>
                    </li>
                  </Link>
                  <Link to="/emp">
                    <li class="flex items-center font-sans text-sm antialiased font-normal leading-normal transition-colors duration-300 cursor-pointer text-blue-gray-900 hover:text-amber-900">
                      <span>Employee</span>

                      <span class=" font-sans text-sm antialiased font-normal leading-normal pointer-events-none select-none text-blue-gray-500"></span>
                    </li>
                  </Link>
                  <Link to="/emp/add">
                    <li class="flex items-center font-sans text-sm antialiased font-normal leading-normal transition-colors duration-300 cursor-pointer text-blue-gray-900 hover:text-amber-900">
                      <span>Create Employee</span>

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
                          src={imagePreview}
                          size="custom"
                          style={{
                            width: "200px",
                            height: "200px",
                          }} // Adjust the width and height as desired
                          className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain"
                        />
                        <img src={state.image} />
                      </div>
                      <div>
                        <div className="pt-12 flex justify-center relative h-10 w-full min-w-[200px]">
                          <div className="flex items-center space-x-2">
                            <input
                              type="file"
                              name="image"
                              accept="image/*"
                              id="imageUpload"
                              onChange={handleImageUpload}
                              className="hidden"
                            />
                            <button
                              type="button"
                              className=" bg-custom-color hover:bg-amber-900 text-white font-semibold
                py-2 px-4 rounded
                focus:outline-none focus:ring-2 focus:ring-amber-400
                transition duration-300 ease-in-out
                transform hover:scale-105
                active:scale-95
                shadow-lg flex items-center space-x-2"
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
                              <span className="">Choose Image</span>
                            </button>
                          </div>

                          {errors?.image && (
                            <p className="text-red-500 ml-1 text-sm">
                              {errors?.image}
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
                      {/* <div className="mt-8 flex gap-4 text-blue-gray-900 sm:justify-center">
                              <Typography
                                as="a"
                                href="#"
                                className="opacity-80 transition-opacity hover:text-teal-600"
                              >
                                <svg
                                  className="h-6 w-6"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                  aria-hidden="true"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                                    clip-rule="evenodd"
                                  />
                                </svg>
                              </Typography>
                              <Typography
                                as="a"
                                href="#"
                                className="opacity-80 transition-opacity hover:text-teal-600"
                              >
                                <svg
                                  className="h-6 w-6"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                  aria-hidden="true"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                                    clip-rule="evenodd"
                                  />
                                </svg>
                              </Typography>
                              <Typography
                                as="a"
                                href="#"
                                className="opacity-80 transition-opacity hover:text-teal-600"
                              >
                                <svg
                                  className="h-6 w-6"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                  aria-hidden="true"
                                >
                                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                </svg>
                              </Typography>
                              <Typography
                                as="a"
                                href="#"
                                className="opacity-80 transition-opacity hover:text-teal-600"
                              >
                                <svg
                                  className="h-6 w-6"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                  aria-hidden="true"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                    clip-rule="evenodd"
                                  />
                                </svg>
                              </Typography>
                              <Typography
                                as="a"
                                href="#"
                                className="opacity-80 transition-opacity hover:text-teal-600"
                              >
                                <svg
                                  className="h-6 w-6"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                  aria-hidden="true"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
                                    clip-rule="evenodd"
                                  />
                                </svg>
                              </Typography>
                            </div> */}
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
                                      value={state?.name}
                                      type="text"
                                      name="name"
                                      onKeyPress={handleKeyPress}
                                      required
                                      placeholder="Enter Employee Name"
                                      onChange={handInputChange}
                                      className={`peer bg-white h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 ${
                                        errors?.name ? "border-red-500" : ""
                                      }`}
                                    />
                                    {errors?.name && (
                                      <p className="text-red-500 ml-1 text-sm sans">
                                        {errors?.name}
                                      </p>
                                    )}

                                    <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                                  </div>
                                </div>
                                {errors?.name && <div class=""></div>}
                                <div>
                                  <p class="block mt-2 mb-1 font-sans text-x1 antialiased font-medium leading-normal text-blue-gray-900">
                                    <label>Jobrole</label>
                                  </p>
                                  <div class="relative h-10 w-full min-w-[200px]">
                                    <select
                                      value={state?.jobrole}
                                      type="text"
                                      name="jobrole"
                                      placeholder="Enter Jobrole"
                                      onChange={handInputChange}
                                      class={`${
                                        errors?.jobrole
                                          ? "border-red-500"
                                          : "border-blue-gray-200"
                                      }peer bg-white h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50`}
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
                                    {errors?.jobrole && (
                                      <p className="text-red-500 ml-1 text-sm sans">
                                        {errors?.jobrole}
                                      </p>
                                    )}

                                    <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                                  </div>
                                </div>
                                {errors?.jobrole && <div class=""></div>}
                                <div>
                                  <p class="block mt-2 mb-1 font-sans text-x1 antialiased font-medium leading-normal text-blue-gray-900">
                                    <label>Gender</label>
                                  </p>
                                  <div class="relative h-10 w-full min-w-[200px]">
                                    <select
                                      value={state?.gender}
                                      type="text"
                                      name="gender"
                                      placeholder="Enter Gender"
                                      onChange={handInputChange}
                                      class={`${
                                        errors?.gender
                                          ? "border-red-500"
                                          : "border-blue-gray-200"
                                      }peer bg-white h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50`}
                                    >
                                      <option value="">Select Gender</option>
                                      <option value="Male">Male</option>
                                      <option value="Female">Female</option>
                                      <option value="Other">Other</option>
                                    </select>
                                    {errors?.gender && (
                                      <p className="text-red-500 ml-1 text-sm sans">
                                        {errors?.gender}
                                      </p>
                                    )}
                                    <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                                  </div>
                                </div>
                                {errors?.gender && <div class=""></div>}

                                <div>
                                  <p class="block mt-2 mb-1 font-sans text-x1 antialiased font-medium leading-normal text-blue-gray-900">
                                    <label>National ID</label>
                                  </p>
                                  <div class="relative h-10 w-full min-w-[200px]">
                                    <input
                                      value={state?.nic}
                                      type="number"
                                      name="nic"
                                      placeholder="Enter National ID"
                                      onChange={handInputChange}
                                      class={`${
                                        errors?.nic
                                          ? "border-red-500"
                                          : "border-blue-gray-200"
                                      }peer bg-white h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50`}
                                    />
                                    {errors?.nic && (
                                      <p className="text-red-500 ml-1 text-sm sans">
                                        {errors?.nic}
                                      </p>
                                    )}
                                    <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                                  </div>
                                </div>
                                {errors?.gender && <div class=""></div>}
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
                                      value={state?.mobile}
                                      type="number"
                                      name="mobile"
                                      placeholder="Enter Mobile Number"
                                      onChange={handInputChange}
                                      class={`${
                                        errors?.mobile
                                          ? "border-red-500"
                                          : "border-blue-gray-200"
                                      }peer bg-white h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50`}
                                    />
                                    {errors?.mobile && (
                                      <p className="text-red-500 ml-1 text-sm sans">
                                        {errors?.mobile}
                                      </p>
                                    )}
                                    <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                                  </div>
                                </div>
                                {errors?.mobile && <div class=""></div>}
                                <div>
                                  <p class="block mt-2 mb-1 font-sans text-x1 antialiased font-medium leading-normal text-blue-gray-900">
                                    <label for="address">Email</label>
                                  </p>
                                  <div class="relative h-10 w-full min-w-[200px]">
                                    <input
                                      value={state?.email}
                                      type="email"
                                      name="email"
                                      placeholder="Enter Employee Email"
                                      onChange={handInputChange}
                                      onKeyPress={handleKeyPressEmail}
                                      class={`${
                                        errors?.email
                                          ? "border-red-500"
                                          : "border-blue-gray-200"
                                      }peer bg-white h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50`}
                                    />
                                    {errors?.email && (
                                      <p className="text-red-500 ml-1 text-sm sans">
                                        {errors?.email}
                                      </p>
                                    )}
                                    <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                                  </div>
                                </div>
                                {errors?.email && <div class=""></div>}
                                <div>
                                  <p class="block mt-2 mb-1 font-sans text-x1 antialiased font-medium leading-normal text-blue-gray-900">
                                    <label>Address</label>
                                  </p>
                                  <div class="relative h-10 w-full min-w-[200px]">
                                    <input
                                      value={state?.address}
                                      type="text"
                                      name="address"
                                      placeholder="Enter Employee Address"
                                      onChange={handInputChange}
                                      class={`${
                                        errors?.address
                                          ? "border-red-500"
                                          : "border-blue-gray-200"
                                      }peer bg-white h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50`}
                                    />
                                    {errors?.address && (
                                      <p className="text-red-500 ml-1 text-sm sans">
                                        {errors?.address}
                                      </p>
                                    )}
                                    <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                                  </div>
                                </div>
                                {errors?.address && <div class=""></div>}

                                <div>
                                  <p class="block mt-2 mb-1 font-sans text-x1 antialiased font-medium leading-normal text-blue-gray-900">
                                    <label>Age</label>
                                  </p>
                                  <div class="relative h-10 w-full min-w-[200px]">
                                    <input
                                      value={state?.age}
                                      type="number"
                                      name="age"
                                      min={18}
                                      max={60}
                                      placeholder="Enter Age"
                                      onChange={handInputChange}
                                      class={`${
                                        errors?.age
                                          ? "border-red-500"
                                          : "border-blue-gray-200"
                                      }peer bg-white h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50`}
                                    />
                                    {errors?.age && (
                                      <p className="text-red-500 ml-1 text-sm sans">
                                        {errors?.age}
                                      </p>
                                    )}
                                    <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                                  </div>
                                </div>
                                {errors?.age && <div class=""></div>}
                              </div>
                            </div>
                          </div>
                          <div class="flex justify-center  gap-4 mt-10">
                            <button
                              class="m-2 relative select-none rounded-lg bg-green-500 py-3.5 px-14 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                              type="submit"
                              onClick={onSubmit}
                            >
                              &nbsp;
                              <i className="fas fa-user-plus mr-2"></i>Add
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
