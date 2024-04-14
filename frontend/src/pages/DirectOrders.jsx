import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DefaultSidebar } from '../components/Manager-Sidebar';
import AdminNavbar from '../components/AdminNavbar';
import { Avatar, Card, Typography } from '@material-tailwind/react';
import CreateLoadingScreen from '../pages_Pasindu/LoadingScreen';

const DirectOrdersTable = () => {
  const [directOrders, setDirectOrders] = useState([]);
  const [totalAmountSum, setTotalAmountSum] = useState(0); // State to hold the sum of total amounts
  const [open, setOpen] = React.useState(0);
  const [loading, setLoading] = useState([true]);
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
      setLoading(false);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  useEffect(() => {
    let sum = 0;
    directOrders.forEach((order) => {
      order.items.forEach((item) => {
        sum += item.totalAmount;
        if (!productDetails[item.productId]) {
          fetchProductDetails(item.productId);
        }
      });
    });
    setTotalAmountSum(sum);
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
  if (loading) {
    return <div>{CreateLoadingScreen(loading)}</div>;
  }

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
            <div className="flex flex-col flex-1 overflow-hidden">
              <AdminNavbar toggleSidebar={toggleSidebar} />
              <Card className="p-4 flex flex-1">
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
                                  <Avatar
                                    className="w-16 h-16 object-cover mt-4"
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
                                  <Typography className="font-bold mb-2">
                                    Quantity: {item.quantity}
                                    <br />
                                    Total Amount: Rs.{item.totalAmount}
                                  </Typography>
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
