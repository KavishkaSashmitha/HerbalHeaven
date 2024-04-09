import { PencilIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';

import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Input,
} from '@material-tailwind/react';
import { SidebarWithBurgerMenu } from '../components/navBar';
import ProfileMenu from '../components/Profile';
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AdminNavbar from '../components/AdminNavbar';
import Sidebar from '../components/AdminSidebar';
import { DefaultSidebar } from '../components/Manager-Sidebar';

const TABLE_HEAD = [
  'Product',
  'Amount',
  'Date',
  'Cart User',
  'Send Notifications',
];

export function CartAdmin() {
  const [cartItems, setCartItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const [searchInput, setSearchInput] = useState('');
  const [filteredCartItems, setFilteredCartItems] = useState([]);

  // Function to handle search input change
  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  useEffect(() => {
    const filteredItems = cartItems.filter((item) =>
      item.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredCartItems(filteredItems);
  }, [searchInput, cartItems]);
  const getUniqueUsers = () => {
    const uniqueUsers = {};
    cartItems.forEach((item) => {
      if (!uniqueUsers[item.user.email]) {
        uniqueUsers[item.user.email] = { email: item.user.email, count: 1 };
      } else {
        uniqueUsers[item.user.email].count += 1;
      }
    });
    return Object.values(uniqueUsers);
  };

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = cartItems.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(currentPage + 1);
  const prevPage = () => setCurrentPage(currentPage - 1);

  //generate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(cartItems.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8070/api/user/cart/cart-details'
        );
        setCartItems(response.data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
  const toggleSidebar = () => {
    setOpen(!open);
  };
  // Extract unique email addresses from cartItems
  const uniqueEmails = new Set(
    cartItems.map((item) => (item.user ? item.user.email : null))
  );

  // Remove null values if there are any
  uniqueEmails.delete(null);

  // Get the count of unique email addresses
  const uniqueEmailCount = uniqueEmails.size;

  //most added product
  const productInfo = {};
  cartItems.forEach((item) => {
    if (!productInfo[item.name]) {
      productInfo[item.name] = {
        count: 1,
        name: item.name,
        image: item.image,
      };
    } else {
      productInfo[item.name].count++;
    }
  });

  // Find the most repeated product
  let mostRepeatedProduct = null;
  let maxCount = 0;
  for (const productName in productInfo) {
    if (productInfo[productName].count > maxCount) {
      maxCount = productInfo[productName].count;
      mostRepeatedProduct = productInfo[productName];
    }
  }
  return (
    <>
      <div className="flex h-screen overflow-scroll">
        <div
          className={`sidebar w-64  bg-custom-color text-white ${open ? 'block' : 'hidden'}`}
        >
          <DefaultSidebar open={open} handleOpen={setOpen} />
        </div>
        <div className="w-full h-full">
          <AdminNavbar toggleSidebar={toggleSidebar} />

          <Card className="h-full">
            <CardHeader floated={false} shadow={false} className="rounded-none">
              <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
                <div>
                  <Typography variant="h5" color="blue-gray">
                    Recent Carted Items
                  </Typography>
                  <Typography color="gray" className="mt-1 font-normal">
                    These are details about the last Carting
                  </Typography>
                </div>
                <div className="flex w-full shrink-0 gap-2 md:w-max">
                  <div className="w-full md:w-72">
                    <Input
                      label="Search"
                      icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                      value={searchInput}
                      onChange={handleSearchInputChange}
                    />
                  </div>

                  <Link to="/cart-stats">
                    <Button className="flex items-center gap-3" size="sm">
                      <ArrowDownTrayIcon strokeWidth={2} className="h-4 w-4" />{' '}
                      Stats
                    </Button>
                  </Link>
                </div>
                <div className="container  mx-auto grid justify-center">
                  <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
                    <div className="card w-full">
                      <div className="flex items-center p-4 bg-gray-100 rounded-lg shadow-xl dark:bg-gray-800">
                        <div className="p-3 mr-4 text-orange-500 bg-orange-100 rounded-full dark:text-orange-100 dark:bg-orange-500">
                          <UserCircleIcon className="h-10 w-10" />
                        </div>
                        <div>
                          <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                            Users
                          </p>
                          <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                            {uniqueEmailCount} Users
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="card w-full">
                      {mostRepeatedProduct && (
                        <div className="flex items-center p-4 bg-gray-100 rounded-lg shadow-xl dark:bg-gray-800">
                          <div className="p-3 mr-4 text-green-500 bg-green-100 rounded-full dark:text-orange-100 dark:bg-orange-500">
                            <img
                              src={mostRepeatedProduct.image}
                              alt={mostRepeatedProduct.name}
                              className="w-10 h-10 rounded-full"
                            />
                          </div>
                          <div>
                            <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                              Most Added Product
                            </p>

                            <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                              {mostRepeatedProduct.name}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="card w-full">
                      <div className="flex items-center p-4 bg-gray-100 rounded-lg shadow-xl dark:bg-gray-800">
                        <div className="p-3 mr-4 text-blue-500 bg-blue-100 rounded-full dark:text-orange-100 dark:bg-orange-500">
                          <svg
                            class="w-10 h-10"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
                          </svg>
                        </div>
                        <div>
                          <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                            Suppliers
                          </p>
                          <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
                            20
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardBody className="overflow-scroll px-0">
              <table className="w-full min-w-max table-auto text-left">
                <thead>
                  <tr>
                    {TABLE_HEAD.map((head) => (
                      <th
                        key={head}
                        className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none opacity-70"
                        >
                          {head}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((item, index) => (
                    <tr key={index}>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <Avatar
                            src={item.image}
                            alt={item.name}
                            size="md"
                            className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                          />
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold"
                          >
                            {item.name}
                          </Typography>
                        </div>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          Rs.{item.price}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item.date}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <div className="w-max">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {item.user ? item.user.email : 'N/A'}
                          </Typography>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-12 rounded-md border border-blue-gray-50 p-1">
                            <Avatar
                              src={
                                item.account === 'visa'
                                  ? 'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/logos/visa.png'
                                  : 'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/logos/mastercard.png'
                              }
                              size="sm"
                              alt=""
                              variant="square"
                              className="h-full w-full object-contain p-1"
                            />
                          </div>
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal capitalize"
                            ></Typography>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70"
                            ></Typography>
                          </div>
                        </div>
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
                disabled={indexOfLastItem >= cartItems.length}
              >
                Next
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}
