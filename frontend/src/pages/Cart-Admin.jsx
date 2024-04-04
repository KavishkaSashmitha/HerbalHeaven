import { PencilIcon } from '@heroicons/react/24/solid';
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

const TABLE_HEAD = [
  'Product',
  'Amount',
  'Date',
  'Cart User',
  'Send Notifications',
];

export function CartDetails() {
  const [cartItems, setCartItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

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
  return (
    <>
      <div className="flex h-screen ">
        <div
          className={`sidebar w-64 bg-teal-400 text-white ${
            open ? 'block' : 'hidden'
          }`}
        >
          <Sidebar open={open} handleOpen={setOpen} />
        </div>
        <div className="w-full">
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
                    />
                  </div>
                  <Link to="/cart-stats">
                    <Button className="flex items-center gap-3" size="sm">
                      <ArrowDownTrayIcon strokeWidth={2} className="h-4 w-4" />{' '}
                      Stats
                    </Button>
                  </Link>
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
