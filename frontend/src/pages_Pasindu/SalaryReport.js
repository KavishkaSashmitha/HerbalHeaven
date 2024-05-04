import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import {
  Breadcrumbs,
  Avatar,
  Card,
  CardFooter,
  CardHeader,
  CardBody,
  Button,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { Footer } from "../components/Footer";
import AdminNavbar from "../components/AdminNavbar";
import { DefaultSidebar } from "../components/Manager-Sidebar";
import createLoadingScreen from "./LoadingScreen";

function SalaryReport() {
  const { id } = useParams();
  const [hours, setHours] = useState("");
  const [bsal, setBsal] = useState("");
  const [tax, setTax] = useState("");
  const [etf, setEtf] = useState("");
  const [epf, setEpf] = useState("");
  const [tallowance, setTallowance] = useState("");
  const [mbonus, setMbonus] = useState("");
  const [nsal, setNsal] = useState("");
  const [emp, setEmp] = useState(null);
  const [employeeName, setEmployeeName] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [rate, setHourlyRate] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({ image: "" });
  const [loading, setLoading] = useState(true);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`http://localhost:8070/api/posts/posts/`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const json = await response.json();
        setEmp(json?.existingPosts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchPosts();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    const validationErrors = {};
    if (hours === null || hours === undefined || hours === "") {
      validationErrors.hours = "Working hours are required.";
    } else if (hours < 0) {
      validationErrors.hours = "Working hours cannot be negative.";
    }

    // If there are validation errors, update the state and return
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Clear errors state if there are no validation errors and a month is selected
    setErrors({});

    // Perform other actions after validation, if needed
    Calculation();
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `http://localhost:8070/api/posts/posts/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const json = await response.json();
        setEmployeeName(json?.post?.name);
        setJobRole(json?.post?.jobrole);
        setFormData({ ...formData, image: json?.post?.image });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 800);
      }
    };
    fetchPosts();
  }, [id]);

  const handleClick = () => {
    // Perform actions for handleClick
    if (nsal === "") {
      // Set showMessage to true if nsal is empty
      setShowMessage(true);
    } else {
      // If nsal is not empty, proceed with generating the salary report
      setShowMessage(false);
      Generate();
      // Add your salary report generation logic here
      console.log("Generating salary report...");
    }
  };

  function Calculation() {
    const basicSalary = hours * rate;
    const etfValue = (basicSalary * 3) / 100;
    const epfValue = (basicSalary * 8) / 100;

    let taxValue, transportAllowance, monthlyBonus;

    if (basicSalary > 100000) {
      taxValue = (basicSalary * 10) / 100;
      transportAllowance = (basicSalary * 30) / 100;
      monthlyBonus = (basicSalary * 20) / 100;
    } else if (basicSalary > 50000) {
      taxValue = (basicSalary * 5) / 100;
      transportAllowance = (basicSalary * 20) / 100;
      monthlyBonus = (basicSalary * 15) / 100;
    } else {
      taxValue = (basicSalary * 2) / 100;
      transportAllowance = (basicSalary * 10) / 100;
      monthlyBonus = (basicSalary * 10) / 100;
    }

    const netSalary =
      basicSalary +
      (transportAllowance + monthlyBonus - (taxValue + etfValue + epfValue));

    setJobRole(jobRole);
    setBsal(basicSalary);
    setTax(taxValue);
    setTallowance(transportAllowance);
    setMbonus(monthlyBonus);
    setEtf(etfValue);
    setEpf(epfValue);
    setNsal(netSalary);
  }

  function Generate() {
    Swal.fire({
      title: "Are you sure?",
      text: "This will update the Employee salary information.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, update it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(`http://localhost:8070/api/posts/post/salary/${id}`, {
            month: selectedMonth,
            amount: nsal,
          })
          .then((res) => {
            if (res.data.success) {
              Swal.fire({
                title: "Updated!",
                text: "Employee salary information has been updated.",
                icon: "success",
                confirmButtonText: "Ok",
                reverseButtons: true,
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.href = "/emp";
                }
              });
            }
          })
          .catch((error) => {
            console.error("Error updating post:", error);
          })
          .finally(() => {
            // Set loading to false after asynchronous operations are completed
            setLoading(false);
          });
      }
    });

    const doc = new jsPDF();
    const data1 = [
      [`Employee Name : ${capitalizeSecondPart(employeeName)}`],
      [`Job Role : ${jobRole}`],
      [`Month : ${selectedMonth}`],
      [`Hourly Rate (Rs.): ${rate}/=`],
      [`Working Hours (h) : ${hours}`],
    ];

    const data2 = [
      ["Basic Salary", `Rs.${bsal} /=`],
      ["Tax", `Rs.${tax} /=`],
      ["ETF", `Rs.${etf} /=`],
      ["EPF", `Rs.${epf} /=`],
      ["Transport Allowance", `Rs.${tallowance} /=`],
      ["Monthly Bonus", `Rs.${mbonus} /=`],
      ["Net Salary", `Rs.${nsal} /=`],
    ];

    // Add page number
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.text(
        `Page ${i} of ${totalPages}`,
        doc.internal.pageSize.width - 28,
        doc.internal.pageSize.height - 18
      );
    }

    // Add page border
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.rect(
        5,
        5,
        doc.internal.pageSize.width - 10,
        doc.internal.pageSize.height - 10,
        "S"
      );
    }

    // Add current time
    const now = new Date();
    const currentTime = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
    doc.setFontSize(7);
    doc.text(`Report generated on: ${currentTime}`, 152, 10);

    // Add company logo
    const logoImg = new Image();
    logoImg.src = "/logo/logo.png"; // Assuming 'logo.png' is the path to your logo
    doc.addImage(logoImg, "PNG", 90, 14, 40, 40); // Adjust position and size accordingly

    // Add company name
    doc.setFontSize(25);
    doc.setFont("helvetica", "bold");
    // Print "Herbal Heaven" text
    doc.text("Herbal Heaven", 80, 20);

    // Add company address, email, and phone number
    doc.setFontSize(8); // Adjust font size as needed
    doc.text("Company Address:", 10, 50);
    doc.text("123 Main St, City, Country", 10, 55);
    doc.text("Email: info@herbalheaven.com", 10, 60);
    doc.text("Phone: +1234567890", 10, 65);

    // Add description
    doc.setFontSize(12);
    doc.text(
      "This report contains employee salary for Herbal Heaven company(PVT)LTD.",
      10,
      doc.internal.pageSize.height - 50
    );

    // Signature area
    doc.setFontSize(10);
    doc.text("__________________", 150, doc.internal.pageSize.height - 30);
    doc.text("Signature", 160, doc.internal.pageSize.height - 20);

    // Set font size and style for "Salary Details"
    doc.setFont("times", "bold");
    doc.setFontSize(15);
    // Print "Salary Details" text
    doc.text("Salary Details", 10, 85);

    // Generate the table
    doc.autoTable({
      head: [["Employee Details"]],
      body: data1.map((row) => [row[0]]), // Extracting only the first column from data1
      margin: { top: 90, right: 10, left: 10 },
      theme: "striped",
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontStyle: "bold",
        fontSize: 15,
        halign: "center",
        valign: "middle",
        lineWidth: 0.2,
        lineColor: [255, 255, 255],
        cellPadding: 3,
      },
      bodyStyles: {
        fontSize: 12,
        textColor: 50,
        fontStyle: "bold",
        fillColor: [238, 238, 238],
        halign: "center",
        valign: "middle",
        lineWidth: 0.2,
        lineColor: [255, 255, 255],
        cellPadding: 3,
      },
      alternateRowStyles: {
        fillColor: [255, 255, 255],
      },
      styles: {
        font: "Helvetica",
      },
    });

    // Table 2: Description and Amount
    doc.autoTable({
      head: [["Description", "Amount"]],
      body: data2,
      margin: { top: 29, right: 10, left: 10 },
      theme: "striped",
      headStyles: {
        fillColor: [46, 204, 113],
        textColor: 255,
        fontStyle: "bold",
        fontSize: 14,
        halign: "center",
        valign: "middle",
        lineWidth: 0.2,
        lineColor: [255, 255, 255],
        cellPadding: 3,
      },
      bodyStyles: {
        fontSize: 12,
        textColor: 50,
        fontStyle: "normal",
        fillColor: [238, 238, 238],
        halign: "center",
        valign: "middle",
        lineWidth: 0.5,
        lineColor: [255, 255, 255],
        cellPadding: 3,
      },
      alternateRowStyles: {
        fillColor: [255, 255, 255],
      },
      styles: {
        font: "Helvetica",
      },
    });

    // Save the document
    doc.save("Employee Salary.pdf");
  }

  useEffect(() => {
    switch (jobRole.toLowerCase()) {
      case "manager":
        setHourlyRate(450);
        break;
      case "supervisor":
        setHourlyRate(400);
        break;
      case "technician":
        setHourlyRate(350);
        break;
      case "driver":
        setHourlyRate(300);
        break;
      case "worker":
        setHourlyRate(225);
        break;

      default:
        setHourlyRate(0);
    }
  }, [jobRole]);

  // const handleMonthChange = (event) => {
  //   setSelectedMonth(event.target.value);
  // };

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

  function MonthPicker() {
    // Array of month names
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Function to get the current month name and day
    const getCurrentDate = () => {
      const date = new Date();
      const monthIndex = date.getMonth(); // Get month index (0-11)
      const day = date.getDate(); // Get current day of the month
      return { monthIndex, day };
    };

    // Function to get the previous month from the current month index
    const getPreviousMonth = (currentMonthIndex) => {
      // Calculate the previous month index
      const previousMonthIndex = (currentMonthIndex - 1 + 12) % 12;
      return monthNames[previousMonthIndex];
    };

    // Function to determine which month to display
    const determineMonthToDisplay = (monthIndex, day) => {
      if (day > 10) {
        // If the day of the month is greater than 10, return the current month
        return monthNames[monthIndex];
      } else {
        // Otherwise, return the previous month
        return getPreviousMonth(monthIndex);
      }
    };

    // useEffect hook to update the displayed month
    useEffect(() => {
      const { monthIndex, day } = getCurrentDate();
      const monthToDisplay = determineMonthToDisplay(monthIndex, day);
      setSelectedMonth(monthToDisplay);
    }, []); // Empty dependency array to run the effect only once on component mount
  }

  const [open, setOpen] = React.useState(0);

  const toggleSidebar = () => {
    setOpen(!open);
  };

  if (loading) {
    return <div>{createLoadingScreen(loading)}</div>;
  }

  return (
    <>
      <Card className="">
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
              <div class="">
                <CardHeader
                  floated={false}
                  shadow={false}
                  className="rounded-none bg-blue-gray-100"
                >
                  <div className="ml-4">
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
                        <li class="flex items-center font-sans text-sm antialiased font-normal leading-normal transition-colors duration-300 cursor-pointer text-blue-gray-900 hover:text-amber-800">
                          <span>Dashboard</span>

                          <span class=" font-sans text-sm antialiased font-normal leading-normal pointer-events-none select-none text-blue-gray-500"></span>
                        </li>
                      </Link>
                      <Link to="/emp">
                        <li class="flex items-center font-sans text-sm antialiased font-normal leading-normal transition-colors duration-300 cursor-pointer text-blue-gray-900 hover:text-amber-800">
                          <span>Employee</span>

                          <span class="font-sans text-sm antialiased font-normal leading-normal pointer-events-none select-none text-blue-gray-500"></span>
                        </li>
                      </Link>
                      <Link to="">
                        <li class="flex items-center font-sans text-sm antialiased font-normal leading-normal transition-colors duration-300 cursor-pointer text-blue-gray-900 hover:text-amber-800">
                          <span>Salary Report</span>

                          <span class="font-sans text-sm antialiased font-normal leading-normal pointer-events-none select-none text-blue-gray-500"></span>
                        </li>
                      </Link>
                    </Breadcrumbs>
                  </div>
                </CardHeader>
                <CardBody>
                  <div class="w-auto max-w-[56rem] mx-auto mt-10 mb-10">
                    <div class="relative flex flex-col rounded-xl border-blue-gray-100 bg-blue-gray-100/50 text-gray-700 shadow-md">
                      <div className="bg-white  rounded-xl">
                        <div class="relative grid px-1 py-1 m-1 overflow-center text-center text-white bg-gray-800 place-items-center rounded-xl bg-clip-border shadow-gray-900/20">
                          <div class="h-1 p-8 mb-4 text-white">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 25 25"
                              fill="currentColor"
                              aria-hidden="true"
                              class="w-10 h-10 text-white"
                            >
                              <path d="M4.5 3.75a3 3 0 00-3 3v.75h21v-.75a3 3 0 00-3-3h-15z"></path>
                              <path
                                fill-rule="evenodd"
                                d="M22.5 9.75h-21v7.5a3 3 0 003 3h15a3 3 0 003-3v-7.5zm-18 3.75a.75.75 0 01.75-.75h6a.75.75 0 010 1.5h-6a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z"
                                clip-rule="evenodd"
                              ></path>
                            </svg>
                          </div>
                          <h5 class="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-white">
                            Salary Calculator
                          </h5>
                        </div>
                        <div className="flex items-center justify-center pt-5">
                          <Avatar
                            src={formData.image}
                            size="custom"
                            style={{ width: "120px", height: "120px" }} // Adjust the width and height as desired
                            className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain"
                          />
                        </div>
                        <div class="grid grid-cols-2 gap-6 ">
                          <div class="px-6">
                            <div class="block overflow-visible">
                              <div class="relative block w-full overflow-hidden !overflow-x-hidden !overflow-y-visible bg-transparent">
                                <form class="flex flex-col gap-2 mt-12">
                                  <p class="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
                                    <label>Employee Name</label>
                                  </p>
                                  <div class="relative h-10 w-full min-w-[200px] mb-4">
                                    <input
                                      type="text"
                                      value={capitalizeSecondPart(employeeName)}
                                      required
                                      disabled
                                      class="peer h-full w-full rounded-[7px] border border-blue-gray-100 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-100 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-gray-200"
                                    />

                                    <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                                  </div>

                                  <p class="block  font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
                                    <label>Job Role:</label>
                                  </p>
                                  <div class="relative h-10 w-full min-w-[200px] mb-4">
                                    <input
                                      id="jobRole"
                                      value={jobRole}
                                      type="text"
                                      disabled
                                      placeholder="Employee Job Role"
                                      class="peer  bg-white h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-gray-200"
                                    ></input>
                                    <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                                  </div>

                                  <p class="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
                                    <label>Hourly Rate (Rs.):</label>
                                  </p>
                                  <div class="relative h-10 w-full min-w-[200px] mb-4">
                                    <input
                                      value={rate}
                                      type="number"
                                      required
                                      disabled
                                      placeholder="Hourly Rate (Rupees)"
                                      class="peer bg-white h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-gray-200"
                                    />

                                    <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                                  </div>

                                  <p class="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
                                    <label>Month :</label>
                                  </p>
                                  <div class="relative h-10 w-full min-w-[200px] mb-4">
                                    <input
                                      id="selectMonth"
                                      type="text"
                                      value={selectedMonth}
                                      name="month"
                                      disabled
                                      placeholder="Enter Month"
                                      class={`${
                                        errors.month && "border-red-500"
                                      }peer bg-white h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-gray-200
                            `}
                                    />
                                    <MonthPicker />

                                    <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                                  </div>
                                  {errors?.month && <div class=""></div>}
                                  <p class="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
                                    <label>Working Hours (h):</label>
                                  </p>
                                  <div class="relative h-10 w-full min-w-[200px] mb-10">
                                    <input
                                      type="number"
                                      name="Workhours"
                                      value={hours}
                                      onChange={(event) => {
                                        setHours(event.target.value);
                                      }}
                                      placeholder="Working Hours"
                                      class={`${
                                        errors.hours && "border-red-500"
                                      }peer bg-white h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50
                            `}
                                    />
                                    {errors.hours && (
                                      <span className="text-red-500 ml-1 text-sm sans">
                                        {errors.hours}
                                      </span>
                                    )}

                                    <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                                  </div>
                                  {errors?.hours && <div class=""></div>}
                                  <div>
                                    <button
                                      type="button"
                                      onClick={onSubmit}
                                      className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                                    >
                                      <i className="fas fa-calculator mr-2"></i>
                                      Calculate Salary
                                    </button>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                          <div class="px-6 mb-5">
                            <div class="block overflow-visible">
                              <div class="relative block w-full overflow-hidden !overflow-x-hidden !overflow-y-visible bg-transparent">
                                <form class="flex flex-col gap-2 mt-12">
                                  <p class="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
                                    <label>Basic Salary:</label>
                                  </p>
                                  <div class="relative h-10 w-full min-w-[200px] mb-4">
                                    <input
                                      type="text"
                                      required
                                      value={`Rs.${bsal}`}
                                      disabled
                                      placeholder="Hourly Rate (Rupees)"
                                      class="peer bg-white h-full w-full rounded-[7px] border border-blue-gray-200  !border-t-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:bg-gray-200 "
                                    />

                                    <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                                  </div>

                                  <p class="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
                                    <label>Tax Rate:</label>
                                  </p>
                                  <div class="relative h-10 w-full min-w-[200px] mb-4">
                                    <input
                                      type="text"
                                      required
                                      value={`Rs.${tax}`}
                                      disabled
                                      placeholder="Tax (Rupees)"
                                      class="peer bg-white h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:bg-gray-200"
                                    />

                                    <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                                  </div>

                                  <p class="block  font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
                                    <label>ETF:</label>
                                  </p>
                                  <div class="relative h-10 w-full min-w-[200px] mb-4">
                                    <input
                                      type="text"
                                      required
                                      value={`Rs.${etf}`}
                                      disabled
                                      placeholder="ETF (Rupees)"
                                      class="peer bg-white h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:bg-gray-200"
                                    />

                                    <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                                  </div>

                                  <p class="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
                                    <label>EPF:</label>
                                  </p>
                                  <div class="relative h-10 w-full min-w-[200px] mb-4">
                                    <input
                                      type="text"
                                      required
                                      value={`Rs.${epf}`}
                                      disabled
                                      placeholder="EPF (Rupees)"
                                      class="peer bg-white h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:bg-gray-200"
                                    />

                                    <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                                  </div>

                                  <p class="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
                                    <label>Transport Allowance:</label>
                                  </p>
                                  <div class="relative h-10 w-full min-w-[200px] mb-4">
                                    <input
                                      type="text"
                                      required
                                      value={`Rs.${tallowance}`}
                                      disabled
                                      placeholder="Transport Allowance (Rupees)"
                                      class="peer bg-white h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:bg-gray-200"
                                    />

                                    <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                                  </div>
                                  <p class="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
                                    <label>Monthly Bonus:</label>
                                  </p>
                                  <div class="relative h-10 w-full min-w-[200px] mb-4">
                                    <input
                                      type="text"
                                      required
                                      value={`Rs.${mbonus}`}
                                      disabled
                                      placeholder="Monthly Bonus (Rupees)"
                                      class="peer bg-white h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:bg-gray-200 "
                                    />

                                    <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                                  </div>

                                  <p class="block  font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
                                    <label>Net Salary</label>
                                  </p>
                                  <div class="relative h-10 w-full min-w-[200px] mb-10">
                                    <input
                                      type="text"
                                      required
                                      onChange={(e) => setNsal(e.target.value)}
                                      value={`Rs.${nsal}`}
                                      disabled
                                      class="peer bg-white h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:bg-gray-200"
                                    />

                                    <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                                  </div>

                                  <div>
                                    <button
                                      type="button"
                                      onClick={handleClick}
                                      // disabled={nsal === ""}
                                      className="w-full bg-orange-500 text-gray-800 p-2 rounded-md hover:bg-orange-700"
                                    >
                                      <i className="fas fa-file-pdf mr-2"></i>
                                      Generate Salary Report
                                    </button>

                                    {showMessage && (
                                      <p className="text-red-500 mt-2">
                                        To generate salary report, please
                                        firstly click on the "Calculate Salary"
                                        button.
                                      </p>
                                    )}
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardBody>
                <CardFooter></CardFooter>
              </div>
            </Card>
            <Footer />
          </div>
        </div>
      </Card>
    </>
  );
}

export default SalaryReport;
