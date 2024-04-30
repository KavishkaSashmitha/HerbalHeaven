import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Card, CardHeader, Breadcrumbs } from '@material-tailwind/react';
import AdminNavbar from '../components/AdminNavbar';
import { DefaultSidebar } from '../components/Manager-Sidebar';

import { Link } from 'react-router-dom';
import CreateLoadingScreen from '../pages_Pasindu/LoadingScreen';
//import BarChart from './Product_Details_Chart';
import OrderAmountLineGraph from './OrderAmountLineGraph';
import { FaMoneyBill } from 'react-icons/fa6';
// import { renderChart } from './Product_Details_Chart';

function CartAdminDashboard() {
  const [directOrders, setDirectOrders] = useState([]);
  const [totalAmountSum, setTotalAmountSum] = useState(0);
  //const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productDetails, setProductDetails] = useState({});
  const [mostRepeatedItemCount, setMostRepeatedItemCount] = useState(0);
  const [mostRepeatedItem, setMostRepeatedItem] = useState(null);
  const [imageLoading, setImageLoading] = useState({});
  const [recentlySoldItem, setRecentlySoldItem] = useState(null);
  const toggleSidebar = () => {
    setOpen(!open);
  };

  useEffect(() => {
    axios
      .get('http://localhost:8070/api/directorders')
      .then((response) => {
        setDirectOrders(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching direct orders:', error);
      });
  }, []);

  useEffect(() => {
    let sum = 0;
    const itemCountMap = new Map();

    directOrders.forEach((order) => {
      order.items.forEach((item) => {
        sum += item.totalAmount;

        if (!productDetails[item.productId]) {
          fetchProductDetails(item.productId);
        }

        const count = itemCountMap.get(item.productId) || 0;
        itemCountMap.set(item.productId, count + item.quantity);

        if (count + item.quantity > mostRepeatedItemCount) {
          setMostRepeatedItemCount(count + item.quantity);
          setMostRepeatedItem(item.productId);
        }
      });
    });

    setTotalAmountSum(sum);
  }, [directOrders, productDetails]);

  const fetchProductDetails = async (productId) => {
    try {
      setImageLoading((prevState) => ({ ...prevState, [productId]: true }));
      const response = await axios.get(
        `http://localhost:8070/api/products/${productId}`
      );
      setProductDetails((prevDetails) => ({
        ...prevDetails,
        [productId]: response.data,
      }));
      setImageLoading((prevState) => ({ ...prevState, [productId]: false }));
    } catch (error) {
      console.error('Error fetching product details:', error);
      setImageLoading((prevState) => ({ ...prevState, [productId]: false }));
    }
  };
  useEffect(() => {
    if (directOrders.length > 0) {
      const latestOrder = directOrders.reduce((prev, current) =>
        prev.createdAt > current.createdAt ? prev : current
      );
      if (latestOrder.items.length > 0) {
        const mostRecentItem = latestOrder.items.reduce((prev, current) =>
          prev.createdAt > current.createdAt ? prev : current
        );
        setRecentlySoldItem(mostRecentItem.productId);
      }
    }
  }, [directOrders]);

  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  if (loading) {
    return <div>{CreateLoadingScreen(loading)}</div>;
  }

  return (
    <>
      <div
        className="flex h-screen overflow-hidden"
        style={{ backgroundColor: '#02353c' }}
      >
        <div
          className={`sidebar w-68 bg-custom-color text-white ${
            open ? 'block' : 'hidden'
          }`}
        >
          <DefaultSidebar open={open} handleOpen={setOpen} />
        </div>

        <div className="w-full h-full overflow-auto">
          <AdminNavbar toggleSidebar={toggleSidebar} />
          <Card className="grid grid-cols-1 gap-8 mb-3 bg-blue-gray-100">
            <CardHeader
              floated={false}
              shadow={false}
              className="rounded-none bg-blue-gray-100"
            >
              <div className="ml-4 md:items-center ">
                <Breadcrumbs>
                  <Link to="/" className="hover:text-amber-900">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 hover:text-amber-900"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                  </Link>
                  <Link to="/cartAdmin-db">
                    <li class="flex items-center font-sans text-sm antialiased font-normal leading-normal transition-colors duration-300 cursor-pointer text-blue-gray-900 hover:text-amber-900">
                      <span>Dashboard</span>

                      <span class=" font-sans text-sm antialiased font-normal leading-normal pointer-events-none select-none text-blue-gray-500"></span>
                    </li>
                  </Link>
                </Breadcrumbs>
              </div>
            </CardHeader>
            <div className="p-1">
              <div class="py-4">
                <div class="container mx-auto">
                  <h1 class="text-2xl font-bold mb-4">Overview</h1>
                  <div class="flex flex-wrap justify-center">
                    <div class="max-w-sm mx-auto mb-4">
                      <div class="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-200 dark:bg-gray-800 dark:shadow-lg dark:hover:shadow-2xl">
                        <div class="p-4 flex items-center">
                          <div class="p-3 text-green-500 bg-green-100 rounded-full mr-4">
                            <FaMoneyBill className="h-10 w-10" />
                          </div>
                          <div>
                            <p class="text-gray-600 dark:text-gray-400">
                              Direct Sales Net Income
                            </p>
                            <p class="text-2xl font-semibold text-gray-700 dark:text-gray-200">
                              Rs.{totalAmountSum.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="max-w-sm mx-auto mb-4">
                      <div class="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-200 dark:bg-gray-800 dark:shadow-lg dark:hover:shadow-2xl">
                        <div class="p-4 flex items-center">
                          <div class="p-3 bg-orange-100 rounded-full mr-4">
                            <img
                              src={
                                productDetails[mostRepeatedItem]?.image ||
                                'Placeholder Image URL'
                              }
                              className="h-10 w-10"
                              alt=""
                              style={{ borderRadius: '50%' }}
                            />
                          </div>
                          <div>
                            <p class="text-gray-600 dark:text-gray-400">
                              Most Sold product
                            </p>
                            <p class="text-2xl font-semibold text-gray-700 dark:text-gray-200">
                              {productDetails[mostRepeatedItem]?.name ||
                                'Unknown'}{' '}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="max-w-sm mx-auto mb-4">
                      <div class="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-200 dark:bg-gray-800 dark:shadow-lg dark:hover:shadow-2xl">
                        <div class="p-4 flex items-center">
                          <div class="p-3 bg-orange-100 rounded-full mr-4">
                            <img
                              src={
                                productDetails[mostRepeatedItem]?.image ||
                                'Placeholder Image URL'
                              }
                              style={{ borderRadius: '50%' }}
                              className="h-10 w-10"
                              alt=""
                            />
                          </div>
                          <div>
                            <p class="text-gray-600 dark:text-gray-400">
                              Count
                            </p>
                            <p class="text-2xl font-semibold text-gray-700 dark:text-gray-200">
                              {mostRepeatedItemCount} items sold..
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="max-w-sm mx-auto mb-4">
                      <div class="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-200 dark:bg-gray-800 dark:shadow-lg dark:hover:shadow-2xl">
                        <div class="p-4 flex items-center">
                          <div className="p-3 bg-orange-100 rounded-full mr-4">
                            <img
                              src={
                                productDetails[recentlySoldItem]?.image ||
                                'Placeholder Image URL'
                              }
                              style={{ borderRadius: '50%' }}
                              className="h-10 w-10"
                              alt="Recently Sold"
                            />
                          </div>

                          <div>
                            <p class="text-gray-600 dark:text-gray-400">
                              Last Sold Item
                            </p>
                            <p class="text-2xl font-semibold text-gray-700 dark:text-gray-200">
                              {productDetails[recentlySoldItem]?.name ||
                                'Unknown'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <!-- Repeat similar structure for other cards --> */}
                  </div>

                  <div class="pt-6">
                    <div class="bg-white rounded-m shadow-lg hover:shadow-2xl transition-shadow duration-200 dark:bg-gray-800 dark:shadow-lg dark:hover:shadow-2xl p-4">
                      <div class="h-full">
                        <OrderAmountLineGraph />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}

export default CartAdminDashboard;
