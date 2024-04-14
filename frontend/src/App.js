import 'react-toastify/dist/ReactToastify.css';

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';

import Home from './pages/Home';
import { SidebarWithBurgerMenu } from './components/navBar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/DashBoard';
import { EcommerceCard } from './pages/Products';
import Cart from './pages/Cart';

import CreatPost from './pages_Pasindu/CreateEmployee';
import EditPost from './pages_Pasindu/EditEmployee';
import Posts from './pages_Pasindu/Employee';
import PostDetails from './pages_Pasindu/EmployeeDetails';
import 'react-toastify/dist/ReactToastify.css';

import CreatPost from './components/CreatePost';
import EditPost from './components/EditPost';
import Posts from './components/Posts';
import PostDetails from './components/PostDetails';
import 'react-toastify/dist/ReactToastify.css';
import Payment from './pages-Kumesh/Payment';

import CreateUser from './pages_kavindu/CreateUser';
import UpdateUser from './pages_kavindu/UpdateUser';
import User from './pages_kavindu/User';
import AdminDashboard from './pages/AdminDashboard';

import SalaryReport from './pages_Pasindu/SalaryReport';
import DirectCartTable from './pages/DirectOrder';

//Kumesh-----------------------
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
//Kumesh-user
import Payment from './pages-Kumesh/User/Payment';
import CardDetails from './pages-Kumesh/User/Cards';
import AddCard from './pages-Kumesh/User/AddCard';
import UpdateCard from './pages-Kumesh/User/UpdateCard';
import PayPal from './pages-Kumesh/User/PayPal';
import PaypalCheckOut from './pages-Kumesh/User/PaypalCheckOut';
import PrintPage from './pages-Kumesh/User/PrintPage';

import CashDelivery from './pages-Kumesh/User/CashDelivery';

//Kumesh-Admin
import NetIncome from './pages-Kumesh/Admin/Income/Incomes';
import Expens from './pages-Kumesh/Admin/Expens/Expens';
//Kumesh END-----------------------
import EditOrder from './pages_Ridmi/EditOrder';
import Order from './pages_Ridmi/Order';
import './index.css';

import 'react-toastify/dist/ReactToastify.css';

import SupplierReport from './pages_kavindu/SupplierReport';
import MaterialReport from './pages_kavindu/MaterialCostReport';

import Transport from './pages_Malshan/Transport';
import Add_Driver from './pages_Malshan/Add_Driver';
import Edit_Driver from './pages_Malshan/Edit_Driver';
import Driver_Details from './pages_Malshan/Driver_Details';
import FuelReport from './pages_Malshan/FuelReport';
import { CartAdmin, CartDetails } from './pages/Cart-Admin';
import CartChart from './pages/Cart-Chart';
import OTPVerification from './pages/Manager-SignIn';
import { useAuth } from './middleware/authContext';
import { CustomerLogin } from './pages/Customer-login';

import SalaryReport from './components/SalaryReport';
import './index.css';
import AddProduct from './pages-Dileesha/AddProduct';
import UpdateProduct from './pages-Dileesha/UpdateProduct';
import InventoryList from './pages-Dileesha/InventoryList';

function App() {
  const { isLoggedIn } = useAuth();

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

      <Route path="/salaryreport" element={<SalaryReport />} />
      <Route path="/inventory/add" element={<AddProduct />} />
      <Route path="/inventory/update/:id" element={<UpdateProduct />} />
      <Route path="/inventory" element={<InventoryList />} />
    </Routes>
  );
}

export default App;
