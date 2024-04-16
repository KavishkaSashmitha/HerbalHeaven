import "react-toastify/dist/ReactToastify.css";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Home from "./pages/Home";
import { SidebarWithBurgerMenu } from "./components/navBar";


import Register from './pages/Register';
import Dashboard from './pages/DashBoard';
import { EcommerceCard } from './pages/Products';
import Cart from './pages/cart';


import CreatPost from "./pages_Pasindu/CreateEmployee";
import EditPost from "./pages_Pasindu/EditEmployee";
import Posts from "./pages_Pasindu/Employee";
import PostDetails from "./pages_Pasindu/EmployeeDetails";
import "react-toastify/dist/ReactToastify.css";

// import EmployeeChart from "./pages_Pasindu/Emp_Jobrole_Chart";
// import MonthlySalChart from "./pages_Pasindu/Emp_Tot_SalChart";
// import Emp_User_Chart from "./pages_Pasindu/Emp_User_Chart";
import Display_Employee_Details from "./pages_Pasindu/Display_Employee_Details";
import Employee_Dashboard from "./pages_Pasindu/Employee_Dashboard";
// import HiestSalary from "./pages_Pasindu/HiestSalary";


import CreateUser from './pages_kavindu/CreateUser';
import UpdateUser from './pages_kavindu/UpdateUser';
import User from './pages_kavindu/User';



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

import CashDelivery from "./pages-Kumesh/User/CashDelivery";


//Kumesh-Admin
import NetIncome from "./pages-Kumesh/Admin/Income/Incomes";
import Expens from "./pages-Kumesh/Admin/Expens/Expens";
//Kumesh END-----------------------

import EditOrder from "./pages_Ridmi/EditOrder";
import Order from "./pages_Ridmi/Order";
import "./index.css";


import "react-toastify/dist/ReactToastify.css";

import SupplierReport from "./pages_kavindu/SupplierReport";
import MaterialReport from "./pages_kavindu/MaterialCostReport";

import Transport from "./pages_Malshan/Transport";
import Add_Driver from "./pages_Malshan/Add_Driver";
import Edit_Driver from "./pages_Malshan/Edit_Driver";
import Driver_Details from "./pages_Malshan/Driver_Details";
import FuelReport from "./pages_Malshan/FuelReport";
import { CartAdmin, CartDetails } from "./pages/Cart-Admin";
import CartChart from "./pages/Cart-Chart";
import OTPVerification from "./pages/Manager-SignIn";

import { useAuth } from "./middleware/authContext";
import { CustomerLogin } from "./pages/Customer-login";

import AddProduct from "./pages-Dileesha/AddProduct";
import UpdateProduct from "./pages-Dileesha/UpdateProduct";
import InventoryList from "./pages-Dileesha/InventoryList";
import MyOrders from "./pages_Ridmi/myOrders";

import ProductList from "./pages/Direct_Order_Products";

import CartAdminDashboard from "./pages/Cart-AdminDashboard";
import DirectOrdersTable from "./pages/DirectOrders";

import "./index.css";

import ImageUpload from "./imageUpload";


import ProtectedRoute from "./middleware/ProtectedRoute";
import AdminDashboard from "./pages/adminDashboard";









