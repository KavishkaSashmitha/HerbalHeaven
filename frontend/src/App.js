<<<<<<< Updated upstream
import {  Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { NavbarSimple } from './components/navBar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/DashBoard';
import { EcommerceCard } from './pages/Products';
import Cart from './pages/Cart';

import 'react-toastify/dist/ReactToastify.css';
=======
import { Route, Routes } from "react-router-dom";
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

import "./index.css";
>>>>>>> Stashed changes

function App() {
  return (
    <>
<<<<<<< Updated upstream
      <NavbarSimple />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<EcommerceCard />} />
        <Route path="/user/cart" element={<Cart />} />
        {/* <Route path="/register" element={<Register />} /> */}
      </Routes>
=======
      <PayPalScriptProvider
        options={{
          "client-id": process.env.CLIENT_ID,
        }}
      >
        <Routes>
          {/* Kavishka */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/signUp" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<EcommerceCard />} />
          <Route path="/user/cart" element={<Cart />} />

          {/* Pasindu */}
          <Route path="/emp/add" element={<CreatPost />} />
          <Route path="/emp/edit/:id" element={<EditPost />} />
          <Route path="/emp/:id" element={<PostDetails />} />
          <Route path="/emp" element={<Posts />} />
          <Route path="/salaryreport" element={<SalaryReport />} />
          <Route path="/user/payment" element={<Payment />} />
          <Route path="/emp/add" element={<CreateUser />} />
          <Route path="/emp/update/:id" element={<UpdateUser />} />
          <Route path="/emp" element={<User />} />
          <Route path="/salaryreport/:id" element={<SalaryReport />} />
          <Route path="/sup/addsup" element={<CreateUser />} />
          <Route path="/sup/update/:id" element={<UpdateUser />} />
          <Route path="/sup" element={<User />} />
          {/*Kumesh */}
          {/*KUMESHA PAYMENT PART */}
          <Route path="/user/payment" element={<Payment />} />
          <Route path="/carddetails" element={<CardDetails />} />
          <Route path="/addnewcard" element={<AddCard />} />
          <Route path="/carddetails/:id" element={<UpdateCard />} />
          <Route path="/paypal" element={<PayPal />} />
          <Route path="/paypalcheckout" element={<PaypalCheckOut />} />
          <Route path="/printpage" element={<PrintPage />} />
          {/*KUMESHA PAYMENT PART ADMIN */}
          <Route path="/netincome" element={<NetIncome />} />
        </Routes>
      </PayPalScriptProvider>
>>>>>>> Stashed changes
    </>
  );
}

export default App;
