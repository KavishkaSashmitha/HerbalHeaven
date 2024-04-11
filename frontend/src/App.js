

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
import DirectCartTable from "./pages/DirectOrder";
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

import NetIncome from './pages-Kumesh/Admin/Income/Incomes';

import EditOrder from './pages_Ridmi/EditOrder';
import Order from './pages_Ridmi/Order';

import './index.css';

import 'react-toastify/dist/ReactToastify.css';

import SupplierReport from './pages_kavindu/SupplierReport';

import Transport from './pages_Malshan/Transport';
import Add_Driver from './pages_Malshan/Add_Driver';
import Edit_Driver from './pages_Malshan/Edit_Driver';
import Driver_Details from './pages_Malshan/Driver_Details';

import './index.css';
import ManagerLogin from './pages/Manager-Login';
import { CartAdmin, CartDetails } from './pages/Cart-Admin';
import CartChart from './pages/Cart-Chart';
import OTPVerification from './interfaces/Otp';
import { useAuth } from './middleware/authContext';
import { CustomerLogin } from './pages/Customer-login';

import AddProduct from './pages-Dileesha/AddProduct';
import UpdateProduct from './pages-Dileesha/UpdateProduct';
import InventoryList from './pages-Dileesha/InventoryList';
import MyOrders from './pages_Ridmi/myOrders';
import ProductList from './pages/Category-product';
import DirectCartTable from './pages/Company-cart';

function App() {
  const { isLoggedIn, isAdminLog } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signUp" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/products" element={<EcommerceCard />} />
      <Route path="/user/cart" element={<Cart />} />
      {/* <Route path="/register" element={<Register />} /> */}

      {/* Kavishka */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/signUp" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/products" element={<EcommerceCard />} />
      <Route path="/user/cart" element={<Cart />} />
      <Route path="/productCategory" element={<ProductList />} />
      <Route path="/directcart" element={<DirectCartTable />} />

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

      {/*Ridmi*/}
      <Route path="/my-orders" element={<MyOrders />} />
      <Route path="/admin-orders" element={<Order />} />
      <Route path="/edit/:id" element={<EditOrder />} />

      <Route path="/user/payment" element={<Payment />} />
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

      <Route path="/cart-Admin" element={<CartAdmin />} />
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
      <Route path="/Employee_Dashboard" element={<Employee_Dashboard />} />

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

      <Route path="/salaryreport" element={<SalaryReport />} />
      <Route path="/inventory/add" element={<AddProduct />} />
      <Route path="/inventory/update/:id" element={<UpdateProduct />} />
      <Route path="/inventory" element={<InventoryList />} />
    </Routes>
  );
}

export default App;
