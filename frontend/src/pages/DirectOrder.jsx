import {
  Breadcrumbs,
  Button,
  ButtonGroup,
  Card,
  Tab,
  Tabs,
  TabsHeader,
} from '@material-tailwind/react';
import React, { useState, useEffect, useRef } from 'react';
import { DefaultSidebar } from '../components/Manager-Sidebar';
import AdminNavbar from '../components/AdminNavbar';
import { useReactToPrint } from 'react-to-print'; // Import react-to-pdf library
import { Link, NavLink } from 'react-router-dom';

const DirectCartTable = () => {
  const [directCartData, setDirectCartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const componentRef = useRef(); // Reference to the component for printing

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8070/api/directcart');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        const updatedData = await Promise.all(
          data.map(async (item) => {
            const productDetails = await fetchProductDetails(item.productId);
            return { ...item, productDetails };
          })
        );
        setDirectCartData(updatedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchProductDetails = async (productId) => {
    try {
      const response = await fetch(
        `http://localhost:8070/api/products/${productId}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch product details');
      }
      const productDetails = await response.json();
      return productDetails;
    } catch (error) {
      console.error('Error fetching product details:', error);
      return null;
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      const response = await fetch(
        `http://localhost:8070/api/directcart/${itemId}`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        throw new Error('Failed to remove item from the cart');
      }

      const updatedCart = directCartData.filter((item) => item._id !== itemId);
      setDirectCartData(updatedCart);
    } catch (error) {
      console.error('Error removing item from the cart:', error);
    }
  };

  const printBillAndPostData = async () => {
    try {
      console.log('Printing bill...');

      printBill();

      // Construct items array with product details
      const items = directCartData.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        name: item.productDetails.name,
        price: item.productDetails.price,
        totalAmount: item.quantity * item.productDetails.price, // Calculate totalAmount for each item
      }));

      // Calculate totalAmount for the entire cart
      const totalAmount = items.reduce(
        (total, item) => total + item.totalAmount,
        0
      );

      // Pass totalPrice to postCartDetails
      await removeAllFromCart();
      await postCartDetails(items, totalAmount);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const printBill = useReactToPrint({
    content: () => componentRef.current, // Reference to the component for printing
  });

  const removeAllFromCart = async () => {
    try {
      await fetch('http://localhost:8070/api/directcart', {
        method: 'DELETE',
      });
      setDirectCartData([]); // Clear the cart data
    } catch (error) {
      console.error('Error removing all items from the cart:', error);
    }
  };

  const toggleSidebar = () => {
    setOpen(!open);
  };

  const [open, setOpen] = useState(false);

  const totalPrice = directCartData.reduce((total, item) => {
    return total + item.productDetails.price * item.quantity;
  }, 0);

  const postCartDetails = async (cartDetails, totalAmount) => {
    try {
      const response = await fetch('http://localhost:8070/api/directorders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: cartDetails, totalAmount }), // Include totalAmount in the request body
      });

      if (!response.ok) {
        throw new Error('Failed to post cart details');
      }

      console.log('Cart details posted successfully');
    } catch (error) {
      console.error('Error posting cart details:', error);
    }
  };

  return (
    <div
      className="flex flex-col h-screen overflow-hidden overflow-x-hidden"
      style={{ backgroundColor: '#02353c' }}
    >
      <div className="flex flex-1 overflow-hidden">
        <div
          className={`sidebar w-68 bg-custom-color text-white ${
            open ? 'block' : 'hidden'
          }`}
        >
          <DefaultSidebar open={open} handleOpen={setOpen} />
        </div>
        <div className="flex flex-col flex-1 overflow-hidden">
          <AdminNavbar toggleSidebar={toggleSidebar} />
          <Card className="overflow-hidden flex flex-1 mr-4 mt-2 ml-4">
            <Breadcrumbs className="ml-2 mb-2 mt-2">
            <Link to="/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                </Link>
                <Link to="/dashboard">
                  <li class="flex items-center font-sans text-sm antialiased font-normal leading-normal transition-colors duration-300 cursor-pointer text-blue-gray-900 hover:text-amber-800">
                    <span>Dashboard</span>
                  </li>
                </Link>
                <Link to="/direct-cart">
                  <li class="flex items-center font-sans text-sm antialiased font-normal leading-normal transition-colors duration-300 cursor-pointer text-blue-gray-900 hover:text-amber-800">
                    <span>Direct -Cart</span>
                  </li>
                </Link>
            </Breadcrumbs>
            <ButtonGroup className="mt-4 ml-4 mb-2" variant="outlined">
              <Button className="bg-black">
                <NavLink
                  to="/productCategory"
                  className="text-white"
                  activeClassName="active-link"
                >
                  Items
                </NavLink>
              </Button>

              <Button>
                <NavLink to="/direct-cart" activeClassName="active-link">
                  Cart
                </NavLink>
              </Button>
            </ButtonGroup>
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2">#</th>
                  <th className="px-4 py-2">Image</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Quantity</th>
                  <th className="px-4 py-2">Price</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {directCartData.map((item, index) => (
                  <tr key={item._id} className="hover:bg-gray-100">
                    <td className="border px-4 py-2 text-center">
                      {index + 1}
                    </td>
                    <td className="border px-4 py-2">
                      <img
                        src={item.productDetails.image}
                        className="h-10 w-10"
                        alt=""
                      />
                    </td>
                    <td className="border px-4 py-2">
                      {item.productDetails.name}
                    </td>
                    <td className="border px-4 py-2">{item.quantity}</td>
                    <td className="border px-4 py-2 text-right">
                      Rs.{item.productDetails.price * item.quantity}
                    </td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
                <tr className="bg-amber-800 text-center">
                  <td className="md-auto px-4 py-2">Total Price:</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className="md-auto px-4 py-2 text-right">
                    Rs.{totalPrice}
                  </td>
                  <td>
                    <button
                      onClick={printBillAndPostData}
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Print Bill & Post Data
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </Card>
        </div>
      </div>
      <div style={{ display: 'none' }}>
        <PrintComponentToPdf ref={componentRef} data={directCartData} />
      </div>
    </div>
  );
};

// Component to be printed as PDF
// Component to be printed as PDF
const PrintComponentToPdf = React.forwardRef(({ data }, ref) => {
  // Calculate total amount including tax
  const totalAmount = data.reduce(
    (total, item) => total + item.productDetails.price * item.quantity,
    0
  );
  const taxAmount = totalAmount * 0.001;
  const netAmount = totalAmount + taxAmount;

  return (
    <div ref={ref} className="p-4">
      <div className="flex justify-center mb-4">
        <img src="/logo/loading.png" className="h-10 w-10" />
        <h2 className="ml-2">Herbal Heaven</h2>
      </div>
      <div className="mb-4">
        <p>Address: Your Address</p>
        <p>Email: herbalheaven@email.com</p>
      </div>
      <table className="w-full border-collapse border border-gray-500">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-500 px-4 py-2">Name</th>
            <th className="border border-gray-500 px-4 py-2">Quantity</th>
            <th className="border border-gray-500 px-4 py-2">Price</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item._id} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
              <td className="border border-gray-500 px-4 py-2">
                {item.productDetails.name}
              </td>
              <td className="border border-gray-500 px-4 py-2">
                {item.quantity}
              </td>
              <td className="border border-gray-500 px-4 py-2">
                {item.productDetails.price * item.quantity}
              </td>
            </tr>
          ))}
          <tr className="bg-gray-200">
            <td className="border border-gray-500 px-4 py-2 font-bold">
              Total
            </td>
            <td className="border border-gray-500 px-4 py-2" colSpan="2">
              Rs. {totalAmount.toFixed(2)}
            </td>
          </tr>
          <tr>
            <td className="border border-gray-500 px-4 py-2 font-bold">
              Tax (0.1%)
            </td>
            <td className="border border-gray-500 px-4 py-2" colSpan="2">
              Rs. {taxAmount.toFixed(2)}
            </td>
          </tr>
          <tr>
            <td className="border border-gray-500 px-4 py-2 font-bold">
              Net Amount
            </td>
            <td className="border border-gray-500 px-4 py-2" colSpan="2">
              Rs. {netAmount.toFixed(2)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
});

export default DirectCartTable;
