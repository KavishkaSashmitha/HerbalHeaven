import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { SidebarWithBurgerMenu } from '../components/navBar';
import { Link } from 'react-router-dom';
import {
  Breadcrumbs,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Avatar,
  Typography,
} from '@material-tailwind/react';
import ProfileMenu from '../components/Profile';
import { Footer } from '../components/Footer';
import AdminNavbar from '../components/AdminNavbar';
import { DefaultSidebar } from '../components/Manager-Sidebar';
import createLoadingScreen from './LoadingScreen';
import { Upload } from 'react-feather';
import firebase from '../middleware/firebaseConfig';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function CreatePost() {
  const [state, setState] = useState({
    name: '',
    jobrole: '',
    gender: '',
    mobile: '',
    nic: '',
    email: '',
    address: '',
    isAdmin: '',
    age: '',
    image: '',
    confirmation: false,
    errors: {},
  });

  const [open, setOpen] = React.useState(0);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadImage, setUploadImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  // Define a state variable to hold the NIC value
  const [nic, setNic] = useState('');

  // Define a state variable to hold the age
  const [age, setAge] = useState('');

  const handleNicInputChange = (event) => {
    const { value } = event.target;
    setNic(value);

    // Calculate age and update the state
    const calculatedAge = calculateAgeFromNIC(value);
    setAge(calculatedAge);
  };
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
      return 'Name is required';
    }

    // Check if the name contains any uppercase letters
    if (/[A-Z]/.test(name)) {
      return 'Please enter name in lowercase letters';
    }

    return '';
  };

  const validateJobrole = () => {
    const { jobrole } = state;
    if (!jobrole) {
      return 'Job role is required';
    }
    return '';
  };

  const validateGender = () => {
    const { gender } = state;
    if (!gender) {
      return 'Gender is required';
    }
    return '';
  };

  const validateMobile = () => {
    const { mobile } = state;
    if (!mobile) {
      return 'Mobile number is required';
    }
    if (mobile.length !== 10) {
      return 'Mobile number must be 10 digits';
    }
    return '';
  };

  const validateNic = () => {
    if (!nic) {
      return 'National ID is required';
    }
    if (nic.length !== 12 && nic.length !== 9) {
      return 'National ID must be either 12 or 9 digits';
    }
    return '';
  };

  const validateEmail = () => {
    let { email } = state;

    // Convert email to lowercase
    const originalEmail = email;
    email = email.toLowerCase();

    if (!email) {
      return 'Email is required';
    }
    if (originalEmail !== email) {
      return 'Please enter Email in lowercase letters';
    }
    if (!email.includes('@')) {
      return 'Email must include @ symbol';
    }
    return '';
  };

  const validateAddress = () => {
    let { address } = state;
    if (!address) {
      return 'Address is required';
    }
    // Convert address to lowercase
    address = address.toLowerCase();

    if (state.address !== address) {
      return 'Please enter the address in lowercase';
    }

    return '';
  };

  const validateAge = () => {
    if (!age) {
      return 'Age is required';
    }
    if (age < 18 || age > 60) {
      return 'Age must be between 18 and 60';
    }
    return '';
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
        [name]: '', // Clear previous error when the field is updated
      },
    }));
  };

  function handleKeyPressMobile(event) {
    // Allow only numeric characters (digits)
    const charCode = event.which || event.keyCode;
    const char = String.fromCharCode(charCode);
    const isDigit = /[0-9]/.test(char);

    // Get the current value of the input field
    const currentValue = event.target.value;

    // Check the length of the input field
    const isMaxLengthReached = currentValue.length >= 10;

    // Prevent default if the character is not a digit or if max length is reached
    if (!isDigit || isMaxLengthReached) {
      event.preventDefault();
    }
  }
  function calculateAgeFromNIC(nic) {
    // Extract first four digits from NIC
    const yearPart = nic.substring(0, 4);

    // Convert the extracted digits into a year
    const birthYear = parseInt(yearPart, 10);

    // Get the current year
    const currentYear = new Date().getFullYear();

    // Calculate the age
    const age = currentYear - birthYear;

    return age;
  }

  // Example usage:
  function handleKeyPressAge(event) {
    // Allow only numeric characters (digits)
    const charCode = event.which || event.keyCode;
    const char = String.fromCharCode(charCode);
    const isDigit = /[0-9]/.test(char);

    // Get the current value of the input field
    const currentValue = event.target.value;

    // Check the length of the input field
    const isMaxLengthReached = currentValue.length >= 2;

    // Prevent default if the character is not a digit or if max length is reached
    if (!isDigit || isMaxLengthReached) {
      event.preventDefault();
    }
  }

  function handleKeyPressNic(event) {
    // Allow only numeric characters (digits)
    const charCode = event.which || event.keyCode;
    const char = String.fromCharCode(charCode);
    const isDigit = /[0-9]/.test(char);

    // Get the current value of the input field
    const currentValue = event.target.value;

    // Check the length of the input field
    const isMaxLengthReached = currentValue.length >= 12;

    // Prevent default if the character is not a digit or if max length is reached
    if (!isDigit || isMaxLengthReached) {
      event.preventDefault();
    }
  }

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

    const endsWithDotCom = input.value.endsWith('.com');
    const endsWithDotLk = input.value.endsWith('.lk');

    if (
      (endsWithDotCom && char !== 'Backspace') ||
      (endsWithDotLk && char !== 'Backspace')
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

      email: validateEmail(),
      address: validateAddress(),

      //image: validateImage(),
    };

    // Check if any errors exist
    if (Object.values(errors).some((error) => error !== '')) {
      setState((cs) => ({ ...cs, errors }));
      setLoading(false);
      return;
    }

    Swal.fire({
      title: 'Are you sure?',
      text: 'This will add a new Employee.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, add it!',
      cancelButtonText: 'No, cancel!',
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
          `employees/${state?.name ?? 'profile_picture'}`
        );
        uploadBytes(storageRef, uploadImage)
          .then(() => {
            return getDownloadURL(storageRef);
          })
          .then((url) => {
            return axios.post('http://localhost:8070/api/posts/post/save', {
              ...state,
              nic: nic,
              image: url,
            });
          })
          .then((res) => {
            if (res.data.success) {
              setState({
                confirmation: true,
                name: '',
                jobrole: '',
                gender: '',
                mobile: '',
                nic: '',
                email: '',
                address: '',

                image: '',
              });
              setCreating(false);
              window.location.href = '/emp';
            }
          })
          .catch((error) => {
            setCreating(false);
            // Handle error
            Swal.fire('Error', 'Failed to add employee', 'error');
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
        style={{ backgroundColor: '#02353c' }}
      >
        <div
          className={`sidebar w-68 bg-custom-color text-white ${
            open ? 'block' : 'hidden'
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
              <div className="m-4 ">
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
                            width: '200px',
                            height: '200px',
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
                                document.getElementById('imageUpload').click()
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
                                        errors?.name ? 'border-red-500' : ''
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
                                          ? 'border-red-500'
                                          : 'border-blue-gray-200'
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
                                          ? 'border-red-500'
                                          : 'border-blue-gray-200'
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
                                      value={nic}
                                      type="number"
                                      name="nic"
                                      placeholder="Enter National ID"
                                      onKeyPress={handleKeyPressNic}
                                      onChange={handleNicInputChange}
                                      class={`${
                                        errors?.nic
                                          ? 'border-red-500'
                                          : 'border-blue-gray-200'
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
                                      onKeyPress={handleKeyPressMobile}
                                      onChange={handInputChange}
                                      class={`${
                                        errors?.mobile
                                          ? 'border-red-500'
                                          : 'border-blue-gray-200'
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
                                          ? 'border-red-500'
                                          : 'border-blue-gray-200'
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
                                          ? 'border-red-500'
                                          : 'border-blue-gray-200'
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
                                      value={age}
                                      type="number"
                                      name="age"
                                      onKeyPress={handleKeyPressAge}
                                      placeholder="Enter Age"
                                      onChange={handInputChange}
                                      disabled
                                      class={`${
                                        errors?.age
                                          ? 'border-red-500'
                                          : 'border-blue-gray-200'
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
            <CardFooter></CardFooter>
          </Card>
          <Footer />
        </div>
      </div>
    </>
  );
}
