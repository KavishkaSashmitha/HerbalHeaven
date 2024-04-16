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
import { TruckIcon } from "@heroicons/react/24/solid";

function MaterialReport() {
  const { id } = useParams();
  const [supplierName, setSupplierName] = useState("");
  const [rawMaterial, setRawMaterial] = useState("");
  const [country, setCountry] = useState("");
  const [quantity, setQuantity] = useState("");
  const [materialCost, setMaterialCost] = useState("");
  const [unitPrice, setUnitPrice] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [open, setOpen] = React.useState(0);
  const toggleSidebar = () => {
    setOpen(!open);
  };
  // const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `http://localhost:8070/sup/getSupplier/${id}`
        );

        if (!response.ok) {
          console.error("Failed to fetch data. Status code:", response.status);
          throw new Error("Failed to fetch data");
        }

        const json = await response.json();

        if (json) {
          setSupplierName(json.name);
          setRawMaterial(json.rawMaterial);
          setCountry(json.country);
        } else {
          console.error("Unexpected data structure:", json);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchPosts();
  }, [id]);

  const onSubmit = (e) => {
    e.preventDefault();

    RawMaterialCalculation();
  };

  function RawMaterialCalculation() {
    const materialCost = unitPrice * quantity;

    setMaterialCost(materialCost);
  }

  function Generate() {
    Swal.fire({
      title: "Are you sure?",
      text: "This will update the Material Expense information.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, update it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(`http://localhost:8070/sup/materialCost/${id}`, {
            month: selectedMonth,
            amount: materialCost,
          })
          .then((res) => {
            if (res.data.success) {
              Swal.fire({
                title: "Updated!",
                text: "Material cost information has been updated.",
                icon: "success",
                confirmButtonText: "Ok",
                reverseButtons: true,
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.href = "/sup";
                }
              });
            }
          })
          .catch((error) => {
            console.error("Error updating post:", error);
          });
      }
    });

    const doc = new jsPDF();
    const data = [
      [`Supplier Name : ${capitalizeSecondPart(supplierName)}`],
      [`Raw Material Type : ${rawMaterial}`],
      [`Country : ${country}`],
      [`Unite Price : ${unitPrice}`],
      [`Quantity : ${quantity}`],
      [`Material Cost :, Rs.${materialCost} /=`],
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
      "This report contains material cost for Herbal Heaven company(PVT)LTD.",
      10,
      doc.internal.pageSize.height - 50
    );

    // Signature area
    doc.setFontSize(10);
    doc.text("__________________", 150, doc.internal.pageSize.height - 30);
    doc.text("Signature", 160, doc.internal.pageSize.height - 20);

    // Generate the table
    doc.autoTable({
      head: [["Material Details"]],
      body: data.map((row) => [row[0]]), // Extracting only the first column from data
      margin: { top: 90, right: 10, left: 10 },
      theme: "striped",
      headStyles: {
        fillColor: [255, 165, 0],
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

    // Save the document
    doc.save("Material Cost.pdf");
  }

  useEffect(() => {
    switch (rawMaterial.toLowerCase()) {
      case "sadalwood":
        setUnitPrice(450);
        break;
      case "valerianroot":
        setUnitPrice(400);
        break;
      case "ginkgo Biloba":
        setUnitPrice(350);
        break;
      case "echinacea":
        setUnitPrice(300);
        break;
      case "tumeric":
        setUnitPrice(225);
        break;

      default:
        setUnitPrice(0);
    }
  }, [rawMaterial]);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

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

  // const [open, setOpen] = React.useState(0);

  // const toggleSidebar = () => {
  //   setOpen(!open);
  // };

  return (
    <>
      <div className="flex h-screen " style={{ backgroundColor: "#02353c" }}>
        <div
          className={`sidebar w-68 bg-custom-color text-white ${
            open ? "block" : "hidden"
          }`}
        >
          <DefaultSidebar open={open} handleOpen={setOpen} />
        </div>
        <div className="w-full h-screen">
          <AdminNavbar toggleSidebar={toggleSidebar} />
          <Card className="edit-post-bg overflow-auto">
            <div class="">
              <CardHeader
                floated={false}
                shadow={false}
                className="rounded-none"
              >
                <div className="">
                  <Breadcrumbs className="">
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
                    <Link to="/sup">
                      <li class="flex items-center font-sans text-sm antialiased font-normal leading-normal transition-colors duration-300 cursor-pointer text-blue-gray-900 hover:text-cyan-100">
                        <span>Supplier</span>

                        <span class="font-sans text-sm antialiased font-normal leading-normal pointer-events-none select-none text-blue-gray-500"></span>
                      </li>
                    </Link>
                    <Link to="">
                      <li class="flex items-center font-sans text-sm antialiased font-normal leading-normal transition-colors duration-300 cursor-pointer text-blue-gray-900 hover:text-cyan-100">
                        <span>Expense Report</span>

                        <span class="font-sans text-sm antialiased font-normal leading-normal pointer-events-none select-none text-blue-gray-500"></span>
                      </li>
                    </Link>
                  </Breadcrumbs>
                </div>
              </CardHeader>
              <CardBody>
                <div class="w-auto max-w-[56rem] mx-auto mt-10 mb-10">
                  <div class="relative flex flex-col rounded-xl border-blue-gray-100 bg-blue-gray-100/50 text-gray-700 shadow-md">
                    <div className="bg-blue-gray-50/50  rounded-xl">
                      <div class="relative grid px-1 py-1 m-1 overflow-center text-center text-white bg-black place-items-center rounded-xl bg-clip-border shadow-gray-900/20">
                        <div class="h-1 p-8 mb-4 text-white">
                          <TruckIcon className="h-10 w-10" />
                        </div>
                        <h5 class="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-white">
                          Supplier Expenses Calculator
                        </h5>
                      </div>

                      <div class="grid grid-cols-2 gap-6 ">
                        <div class="px-6">
                          <div class="block overflow-visible">
                            <div class="relative block w-full overflow-hidden !overflow-x-hidden !overflow-y-visible bg-transparent">
                              <form class="flex flex-col gap-2 mt-12">
                                <p class="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
                                  <label>Supplier Name</label>
                                </p>
                                <div class="relative h-10 w-full min-w-[200px] mb-4">
                                  <input
                                    type="text"
                                    value={capitalizeSecondPart(supplierName)}
                                    required
                                    disabled
                                    class="peer bg-white h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                  />

                                  <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                                </div>

                                <p class="block  font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
                                  <label>Raw Material Type:</label>
                                </p>
                                <div class="relative h-10 w-full min-w-[200px] mb-4">
                                  <input
                                    id="vehucletype"
                                    value={rawMaterial}
                                    type="text"
                                    disabled
                                    class="peer  bg-white h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                  ></input>
                                  <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                                </div>

                                <p class="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
                                  <label>Country :</label>
                                </p>
                                <div class="relative h-10 w-full min-w-[200px] mb-4">
                                  <input
                                    value={country}
                                    type="text"
                                    required
                                    disabled
                                    class="peer bg-white h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                  />

                                  <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                                </div>

                                <p class="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
                                  <label>Unit Price :</label>
                                </p>
                                <div class="relative h-10 w-full min-w-[200px] mb-4">
                                  <input
                                    value={unitPrice}
                                    type="number"
                                    required
                                    disabled
                                    class="peer bg-white h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                  />

                                  <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
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
                                  <label>Item Quantity (Kg):</label>
                                </p>
                                <div class="relative h-10 w-full min-w-[200px] mb-3">
                                  <input
                                    type="number"
                                    name="quantity"
                                    value={quantity}
                                    onChange={(event) => {
                                      setQuantity(event.target.value);
                                    }}
                                    placeholder="Enter Quantity"
                                    class="peer bg-white h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                  />

                                  <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                                </div>
                                <p class="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
                                  <label>Month :</label>
                                </p>
                                <div class="relative h-10 w-full min-w-[200px] mb-4">
                                  <select
                                    id="selectMonth"
                                    type="text"
                                    value={selectedMonth}
                                    name="month"
                                    placeholder="Enter Month"
                                    onChange={handleMonthChange}
                                    class="peer bg-white h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                  >
                                    <option value="">Select Month</option>
                                    <option value="January">January</option>
                                    <option value="February">February</option>
                                    <option value="March">March</option>
                                    <option value="April">April</option>
                                    <option value="May">May</option>
                                    <option value="June">June</option>
                                    <option value="July">July</option>
                                    <option value="August">August</option>
                                    <option value="September">September</option>
                                    <option value="October">October</option>
                                    <option value="November">November</option>
                                    <option value="December">December</option>
                                  </select>
                                  {/* {errors.month && (
                                    <span className="text-red-500 ml-1 text-sm sans">
                                      {errors.month}
                                    </span>
                                  )} */}

                                  <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                                </div>

                                <div>
                                  <button
                                    type="button"
                                    onClick={onSubmit}
                                    className="w-full bg-orange-500 text-white p-2 rounded-md hover:bg-orange-700"
                                  >
                                    <i className="fas fa-calculator mr-2"></i>
                                    Calculate Material Expense
                                  </button>
                                </div>
                                <p class="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
                                  <label>Total Material Cost :</label>
                                </p>
                                <div class="relative h-10 w-full min-w-[200px] mb-4">
                                  <input
                                    type="text"
                                    required
                                    value={`Rs.${materialCost}`}
                                    disabled
                                    placeholder="Hourly Rate (Rupees)"
                                    class="peer bg-white h-full w-full rounded-[7px] border border-blue-gray-200  !border-t-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 "
                                  />
                                  <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                                </div>

                                <div>
                                  <button
                                    type="button"
                                    onClick={Generate}
                                    className="w-full bg-red-500 text-gray-200 p-2 rounded-md hover:bg-red-700"
                                  >
                                    <i className="fas fa-file-pdf mr-2"></i>
                                    Generate Material Report
                                  </button>
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
              <CardFooter className="bg-white">
                <Footer />
              </CardFooter>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}

export default MaterialReport;
