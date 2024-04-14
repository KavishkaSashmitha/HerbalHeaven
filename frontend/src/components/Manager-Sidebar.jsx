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
        className="h-full overflow-y-scroll w-72 bg-custom-color"
        style={{ borderRadius: '0' }}
      >
        <div className="p-4 mb-2">
          <Link to="/">
            <div className="flex items-center justify-center mt-0 ">
              <img
                src="/logo/loading.png"
                alt="brand"
                className="w-12 h-12 mt-10 mb-10"
              />
              <h5 class="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-teal-300">
                Herbal Heaven
              </h5>
            </div>
          </Link>
          <div className="p-1">
            <Input
              className="text-teal-200"
              icon={<MagnifyingGlassIcon className="w-5 h-5 text-teal-100" />}
              label="Search"
            />
          </div>
        </div>
        <div className="overflow-x-hidden overflow-y-scroll">
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
                  className="p-3 border-b-0 hover:bg-teal-800"
                >
                  <ListItemPrefix>
                    <PresentationChartBarIcon className="w-5 h-5 text-teal-200 hover:text-teal-700" />
                  </ListItemPrefix>

                  <Typography
                    color="blue-gray"
                    className="mr-auto font-normal text-teal-200 "
                  >
                    Managers
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
                          className="w-5 h-3 text-yellow-200"
                        />
                      </ListItemPrefix>
                      Customer
                    </ListItem>
                  </Link>
                  <ListItem className="text-yellow-200">
                    <ListItemPrefix>
                      <ChevronRightIcon
                        strokeWidth={3}
                        className="w-5 h-3 text-yellow-200"
                      />
                    </ListItemPrefix>
                    Inventory
                  </ListItem>

                  <Link to="/emp">
                    <ListItem className="text-yellow-200">
                      <ListItemPrefix>
                        <ChevronRightIcon
                          strokeWidth={3}
                          className="w-5 h-3 text-yellow-200"
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
                          className="w-5 h-3 text-yellow-200"
                        />
                      </ListItemPrefix>
                      Supplier
                    </ListItem>
                  </Link>

                  <Link to="/transport">
                    <ListItem className="text-yellow-200">
                      <ListItemPrefix>
                        <ChevronRightIcon
                          strokeWidth={3}
                          className="w-5 h-3 text-yellow-200"
                        />
                      </ListItemPrefix>
                      Transport
                    </ListItem>
                  </Link>
                  <Link to="/admin-orders">
                    <ListItem className="text-yellow-200">
                      <ListItemPrefix>
                        <ChevronRightIcon
                          strokeWidth={3}
                          className="w-5 h-3 text-yellow-200"
                        />
                      </ListItemPrefix>
                      Order
                    </ListItem>
                  </Link>
                  <Link to="/netincome">
                    <ListItem className="text-yellow-200">
                      <ListItemPrefix>
                        <ChevronRightIcon
                          strokeWidth={3}
                          className="w-5 h-3 text-yellow-200"
                        />
                      </ListItemPrefix>
                      Payment
                    </ListItem>
                  </Link>
                </List>
              </AccordionBody>
            </Accordion>
            <Accordion
              open={open === 2}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={` text-yellow-300 mx-auto h-4 w-4 transition-transform ${
                    open === 2 ? 'rotate-180' : ''
                  }`}
                />
              }
            >
              <ListItem className="p-0 mr-5" selected={open === 1}>
                <AccordionHeader
                  onClick={() => handleOpen(2)}
                  className="p-3 border-b-0 hover:bg-teal-800"
                >
                  <ListItemPrefix>
                    <PresentationChartBarIcon className="w-5 h-5 text-teal-200 hover:text-teal-700" />
                  </ListItemPrefix>

                  <Typography
                    color="blue-gray"
                    className="mr-auto font-normal text-teal-200 "
                  >
                    Cart-Manager
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="px-4">
                  <Link to="/cartAdmin-db">
                    <ListItem className="text-yellow-200 ">
                      <ListItemPrefix>
                        <ChevronRightIcon
                          strokeWidth={3}
                          className="w-5 h-3 text-yellow-200"
                        />
                      </ListItemPrefix>
                      Dashboard
                    </ListItem>
                  </Link>
                  <Link to="/direct-orders">
                    <ListItem className="text-yellow-200">
                      <ListItemPrefix>
                        <ChevronRightIcon
                          strokeWidth={3}
                          className="w-5 h-3 text-yellow-200"
                        />
                      </ListItemPrefix>
                      Direct-Sales
                    </ListItem>
                  </Link>
                  <Link to="/cart-admin">
                    <ListItem className="text-yellow-200">
                      <ListItemPrefix>
                        <ChevronRightIcon
                          strokeWidth={3}
                          className="w-5 h-3 text-yellow-200"
                        />
                      </ListItemPrefix>
                      Online-Cart-Stats
                    </ListItem>
                  </Link>
                </List>
              </AccordionBody>
            </Accordion>

            <Accordion
              open={open === 3}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={` text-yellow-300 mx-auto h-4 w-4 transition-transform ${
                    open === 3 ? 'rotate-180' : ''
                  }`}
                />
              }
            >
              <ListItem className="p-0 mr-5" selected={open === 1}>
                <AccordionHeader
                  onClick={() => handleOpen(3)}
                  className="p-3 border-b-0 hover:bg-teal-800"
                >
                  <ListItemPrefix>
                    <PresentationChartBarIcon className="w-5 h-5 text-teal-200 hover:text-teal-700" />
                  </ListItemPrefix>

                  <Typography
                    color="blue-gray"
                    className="mr-auto font-normal text-teal-200 "
                  >
                    Emp-Manager
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="px-4">
                  <Link to="/Employee_Dashboard">
                    <ListItem className="text-yellow-200 ">
                      <ListItemPrefix>
                        <ChevronRightIcon
                          strokeWidth={3}
                          className="w-5 h-3 text-yellow-200"
                        />
                      </ListItemPrefix>
                      Dashboard
                    </ListItem>
                  </Link>
                  <Link to="/emp">
                    <ListItem className="text-yellow-200">
                      <ListItemPrefix>
                        <ChevronRightIcon
                          strokeWidth={3}
                          className="w-5 h-3 text-yellow-200"
                        />
                      </ListItemPrefix>
                      Employee Statics
                    </ListItem>
                  </Link>
                  {/* <Link to="/cart-admin">
                    <ListItem className="text-yellow-200">
                      <ListItemPrefix>
                        <ChevronRightIcon
                          strokeWidth={3}
                          className="w-5 h-3 text-yellow-200"
                        />
                      </ListItemPrefix>
                      Online-Cart-Stats
                    </ListItem>
                  </Link> */}
                </List>
              </AccordionBody>
            </Accordion>

            <hr className="my-2 border-white" />
            {isLoggedIn ? ( // Conditional rendering based on isLoggedIn state
              <>
                <Link to="/dashboard">
                  <ListItem className="p-2 py-2 hover:bg-cyan-500 ">
                    <ListItemPrefix>
                      <UserCircleIcon className="w-5 h-5 text-yellow-400 " />
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
                    <PowerIcon className="w-5 h-5" />
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
                    <UserCircleIcon className="w-5 h-5" />
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
