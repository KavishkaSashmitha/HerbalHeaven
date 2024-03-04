import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { NavbarSimple } from './components/navBar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/DashBoard';
import { EcommerceCard } from './pages/Products';
import Cart from './pages/cart';
import CreatPost from './components/CreatePost';
import EditPost from './components/EditPost';
import Posts from './components/Posts';
import PostDetails from './components/PostDetails';
import 'react-toastify/dist/ReactToastify.css';
import UpdateCart from './pages/UpdateCart';
import Payment from './pages-Kumesh/Payment';
import CreateUser from './pages_kavindu/CreateUser';
import UpdateUser from './pages_kavindu/UpdateUser';
import User from './pages_kavindu/User';
import AdminDashboard from './pages/adminDashboard';

function App() {
  return (
    <>
      <NavbarSimple />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/signUp" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<EcommerceCard />} />
        <Route path="/user/cart" element={<Cart />} />
        <Route path="/posts/add" element={<CreatPost />} />
        <Route path="/posts/edit/:id" element={<EditPost />} />
        <Route path="/post/:id" element={<PostDetails />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/user/payment" element={<Payment />} />
        <Route path="/user/cart/update/:id" element={<UpdateCart />} />
        <Route path="/emp/add" element={<CreateUser />} />
        <Route path="/emp/update/:id" element={<UpdateUser />} />
        <Route path="/emp" element={<User />} />
      </Routes>
    </>
  );
}

export default App;
