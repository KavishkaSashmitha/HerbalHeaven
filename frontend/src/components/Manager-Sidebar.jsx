import React, { useContext } from "react";
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
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import {
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { useAuth } from "../middleware/authContext"; // Importing the useAuth hook from AuthContext
import { useCart } from "./cartContext";

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
        style={{ borderRadius: "0" }}
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
              open={open === 2}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={` text-yellow-300 mx-auto h-4 w-4 transition-transform ${
                    open === 2 ? "rotate-180" : ""
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

                <Link to="/cart-Admin">

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
                    open === 3 ? "rotate-180" : ""
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

            <Accordion
              open={open === 4}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={` text-yellow-300 mx-auto h-4 w-4 transition-transform ${
                    open === 4 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem className="p-0 mr-5" selected={open === 1}>
                <AccordionHeader
                  onClick={() => handleOpen(4)}
                  className="p-3 border-b-0 hover:bg-teal-800"
                >
                  <ListItemPrefix>
                    <PresentationChartBarIcon className="w-5 h-5 text-teal-200 hover:text-teal-700" />
                  </ListItemPrefix>

                  <Typography
                    color="blue-gray"
                    className="mr-auto font-normal text-teal-200 "
                  >
                    Finance-Manager
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="px-4">
                  <Link to="/netincome">
                    <ListItem className="text-yellow-200 ">
                      <ListItemPrefix>
                        <ChevronRightIcon
                          strokeWidth={3}
                          className="w-5 h-3 text-yellow-200"
                        />
                      </ListItemPrefix>
                      NetIncome
                    </ListItem>
                  </Link>
                  <Link to="/expensive">
                    <ListItem className="text-yellow-200">
                      <ListItemPrefix>
                        <ChevronRightIcon
                          strokeWidth={3}
                          className="w-5 h-3 text-yellow-200"
                        />
                      </ListItemPrefix>
                      Expenses
                    </ListItem>
                  </Link>
                </List>
              </AccordionBody>
            </Accordion>

            <Accordion
              open={open === 5}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={` text-yellow-300 mx-auto h-4 w-4 transition-transform ${
                    open === 5 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem className="p-0 mr-5" selected={open === 5}>
                <AccordionHeader
                  onClick={() => handleOpen(5)}
                  className="p-3 border-b-0 hover:bg-teal-800"
                >
                  <ListItemPrefix>
                    <PresentationChartBarIcon className="w-5 h-5 text-teal-200 hover:text-teal-700" />
                  </ListItemPrefix>

                  <Typography
                    color="blue-gray"
                    className="mr-auto font-normal text-teal-200 "
                  >
                    Sup-Manager
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="px-4">
                  <Link to="/sup">
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
                  <Link to="/sup">
                    <ListItem className="text-yellow-200">
                      <ListItemPrefix>
                        <ChevronRightIcon
                          strokeWidth={3}
                          className="w-5 h-3 text-yellow-200"
                        />
                      </ListItemPrefix>
                      Supplier Statics
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

            <Accordion
              open={open === 6}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={` text-yellow-300 mx-auto h-4 w-4 transition-transform ${
                    open === 6 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem className="p-0 mr-5" selected={open === 6}>
                <AccordionHeader
                  onClick={() => handleOpen(6)}
                  className="p-3 border-b-0 hover:bg-teal-800"
                >
                  <ListItemPrefix>
                    <PresentationChartBarIcon className="w-5 h-5 text-teal-200 hover:text-teal-700" />
                  </ListItemPrefix>

                  <Typography
                    color="blue-gray"
                    className="mr-auto font-normal text-teal-200 "
                  >
                    Transp-Manager
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="px-4">
                  <Link to="/transport">
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
                  <Link to="/transport">
                    <ListItem className="text-yellow-200">
                      <ListItemPrefix>
                        <ChevronRightIcon
                          strokeWidth={3}
                          className="w-5 h-3 text-yellow-200"
                        />
                      </ListItemPrefix>
                      Transport Statics
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

            <Accordion
              open={open === 7}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={` text-yellow-300 mx-auto h-4 w-4 transition-transform ${
                    open === 7 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem className="p-0 mr-5" selected={open === 7}>
                <AccordionHeader
                  onClick={() => handleOpen(7)}
                  className="p-3 border-b-0 hover:bg-teal-800"
                >
                  <ListItemPrefix>
                    <PresentationChartBarIcon className="w-5 h-5 text-teal-200 hover:text-teal-700" />
                  </ListItemPrefix>

                  <Typography
                    color="blue-gray"
                    className="mr-auto font-normal text-teal-200 "
                  >
                    Order-Manager
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="px-4">
                  <Link to="/admin-orders">
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
                  <Link to="/admin-orders">
                    <ListItem className="text-yellow-200">
                      <ListItemPrefix>
                        <ChevronRightIcon
                          strokeWidth={3}
                          className="w-5 h-3 text-yellow-200"
                        />
                      </ListItemPrefix>
                      Order Statics
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

          </List>
        </div>
      </Card>
    </>
  );
}
