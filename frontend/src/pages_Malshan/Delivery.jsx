import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useParams } from "react-router-dom";
import { SidebarWithBurgerMenu } from "../components/navBar";
import ProfileMenu from "../components/Profile";
import { Footer } from "../components/Footer";
import { Breadcrumbs } from "@material-tailwind/react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  IconButton,
  Input,
} from "@material-tailwind/react";

export default function Edit_Driver() {
  const [orders, setOrders] = useState([]);
  const [selectedOrderName, setSelectedOrderName] = useState("");
  const [selectedOrder, setSelectedOrder] = useState({
    shippingAddress: { address: "", city: "", zip: "" },
  });

  const [selectedOwnerName, setSelectedOwnerName] = useState("");
  const [selectedTransport, setSelectedTransport] = useState("");
  const [transport, setTransports] = useState([]);
  const [state, setState] = useState({
    d_name: "",
    d_mobile: "",
    category: "",
    nic: "",
    vehicle_No: "",
    vehicle_type: "",
    _id: "",
    shippingAddress: "",
  });

  const {
    d_name,
    d_mobile,
    category,
    nic,
    vehicle_No,
    vehicle_type,
    shippingAddress,
  } = state;

  const handleChange = (event) => {
    const selectedName = event.target.value;
    setSelectedOwnerName(selectedName);

    // Find the corresponding transport object based on the selected owner name
    const foundTransport = transport.find(
      (item) => item.d_name === selectedName
    );
    setSelectedTransport(foundTransport);
  };

  const handleChangeOrder = (event) => {
    const selectedOrder = event.target.value;
    setSelectedOrderName(selectedOrder);

    // Find the corresponding transport object based on the selected owner name
    const foundOrder = orders.find((item) => item._id === selectedOrder);
    setSelectedOrder(foundOrder);
  };

  // State variables for validation errors
  const [errors, setErrors] = useState({});

  function retrieveTransport() {
    axios
      .get("http://localhost:8070/api/transports/transports")
      .then((res) => {
        if (res.data.success) {
          setTransports(res.data.existingTransports);

          // Add setTimeout to setLoading after data retrieval
          //   setTimeout(() => {
          //     setLoading(false);
          //   }, 800);
        }
      })
      .catch((error) => console.error("Error fetching posts:", error));
  }

  const retrieveOrders = () => {
    axios
      .get("http://localhost:8070/api/orders/orders")
      .then((res) => {
        if (res.data.success) {
          const allOrders = res.data.existingOrders;
          const pendingOrders = allOrders.filter(
            (order) => order.orderStatus === "Preparing"
          );
          setOrders(pendingOrders);
          // setLoading(false); // Update loading state after data retrieval
        }
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        // setLoading(false); // Update loading state if there's an error
      });
  };

  useEffect(() => {
    retrieveTransport();
  }, []);

  useEffect(() => {
    retrieveOrders();
  }, []);

  const [confirmation, setConfirmation] = useState(false);

  // const onSubmit = (event) => {
  //   event.preventDefault();

  //   // Check if any errors exist
  //   if (Object.values(errors).some((error) => error !== "")) {
  //     this.setState({ errors });
  //     return;
  //   }

  //   const {
  //     d_name,
  //     d_mobile,
  //     category,
  //     nic,
  //     vehicle_No,
  //     vehicle_type,
  //     _id,
  //     shippingAddress,
  //   } = this.state;

  //   const data = {
  //     d_name: d_name,
  //     d_mobile: d_mobile,
  //     category: category,
  //     nic: nic,
  //     vehicle_No: vehicle_No,
  //     vehicle_type: vehicle_type,
  //     _id: _id,
  //     shippingAddress: shippingAddress,
  //   };

  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "This will add a new Delivery.",
  //     icon: "question",
  //     showCancelButton: true,
  //     confirmButtonText: "Yes, add it!",
  //     cancelButtonText: "No, cancel!",
  //     reverseButtons: true,
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       axios
  //         .post("http://localhost:8070/api/delivery/delivery/save", data)
  //         .then((res) => {
  //           if (res.data.success) {
  //             this.setState({
  //               confirmation: true,
  //               d_name: "",
  //               d_mobile: "",
  //               category: "",
  //               nic: "",
  //               vehicle_No: "",
  //               vehicle_type: "",
  //               _id: "",
  //               shippingAddress: "",
  //             });
  //           }
  //         });
  //     }
  //     if (this.state.confirmation) {
  //       window.location.href = "/transport";
  //     }
  //   });
  // };

  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
      d_name: selectedTransport.d_name,
      d_mobile: selectedTransport.d_mobile,
      category: selectedTransport.category,
      nic: selectedTransport.nic,
      email: selectedTransport.email,
      vehicle_No: selectedTransport.vehicle_No,
      vehicle_type: selectedTransport.vehicle_type,
      shipping_Id: selectedOrder.orderId,
      shippingAddress: selectedOrder.shippingAddress,
    };

    // Check if any errors exist
    if (Object.values(errors).some((error) => error !== "")) {
      setState((prevState) => ({ ...prevState, errors }));
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: "This will add a new Delivery.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, add it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post("http://localhost:8070/api/deliveries/delivery/save", data)
          .then((res) => {
            if (res.data.success) {
              setState({
                confirmation: true,
                d_name: "",
                d_mobile: "",
                category: "",
                nic: "",
                vehicle_No: "",
                vehicle_type: "",
                shippingAddress: "",
                errors: {},
              });
              Swal.fire("Success", "Delivery added successfully!", "success");
            } else {
              Swal.fire("Error", "Failed to add Delivery", "error");
            }
          })
          .catch((error) => {
            console.error("Error adding Delivery:", error);
            Swal.fire(
              "Error",
              "An error occurred while adding Delivery",
              "error"
            );
          });
      }
    });
  };

  if (confirmation) {
    window.location.href = "/transport";
  }

  function capitalizeSecondPart(name, vehicle_No) {
    if (!(name || vehicle_No)) return "";

    const parts = name.split(" "); // Split the name into parts

    // Iterate over each part and capitalize the first letter
    for (let i = 0; i < parts.length; i++) {
      parts[i] =
        parts[i].charAt(0).toUpperCase() + parts[i].slice(1).toLowerCase();
    }

    // Join the parts back into a single string
    return parts.join(" ");
  }

  return (
    <>
      <div className="edit-post-bg">
        <div className="relative flex justify-between">
          <SidebarWithBurgerMenu />
          <ProfileMenu />
        </div>
        <div className="m-4">
          <Breadcrumbs>
            <Link to="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </Link>
            <Link to="#">
              <li class="flex items-center font-sans text-sm antialiased font-normal leading-normal transition-colors duration-300 cursor-pointer text-blue-gray-900 hover:text-cyan-100">
                <span>Dashboard</span>

                <span class=" font-sans text-sm antialiased font-normal leading-normal pointer-events-none select-none text-blue-gray-500"></span>
              </li>
            </Link>
            <Link to="/transport">
              <li class="flex items-center font-sans text-sm antialiased font-normal leading-normal transition-colors duration-300 cursor-pointer text-blue-gray-900 hover:text-cyan-100">
                <span>Transport</span>

                <span class=" font-sans text-sm antialiased font-normal leading-normal pointer-events-none select-none text-blue-gray-500"></span>
              </li>
            </Link>
            <Link to="">
              <li class="flex items-center font-sans text-sm antialiased font-normal leading-normal transition-colors duration-300 cursor-pointer text-blue-gray-900 hover:text-cyan-100">
                <span>Update Transport</span>

                <span class=" font-sans text-sm antialiased font-normal leading-normal pointer-events-none select-none text-blue-gray-500"></span>
              </li>
            </Link>
          </Breadcrumbs>
        </div>

        <div class="flex items-center justify-center h-full mt-10 mb-7">
          <div class="relative flex  w-full max-w-[56rem] mx-auto flex-col rounded-xl opacity-90 bg-blue-gray-100  bg-clip-border text-gray-700 shadow-md">
            <div class="relative grid px-10 py-1 m-1 overflow-hidden  border-blue-gray-100 bg-blue-gray-50/50text-center text-white bg-gray-700 place-items-center rounded-xl bg-clip-border shadow-gray-900/20">
              <div class="h-1 p-8 mb-4 text-white ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 35 35"
                  fill="currentColor"
                  aria-hidden="true"
                  class="w-12 h-12 text-white"
                >
                  <path d="M4.5 3.75a3 3 0 00-3 3v.75h21v-.75a3 3 0 00-3-3h-15z "></path>
                </svg>
              </div>
              <h5 class="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-white">
                Update Transport Information
              </h5>
            </div>

            <div className="flex flex-col">
              <div>
                <div class="grid grid-cols-2 gap-6">
                  <div class="p-6">
                    <div class="block overflow-visible">
                      <div class="relative block w-full overflow-hidden !overflow-x-visible !overflow-y-visible bg-transparent">
                        <div>
                          <form class="flex flex-col gap-4 mt-12">
                            <div>
                              <div>
                                <p className="block mt-2 mb-1 font-sans text-x1 antialiased font-medium leading-normal text-blue-gray-900">
                                  <label>Owner Name</label>
                                </p>
                                <select
                                  id="transportDropdown"
                                  value={selectedOwnerName}
                                  onChange={handleChange}
                                  className="peer bg-white h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all"
                                >
                                  <option value="">Select Owner Name</option>
                                  {transport.map((item, index) => (
                                    <option key={index} value={item.d_name}>
                                      {capitalizeSecondPart(item.d_name)}
                                    </option>
                                  ))}
                                </select>
                              </div>

                              <div>
                                <p className="block mt-5 mb-1 font-sans text-x1 antialiased font-medium leading-normal text-blue-gray-900">
                                  <label>Mobile</label>
                                </p>
                                <div className="relative h-10 w-full min-w-[200px]">
                                  <input
                                    value={selectedTransport.d_mobile}
                                    type="number"
                                    name="d_mobile"
                                    disabled
                                    className="peer bg-white h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all"
                                  />
                                </div>
                              </div>

                              <div>
                                <p className="block mt-5 mb-1 font-sans text-x1 antialiased font-medium leading-normal text-blue-gray-900">
                                  <label>Category</label>
                                </p>
                                <div className="relative h-10 w-full min-w-[200px]">
                                  <input
                                    value={selectedTransport.category}
                                    type="text"
                                    name="category"
                                    disabled
                                    className="peer bg-white h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all"
                                  />
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="p-6">
                    <div class="block overflow-visible">
                      <div class="relative block w-full overflow-hidden !overflow-x-visible !overflow-y-visible bg-transparent">
                        <div>
                          <form class="flex flex-col gap-4 mt-12">
                            <div>
                              <p class="block mt-2 mb-1 font-sans text-x1 antialiased font-medium leading-normal text-blue-gray-900">
                                <label>National ID</label>
                              </p>
                              <div class="relative h-10 w-full min-w-[200px]">
                                <input
                                  value={selectedTransport.nic}
                                  type="text"
                                  name="nic"
                                  disabled
                                  className={`${
                                    errors.nic && "border-red-500"
                                  }peer bg-white h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            `}
                                />

                                <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                              </div>
                            </div>

                            <div>
                              <p class="block mt-1 mb-1 font-sans text-x1 antialiased font-medium leading-normal text-blue-gray-900">
                                <label>Vehicle Type</label>
                              </p>
                              <div class="relative h-10 w-full min-w-[200px]">
                                <input
                                  value={selectedTransport.vehicle_type}
                                  type="text"
                                  name="vehicle_type"
                                  disabled
                                  className={`${
                                    errors.vehicle_type && "border-red-500"
                                  }peer bg-white h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            `}
                                ></input>

                                <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                              </div>
                            </div>

                            <div>
                              <p class="block mt-1 mb-1 font-sans text-x1 antialiased font-medium leading-normal text-blue-gray-900">
                                <label>Vehicle Number</label>
                              </p>
                              <div class="relative h-10 w-full min-w-[200px]">
                                <input
                                  value={selectedTransport.vehicle_No}
                                  type="text"
                                  name="vehicle_No"
                                  disabled
                                  className={`${
                                    errors.vehicle_No && "border-red-500"
                                  }peer bg-white h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            `}
                                />
                                <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div class="grid grid-cols-2 gap-6">
                  <div class="p-6">
                    <div>
                      <p className="block mt-2 mb-1 font-sans text-x1 antialiased font-medium leading-normal text-blue-gray-900">
                        <label>Order Name</label>
                      </p>
                      <select
                        id="orderDropdown"
                        value={selectedOrderName}
                        onChange={handleChangeOrder}
                        className="peer bg-white h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all"
                      >
                        <option value="">Select Order</option>
                        {orders.map((item, index) => (
                          <option key={index} value={item._id}>
                            {item._id}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <p className="block mt-5 mb-1 font-sans text-x1 antialiased font-medium leading-normal text-blue-gray-900">
                        <label>Shipping Address</label>
                      </p>
                      <div className="relative h-10 w-full min-w-[200px]">
                        <input
                          value={`Address : ${selectedOrder.shippingAddress.address}`}
                          type="text"
                          name="shippingAddress"
                          disabled
                          className="peer bg-white h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all"
                        />
                      </div>
                      <div className="relative h-10 w-full min-w-[200px]">
                        <input
                          value={`City : ${selectedOrder.shippingAddress.city}`}
                          type="text"
                          name="shippingAddress"
                          disabled
                          className="peer bg-white h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all"
                        />
                      </div>
                      <div className="relative h-10 w-full min-w-[200px]">
                        <input
                          value={`Postal Code : ${selectedOrder.shippingAddress.zip}`}
                          type="text"
                          name="shippingAddress"
                          disabled
                          className="peer bg-white h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="p-6"></div>
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
                <i className="mr-2 fas fa-pencil"></i>Order
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
