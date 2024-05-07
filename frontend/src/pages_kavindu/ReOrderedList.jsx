import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Input,
  Card,
  Typography,
  Button,
  CardBody,
  CardFooter,
  IconButton,
} from "@material-tailwind/react";
import { Footer } from "../components/Footer";
import AdminNavbar from "../components/AdminNavbar";
import { DefaultSidebar } from "../components/Manager-Sidebar";
import { PencilIcon } from "@heroicons/react/24/solid";

const User = () => {
  const [reorder, setReOrder] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = React.useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Change this number to set the number of items per page
  const toggleSidebar = () => {
    setOpen(!open);
  };

  function retrieveReOrder() {
    axios
      .get("http://localhost:8070/api/reorders/reorders")
      .then((res) => {
        if (res.data.success) {
          setReOrder(res.data.existingReOrders);
          // Add setTimeout to setLoading after data retrieval
          // setTimeout(() => {
          //   setLoading(false);
          // }, 800);
        }
      })
      .catch((error) => console.error("Error fetching posts:", error));
  }

  useEffect(() => {
    retrieveReOrder();
  }, []);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this order?"
    );
    if (confirmDelete) {
      axios
        .delete(`http://localhost:8070/api/reorders/reorder/delete/${id}`)
        .then(() => {
          setReOrder(reorder.filter((user) => user._id !== id));
        })
        .catch((err) => console.log(err));
    }
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = reorder.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="flex flex-col h-screen overflow-hidden overflow-x-hidden">
        <div className="flex flex-1 overflow-hidden">
          <div
            className={`sidebar w-68 bg-custom-color text-white ${
              open ? "block" : "hidden"
            }`}
          >
            <DefaultSidebar open={open} handleOpen={setOpen} />
          </div>
          <div className="flex flex-col flex-1 overflow-auto">
            <AdminNavbar toggleSidebar={toggleSidebar} />

            <Card className="flex flex-col flex-1 ml-2 mr-4">
              <h1 className="text-3xl">List of Suppliers</h1>
              <div className="mb-5  flex justify-end"></div>
              <h4>search</h4>
              <Input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-4 border-blue-gray-100 bg-blue-gray-50/50"
              />

              <CardBody className="px-0 flex flex-col flex-1">
                <div className="overflow-auto">
                  <table className="overflow-scroll mt-5 w-full min-w-max table-auto text-left border-blue-gray-100 bg-blue-gray-50/50">
                    <thead>
                      <tr>
                        {[
                          "Name",
                          "Email",
                          "Raw Material_01",
                          "Quantity",
                          "Action",
                        ].map((head, index) => (
                          <th
                            key={index}
                            className="p-4 border-b border-blue-gray-100 bg-blue-gray-50/50"
                          >
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {head}
                            </Typography>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems
                        .filter((user) =>
                          Object.values(user)
                            .join(" ")
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())
                        )
                        .map((reorder) => (
                          <tr
                            key={reorder._id}
                            className="border-b border-blue-gray-100 bg-blue-gray-50/50"
                          >
                            <td className="p-4">{reorder.name}</td>
                            <td className="p-4">{reorder.email}</td>
                            <td className="p-4">{reorder.productName}</td>
                            <td className="p-4">{reorder.quantity}</td>
                            <td className="p-4">
                              <Button
                                color="red"
                                onClick={() => handleDelete(reorder._id)}
                              >
                                <i
                                  className="fas fa-trash-alt"
                                  style={{ fontSize: "20px" }}
                                ></i>
                              </Button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </CardBody>
              <CardFooter className="flex justify-between">
                <nav>
                  <ul className="flex justify-center">
                    {Array.from(
                      { length: Math.ceil(reorder.length / itemsPerPage) },
                      (_, i) => (
                        <li key={i}>
                          <button
                            onClick={() => paginate(i + 1)}
                            className={`${
                              currentPage === i + 1
                                ? "bg-blue-500 text-white"
                                : "bg-white text-blue-500"
                            } font-medium px-4 py-2 mx-1 border border-gray-300 rounded-md`}
                          >
                            {i + 1}
                          </button>
                        </li>
                      )
                    )}
                  </ul>
                </nav>
              </CardFooter>
            </Card>
            <div className="bg-custom-color">
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
