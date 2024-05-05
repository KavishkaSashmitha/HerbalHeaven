import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "jspdf-autotable";
import jsPDF from "jspdf";
import { SidebarWithBurgerMenu } from "../../../components/navBar";
import { useReactToPrint } from "react-to-print";
import MaterialCost from "./MaterialCost";
import EmpSalary from "./EmpSalary";
import { DefaultSidebar } from "../../../components/Manager-Sidebar";
import AdminNavbar from "../../../components/AdminNavbar";
import {
  Card,
  Collapse,
  Navbar,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const URL = "http://localhost:8070/api/transports/transget";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function Expens() {
  const [transport, setTransport] = useState([]);
  const [totalTransportCost, setTotalTransportCost] = useState(0);

  useEffect(() => {
    fetchHandler().then((data) => setTransport(data.transport));
  }, []);

  useEffect(() => {
    let totalCost = 0;
    transport.forEach((item) => {
      Object.values(item.cost).forEach((cost) => {
        totalCost += cost;
      });
    });
    setTotalTransportCost(totalCost);
  }, [transport]);

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Income Details Report",
    onAfterPrint: () => alert("Successfully Downloaded!"),
  });
  const toggleSidebar = () => {
    setOpen(!open);
  };

  const [open, setOpen] = useState(false);
  function NavList() {
    return (
      <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-medium"
        >
          <a
            href="#"
            className="flex items-center hover:text-blue-500 transition-colors"
          >
            Transport
          </a>
        </Typography>
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-medium"
        >
          <a
            href="/material"
            className="flex items-center hover:text-blue-500 transition-colors"
          >
            Material
          </a>
        </Typography>
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-medium"
        >
          <a
            href="/employesalary"
            className="flex items-center hover:text-blue-500 transition-colors"
          >
            Employee Sallary
          </a>
        </Typography>
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-medium"
        ></Typography>
      </ul>
    );
  }

  const [openNav, setOpenNav] = React.useState(false);

  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <div>
      <div
        className="flex flex-col h-screen overflow-hidden overflow-x-hidden"
        style={{ backgroundColor: "#02353c" }}
      >
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
            <Card className="flex flex-1">
              <div ref={componentRef}>
                <Navbar className="mx-auto max-w-screen-xl px-6 py-3 sticky ">
                  <div className="flex items-center justify-between text-blue-gray-900">
                    <Typography
                      as="a"
                      href="#"
                      variant="h6"
                      className="mr-4 cursor-pointer py-1.5"
                    >
                      Expenses Details
                    </Typography>
                    <div className="hidden lg:block">
                      <NavList />
                    </div>
                    <IconButton
                      variant="text"
                      className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                      ripple={false}
                      onClick={() => setOpenNav(!openNav)}
                    >
                      {openNav ? (
                        <XMarkIcon className="h-6 w-6" strokeWidth={2} />
                      ) : (
                        <Bars3Icon className="h-6 w-6" strokeWidth={2} />
                      )}
                    </IconButton>
                  </div>
                  <Collapse open={openNav}>
                    <NavList />
                  </Collapse>
                </Navbar>
                <button onClick={handlePrint} className="dwon_repot_income">
                  Download Report
                </button>
                <div>
                  <h1 className="income_topic">Transport Details</h1>

                  <div className="tbl_continer_incme">
                    <table className="table_income">
                      <thead>
                        <tr className="table_income_tr">
                          <th className="table_income_th">d_name</th>
                          <th className="table_income_th">d_mobile</th>
                          <th className="table_income_th">category</th>
                          <th className="table_income_th">Total Cost</th>
                        </tr>
                      </thead>
                      <tbody>
                        {transport.map((item, index) => (
                          <tr key={index}>
                            <td className="table_income_th">
                              <p className="sub_par_dis">{item.d_name}</p>
                            </td>

                            <td className="table_income_th">
                              <p className="sub_par_dis">{item.d_mobile}</p>
                            </td>
                            <td className="table_income_th">
                              <p className="sub_par_dis">{item.category}</p>
                            </td>
                            <td className="table_income_th">
                              <p className="sub_par_dis">
                                {item.cost ? (
                                  <ul>
                                    {Object.entries(item.cost).map(
                                      ([month, cost]) => (
                                        <li
                                          key={month}
                                        >{`${month}: LKR ${cost.toFixed(
                                          2
                                        )}`}</li>
                                      )
                                    )}
                                  </ul>
                                ) : (
                                  "-"
                                )}
                              </p>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <h1 className="tot_amout">
                      Total Transport Cost:LKR {totalTransportCost.toFixed(2)}
                    </h1>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Expens;
