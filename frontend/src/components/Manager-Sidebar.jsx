import React, { useContext } from 'react';
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  AccordionHeader,
  Accordion,
  AccordionBody,
  Chip,
  Drawer,
  Input,
} from '@material-tailwind/react';
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from '@heroicons/react/24/solid';
import {
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { ChevronRightIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import { useAuth } from '../middleware/authContext'; // Importing the useAuth hook from AuthContext
import { useCart } from './cartContext';

export function DefaultSidebar() {
  const [open, setOpen] = React.useState(0);
  const { isLoggedIn, logout } = useAuth(); // Destructuring isLoggedIn and logout from useAuth hook

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <>
      <Card
        color="transparent"
        shadow={false}
        className="h-full w-full pr-1 bg-custom-color overflow-hidden"
      >
        <div className="mb-2 p-4">
          <Link to="/">
            <div className="flex items-center justify-center mt-0 ">
              <img
                src="\logo\logo-2.png"
                alt="brand"
                className="h-13 w-12 mb-10 mt-10"
              />
              <h5 class="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-teal-300">
                Herbal Heaven
              </h5>
            </div>
          </Link>
          <div className="p-1">
            <Input
              className="text-teal-200"
              icon={<MagnifyingGlassIcon className="h-5 w-5 text-teal-100" />}
              label="Search"
            />
          </div>
        </div>
        <div className="overflow-y-scroll overflow-x-hidden">
          <List className="mr-10">
            <Accordion
              open={open === 1}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={` text-yellow-300 mx-auto h-4 w-4 transition-transform ${
                    open === 1 ? 'rotate-180' : ''
                  }`}
                />
              }
            >
              <ListItem className="p-0 mr-5" selected={open === 1}>
                <AccordionHeader
                  onClick={() => handleOpen(1)}
                  className="border-b-0 p-3 hover:bg-teal-800"
                >
                  <ListItemPrefix>
                    <PresentationChartBarIcon className="h-5 w-5 text-teal-200 hover:text-teal-700" />
                  </ListItemPrefix>

                  <Typography
                    color="blue-gray"
                    className="mr-auto font-normal text-teal-200 "
                  >
                    Dashboard
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="px-4">
                  <Link to="#">
                    <ListItem className="text-yellow-200 ">
                      <ListItemPrefix>
                        <ChevronRightIcon
                          strokeWidth={3}
                          className="h-3 w-5 text-yellow-200"
                        />
                      </ListItemPrefix>
                      Customer
                    </ListItem>
                  </Link>
                  <ListItem className="text-yellow-200">
                    <ListItemPrefix>
                      <ChevronRightIcon
                        strokeWidth={3}
                        className="h-3 w-5 text-yellow-200"
                      />
                    </ListItemPrefix>
                    Inventory
                  </ListItem>
                  <Link to="/cart-admin">
                    <ListItem className="text-yellow-200">
                      <ListItemPrefix>
                        <ChevronRightIcon
                          strokeWidth={3}
                          className="h-3 w-5 text-yellow-200"
                        />
                      </ListItemPrefix>
                      Cart
                    </ListItem>
                  </Link>

                  <Link to="/emp">
                    <ListItem className="text-yellow-200">
                      <ListItemPrefix>
                        <ChevronRightIcon
                          strokeWidth={3}
                          className="h-3 w-5 text-yellow-200"
                        />
                      </ListItemPrefix>
                      Employee
                    </ListItem>
                  </Link>

                  <Link to="/sup">
                    <ListItem className="text-yellow-200">
                      <ListItemPrefix>
                        <ChevronRightIcon
                          strokeWidth={3}
                          className="h-3 w-5 text-yellow-200"
                        />
                      </ListItemPrefix>
                      Supplier
                    </ListItem>
                  </Link>

                  <Link to="#">
                    <ListItem className="text-yellow-200">
                      <ListItemPrefix>
                        <ChevronRightIcon
                          strokeWidth={3}
                          className="h-3 w-5 text-yellow-200"
                        />
                      </ListItemPrefix>
                      Transport
                    </ListItem>
                  </Link>

                  <Link to="#">
                    <ListItem className="text-yellow-200">
                      <ListItemPrefix>
                        <ChevronRightIcon
                          strokeWidth={3}
                          className="h-3 w-5 text-yellow-200"
                        />
                      </ListItemPrefix>
                      Order
                    </ListItem>
                  </Link>
                  <Link to="#">
                    <ListItem className="text-yellow-200">
                      <ListItemPrefix>
                        <ChevronRightIcon
                          strokeWidth={3}
                          className="h-3 w-5 text-yellow-200"
                        />
                      </ListItemPrefix>
                      Payment
                    </ListItem>
                  </Link>
                </List>
              </AccordionBody>
            </Accordion>
            <Link to="#">
              <Accordion open={open === 2}>
                <ListItem
                  className="p-0 hover:bg-teal-800"
                  selected={open === 2}
                >
                  <AccordionHeader
                    onClick={() => handleOpen(2)}
                    className="border-b-0 p-3 "
                  >
                    <ListItemPrefix>
                      <ShoppingBagIcon className="h-5 w-5 text-teal-200 " />
                    </ListItemPrefix>
                    <Typography
                      color="blue-gray"
                      className="mr-auto font-normal text-teal-200 "
                    >
                      Orders
                    </Typography>
                  </AccordionHeader>
                </ListItem>
              </Accordion>
            </Link>
            <Link to="/products">
              <Accordion open={open === 3}>
                <ListItem
                  className="p-0 hover:bg-teal-800"
                  selected={open === 3}
                >
                  <AccordionHeader
                    onClick={() => handleOpen(3)}
                    className="border-b-0 p-3 "
                  >
                    <ListItemPrefix>
                      <ShoppingBagIcon className="h-5 w-5 text-teal-200 " />
                    </ListItemPrefix>
                    <Typography
                      color="blue-gray"
                      className="mr-auto font-normal text-teal-200 "
                    >
                      Products
                    </Typography>
                  </AccordionHeader>
                </ListItem>
              </Accordion>
            </Link>
            <Link to="/user/cart">
              <Accordion open={open === 3}>
                <ListItem
                  className="p-0 hover:bg-teal-800"
                  selected={open === 3}
                >
                  <AccordionHeader
                    onClick={() => handleOpen(3)}
                    className="border-b-0 p-3 "
                  >
                    <ListItemPrefix>
                      <ShoppingBagIcon className="h-5 w-5 text-teal-200 " />
                    </ListItemPrefix>
                    <Typography
                      color="blue-gray"
                      className="mr-auto font-normal text-teal-200 "
                    >
                      Cart
                    </Typography>
                    <ListItemSuffix>
                      <Chip
                        size="sm"
                        variant="ghost"
                        color="blue-gray"
                        className="rounded-full"
                      />
                    </ListItemSuffix>
                  </AccordionHeader>
                </ListItem>
              </Accordion>
            </Link>

            <hr className="my-2 border-white" />
            {isLoggedIn ? ( // Conditional rendering based on isLoggedIn state
              <>
                <Link to="/dashboard">
                  <ListItem className="p-2 py-2 hover:bg-cyan-500 ">
                    <ListItemPrefix>
                      <UserCircleIcon className="h-5 w-5 text-yellow-400 " />
                    </ListItemPrefix>
                    <Typography
                      color="blue-gray"
                      className="mr-auto font-normal text-yellow-400 "
                    >
                      Profile
                    </Typography>
                  </ListItem>
                </Link>
                <ListItem className="p-2 py-1 bg-red-500" onClick={logout}>
                  <ListItemPrefix>
                    <PowerIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  <Typography
                    color="blue-gray"
                    className="mr-auto font-normal logout"
                  >
                    Log Out
                  </Typography>
                </ListItem>
              </>
            ) : (
              <Link to="/login">
                <ListItem className="p-2 py-2 bg-light-green-500">
                  <ListItemPrefix>
                    <UserCircleIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="mr-auto font-bold ">
                    Log In
                  </Typography>
                </ListItem>
              </Link>
            )}
          </List>
        </div>
      </Card>
    </>
  );
}
