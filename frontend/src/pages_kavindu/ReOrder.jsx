import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useParams } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import { DefaultSidebar } from "../components/Manager-Sidebar";
import { Footer } from "../components/Footer";
import { Breadcrumbs, Option, Select } from "@material-tailwind/react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
} from "@material-tailwind/react";

export default function Edit_Driver() {
  const [items, setItems] = useState([]);
  //   const [products, setProducts] = useState([]);
  //   const [selectedProductName, setSelectedProductName] = useState("");
  //   const [selectedProduct, setSelectedProduct] = useState("");

  const [selectedUserName, setSelectedUserName] = useState("");
  const [selectedUser, setSelectedUser] = useState("Null");
  const [Users, setUsers] = useState([]);
  const [state, setState] = useState({
    name: "",
    mobile: "",
    email: "",
  });

  const [open, setOpen] = useState(false);
  const toggleSidebar = () => {
    setOpen(!open);
  };
  const {
    name,
    d_mobile,
    category,
    nic,
    vehicle_No,
    vehicle_type,
    shippingAddress,
  } = state;

  const handleChange = (event) => {
    if (event && event.target && event.target.value) {
      const selectedName = event.target.value;
      setSelectedUserName(selectedName);

      // Find the corresponding user object based on the selected name
      const foundUser = Users.find((item) => item.name === selectedName);
      setSelectedUser(foundUser);
    } else {
      console.error("Invalid event or event structure:", event);
    }
  };

  //   const handleChangeOrder = (event) => {
  //     const selectedProduct = event.target.value;
  //     setSelectedProduct(selectedProduct);

  //     // Find the corresponding transport object based on the selected owner name
  //     const foundProduct = products.find((item) => item._id === selectedProduct);
  //     setSelectedProduct(foundProduct);
  //   };

  // State variables for validation errors
  const [errors, setErrors] = useState({});

  function retrieveReorder() {
    axios
      .get("http://localhost:8070/sup/getSuppliers")
      .then((result) => setUsers(result.data))
      .catch((err) => console.log(err));
  }

  const retrieveItems = () => {
    axios
      .get("http://localhost:8070/inventory/viewReorderItems")
      .then((result) => setItems(result.data))
      .catch((err) => console.log(err));
  };

  const itemsPassedReorderLevel = items.filter(
    (item) => item.quantity < item.reorderLevel
  );

  useEffect(() => {
    retrieveReorder();
  }, []);

  useEffect(() => {
    retrieveItems();
  }, []);

  const [confirmation, setConfirmation] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      d_name: selectedUser.name,
      email: selectedUser.email,
      mobile: selectedUser.mobile,
      //   productName: selectedProduct.productName,
      //   quantity: selectedProduct.quantity,
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
          .post("http://localhost:8070/api/reorders/reorder/save", data)
          .then((res) => {
            if (res.data.success) {
              setState({
                confirmation: true,
                name: "",
                mobile: "",
                email: "",
                productName: "",
                quantity: "",
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
                        <p className="block mt-2 mb-1 font-sans text-x1 antialiased font-medium leading-normal text-blue-gray-900">
                          <label>Supplier Name</label>
                        </p>
                        <select
                          id="transportDropdown"
                          value={selectedUserName}
                          onChange={handleChange}
                          className="peer bg-white h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all"
                        >
                          <option value="">Select Supplier Name</option>
                          {Users.map((item, index) => (
                            <option key={index} value={item.name}>
                              {capitalizeSecondPart(item.name)}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="mt-4 mb-4">
                        <p className="block mt-2 mb-1 font-sans text-x1 antialiased font-medium leading-normal text-blue-gray-900">
                          <label>Mobile</label>
                        </p>
                        <Input
                          label="Mobile"
                          value={selectedUser.mobile}
                          size="lg"
                          type="number"
                          disabled
                        />
                      </div>
                      <div className="mt-4 mb-4">
                        <p className="block mt-2 mb-1 font-sans text-x1 antialiased font-medium leading-normal text-blue-gray-900">
                          <label>Email</label>
                        </p>
                        <Input
                          label="Email"
                          value={selectedUser.email}
                          size="lg"
                          type="email"
                          disabled
                        />
                      </div>
                    </div>

                    <div>
                      <div className="mt-4 mb-4">
                        <p className="block mt-2 mb-1 font-sans text-x1 antialiased font-medium leading-normal text-blue-gray-900">
                          <label>Product Name</label>
                        </p>
                        <select
                          id="transportDropdown"
                          value={selectedUserName}
                          onChange={handleChange}
                          className="peer bg-white h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all"
                        >
                          <option value="">Select Supplier Name</option>
                          {items.map((item, index) => (
                            <option
                              key={index}
                              value={item.products.productName}
                            >
                              {capitalizeSecondPart(item.productName)}
                            </option>
                          ))}
                        </select>
                      </div>
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
