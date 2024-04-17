import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { SidebarWithBurgerMenu } from "../../../components/navBar";
import { useReactToPrint } from "react-to-print";
import MaterialCost from "../Expens/MaterialCost";
import './Income.css'
import DeretOrders from "./DeretOrders";
import { Card, Collapse, Navbar,IconButton,Typography } from "@material-tailwind/react";
import { DefaultSidebar } from "../../../components/Manager-Sidebar";
import AdminNavbar from "../../../components/AdminNavbar";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const URL = "http://localhost:8070/api/orders/ordersnet";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function Incomes() {
  const [totalIncome, setTotalIncome] = useState(0);
  const [orders, setOrders] = useState([]);
  const [open, setOpen] = React.useState(0);

  useEffect(() => {
    fetchHandler().then((data) => {
      setOrders(data.orders);
      calculateTotalIncome(data.orders);
    });
  }, []);

  const calculateTotalIncome = (orders) => {
    let total = 0;
    orders.forEach((order) => {
      total += order.total ? order.total : 0;
    });
    setTotalIncome(total);
  };

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Income Details Report",
    onAfterPrint: () => alert("Successfully Downloaded !"),
  });

  const toggleSidebar = () => {
    setOpen(!open);
  };
  // const [open, setOpen] = useState(false);
  function NavList() {
    return (
      <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-medium"
        >
          <a href="/netincome" className="flex items-center hover:text-blue-500 transition-colors">
            Income details
          </a>
        </Typography>
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-medium"
        >
          <a href="/dir" className="flex items-center hover:text-blue-500 transition-colors">
           DirectOrder
          </a>
        </Typography>
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-medium"
        >
          
        
         
        </Typography>
      </ul>
    );
  }

  const [openNav, setOpenNav] = React.useState(false);

  return (
  
    <div>
      <div
      className="flex flex-col h-screen overflow-hidden overflow-x-hidden"
      style={{ backgroundColor: '#02353c' }}
    >
      <div className="flex flex-1 overflow-hidden">
        <div
          className={`sidebar w-68 bg-custom-color text-white ${
            open ? 'block' : 'hidden'
          }`}
        >
          <DefaultSidebar open={open} handleOpen={setOpen} />
        </div>
        <div className="flex flex-col flex-1 overflow-auto">
          <AdminNavbar toggleSidebar={toggleSidebar} />
          <Card className="flex flex-1">
      {/* <div ref={componentRef}> */}

      <Navbar className="mx-auto max-w-screen-xl px-6 py-3 sticky ">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          variant="h6"
          className="mr-4 cursor-pointer py-1.5"
        >
          Income Details
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
      <div  ref={componentRef} >
        <h1 className="income_topic">Income Details</h1>
        <div className="tbl_continer_incme">
          <table className="table_income">
            <thead>
              <tr className="table_income_tr">
                <th className="table_income_th">Total</th>
              </tr>
            </thead>
            <tbody>
  {orders && orders.map((order, index) => (
    <tr key={index}>
      <td className="table_income_th">
        <p className="sub_par_dis">
          {order.total ? `LKR ${order.total.toFixed(2)}` : "Null"}
        </p>
      </td>
    </tr>
  ))}
</tbody>

          </table>
          <h2  className="tot_amout">Total Income:LKR {totalIncome.toFixed(2)}</h2>
        </div>
      </div>
     
    </Card>
    </div>
    </div>
    </div>
    </div>
  );
}

export default Incomes;
