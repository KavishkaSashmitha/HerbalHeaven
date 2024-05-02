import React, { useContext } from 'react';
import {
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Alert,
  Input,
  Drawer,
  Card,
  Badge,
  Chip,
} from '@material-tailwind/react';

import {
  UserCircleIcon,
  PowerIcon,
  ShoppingBagIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  PresentationChartBarIcon,
  TruckIcon,
  CubeIcon,
} from '@heroicons/react/24/solid';
import {
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useAuth } from '../middleware/authContext'; // Importing the useAuth hook from AuthContext

import { useCart } from './cartContext';
import { FaMoneyBill } from 'react-icons/fa6';

export function SidebarWithBurgerMenu({}) {
  const [open, setOpen] = React.useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const { isLoggedIn, logout } = useAuth(); // Destructuring isLoggedIn and logout from useAuth hook
  const { cartCount } = useCart();

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <>
      <IconButton
        className="ml-2"
        variant="text"
        size="lg"
        onClick={openDrawer}
      >
        {isDrawerOpen ? (
          <XMarkIcon className="h-8 w-8 stroke-2" />
        ) : (
          <Bars3Icon
            className="h-8 w-8 stroke-2 "
            style={{ color: '#c8e6c9' }}
          />
        )}
      </IconButton>

      <Drawer
        className="bg-custom-color"
        open={isDrawerOpen}
        onClose={closeDrawer}
      >
        <Card
          color="transparent"
          shadow={false}
          className="h-[calc(100vh-2rem)] w-full p-2 bg-custom-color"
        >
          <Link to="/">
            <div className="flex items-center justify-center mt-5 mr-5">
              <img
                src="/logo/loading.png"
                alt="brand"
                className="h-13 w-12 mb-10 mt-10"
              />
              <h5 class="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-teal-200">
                Herbal Heaven
              </h5>
            </div>
          </Link>

          {/* <div className="p-1">
            <Input
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              label="Search"
            />
          </div> */}

          <List className=" bg-custom-color pt-10">
            <Link to="/my-orders">
              <Accordion open={open === 2}>
                <ListItem className="p-0" selected={open === 2}>
                  <AccordionHeader
                    onClick={() => handleOpen(2)}
                    className="border-b-0 p-3 hover:bg-teal-800"
                  >
                    <ListItemPrefix>
                      <TruckIcon className="h-5 w-5 text-teal-200" />
                    </ListItemPrefix>
                    <Typography
                      color="blue-gray"
                      className="mr-auto font-normal text-teal-200"
                    >
                      Orders
                    </Typography>
                  </AccordionHeader>
                </ListItem>
              </Accordion>
            </Link>
            <Link to="/products">
              <Accordion open={open === 3}>
                <ListItem className="p-0" selected={open === 3}>
                  <AccordionHeader
                    onClick={() => handleOpen(3)}
                    className="border-b-0 p-3 hover:bg-teal-800"
                  >
                    <ListItemPrefix>
                      <CubeIcon className="h-5 w-5 text-teal-200" />
                    </ListItemPrefix>
                    <Typography
                      color="blue-gray"
                      className="mr-auto font-normal text-teal-200"
                    >
                      Products
                    </Typography>
                  </AccordionHeader>
                </ListItem>
              </Accordion>
            </Link>
            <Link to="/carddetails">
              <Accordion open={open === 3}>
                <ListItem className="p-0" selected={open === 3}>
                  <AccordionHeader
                    onClick={() => handleOpen(3)}
                    className="border-b-0 p-3 hover:bg-teal-800"
                  >
                    <ListItemPrefix>
                      <FaMoneyBill className="h-5 w-5 text-teal-200" />
                    </ListItemPrefix>
                    <Typography
                      color="blue-gray"
                      className="mr-auto font-normal text-teal-200"
                    >
                      Payment
                    </Typography>
                  </AccordionHeader>
                </ListItem>
              </Accordion>
            </Link>
            
            
            <Link to="/customer/cart">
              <Accordion open={open === 3}>
                <ListItem className="p-0" selected={open === 3}>
                  <AccordionHeader
                    onClick={() => handleOpen(3)}
                    className="border-b-0 p-3 hover:bg-teal-800"
                  >
                    <ListItemPrefix>
                      <ShoppingBagIcon className="h-5 w-5 text-teal-200" />
                    </ListItemPrefix>
                    <Typography
                      color="blue-gray"
                      className="mr-auto font-normal text-teal-200"
                    >
                      Cart
                    </Typography>
                    <ListItemSuffix>
                      <Chip
                        value={isLoggedIn ? cartCount : '0'}
                        size="sm"
                        variant="ghost"
                        color="blue-gray"
                        className="rounded-full text-teal-200"
                      />
                    </ListItemSuffix>
                  </AccordionHeader>
                </ListItem>
              </Accordion>
            </Link>

            <hr className="my-2 border-blue-gray-50" />

            {isLoggedIn ? ( // Conditional rendering based on isLoggedIn state
              <>
                <Link to="/dashboard">
                  <ListItem className="p-2 mt-3 hover:bg-cyan-500">
                    <ListItemPrefix>
                      <UserCircleIcon className="h-5 w-5 text-yellow-400" />
                    </ListItemPrefix>
                    <Typography
                      color="blue-gray"
                      className="mr-auto font-normal text-yellow-400"
                    >
                      Profile
                    </Typography>
                  </ListItem>
                </Link>
                <ListItem className="p-2 mt-3 py-2 bg-red-500" onClick={logout}>
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
        </Card>
      </Drawer>
    </>
  );
}
