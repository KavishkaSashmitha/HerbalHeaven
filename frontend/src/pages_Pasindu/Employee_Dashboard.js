import React, { useState, useEffect } from "react";
import axios from "axios";
import MonthlySalChart from "./Emp_Tot_SalChart";
import Emp_Jobrole_Chart from "./Emp_Jobrole_Chart";
import Emp_Gender_Chart from "./Emp_Gender_Chart";

import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  AccordionBody,
  List,
  AccordionHeader,
  Accordion,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import AdminNavbar from "../components/AdminNavbar";
import { DefaultSidebar } from "../components/Manager-Sidebar";

function AdminDashboard() {
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

  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <>
      <div className="flex h-screen overflow-scroll bg-blue-gray-100">
        <div
          className={`sidebar w-64 bg-custom-color text-white ${
            open ? "block" : "hidden"
          }`}
        >
          <DefaultSidebar open={open} handleOpen={setOpen} />
        </div>
        <div className="w-full h-full ">
          <AdminNavbar toggleSidebar={toggleSidebar} />
          <div className="grid grid-cols-1 gap-8 mb-3">
            <div className="p-4">
              <div className="py-5">
                <main className="h-full overflow-y-auto">
                  <div className="container mx-auto grid">
                    <h1 className="pb-5 text-2xl font-bold font-sans">
                      Overview
                    </h1>
                    <div className="flex flex-row">
                      <div className="grid gap-6 mb-8 md:grid-cols-2 ">
                        <div className="">
                          <div className="flex flex-row">
                            <div className="card w-max ">
                              <div className="flex items-center p-4  rounded-lg shadow-xl dark:bg-gray-800">
                                <div className="p-3 mr-4 text-orange-500 bg-orange-100 rounded-full dark:text-orange-100 dark:bg-orange-500">
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
                                  <p class="text-3xl font-semibold text-gray-700 dark:text-gray-200">
                                    <ul>{documents.length ?? 0}</ul>
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="card w-auto">
                              <div className="flex items-center p-4  rounded-lg shadow-xl dark:bg-gray-800">
                                <div className="p-3 mr-4 text-orange-500 bg-orange-100 rounded-full dark:text-orange-100 dark:bg-orange-500">
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
                                    Total Salary
                                  </p>
                                  <p class="text-3xl font-semibold text-gray-700 dark:text-gray-200">
                                    <ul>{documents.length ?? 0}</ul>
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="card w-auto">
                              <div className="flex items-center p-4  rounded-lg shadow-xl dark:bg-gray-800">
                                <div className="p-3 mr-4 text-orange-500 bg-orange-100 rounded-full dark:text-orange-100 dark:bg-orange-500">
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
                                  <p class="text-3xl font-semibold text-gray-700 dark:text-gray-200">
                                    <ul>{documents.length ?? 0}</ul>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="pt-5">
                            <div>
                              <Emp_Jobrole_Chart />
                            </div>
                          </div>
                        </div>
                        <div className="">
                          <div>
                            <Emp_Gender_Chart />
                          </div>
                        </div>
                      </div>
                      
                    </div>
                    <div className="">
                          <div>
                            <MonthlySalChart />
                          </div>
                        </div>
                  </div>
                </main>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
