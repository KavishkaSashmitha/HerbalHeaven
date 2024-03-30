import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { SidebarWithBurgerMenu } from './components/navBar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/DashBoard';
import { EcommerceCard } from './pages/Products';
import Cart from './pages/cart';
import CreatPost from './components/CreateEmployee';
import EditPost from './components/EditEmployee';
import Posts from './components/Employee';
import PostDetails from './components/EmployeeDetails';
import 'react-toastify/dist/ReactToastify.css';
import Payment from './pages-Kumesh/Payment';
import CreateUser from './pages_kavindu/CreateUser';
import UpdateUser from './pages_kavindu/UpdateUser';
import User from './pages_kavindu/User';
import AdminDashboard from './pages/adminDashboard';
import SalaryReport from './components/SalaryReport';
import './index.css';


function App() {
  return (
    <>
      <Routes>
        
        {/* Kavishka */}
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
        <Route path="/salaryreport/:id" element={<SalaryReport />} />


        <Route path="/sup/addsup" element={<CreateUser />} />
        <Route path="/sup/update/:id" element={<UpdateUser />} />
        <Route path="/sup" element={<User />} />

        <Route path="/salaryreport" element={<SalaryReport />} />

      </Routes>
    </>
  );
}

export default App;
