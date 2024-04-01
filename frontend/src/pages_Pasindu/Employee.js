import React, { Component } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'jspdf-autotable';
import { SidebarWithBurgerMenu } from '../components/navBar';
import ProfileMenu from '../components/Profile';
import { Footer } from '../components/Footer';
import { Button, Input } from '@material-tailwind/react';

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
    axios.get('http://localhost:8070/api/posts/posts').then((res) => {
      if (res.data.success) {
        this.setState({
          posts: res.data.existingPosts,
        });
      }
    });
  }

  onDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this supplier!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:8070/api/posts/post/delete/${id}`)
          .then((res) => {
            Swal.fire('Deleted!', 'Supplier has been deleted.', 'success');
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

    axios.get('http://localhost:8070/api/posts/posts').then((res) => {
      if (res.data.success) {
        this.filterData(res.data.existingPosts, searchKey);
      }
    });
  };

  render() {
    if (this.state.isScrollDisabled) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return (
      <>
        <div className="bg-image">
          <div className="relative flex justify-between">
            <SidebarWithBurgerMenu />
            <ProfileMenu />
          </div>
          <div className="relative flex flex-col w-screen h-auto text-gray-700  ">
            <div className="relative ml-4 mr-8 mt-4 overflow-hidden text-gray-700  ">
              <div className="flex items-center justify-between flex-col sm:flex-row gap-8 mb-8">
                <div>
                  <h5 className="block font-sans text-x1 antialiased font-bold leading-snug tracking-normal text-gray-100">
                    Employee List
                  </h5>
                  <p className="block mt-1 font-sans text-base antialiased font-normal leading-relaxed text-gray-300">
                    See information about all employees
                  </p>
                </div>
                <div className="flex flex-row gap-2 shrink-0 sm:flex-row">
                  <Button
                    variant="gradient"
                    className="flex items-center gap-3"
                    href="./emp/add"
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
                </div>
              </div>
              <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                <div className="block w-full overflow-hidden md:w-max"></div>
                <div className="w-full md:w-72">
                  <div className="relative h-10 w-full min-w-[200px]">
                    <div className="absolute grid w-5 h-5 top-2/4 right-3 -translate-y-2/4 place-items-center text-blue-gray-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        ></path>
                      </svg>
                    </div>
                    <Input
                      className="input"
                      placeholder="Search"
                      onChange={this.handleSearchArea}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="p-5 mr-4 overflow-x-auto">
              <table className="w-full mt-4 text-left table-auto min-w-max bg-blue-gray-50/50">
                <thead>
                  <tr>
                    <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                      <p className="block font-sans text-x1 antialiased font-bold leading-none text-blue-gray-900 ">
                        #
                      </p>
                    </th>
                    <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                      <p className="block font-sans text-x1 antialiased font-bold leading-none text-blue-gray-900 ">
                        Employee Name
                      </p>
                    </th>
                    <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                      <p className="block font-sans text-x1 antialiased font-bold leading-none text-blue-gray-900 ">
                        Jobrole
                      </p>
                    </th>
                    <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                      <p className="block font-sans text-x1 antialiased font-bold leading-none text-blue-gray-900 ">
                        Gender
                      </p>
                    </th>
                    <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                      <p className="block font-sans text-x1 antialiased font-bold leading-none text-blue-gray-900 ">
                        Mobile
                      </p>
                    </th>
                    <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                      <p className="block font-sans text-x1 antialiased font-bold leading-none text-blue-gray-900 ">
                        Email
                      </p>
                    </th>
                    <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                      <p className="block font-sans text-x1 antialiased font-bold leading-none text-blue-gray-900 ">
                        Address
                      </p>
                    </th>
                    <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                      <p className="block font-sans text-x1 antialiased font-bold leading-none text-blue-gray-900 ">
                        Age
                      </p>
                    </th>
                    <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                      <p className="block font-sans text-x1 antialiased font-bold leading-none text-gray-900">
                        Action
                      </p>
                    </th>
                    <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                      <p className="block font-sans text-x1 antialiased font-bold leading-none text-gray-900">
                        Report
                      </p>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {this.state.posts.map((post, index) => {
                    return (
                      <tr key={index}>
                        <td className="p-4 border-b border-blue-gray-100 bg-blue-gray-50/50">
                          <div className="flex items-center gap-3 ">
                            <div className="flex flex-col ">
                              <p className="block  font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900">
                                {index + 1}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 border-b border-blue-gray-100 bg-blue-gray-50/50">
                          <div className="flex items-center gap-3">
                            <div className="flex flex-col">
                              <p className="block font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900">
                                <a
                                  href={`/posts/post/${post._id}`}
                                  style={{ textDecoration: 'none' }}
                                >
                                  {post.name}
                                </a>
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 border-b border-blue-gray-100 bg-blue-gray-50/50">
                          <div className="flex items-center gap-3">
                            <div className="flex flex-col">
                              <p className="block font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900">
                                {post.jobrole}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 border-b border-blue-gray-100 bg-blue-gray-50/50">
                          <div className="flex items-center gap-3">
                            <div className="flex flex-col">
                              <p className="block font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900">
                                {post.gender}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 border-b border-blue-gray-100 bg-blue-gray-50/50">
                          <div className="flex items-center gap-3">
                            <div className="flex flex-col">
                              <p className="block font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900">
                                {post.mobile}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 border-b border-blue-gray-100 bg-blue-gray-50/50">
                          <div className="flex items-center gap-3">
                            <div className="flex flex-col">
                              <p className="block font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900">
                                {post.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 border-b border-blue-gray-100 bg-blue-gray-50/50">
                          <div className="flex items-center gap-3">
                            <div className="flex flex-col">
                              <p className="block font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900">
                                {post.address}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 border-b border-blue-gray-100 bg-blue-gray-50/50">
                          <div className="flex items-center gap-3">
                            <div className="flex flex-col">
                              <p className="block font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900">
                                {post.age}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 border-b border-blue-gray-100 bg-blue-gray-50/50">
                          <Button
                            color="green"
                            className="btn btn-primary mr-2"
                            href={`/emp/edit/${post._id}`}
                          >
                            <i className="fas fa-edit mr-2"></i>Edit
                          </Button>
                          <Button
                            color="red"
                            className=""
                            onClick={() => this.onDelete(post._id)}
                          >
                            <i className="fas fa-trash-alt mr-2"></i>Delete
                          </Button>
                        </td>
                        <td className="p-4 border-b border-blue-gray-100 bg-blue-gray-50/50">
                          <Button
                            className="btn btn-secondary"
                            href={`/SalaryReport/${post._id}`}
                          >
                            <i className="fas fa-file mr-2"></i>Report
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            
          </div>
        </div>
        <Footer />
      </>
    );
  }
}
