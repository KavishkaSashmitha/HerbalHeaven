import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DefaultSidebar } from '../components/Manager-Sidebar';
import AdminNavbar from '../components/AdminNavbar';
import { Avatar, Card } from '@material-tailwind/react';

const DirectOrdersTable = () => {
  const [directOrders, setDirectOrders] = useState([]);
  const [totalAmountSum, setTotalAmountSum] = useState(0); // State to hold the sum of total amounts
  const [open, setOpen] = React.useState(0);

  useEffect(() => {
    axios
      .get('http://localhost:8070/api/directorders')
      .then((response) => {
        setDirectOrders(response.data);
      })
      .catch((error) => {
        console.error('Error fetching direct orders:', error);
      });
  }, []);

  const [productDetails, setProductDetails] = useState({});

  const fetchProductDetails = async (productId) => {
    try {
      const response = await axios.get(
        `http://localhost:8070/api/products/${productId}`
      );
      setProductDetails({ ...productDetails, [productId]: response.data });
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  useEffect(() => {
    let sum = 0; // Variable to store the sum of total amounts
    directOrders.forEach((order) => {
      order.items.forEach((item) => {
        sum += item.totalAmount; // Accumulate total amounts
        if (!productDetails[item.productId]) {
          fetchProductDetails(item.productId);
        }
      });
    });
    setTotalAmountSum(sum); // Update the state with the sum
  }, [directOrders, productDetails]);

  //sidebar
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
  const toggleSidebar = () => {
    setOpen(!open);
  };

  const calculateOrderTotal = (items) => {
    let total = 0;
    items.forEach((item) => {
      total += item.totalAmount;
    });
    return total;
  };

  return (
    <>
      <>
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
            <div className="flex flex-col flex-1 overflow-scroll">
              <AdminNavbar toggleSidebar={toggleSidebar} />
              <Card className="p-4">
                <div className="overflow-x-auto">
                  <h2 className="text-lg font-bold mb-4 text-white">
                    Direct Orders
                  </h2>
                  <table className="w-full bg-white shadow-md rounded-lg">
                    <thead>
                      <tr className="text-left">
                        <th className="px-4 py-2 bg-gray-300">#</th>
                        <th className="px-4 py-2 bg-gray-300">Product Name</th>
                        <th className="px-4 py-2 bg-gray-300">Product Image</th>
                        <th className="px-4 py-2 bg-gray-300">Order Details</th>
                        <th className="px-4 py-2 bg-gray-300">Total Amount</th>
                        <th className="px-4 py-2 bg-gray-300">Created At</th>
                      </tr>
                    </thead>
                    <tbody>
                      {directOrders.map((order, index) => (
                        <tr key={order._id} className="hover:bg-gray-100">
                          <td className="px-4 py-2">{index + 1}</td>
                          <td className="px-4 py-2">
                            {order.items.map((item) => (
                              <div key={item.productId}>
                                {productDetails[item.productId] && (
                                  <div>
                                    {productDetails[item.productId].name}
                                  </div>
                                )}
                              </div>
                            ))}
                          </td>
                          <td className="px-4 py-2">
                            {order.items.map((item) => (
                              <div key={item.productId}>
                                {productDetails[item.productId] && (
                                  <img
                                    className="w-16 h-16 object-cover"
                                    src={productDetails[item.productId].image}
                                    alt={productDetails[item.productId].name}
                                  />
                                )}
                              </div>
                            ))}
                          </td>
                          <td className="px-4 py-2">
                            {order.items.map((item) => (
                              <div key={item.productId}>
                                <div>
                                  Quantity: {item.quantity}
                                  <br />
                                  Total Amount: Rs.{item.totalAmount}
                                </div>
                              </div>
                            ))}
                          </td>
                          <td className="px-4 py-2">
                            Rs. {calculateOrderTotal(order.items)}
                          </td>

                          <td className="px-4 py-2">
                            {new Date(order.createdAt).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 text-black">
                  <strong>Total Amount Sum:</strong> Rs. {totalAmountSum}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default DirectOrdersTable;
