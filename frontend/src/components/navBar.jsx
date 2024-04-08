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
} from '@material-tailwind/react';
import {
  UserCircleIcon,
  PowerIcon,
  ShoppingBagIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  PresentationChartBarIcon,
} from '@heroicons/react/24/solid';
import {
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useAuth } from '../middleware/authContext'; // Importing the useAuth hook from AuthContext

export function SidebarWithBurgerMenu() {
  const [open, setOpen] = React.useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const { isLoggedIn, logout } = useAuth(); // Destructuring isLoggedIn and logout from useAuth hook

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <>
      <IconButton variant="text" size="lg" onClick={openDrawer}>
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
        className="bg-green-100"
        open={isDrawerOpen}
        onClose={closeDrawer}
      >
        <Card
          color="transparent"
          shadow={false}
          className="h-[calc(100vh-2rem)] w-full p-2 bg-green-100"
        >
          <div className="flex items-center justify-center mt-0 ">
            <img src="\logo\logo.png" alt="brand" className="h-13 w-13 m-0" />
          </div>
          <div className="p-1">
            <Input
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              label="Search"
            />
          </div>

          <List className="overflow-y-scroll bg-green-100">
            <Accordion
              open={open === 1}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    open === 1 ? 'rotate-180' : ''
                  }`}
                />
              }
            >
              <ListItem className="p-0" selected={open === 1}>
                <AccordionHeader
                  onClick={() => handleOpen(1)}
                  className="border-b-0 p-3"
                >
                  <ListItemPrefix>
                    <PresentationChartBarIcon className="h-5 w-5" />
                  </ListItemPrefix>

                  <Typography color="blue-gray" className="mr-auto font-normal">
                    Dashboard
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0">
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Customer
                  </ListItem>
                  <Link to="/inventory">
                    <ListItem>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Inventory
                    </ListItem>
                  </Link>
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Cart
                  </ListItem>
                  <Link to="/emp">
                    <ListItem>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Employee
                    </ListItem>
                  </Link>
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Supplier
                  </ListItem>
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Transport
                  </ListItem>
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Order
                  </ListItem>
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Payment
                  </ListItem>
                </List>
              </AccordionBody>
            </Accordion>
            <Link to="./SalaryReport">
              <Accordion open={open === 2}>
                <ListItem className="p-0" selected={open === 2}>
                  <AccordionHeader
                    onClick={() => handleOpen(2)}
                    className="border-b-0 p-3"
                  >
                    <ListItemPrefix>
                      <ShoppingBagIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    <Typography
                      color="blue-gray"
                      className="mr-auto font-normal"
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
                    className="border-b-0 p-3"
                  >
                    <ListItemPrefix>
                      <ShoppingBagIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    <Typography
                      color="blue-gray"
                      className="mr-auto font-normal"
                    >
                      Products
                    </Typography>
                  </AccordionHeader>
                </ListItem>
              </Accordion>
            </Link>
            <Link to="/user/cart">
              <Accordion open={open === 3}>
                <ListItem className="p-0" selected={open === 3}>
                  <AccordionHeader
                    onClick={() => handleOpen(3)}
                    className="border-b-0 p-3"
                  >
                    <ListItemPrefix>
                      <ShoppingBagIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    <Typography
                      color="blue-gray"
                      className="mr-auto font-normal"
                    >
                      Cart
                    </Typography>
                  </AccordionHeader>
                </ListItem>
              </Accordion>
            </Link>

            <hr className="my-2 border-blue-gray-50" />

            {isLoggedIn ? ( // Conditional rendering based on isLoggedIn state
              <>
                <Link to="/dashboard">
                  <ListItem className="p-2 py-2">
                    <ListItemPrefix>
                      <UserCircleIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    <Typography
                      color="blue-gray"
                      className="mr-auto font-normal"
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
        </Card>
      </Drawer>
    </>
  );
}
