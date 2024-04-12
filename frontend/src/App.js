
import "react-toastify/dist/ReactToastify.css";

import { Route, Routes, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import { SidebarWithBurgerMenu } from "./components/navBar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/DashBoard";
import { EcommerceCard } from "./pages/Products";
import Cart from "./pages/cart";

import CreatPost from "./pages_Pasindu/CreateEmployee";
import EditPost from "./pages_Pasindu/EditEmployee";
import Posts from "./pages_Pasindu/Employee";
import PostDetails from "./pages_Pasindu/EmployeeDetails";
import "react-toastify/dist/ReactToastify.css";
import EmployeeChart from "./pages_Pasindu/Emp_Jobrole_Chart";
import MonthlySalChart from "./pages_Pasindu/Emp_Tot_SalChart";
import Emp_User_Chart from "./pages_Pasindu/Emp_User_Chart";
import Display_Employee_Details from "./pages_Pasindu/Display_Employee_Details";
import Employee_Dashboard from "./pages_Pasindu/Employee_Dashboard";

import CreateUser from "./pages_kavindu/CreateUser";
import UpdateUser from "./pages_kavindu/UpdateUser";
import User from "./pages_kavindu/User";
import AdminDashboard from "./pages/adminDashboard";

import SalaryReport from "./pages_Pasindu/SalaryReport";

//Kumesh-----------------------
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
//Kumesh-user
import Payment from "./pages-Kumesh/User/Payment";
import CardDetails from "./pages-Kumesh/User/Cards";
import AddCard from "./pages-Kumesh/User/AddCard";
import UpdateCard from "./pages-Kumesh/User/UpdateCard";
import PayPal from "./pages-Kumesh/User/PayPal";
import PaypalCheckOut from "./pages-Kumesh/User/PaypalCheckOut";
import PrintPage from "./pages-Kumesh/User/PrintPage";
//Kumesh-Admin

import NetIncome from "./pages-Kumesh/Admin/Income/Incomes";

import EditOrder from "./pages_Ridmi/EditOrder";
import Order from "./pages_Ridmi/Order";

import "./index.css";

function App() {
  const { isLoggedIn, isAdminLog } = useAuth();

  return (
    <>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/signUp" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<EcommerceCard />} />
        <Route path="/user/cart" element={<Cart />} />
        <Route path="/emp/add" element={<CreatPost />} />
        <Route path="/emp/edit/:id" element={<EditPost />} />
        <Route path="/emp/:id" element={<PostDetails />} />
        <Route path="/emp" element={<Posts />} />
        <Route path="/user/payment" element={<Payment />} />
        <Route path="/emp/add" element={<CreateUser />} />
        <Route path="/emp/update/:id" element={<UpdateUser />} />
        <Route path="/emp" element={<User />} />
        <Route path="/salaryreport" element={<SalaryReport />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        
      </Routes>
    </>
  );
}

export default App;
