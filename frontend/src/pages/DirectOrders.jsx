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
import jsPDF from 'jspdf';

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
  const [reportGenerated, setReportGenerated] = useState(false);

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

  const generateReport = () => {
    try {
      const doc = new jsPDF();
      // Add current time
      const now = new Date();
      const currentTime = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
      doc.setFontSize(10);
      doc.text(`Report generated on: ${currentTime}`, 10, 20);
      // Load the logo image from a local path
      const logoPath = 'logo/logo.png';
      const logoDataUri = getBase64Image(logoPath);

      // Add the logo to the PDF
      doc.addImage(logoDataUri, 'PNG', 10, 10, 50, 50);

      const companyName = 'Herbal Heaven';
      doc.setFontSize(18);
      doc.text(companyName, 70, 30);
      doc.setFontSize(8); // Adjust font size as needed
      doc.text('Company Address:', 140, 40);
      doc.text('123 Main St, City, Country', 140, 45);
      doc.text('Email: info@herbalheaven.com', 140, 50);
      doc.text('Phone: +1234567890', 140, 55);
      // Create table data
      const tableData = directOrders.map((order, index) => {
        const orderItems = order.items.map((item) => ({
          productName: productDetails[item.productId]?.name || 'Unknown',
          productImage:
            productDetails[item.productId]?.image || 'Placeholder Image URL',
          quantity: item.quantity,
          totalAmount: item.totalAmount,
          createdAt: new Date(item.createdAt).toLocaleString(), // Convert MongoDB date to JavaScript Date object
        }));

        return {
          orderNumber: index + 1,
          orderItems,
          totalAmount: calculateOrderTotal(order.items),
          orderDate: new Date(order.createdAt).toLocaleString(), // Convert MongoDB date to JavaScript Date object
        };
      });

      // Add table using autoTable
      doc.autoTable({
        head: [['#', 'Product Name', 'Quantity', 'Total Amount', 'Created At']],
        body: tableData.flatMap(
          ({ orderNumber, orderItems, totalAmount, orderDate }) => {
            const rows = orderItems.map(
              ({
                productName,

                quantity,
                totalAmount,
                createdAt,
              }) => [orderNumber, productName, quantity, totalAmount, createdAt]
            );

            // Insert an empty row to separate orders
            rows.push(['', '', '', '', '', '']);
            return rows;
          }
        ),
        startY: 70,
        theme: 'striped',
        styles: { overflow: 'linebreak' },
        columnStyles: {
          1: { cellWidth: 80 }, // Adjust column width if needed
          2: { cellWidth: 40 }, // Adjust column width if needed
        },
      });

      // Save the PDF
      doc.save('Herbal_Heaven_Direct_Sales.pdf');
    } catch (error) {
      console.error('Error generating report:', error);
    }
  };

  // Function to convert image file to Data URI
  const getBase64Image = (imgPath) => {
    const img = new Image();
    img.src = imgPath;
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const dataURL = canvas.toDataURL('image/png');
    return dataURL;
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
                  <div className="flex h-auto items-center p-5 bg-gray-100 rounded-lg shadow-xl dark:bg-gray-800">
                    <div className="mr-4 text-green-500 bg-green-100 rounded-full dark:text-orange-100 dark:bg-orange-500">
                      <FaMoneyBill className="h-10 w-10" />
                    </div>
                    <div>
                      <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                        Direct Net Income
                      </p>
                      <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                        Rs.{totalAmountSum.toFixed(2)}
                      </p>
                      <br />
                    </div>
                  </div>
                </div>
                <div className="card w-full hover:shadow-lg transition duration-300 ease-in-out">
                  <div className="flex items-center p-5 bg-gray-100 rounded-lg shadow-xl dark:bg-gray-800">
                    <div className="mr-4 text-green-500 bg-green-100 rounded-full dark:text-orange-100 dark:bg-orange-500">
                      <img
                        src={
                          productDetails[mostRepeatedItem]?.image ||
                          'Placeholder Image URL'
                        }
                        className="h-10 w-10"
                        style={{ borderRadius: '50%' }}
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
              </div>
              <CardBody className="overflow-x-auto">
                <Button variant="outlined" size="sm" onClick={generateReport}>
                  Generate Report
                </Button>
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
