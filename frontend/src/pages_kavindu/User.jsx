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
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = React.useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Change this number to set the number of items per page
  const toggleSidebar = () => {
    setOpen(!open);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8070/sup/getSuppliers")
      .then((result) => setUsers(result.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      axios
        .delete(`http://localhost:8070/sup/deleteSupplier/${id}`)
        .then(() => {
          setUsers(users.filter((user) => user._id !== id));
        })
        .catch((err) => console.log(err));
    }
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

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
              <div className="mb-5  flex justify-end">
                <div>
                  <Link to="/sup/addsup">
                    <Button
                      color="amber"
                      className="mr-3 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-black shadow-md shadow-amber-500/20 transition-all hover:shadow-lg hover:shadow-amber-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    >
                      Add Supplier
                    </Button>
                  </Link>
                  <Button
                    color="red"
                    className="py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-black shadow-md shadow-amber-500/20 transition-all hover:shadow-lg hover:shadow-amber-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  >
                    Generate Report
                  </Button>
                </div>
              </div>
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
                          "Raw Material_02",
                          "Raw Material_03",
                          "Mobile",
                          "Address",
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
                        .map((user) => (
                          <tr
                            key={user._id}
                            className="border-b border-blue-gray-100 bg-blue-gray-50/50"
                          >
                            <td className="p-4">{user.name}</td>
                            <td className="p-4">{user.email}</td>
                            <td className="p-4">{user.rawMaterial1}</td>
                            <td className="p-4">{user.rawMaterial2}</td>
                            <td className="p-4">{user.rawMaterial3}</td>
                            <td className="p-4">{user.mobile}</td>
                            <td className="p-4">{user.address}</td>
                            <td className="p-4">
                              <Link
                                to={`/sup/update/${user._id}`}
                                className="btn btn-warning mr-3"
                              >
                                <Button color="yellow">
                                  <i
                                    className="fas fa-edit"
                                    style={{ fontSize: "20px" }}
                                  ></i>
                                </Button>
                              </Link>
                              <Button
                                color="red"
                                onClick={() => handleDelete(user._id)}
                              >
                                <i
                                  className="fas fa-trash-alt"
                                  style={{ fontSize: "20px" }}
                                ></i>
                              </Button>
                              <Link
                                to={`/sup/material_report/${user._id}`}
                                className="btn btn-warning "
                              >
                                <Button
                                  color="green"
                                  className="btn btn-secondary ml-2"
                                >
                                  <i
                                    className="fas fa-file"
                                    style={{ fontSize: "20px" }}
                                  ></i>
                                </Button>
                              </Link>
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
                      { length: Math.ceil(users.length / itemsPerPage) },
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
                <Footer />
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
