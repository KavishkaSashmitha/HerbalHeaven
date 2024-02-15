import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { NavbarSimple } from './components/navBar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/DashBoard';
import { EcommerceCard } from './pages/Products';
import Cart from './pages/cart';

import 'react-toastify/dist/ReactToastify.css';
import UpdateCart from './pages/UpdateCart';
import Payment from './pages-Kumesh/Payment';

function App() {
  return (
    <>
      <NavbarSimple />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<EcommerceCard />} />
        <Route path="/user/cart" element={<Cart />} />
        <Route path="/user/payment" element={<Payment />} />
        <Route path="/user/cart/update/:id" element={<UpdateCart />} />
        {/* <Route path="/register" element={<Register />} /> */}
      </Routes>
    </>
  );
}

export default App;
