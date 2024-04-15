import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DefaultSidebar } from '../components/Manager-Sidebar';
import AdminNavbar from '../components/AdminNavbar';
import {
  Avatar,
  Card,
  CardBody,
  Typography,
  Input,
  Button,
  CardFooter,
  IconButton,
} from '@material-tailwind/react';
import CreateLoadingScreen from '../pages_Pasindu/LoadingScreen';
import { FaMoneyBill } from 'react-icons/fa6';

const DirectOrdersTable = () => {
  const [directOrders, setDirectOrders] = useState([]);
  const [totalAmountSum, setTotalAmountSum] = useState(0);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);
  const [productDetails, setProductDetails] = useState({});
  const [mostRepeatedItem, setMostRepeatedItem] = useState(null);
  const [mostRepeatedItemCount, setMostRepeatedItemCount] = useState(0);
  const [recentlySoldItem, setRecentlySoldItem] = useState(null);

  const [imageLoading, setImageLoading] = useState({});

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

  const filteredItems = directOrders.filter((order) =>
    order.items.some((item) =>
      productDetails[item.productId]?.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(currentPage + 1);
  const prevPage = () => setCurrentPage(currentPage - 1);

  // Calculate the total number of items after filtering
  const totalFilteredItems = filteredItems.length;

  // Update the map for page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalFilteredItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  // Update pagination logic to consider totalFilteredItems
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <div
        className="flex flex-col h-screen overflow-hidden "
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
            <Card className="p-4 flex flex-1 overflow-hidden">
              <h2 className="text-lg font-bold mb-4 text-black">
                Direct Orders
              </h2>
              <Input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4 mt-2">
                <div className="card w-full hover:shadow-lg transition duration-300 ease-in-out">
                  <div className="flex h-auto items-center p-4 bg-gray-100 rounded-lg shadow-xl dark:bg-gray-800">
                    <div className="mr-4 text-green-500 bg-green-100 rounded-full dark:text-orange-100 dark:bg-orange-500">
                      <FaMoneyBill className="h-12 w-12" />
                    </div>
                    <div>
                      <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                        Direct Net Income
                      </p>
                      <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                        Rs.{totalAmountSum.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="card w-full hover:shadow-lg transition duration-300 ease-in-out">
                  <div className="flex items-center p-4 bg-gray-100 rounded-lg shadow-xl dark:bg-gray-800">
                    <div className="mr-4 text-green-500 bg-green-100 rounded-full dark:text-orange-100 dark:bg-orange-500">
                      <img
                        src={
                          productDetails[mostRepeatedItem]?.image ||
                          'Placeholder Image URL'
                        }
                        className="h-12 w-12"
                        alt="Most Purchased Item"
                      />
                    </div>
                    <div>
                      <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                        Most Purchased Item
                      </p>
                      <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                        {productDetails[mostRepeatedItem]?.name || 'Unknown'}
                      </p>
                      <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                        {mostRepeatedItemCount} items sold..
                      </p>
                    </div>
                  </div>
                </div>
                <div className="card w-full hover:shadow-lg transition duration-300 ease-in-out">
                  <div className="flex items-center p-4 bg-gray-100 rounded-lg shadow-xl dark:bg-gray-800">
                    <div className="p-3 mr-4 text-green-500 bg-green-100 rounded-full dark:text-orange-100 dark:bg-orange-500">
                      <img
                        src={
                          productDetails[recentlySoldItem]?.image ||
                          'Placeholder Image URL'
                        }
                        className="h-12 w-12"
                        alt="Recently Sold"
                      />
                    </div>
                    <div>
                      <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                        Recently Sold
                      </p>
                      <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                        {productDetails[recentlySoldItem]?.name || 'Unknown'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <CardBody className="overflow-x-auto">
                <table className="w-full bg-white shadow-md rounded-lg">
                  <thead>
                    <tr className="text-left">
                      <th className="px-1 py-1 bg-gray-300">#</th>
                      <th className="px-1 py-1 bg-gray-300">Product Name</th>
                      <th className="px-1 py-1 bg-gray-300">Product Image</th>
                      <th className="px-1 py-1 bg-gray-300">Order Details</th>
                      <th className="px-1 py-1 bg-gray-300">Total Amount</th>
                      <th className="px-1 py-1 bg-gray-300">Created At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((order, index) => (
                      <tr key={order._id} className="hover:bg-gray-100">
                        <td className="px-1 py-1">{index + 1}</td>
                        <td className="px-1 py-1">
                          {order.items.map((item) => (
                            <div key={item.productId}>
                              {productDetails[item.productId] && (
                                <div>{productDetails[item.productId].name}</div>
                              )}
                            </div>
                          ))}
                        </td>
                        <td className="px-1 py-1">
                          {order.items.map((item) => (
                            <div key={item.productId}>
                              {productDetails[item.productId] && (
                                <Avatar
                                  className="w-10 h-10 object-cover"
                                  src={productDetails[item.productId].image}
                                  alt={productDetails[item.productId].name}
                                />
                              )}
                              {imageLoading[item.productId] && (
                                <p>Loading...</p>
                              )}
                            </div>
                          ))}
                        </td>
                        <td className="px-1 py-1">
                          {order.items.map((item) => (
                            <div key={item.productId}>
                              <div>
                                <Typography className="font-bold">
                                  Quantity: {item.quantity}, Total: Rs.
                                  {item.totalAmount}
                                </Typography>
                              </div>
                            </div>
                          ))}
                        </td>
                        <td className="px-1 py-1">
                          Rs. {calculateOrderTotal(order.items)}
                        </td>
                        <td className="px-1 py-1">
                          {new Date(order.createdAt).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardBody>
              <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                <Button
                  variant="outlined"
                  size="sm"
                  onClick={prevPage}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <div className="flex items-center gap-2">
                  {pageNumbers.map((number) => (
                    <IconButton
                      key={number}
                      variant={number === currentPage ? 'outlined' : 'text'}
                      size="sm"
                      onClick={() => paginate(number)}
                    >
                      {number}
                    </IconButton>
                  ))}
                </div>
                <Button
                  variant="outlined"
                  size="sm"
                  onClick={nextPage}
                  disabled={indexOfLastItem >= totalFilteredItems}
                >
                  Next
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default DirectOrdersTable;