function App() {
  const { isLoggedIn } = useAuth();

  return (
    <Routes>
      <Route path="/signUp" element={<Register />} />
      <Route element={<ProtectedRoute />}>
        {/* Kavishka */}

        
        
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<EcommerceCard />} />

        <Route path="/user/cart" element={<Cart />} />
        <Route path="/productCategory" element={<ProductList />} />
        <Route path="/login" element={<CustomerLogin />} />
        <Route path="/signUp" element={<Register />} />

        {/*Kumesh*/}
        <Route path="/user/payment" element={<Payment />} />
        <Route path="/carddetails" element={<CardDetails />} />
        <Route path="/addnewcard" element={<AddCard />} />
        <Route path="/carddetails/:id" element={<UpdateCard />} />

        {/*Ridmi*/}
        <Route path="/my-orders" element={<MyOrders />} />

      </Route>

      <Route path="/" element={<Home />} />

      {/* //Protected Routes */}
      <Route element={<ProtectedRoute manager />}>
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        {/* cart-related */}
        <Route path="/cart-Admin" element={<CartAdmin />} />
        <Route path="/productCategory" element={<ProductList />} />
        <Route path="/direct-cart" element={<DirectCartTable />} />
        <Route path="/direct-orders" element={<DirectOrdersTable />} />
        <Route path="/cartAdmin-db" element={<CartAdminDashboard />} />

        {/* Pasindu */}
        <Route path="/emp/add" element={<CreatPost />} />
        <Route path="/emp/edit/:id" element={<EditPost />} />
        <Route path="/emp/:id" element={<PostDetails />} />
        <Route path="/emp" element={<Posts />} />
        <Route path="/salaryreport/:id" element={<SalaryReport />} />
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
        <Route path="/FuelReport/:id" element={<FuelReport />} />

        {/* Kavindu */}
        <Route path="/sup/addsup" element={<CreateUser />} />
        <Route path="/sup/update/:id" element={<UpdateUser />} />
        <Route path="/sup" element={<User />} />
        <Route path="/sup/material_report/:id" element={<MaterialReport />} />

        {/*Ridmi*/}
        <Route path="/admin-orders" element={<Order />} />
        <Route path="/edit/:id" element={<EditOrder />} />

        {/*Dileesha*/}
        <Route path="/inventory/add" element={<AddProduct />} />
        <Route path="/inventory/update/:id" element={<UpdateProduct />} />
        <Route path="/inventory" element={<InventoryList />} />

        {/*Kumesh*/}
        <Route path="/netincome" element={<NetIncome />} />
        <Route path="/expensive" element={<Expens />} />
        <Route path="/cashdelivery" element={<CashDelivery />} />
        <Route path="/printpage" element={<PrintPage />} />
      </Route>

      <Route path="/emp" element={<Posts />} />
      <Route path="/salaryreport" element={<SalaryReport />} />
      <Route path="/user/payment" element={<Payment />} />

      <Route path="/salaryreport/:id" element={<SalaryReport />} />
      <Route path="/sup/addsup" element={<CreateUser />} />
      <Route path="/sup/update/:id" element={<UpdateUser />} />
      <Route path="/sup" element={<User />} />

      {/*Kumesh Start */}
      <Route path="/paypal" element={<PayPal />} />
      <Route path="/paypalcheckout" element={<PaypalCheckOut />} />

      {/* Routes that require authentication */}

      <Route path="/otp" element={<OTPVerification />} />


      {/* Pasindu */}
      <Route path="/emp/add" element={<CreatPost />} />
      <Route path="/emp/edit/:id" element={<EditPost />} />
      <Route path="/emp/:id" element={<PostDetails />} />

      <Route path="/salaryreport" element={<SalaryReport />} />
      {/* <Route path="/EmployeeChart" element={<EmployeeChart />} />
      <Route path="/MonthlySalChart" element={<MonthlySalChart />} />
      <Route path="/Emp_User_Chart/:id" element={<Emp_User_Chart />} /> */}
      <Route
        path="/Display_Employee_Details/:id"
        element={<Display_Employee_Details />}
      />
      <Route path="/Employee_Dashboard" element={<Employee_Dashboard />} />
      {/* <Route path="/HiestSalary" element={<HiestSalary />} /> */}

      {/* Malshan */}
      <Route path="/transport" element={<Transport />} />
      <Route path="/transport/add" element={<Add_Driver />} />
      <Route path="/transport/edit/:id" element={<Edit_Driver />} />
      <Route path="/transport/:id" element={<Driver_Details />} />
      <Route path="/FuelReport/:id" element={<FuelReport />} />
      <Route path="/user/payment" element={<Payment />} />

      {/* Kavindu */}

      <Route path="/sup/addsup" element={<CreateUser />} />
      <Route path="/sup/update/:id" element={<UpdateUser />} />
      <Route path="/sup" element={<User />} />
      <Route path="/sup/supreport/:id" element={<SupplierReport />} />
      <Route path="/sup/material_report/:id" element={<MaterialReport />} />

      <Route path="/salaryreport" element={<SalaryReport />} />

      {/*Dileesha*/}
      <Route path="/inventory/add" element={<AddProduct />} />
      <Route path="/inventory/update/:id" element={<UpdateProduct />} />
      <Route path="/inventory" element={<InventoryList />} />
     


      <Route path="/test" element={<ImageUpload />} />
    </Routes>
  );
}

export default App;
