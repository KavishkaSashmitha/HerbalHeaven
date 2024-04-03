import React, { Component } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "jspdf-autotable";
import { SidebarWithBurgerMenu } from "../components/navBar";
import ProfileMenu from "../components/Profile";
import { Footer } from "../components/Footer";
import { Button, Card, CardBody, Input } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { Breadcrumbs } from "@material-tailwind/react";

export default class Posts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 1,
      posts: [],
      isScrollDisabled: false,
    };
  }

  componentDidMount() {
    this.retrievePosts();
  }

  retrievePosts() {
    axios.get("http://localhost:8070/api/posts/posts").then((res) => {
      if (res.data.success) {
        this.setState({
          posts: res.data.existingPosts,
        });
      }
    });
  }

  onDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this supplier!",
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
            Swal.fire("Deleted!", "Supplier has been deleted.", "success");
            this.retrievePosts();
          });
      }
    });
  };

  filterData(posts, searchKey) {
    const result = posts.filter(
      (post) =>
        post.name.toLowerCase().includes(searchKey) ||
        post.jobrole.toLowerCase().includes(searchKey) ||
        post.gender.toLowerCase().includes(searchKey) ||
        post.mobile.toLowerCase().includes(searchKey) ||
        post.email.toLowerCase().includes(searchKey) ||
        post.address.toLowerCase().includes(searchKey) ||
        post.age.toLowerCase().includes(searchKey)
    );

    this.setState({ posts: result, currentPage: 1 }); // Reset currentPage when applying a filter
  }

  handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value;

    axios.get("http://localhost:8070/api/posts/posts").then((res) => {
      if (res.data.success) {
        this.filterData(res.data.existingPosts, searchKey);
      }
    });
  };

  capitalizeSecondPart(name) {
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

  render() {
    if (this.state.isScrollDisabled) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return (
      <>
        <Card>
          <div className="bg-image">
            <div className="relative flex justify-between">
              <SidebarWithBurgerMenu />
              <ProfileMenu />
            </div>
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
                <Link to="#">
                  <li class="flex items-center font-sans text-sm antialiased font-normal leading-normal transition-colors duration-300 cursor-pointer text-blue-gray-900 hover:text-cyan-100">
                    <span>Dashboard</span>

                    <span class=" font-sans text-sm antialiased font-normal leading-normal pointer-events-none select-none text-blue-gray-500"></span>
                  </li>
                </Link>
                <Link to="/emp">
                  <li class="flex items-center font-sans text-sm antialiased font-normal leading-normal transition-colors duration-300 cursor-pointer text-blue-gray-900 hover:text-cyan-100">
                    <span>Employee</span>

                    <span class=" font-sans text-sm antialiased font-normal leading-normal pointer-events-none select-none text-blue-gray-500"></span>
                  </li>
                </Link>
              </Breadcrumbs>
            </div>
            <div className="relative flex flex-col w-screen h-auto text-gray-700  ">
              <div className="relative ml-4 mr-8 mt-4 overflow-hidden text-gray-700">
                <div className="flex items-start justify-between flex-row sm:flex-row gap-8 mb-8">
                  <div className="">
                    <h5 className="block font-sans text-x1 antialiased font-bold leading-snug tracking-normal text-gray-100">
                      Employee List
                    </h5>
                    <p className="block mt-1 font-sans text-base antialiased font-normal leading-relaxed text-gray-300">
                      See information about all employees
                    </p>
                  </div>
                  <div className="flex flex-row gap-2 shrink-0 sm:flex-row">
                    <Link to="/emp/add">
                      <Button
                        variant="gradient"
                        color="blue"
                        className="flex items-center gap-3 "
                        href=""
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
                        class="w-5 h-5"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        ></path>
                      </svg>
                    </div>
                    <input
                      class="peer h-full w-full rounded-[7px] border border-blue-gray-100 border-t-transparent bg-transparent px-3 py-2.5 !pr-9 font-sans text-sm font-normal text-white outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-100 focus:border-2 focus:border-gray-100 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                      placeholder=" "
                    />
                    <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-200 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-100 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-100 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-100 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-200 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-200 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-200 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-100">
                      Search
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="m-4 overflow-x-auto ">
              <CardBody>
                <table className="w-full divide-y divide-gray-200 dark:divide-gray-700 mt-4 rounded-lg text-left table-auto min-w-max bg-blue-gray-100 opacity-95">
                  <thead>
                    <tr>
                      <th className="p-4  ">
                        <p className="block font-sans text-x1 antialiased font-bold leading-none text-blue-gray-900 ">
                          #
                        </p>
                      </th>
                      <th className="p-4   ">
                        <p className="block font-sans text-x1 antialiased font-bold leading-none text-blue-gray-900 ">
                          Employee Name
                        </p>
                      </th>
                      <th className="p-4   ">
                        <p className="block font-sans text-x1 antialiased font-bold leading-none text-blue-gray-900 ">
                          Jobrole
                        </p>
                      </th>
                      <th className="p-4   ">
                        <p className="block font-sans text-x1 antialiased font-bold leading-none text-blue-gray-900 ">
                          Gender
                        </p>
                      </th>
                      <th className="p-4   ">
                        <p className="block font-sans text-x1 antialiased font-bold leading-none text-blue-gray-900 ">
                          Mobile
                        </p>
                      </th>
                      <th className="p-4   ">
                        <p className="block font-sans text-x1 antialiased font-bold leading-none text-blue-gray-900 ">
                          Email
                        </p>
                      </th>
                      <th className="p-4   ">
                        <p className="block font-sans text-x1 antialiased font-bold leading-none text-blue-gray-900 ">
                          Address
                        </p>
                      </th>
                      <th className="p-4   ">
                        <p className="block font-sans text-x1 antialiased font-bold leading-none text-blue-gray-900 ">
                          Age
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
                    {this.state.posts.map((post, index) => {
                      return (
                        <tr key={index}>
                          <td className="p-4">
                            <div className="flex items-center gap-3 ">
                              <div className="flex flex-col ">
                                <p className="block  font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900">
                                  {index + 1}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4   ">
                            <div className="flex items-center gap-3">
                              <div className="flex flex-col">
                                <p className="block font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900">
                                  <a
                                    href={`/posts/post/${post._id}`}
                                    style={{ textDecoration: "none" }}
                                  >
                                    {this.capitalizeSecondPart(post.name)}
                                  </a>
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
                                  {post.gender?.charAt(0)?.toUpperCase() +
                                    post.gender?.slice(1)}
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
                            <div className="flex items-center gap-3">
                              <div className="flex flex-col">
                                <p className="block font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900">
                                  {post.address
                                    ?.split(",")
                                    .map((part) => {
                                      const trimmedPart = part.trim();
                                      return (
                                        trimmedPart.charAt(0).toUpperCase() +
                                        trimmedPart.slice(1).toLowerCase()
                                      );
                                    })
                                    .join(", ")}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4   ">
                            <div className="flex items-center gap-3">
                              <div className="flex flex-col">
                                <p className="block font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900">
                                  {post.age}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4   ">
                            <div>
                              <a
                                className="btn btn-primary mr-2"
                                href={`/emp/edit/${post._id}`}
                              >
                                <Button color="green">
                                  <i className="fas fa-edit mr-2"></i>Edit
                                </Button>
                              </a>

                              <a
                                className=""
                                onClick={() => this.onDelete(post._id)}
                              >
                                <Button color="red">
                                  <i className="fas fa-trash-alt mr-2"></i>
                                  Delete
                                </Button>
                              </a>
                            </div>
                          </td>
                          <td className="p-4  ">
                            <a href={`/SalaryReport/${post._id}`}>
                              <Button
                                color="green"
                                className="btn btn-secondary"
                              >
                                <i className="fas fa-file mr-2"></i>Report
                              </Button>
                            </a>
                          </td>
                          <td className="p-4  ">
                            <a href={`/Emp_User_Chart/${post._id}`}>
                              <Button
                                color="green"
                                className="btn btn-secondary"
                              >
                                <i className="fas fa-file mr-2"></i>chart
                              </Button>
                            </a>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </CardBody>
              <div class="flex items-center gap-4">
                <button
                  disabled
                  class="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-300 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    aria-hidden="true"
                    class="w-4 h-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                    ></path>
                  </svg>
                  Previous
                </button>
                <div class="flex items-center gap-2">
                  <button
                    class="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg bg-gray-300 text-center align-middle font-sans text-xs font-medium uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                  >
                    <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                      1
                    </span>
                  </button>
                  <button
                    class="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-300 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                  >
                    <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                      2
                    </span>
                  </button>
                  <button
                    class="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-300 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                  >
                    <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                      3
                    </span>
                  </button>
                  <button
                    class="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-300 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                  >
                    <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                      4
                    </span>
                  </button>
                  <button
                    class="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-300 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                  >
                    <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                      5
                    </span>
                  </button>
                </div>
                <button
                  class="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-300 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  type="button"
                >
                  Next
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    aria-hidden="true"
                    class="w-4 h-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
            <a href="./EmployeeChart">
              <Button>chart</Button>
            </a>
            <a href="./Emp_User_Chart">
              <Button>user</Button>
            </a>
          </div>
          <Footer />
        </Card>
      </>
    );
  }
}
