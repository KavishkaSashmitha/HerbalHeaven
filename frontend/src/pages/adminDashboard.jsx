import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  MdDashboard,
  MdBarChart,
  IoMdHome,
} from "@material-tailwind/react";

function AdminDashboard() {
  const [open, setOpen] = useState(true);
  const [documents, setDocuments] = useState([]);

  const toggleSidebar = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8070/api/posts/posts"
        );
        setDocuments(response.data.existingPosts);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchDocuments();
  }, []);

  return (
    <div className="flex h-screen">
      <div
        className={`sidebar w-64 bg-teal-400 text-white ${
          open ? "block" : "hidden"
        }`}
      >
        <div className="text-blue-gray-700 text-base font-bold h-14 px-4 py-5">
          WELCOME, ADMIN
        </div>
        <div className="h-screen">
          <div className="text-sm">
            <a
              href="#"
              className="block py-3 px-4 border-b-2 border-cyan-800 hover:bg-white hover:text-orange-800"
            >
              Dashboard
            </a>
            <a
              href="#"
              className="block py-3 px-4 border-b-2 border-cyan-800 hover:bg-white hover:text-orange-800"
            >
              Products
            </a>
            <a
              href="#"
              className="block py-3 px-4 border-b-2 border-cyan-800 hover:bg-white hover:text-orange-800"
            >
              Sales
            </a>
            <a
              href="#"
              className="block py-3 px-4 border-b-2 border-cyan-800 hover:bg-white hover:text-orange-800"
            >
              Orders
            </a>
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="sticky top-0 bg-blue-gray-300 h-14 px-10 py-4 border-b-4 border-purple-900 flex items-center justify-between">
          <div className="flex items-center space-x-12 text-sm text-white">
            <i
              className="fas fa-bars text-xl cursor-pointer"
              onClick={toggleSidebar}
            ></i>
            <a href="#" className="font-thin">
              Dashboard
            </a>
            <a href="#" className="font-thin">
              User
            </a>
            <a href="#" className="font-thin">
              Settings
            </a>
          </div>
          <div className="flex items-center space-x-8 text-gray-400 text-base">
            <span className="relative inline-block cursor-pointer">
              <i className="fas fa-bell"></i>
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1 py-0.5 text-xs font-thin leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                99
              </span>
            </span>
            <span className="relative inline-block cursor-pointer">
              <i className="fas fa-list"></i>
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1 py-0.5 text-xs font-thin leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-purple-600 rounded-full">
                99
              </span>
            </span>
            <span className="relative inline-block cursor-pointer">
              <i className="fas fa-envelope"></i>
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1 py-0.5 text-xs font-thin leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-yellow-600 rounded-full">
                9
              </span>
            </span>
            <i className="fas fa-user-circle fa-lg cursor-pointer"></i>
            <i className="fas fa-cog fa-2x text-white cursor-pointer animate-spin hover:text-blue-gray-700"></i>
          </div>
        </div>
        <div className="sticky top-14 bg-white h-12 px-10 py-4 border-b-2 border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-gray-400 text-base">
            <span className="text-black tracking-wider font-thin text-sm">
              Home
            </span>
            <span>/</span>
            <span className="tracking-wide text-sm">
              <span
                className="hover:underline cursor-pointer"
                style={{ color: "#20a8d8", fontWeight: 100 }}
              >
                Admin
              </span>
            </span>
            <span>/</span>
            <span className="text-black tracking-wider font-thin text-sm opacity-50">
              Dashboard
            </span>
          </div>
          <div className="flex items-center space-x-6 text-gray-400 text-base text-black">
            <i className="fas fa-comment-alt mr-1 text-purple-500"></i>
            <a href="#" className="mr-3 text-black">
              <i className="fas fa-chart-line text-purple-500"></i>
              <span className="hover:text-purple-400 text-opacity-50 tracking-wider font-thin">
                Dashboard
              </span>
            </a>
            <a href="#" className="text-black">
              <i className="fas fa-cog text-purple-500"></i>
              <span className="hover:text-purple-400 text-opacity-50 tracking-wider font-thin">
                Setting
              </span>
            </a>
          </div>
        </div>
        <div className="p-8 bg-gray-200">
          <div className="grid grid-cols-1 gap-8">
            <div className="p-4 bg-white border-2 border-gray-300 rounded">
              <div class="py-5">
                <main class="h-full overflow-y-auto">
                  <div class="container  mx-auto grid">
                    <div class="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
                      <div class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
                        <div class="p-3 mr-4 text-orange-500 bg-orange-100 rounded-full dark:text-orange-100 dark:bg-orange-500">
                          <svg
                            class="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                          </svg>
                        </div>
                        <div>
                          <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                            My Blog Posts
                          </p>
                          <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
                            10
                          </p>
                        </div>
                      </div>

                      <div class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
                        <div class="p-3 mr-4 text-green-500 bg-green-100 rounded-full dark:text-green-100 dark:bg-green-500">
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
                            My Forum Posts
                          </p>
                          <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
                            24
                          </p>
                        </div>
                      </div>

                      <div class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
                        <div class="p-3 mr-4 text-teal-500 bg-teal-100 rounded-full dark:text-teal-100 dark:bg-teal-500">
                          <svg
                            class="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                        </div>
                        <div>
                          <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                            My Tutorials
                          </p>
                          <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
                            376
                          </p>
                        </div>
                      </div>

                      <div class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
                        <div class="p-3 mr-4 text-blue-500 bg-blue-100 rounded-full dark:text-blue-100 dark:bg-blue-500">
                          <svg
                            class="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
                          </svg>
                        </div>
                        <div>
                          <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                            My Purchases
                          </p>
                          <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
                            35
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </main>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-8">
            <div className="p-4 bg-white border-2 border-gray-300 rounded">
              <div class="py-5">
                <main class="h-full overflow-y-auto">
                  <div class="container  mx-auto grid">
                    <div class="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
                      <div class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
                        <div class="p-3 mr-4 text-orange-500 bg-orange-100 rounded-full dark:text-orange-100 dark:bg-orange-500">
                          <svg
                            class="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                          </svg>
                        </div>
                        <div>
                          <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                            Employees
                          </p>
                          <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
                            <ul>{documents.length ?? 0}</ul>
                          </p>
                        </div>
                      </div>

                      <div class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
                        <div class="p-3 mr-4 text-green-500 bg-green-100 rounded-full dark:text-green-100 dark:bg-green-500">
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
                            My Forum Posts
                          </p>
                          <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
                            24
                          </p>
                        </div>
                      </div>

                      <div class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
                        <div class="p-3 mr-4 text-teal-500 bg-teal-100 rounded-full dark:text-teal-100 dark:bg-teal-500">
                          <svg
                            class="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                        </div>
                        <div>
                          <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                            My Tutorials
                          </p>
                          <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
                            376
                          </p>
                        </div>
                      </div>

                      <div class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
                        <div class="p-3 mr-4 text-blue-500 bg-blue-100 rounded-full dark:text-blue-100 dark:bg-blue-500">
                          <svg
                            class="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
                          </svg>
                        </div>
                        <div>
                          <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                            My Purchases
                          </p>
                          <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
                            35
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </main>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
