
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/DashBoard';
import { EcommerceCard } from './pages/Products';
import Cart from './pages/cart';

import CreatPost from './pages_Pasindu/CreateEmployee';
import EditPost from './pages_Pasindu/EditEmployee';
import Posts from './pages_Pasindu/Employee';
import PostDetails from './pages_Pasindu/EmployeeDetails';
import SalaryReport from './pages_Pasindu/SalaryReport';
import EmployeeChart from './pages_Pasindu/EmployeeChart';
import MonthlySalChart from './pages_Pasindu/EmployeeSalChart';
import Emp_User_Chart from './pages_Pasindu/Emp_User_Chart';
import Display_Employee_Details from './pages_Pasindu/Display_Employee_Details';





import "react-toastify/dist/ReactToastify.css";

import Payment from "./pages-Kumesh/Payment";

import CreateUser from "./pages_kavindu/CreateUser";
import UpdateUser from "./pages_kavindu/UpdateUser";
import User from "./pages_kavindu/User";
import SupplierReport from "./pages_kavindu/SupplierReport";

import Transport from "./pages_Malshan/Transport";
import Add_Driver from "./pages_Malshan/Add_Driver";
import Edit_Driver from "./pages_Malshan/Edit_Driver";
import Driver_Details from "./pages_Malshan/Driver_Details";


import AdminDashboard from './pages/adminDashboard';
import './index.css';
import ManagerLogin from './pages/Manager-Login';
import { CartAdmin, CartDetails } from './pages/Cart-Admin';
import CartChart from './pages/Cart-Chart';
import OTPVerification from './interfaces/Otp';
import { useAuth } from './middleware/authContext';
import { CustomerLogin } from './pages/Customer-login';


function App() {
  const { isLoggedIn, isAdminLog } = useAuth();

  return (

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<CustomerLogin />} />
      <Route path="/signUp" element={<Register />} />

      {/* Routes that require authentication */}
      <Route
        path="/dashboard"
        element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
      />
      <Route path="/products" element={<EcommerceCard />} />
      <Route
        path="/user/cart"
        element={isLoggedIn ? <Cart /> : <Navigate to="/login" />}
      />
      <Route path="/manager-login" element={<ManagerLogin />} />
      <Route
        path="/admin-dashboard"
        element={isAdminLog ? <AdminDashboard /> : <Home />}
      />

      <Route
        path="/cart-Admin"
        element={isLoggedIn ? <CartAdmin /> : <Navigate to="/login" />}
      />
      <Route
        path="/cart-stats"
        element={isLoggedIn ? <CartChart /> : <Navigate to="/login" />}
      />
      <Route path="/otp" element={<OTPVerification />} />

      {/* Pasindu */}
      <Route path="/emp/add" element={<CreatPost />} />
      <Route path="/emp/edit/:id" element={<EditPost />} />
      <Route path="/emp/:id" element={<PostDetails />} />
      <Route path="/emp" element={<Posts />} />
      <Route path="/salaryreport" element={<SalaryReport />} />
      <Route path="/EmployeeChart" element={<EmployeeChart />} />
      <Route path="/MonthlySalChart" element={<MonthlySalChart />} />
      <Route path="/Emp_User_Chart/:id" element={<Emp_User_Chart />} />
      <Route
        path="/Display_Employee_Details/:id"
        element={<Display_Employee_Details />}
      />

      {/* Malshan */}
      <Route path="/transport" element={<Transport />} />
      <Route path="/transport/add" element={<Add_Driver />} />
      <Route path="/transport/edit/:id" element={<Edit_Driver />} />
      <Route path="/transport/:id" element={<Driver_Details />} />

      <Route path="/user/payment" element={<Payment />} />

      {/* Kavindu */}
     

      <Route path="/sup/addsup" element={<CreateUser />} />
      <Route path="/sup/update/:id" element={<UpdateUser />} />
      <Route path="/sup" element={<User />} />
         <Route path="/sup/supreport/:id" element={<SupplierReport />} />
    </Routes>

  );
}

export default App;
