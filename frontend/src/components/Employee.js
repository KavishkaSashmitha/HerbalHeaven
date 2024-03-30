import React, { Component } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import "jspdf-autotable";
import generatePDF from "./SalaryReport";
import { SidebarWithBurgerMenu } from "./navBar";
import { Link } from "react-router-dom";
import SalaryReport from "./SalaryReport";

export default class Posts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
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

    this.setState({ posts: result });
  }

  handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value;

    axios.get("http://localhost:8070/api/posts/posts").then((res) => {
      if (res.data.success) {
        this.filterData(res.data.existingPosts, searchKey);
      }
    });
  };

  render() {
    return (
      <>
        <div className="bg-image">
          <SidebarWithBurgerMenu />
          <div class=" relative flex flex-col w-screen h-auto text-gray-700  ">
            <div class="relative ml-4 mr-8 mt-4 overflow-hidden text-gray-700  ">
              <div class="flex items-center justify-between gap-8 mb-8">
                <div>
                  <h5 class="block font-sans text-x1 antialiased font-bold leading-snug tracking-normal text-gray-100">
                    Employee List
                  </h5>
                  <p class="block mt-1 font-sans text-base antialiased font-normal leading-relaxed text-gray-300">
                    See information about all employee
                  </p>
                </div>
                <div class="flex flex-raw gap-2 shrink-0 sm:flex-row">
                  <a
                    class="flex select-none items-center gap-3 rounded-lg bg-cyan-200 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-gray-700 shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    href="./emp/add"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      stroke-width="2"
                      class="w-4 h-4"
                    >
                      <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z"></path>
                    </svg>
                    Add Employee
                  </a>
                </div>
              </div>
              <div class="flex flex-col items-center justify-between gap-4 md:flex-row">
                <div class="block w-full overflow-hidden md:w-max"></div>
                <div class="w-full md:w-72">
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
                      class="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 !pr-9 font-sans text-sm font-normal text-amber-100 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-400 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                      placeholder=" "
                      onChange={this.handleSearchArea}
                    />
                    <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-100 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-yellow-400 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-400 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-400 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                      Search
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div class="p-5 mr-4 h-screen ">
              <table class="w-full mt-4  text-left table-auto min-w-max  bg-blue-gray-50/50">
                <tr>
                  <th class="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                    <p class="block font-sans text-x1 antialiased font-bold leading-none text-blue-gray-900 ">
                      #
                    </p>
                  </th>
                  <th class="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                    <p class="block font-sans text-x1 antialiased font-bold leading-none text-blue-gray-900 ">
                      Employee Name
                    </p>
                  </th>
                  <th class="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                    <p class="block font-sans text-x1 antialiased font-bold leading-none text-blue-gray-900 ">
                      Jobrole
                    </p>
                  </th>
                  <th class="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                    <p class="block font-sans text-x1 antialiased font-bold leading-none text-blue-gray-900 ">
                      Gender
                    </p>
                  </th>
                  <th class="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                    <p class="block font-sans text-x1 antialiased font-bold leading-none text-blue-gray-900 ">
                      Mobile
                    </p>
                  </th>
                  <th class="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                    <p class="block font-sans text-x1 antialiased font-bold leading-none text-blue-gray-900 ">
                      Email
                    </p>
                  </th>
                  <th class="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                    <p class="block font-sans text-x1 antialiased font-bold leading-none text-blue-gray-900 ">
                      Address
                    </p>
                  </th>
                  <th class="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                    <p class="block font-sans text-x1 antialiased font-bold leading-none text-blue-gray-900 ">
                      Age
                    </p>
                  </th>
                  <th class="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                    <p class="block font-sans text-x1 antialiased font-bold leading-none text-gray-900">
                      Action
                    </p>
                  </th>
                  <th class="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                    <p class="block font-sans text-x1 antialiased font-bold leading-none text-gray-900">
                      Report
                    </p>
                  </th>
                </tr>

                <tbody>
                  {this.state.posts.map((post, index) => {
                    return (
                      <tr key={index}>
                        <td class="p-4 border-b border-blue-gray-100 bg-blue-gray-50/50">
                          <div class="flex items-center gap-3 ">
                            <div class="flex flex-col ">
                              <p class="block  font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900">
                                {index + 1}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td class="p-4 border-b border-blue-gray-100 bg-blue-gray-50/50">
                          <div class="flex items-center gap-3">
                            <div class="flex flex-col">
                              <p class="block font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900">
                                <p
                                  href={`/posts/post/${post._id}`}
                                  style={{ textDecoration: "none" }}
                                >
                                  {post.name}
                                </p>
                              </p>
                            </div>
                          </div>
                        </td>
                        <td class="p-4 border-b border-blue-gray-100 bg-blue-gray-50/50">
                          <div class="flex items-center gap-3">
                            <div class="flex flex-col">
                              <p class="block font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900">
                                {post.jobrole}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td class="p-4 border-b border-blue-gray-100 bg-blue-gray-50/50">
                          <div class="flex items-center gap-3">
                            <div class="flex flex-col">
                              <p class="block font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900">
                                {post.gender}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td class="p-4 border-b border-blue-gray-100 bg-blue-gray-50/50">
                          <div class="flex items-center gap-3">
                            <div class="flex flex-col">
                              <p class="block font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900">
                                {post.mobile}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td class="p-4 border-b border-blue-gray-100 bg-blue-gray-50/50">
                          <div class="flex items-center gap-3">
                            <div class="flex flex-col">
                              <p class="block font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900">
                                {post.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td class="p-4 border-b border-blue-gray-100 bg-blue-gray-50/50">
                          <div class="flex items-center gap-3">
                            <div class="flex flex-col">
                              <p class="block font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900">
                                {post.address}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td class="p-4 border-b border-blue-gray-100 bg-blue-gray-50/50">
                          <div class="flex items-center gap-3">
                            <div class="flex flex-col">
                              <p class="block font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900">
                                {post.age}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td class="p-4 border-b border-blue-gray-100 bg-blue-gray-50/50">
                          <a
                            className="select-none rounded-lg bg-amber-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-black shadow-md shadow-amber-500/20 transition-all hover:shadow-lg hover:shadow-amber-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            href={`/emp/edit/${post._id}`}
                          >
                            <i className="fas fa-edit mr-2"></i>Edit
                          </a>
                          &nbsp;&nbsp;
                          <button
                            className="select-none rounded-lg bg-red-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-black shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            onClick={() => this.onDelete(post._id)}
                          >
                            <i className="fas fa-trash-alt mr-2"></i>Delete
                          </button>
                        </td>
                        <td class="p-4 border-b border-blue-gray-100 bg-blue-gray-50/50">
                          <a
                            className="select-none rounded-lg bg-deep-orange-100 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-deep-orange-900 shadow-md shadow-amber-500/20 transition-all hover:shadow-lg hover:shadow-amber-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            href={`/SalaryReport/${post._id}`}
                          >
                            <i className="fas fa-report mr-2"></i>Salary Report
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    );
  }
}
