import React, { useState, useEffect } from "react";
import axios from "axios";
import { DefaultSidebar } from "../components/Manager-Sidebar";
import AdminNavbar from "../components/AdminNavbar";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  IconButton,
  Input,
  Typography,
} from "@material-tailwind/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";

export function getStatusColor(status) {
  switch (status) {
    case "Paid":
    case "Delivered":
      return "text-green-900 bg-green-500/20";
    case "Canceled":
    case "Unpaid":
      return "text-red-900 bg-red-500/20";
    case "Preparing":
      return "text-blue-900 bg-blue-500/20";
    default:
      return "";
  }
}

export default function Order() {
  const [orders, setOrders] = useState([]);
  const [originalOrders, setOriginalOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(4); // Number of orders per page

  useEffect(() => {
    retrieveOrders();
  }, []);

  const retrieveOrders = () => {
    axios.get("http://localhost:8070/api/orders/orders").then((res) => {
      if (res.data.success) {
        setOrders(res.data.existingOrders);
        setOriginalOrders(res.data.existingOrders);
      }
    });
  };

  const onDelete = (id) => {
    axios
      .delete(`http://localhost:8070/api/orders/order/delete/${id}`)
      .then((_res) => {
        alert("Deleted successfully");
        retrieveOrders();
      });
  };

  const handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value.toLowerCase();

    const filteredOrders = originalOrders.filter((order) => {
      const userMatch =
        order.user && order.user.toLowerCase().includes(searchKey);
      const addressMatch =
        order.shippingAddress &&
        order.shippingAddress.address &&
        order.shippingAddress.address.toLowerCase().includes(searchKey);
      const cityMatch =
        order.shippingAddress &&
        order.shippingAddress.city &&
        order.shippingAddress.city.toLowerCase().includes(searchKey);

      return userMatch || addressMatch || cityMatch;
    });

    setOrders(filteredOrders);
  };

  const toggleSidebar = () => {
    setOpen(!open);
  };

  const [open, setOpen] = useState(false);

  // Change page
  const indexOfLastItem = currentPage * ordersPerPage;
  const indexOfFirstItem = indexOfLastItem - ordersPerPage;
  const currentItems = (orders ?? originalOrders).slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(originalOrders.length / ordersPerPage); i++) {
    pageNumbers.push(i);
  }
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(currentPage + 1);
  const prevPage = () => setCurrentPage(currentPage - 1);
  return (
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
        <div className="flex flex-col flex-1 ">
          <AdminNavbar toggleSidebar={toggleSidebar} />

          <Card className="flex flex-col flex-1 ml-2 ">
            <Typography className="h2 text-3xl font-bold mt-4 mb-2 mr-2 ml-2">
              All Orders List
            </Typography>
            <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
              <div className="card w-full">
                <div className="flex items-center p-4 bg-gray-100 rounded-lg shadow-xl dark:bg-gray-800">
                  <div className="p-3 mr-4 text-green-500 bg-green-100 rounded-full dark:text-orange-100 dark:bg-orange-500">
                    <svg
                      class="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                      Order
                    </p>
                    <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
                      15
                    </p>
                  </div>
                </div>
              </div>
              <div className="card w-full">
                <div className="flex items-center p-4 bg-gray-100 rounded-lg shadow-xl dark:bg-gray-800">
                  <div className="p-3 mr-4 text-green-500 bg-green-100 rounded-full dark:text-orange-100 dark:bg-orange-500">
                    <svg
                      class="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                      Orders
                    </p>
                    <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
                      20
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center ml-2 mb-4">
              <Input
                type="text"
                placeholder="Search by product name"
                onChange={handleSearchArea}
                className="mr-2"
                label="search"
              />
              {/* Button to generate report */}
            </div>
            <CardBody>
              <div>
                <table className="w-full text-left min-w-max">
                  <thead>
                    <tr>
                      <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                        <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                          #
                        </p>
                      </th>
                      <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                        <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                          Customer Name
                        </p>
                      </th>
                      <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                        <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                          Shipping Address
                        </p>
                      </th>
                      <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                        <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                          Payment Status
                        </p>
                      </th>
                      <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                        <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                          Order Status
                        </p>
                      </th>
                      <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                        <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                          Items
                        </p>
                      </th>
                      <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                        <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                          Total
                        </p>
                      </th>
                      <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                        <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                          Actions
                        </p>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((order, index) => (
                      <tr key={index}>
                        <td className="p-4 border-b border-blue-gray-50">
                          <div className="flex items-center gap-3">
                            <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                              {index + 1}
                            </p>
                          </div>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                            {order.user}
                          </p>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                            {order.shippingAddress.address},{" "}
                            {order.shippingAddress.city},{" "}
                            {order.shippingAddress.zip}
                          </p>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          <div className="w-max">
                            <div
                              className={`relative grid items-center px-2 py-1 font-sans text-xs font-bold uppercase rounded-md select-none whitespace-nowrap ${getStatusColor(
                                order.paymentStatus
                              )}`}
                            >
                              <span>{order.paymentStatus}</span>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          <div className="w-max">
                            <div
                              className={`relative grid items-center px-2 py-1 font-sans text-xs font-bold uppercase rounded-md select-none whitespace-nowrap ${getStatusColor(
                                order.orderStatus
                              )}`}
                            >
                              <span>{order.orderStatus}</span>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          <div className="flex items-center gap-3">
                            <div className="flex flex-col">
                              <ul>
                                {order.items.map((m) => (
                                  <li
                                    key={m._id}
                                    className="block font-sans text-sm antialiased font-normal leading-normal capitalize text-blue-gray-900"
                                  >
                                    {m.name}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          <div className="flex items-center gap-3">
                            <p className="block font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900">
                              Rs.{order.total}
                            </p>
                          </div>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          <a
                            className="btn btn-warning"
                            href={`/edit/${order._id}`}
                          >
                            <i className="fas fa-edit"></i>&nbsp;EDIT
                          </a>
                          &nbsp;
                          <a
                            className="btn btn-danger"
                            href="#"
                            onClick={() => onDelete(order._id)}
                          >
                            <i className="fas fa-trash-alt"></i>&nbsp;DELETE
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardBody>
            <CardFooter className="flex justify-center items-center mb-2">
              <Button
                variant="outlined"
                size="sm"
                onClick={prevPage}
                disabled={currentPage === 1}
                className="mr-2"
              >
                Previous
              </Button>
              <div className="flex gap-2">
                {pageNumbers.map((number) => (
                  <IconButton
                    key={number}
                    variant={number === currentPage ? "filled" : "outlined"}
                    size="sm"
                    onClick={() => paginate(number)}
                    className={`${
                      number === currentPage
                        ? "bg-blue-500 text-white"
                        : "text-blue-500"
                    }`}
                  >
                    {number}
                  </IconButton>
                ))}
              </div>
              <Button
                variant="outlined"
                size="sm"
                onClick={nextPage}
                disabled={indexOfLastItem >= originalOrders.length}
                className="ml-2"
              >
                Next
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
