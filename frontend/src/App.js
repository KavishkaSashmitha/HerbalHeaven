import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { NavbarSimple } from './components/navBar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/DashBoard';
import { EcommerceCard } from './pages/Products';

function App() {
  return (
    <>
      <Router>
        <NavbarSimple />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<EcommerceCard />} />
          {/* <Route path="/register" element={<Register />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
