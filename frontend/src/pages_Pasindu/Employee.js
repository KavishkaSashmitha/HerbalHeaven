import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "jspdf-autotable";
import { SidebarWithBurgerMenu } from "../components/navBar";
import ProfileMenu from "../components/Profile";
import { Footer } from "../components/Footer";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  IconButton,
  Avatar,
  Input,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { Breadcrumbs } from "@material-tailwind/react";
import AdminNavbar from "../components/AdminNavbar";
import { DefaultSidebar } from "../components/Manager-Sidebar";
import createLoadingScreen from "./LoadingScreen";

export default function Posts() {
  const [post, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [open, setOpen] = React.useState(0);
  const [loading, setLoading] = useState(true);

  const toggleSidebar = () => {
    setOpen(!open);
  };

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedPosts = (
    filteredPosts.length > 0 ? filteredPosts : post
  ).slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(currentPage + 1);
  const prevPage = () => setCurrentPage(currentPage - 1);

  //generate page numbers
  const pageNumbers = [];
  for (
    let i = 1;
    i <=
    Math.ceil(
      (filteredPosts.length > 0 ? filteredPosts : post).length / itemsPerPage
    );
    i++
  ) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    retrievePosts();
  }, []);

  function retrievePosts() {
    axios
      .get("http://localhost:8070/api/posts/posts")
      .then((res) => {
        if (res.data.success) {
          setPosts(res.data.existingPosts);

          // Add setTimeout to setLoading after data retrieval
          setTimeout(() => {
            setLoading(false);
          }, 800);
        }
      })
      .catch((error) => console.error("Error fetching posts:", error));
  }

  const onDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this Employee!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:8070/api/posts/post/delete/${id}`)
          .then((res) => {
            Swal.fire("Deleted!", "Employee has been deleted.", "success");
            retrievePosts();
          });
      }
    });
  };

  function filterData(searchKey) {
    // Convert the search key to lowercase to allow case-insensitive matching
    const lowerCaseSearchKey = searchKey.toLowerCase();

    // Filter the 'post' list based on whether the specified properties include the search key
    const result = post.filter(
      (post) =>
        post.name.toLowerCase().includes(lowerCaseSearchKey) ||
        post.jobrole.toLowerCase().includes(lowerCaseSearchKey) ||
        post.gender.toLowerCase().includes(lowerCaseSearchKey) ||
        post.mobile.toLowerCase().includes(lowerCaseSearchKey) ||
        post.email.toLowerCase().includes(lowerCaseSearchKey) ||
        post.address.toLowerCase().includes(lowerCaseSearchKey) ||
        post.age.toString().toLowerCase().includes(lowerCaseSearchKey)
    );

    // Update the filtered posts and reset the current page
    setFilteredPosts(result);
    setCurrentPage(1);
  }

  const handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value;
    filterData(searchKey);
    // axios.get("http://localhost:8070/api/posts/posts").then((res) => {
    //   if (res.data.success) {
    //     filterData(res.data.existingPosts, searchKey);
    //   }
    // });
  };

  useEffect(() => {
    if (!(filteredPosts.length > 0)) {
      setFilteredPosts(post);
    }
  }, [filteredPosts]);

  function capitalizeSecondPart(name) {
    if (!name) return "";

    const parts = name.split(" "); // Split the name into parts

    // Iterate over each part and capitalize the first letter
    for (let i = 0; i < parts.length; i++) {
      parts[i] =
        parts[i].charAt(0).toUpperCase() + parts[i].slice(1).toLowerCase();
    }

    // Join the parts back into a single string
    return parts.join(" ");
  }

  if (loading) {
    return <div>{createLoadingScreen(loading)}</div>;
  }

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
              <div className="mb-12 md:items-center">
                <Breadcrumbs>
                  <Link to="/">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 hover:text-amber-900"
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
                </Breadcrumbs>
              </div>
              <div className="relative flex flex-col w-screen h-auto text-gray-700  pr-4">
                <div className="relative mr-8 overflow-hidden text-gray-700">
                  <div className="flex items-start justify-between flex-row sm:flex-row gap-8 mb-8">
                    <div className="">
                      <h5 className="block font-sans text-x1 antialiased font-bold leading-snug tracking-normal text-gray-800">
                        Employee List
                      </h5>
                      <p className="block mt-1 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
                        See information about all employees
                      </p>
                    </div>
                    <div className="flex flex-row gap-2 shrink-0 sm:flex-row">
                      <Link to="/emp/add">
                        <Button
                          style={{ backgroundColor: "#02353c", color: "white" }} // Set background color inline
                          className="flex items-center gap-3"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden="true"
                            strokeWidth="2"
                            className="w-4 h-4"
                          >
                            <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z"></path>
                          </svg>
                          Add Employee
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <div class="w-full md:w-72 ">
                    <div class="relative h-10 w-full min-w-[200px]">
                      <div class="absolute grid w-5 h-5 top-2/4 right-3 -translate-y-2/4 place-items-center text-blue-gray-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          aria-hidden="true"
                          class="w-5 h-5 text-black"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                          ></path>
                        </svg>
                      </div>
                      <input
                        class="peer h-full w-full rounded-[7px] border border-black border-t-transparent bg-transparent px-3 py-2.5 !pr-9 font-sans text-sm font-normal text-black outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-black placeholder-shown:border-t-black focus:border-2 focus:border-black focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-black"
                        placeholder=" "
                        onChange={(e) => handleSearchArea(e)}
                      />
                      <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-black transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-black before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-black after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-black peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-black peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-black peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-black peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-black">
                        Search
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardBody className="p-4">
              <div className="overflow-x-auto ">
                <table className="w-full divide-y divide-gray-200 dark:divide-gray-700 mt-4 rounded-lg text-left table-auto min-w-max bg-blue-gray-200 opacity-95">
                  <thead>
                    <tr>
                      <th className="p-4  ">
                        <p className="block font-sans text-x1 antialiased font-bold leading-none text-blue-gray-900 ">
                          #
                        </p>
                      </th>

                      <th className="p-4   ">
                        <p className="block font-sans text-x1 antialiased font-bold leading-none text-blue-gray-900 ">
                          Employee
                        </p>
                      </th>
                      <th className="p-4   ">
                        <p className="block font-sans text-x1 antialiased font-bold leading-none text-blue-gray-900 ">
                          Jobrole
                        </p>
                      </th>

                      <th className="p-4   ">
                        <p className="block font-sans text-x1 antialiased font-bold leading-none text-blue-gray-900 ">
                          Mobile
                        </p>
                      </th>

                      <th className="p-4   ">
                        <p className="block font-sans text-x1 antialiased font-bold leading-none text-blue-gray-900 ">
                          NIC
                        </p>
                      </th>

                      <th className="p-4   ">
                        <p className="block font-sans text-x1 antialiased font-bold leading-none text-blue-gray-900 ">
                          Email
                        </p>
                      </th>

                      <th className="p-4   ">
                        <p className="block font-sans text-x1 antialiased font-bold leading-none text-gray-900">
                          Action
                        </p>
                      </th>
                      <th className="p-4   ">
                        <p className="block font-sans text-x1 antialiased font-bold leading-none text-gray-900">
                          Report
                        </p>
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y">
                    {paginatedPosts.map((post, index) => (
                      <tr key={index}>
                        <td className="p-4">
                          <div className="flex items-center gap-3 ">
                            <div className="flex flex-col ">
                              <p className="block  font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900">
                                {(currentPage - 1) * itemsPerPage + index + 1}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4   ">
                          <div className="flex items-center gap-3">
                            <div className="flex flex-col">
                              <p className="block font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900">
                                <Avatar
                                  src={post.image}
                                  size="md"
                                  className="mr-3 border border-blue-gray-50 bg-blue-gray-50/50 object-contain"
                                />
                                <span style={{ textDecoration: "none" }}>
                                  {capitalizeSecondPart(post.name)}
                                </span>
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4   ">
                          <div className="flex items-center gap-3">
                            <div className="flex flex-col">
                              <p className="block font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900">
                                {post.jobrole}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="p-4   ">
                          <div className="flex items-center gap-3">
                            <div className="flex flex-col">
                              <p className="block font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900">
                                {post.mobile}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="flex flex-col">
                              <p className="block font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900">
                                {post &&
                                post.nic &&
                                typeof post.nic === "string"
                                  ? post.nic.length === 9
                                    ? post.nic.slice(0, 9) + "v"
                                    : post.nic
                                  : "NIC not available"}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="p-4   ">
                          <div className="flex items-center gap-3">
                            <div className="flex flex-col">
                              <p className="block font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900">
                                {post.email?.toLowerCase()}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="p-4   ">
                          <div>
                            <a
                              className="btn btn-primary mr-2"
                              href={`/Display_Employee_Details/${post._id}`}
                            >
                              <Button color="green">
                                <i
                                  className="fas fa-eye"
                                  style={{ fontSize: "20px" }}
                                ></i>
                              </Button>
                            </a>

                            <a
                              className="btn btn-primary mr-2"
                              href={`/emp/edit/${post._id}`}
                            >
                              <Button color="yellow">
                                <i
                                  className="fas fa-edit"
                                  style={{ fontSize: "20px" }}
                                ></i>
                              </Button>
                            </a>

                            <a className="" onClick={() => onDelete(post._id)}>
                              <Button color="red">
                                <i
                                  className="fas fa-trash-alt"
                                  style={{ fontSize: "20px" }}
                                ></i>
                              </Button>
                            </a>
                          </div>
                        </td>
                        <td className="p-4  ">
                          <a href={`/SalaryReport/${post._id}`}>
                            <Button color="green" className="btn btn-secondary">
                              <i
                                className="fas fa-file"
                                style={{ fontSize: "20px" }}
                              ></i>
                            </Button>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardBody>
            <CardFooter className="flex items-center justify-between border-t border-transparent p-4">
              <Button
                className=""
                style={{ backgroundColor: "#02353c", color: "white" }}
                variant="outlined"
                size="sm"
                onClick={prevPage}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <div className="flex items-center gap-2 ">
                {pageNumbers.map((number) => (
                  <IconButton
                    className=""
                    style={{ backgroundColor: "#02353c", color: "white" }}
                    key={number}
                    variant={number === currentPage ? "outlined" : "text"}
                    size="sm"
                    onClick={() => paginate(number)}
                  >
                    {number}
                  </IconButton>
                ))}
              </div>
              <Button
                className=""
                style={{ backgroundColor: "#02353c", color: "white" }}
                variant="outlined"
                size="sm"
                onClick={nextPage}
                disabled={
                  indexOfLastItem >=
                  (filteredPosts.length > 0 ? filteredPosts : post).length
                }
              >
                Next
              </Button>
            </CardFooter>
            <Footer />
          </Card>
        </div>
      </div>
    </>
  );
}
