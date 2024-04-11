// Sidebar.js
import React from 'react';
import {
  Card,
  List,
  Accordion,
  AccordionHeader,
  ListItem,
  ListItemPrefix,
  Typography,
  ListItemSuffix,
  Chip,
  AccordionBody,
} from '@material-tailwind/react';
import {
  ChevronDownIcon,
  PresentationChartBarIcon,
  ShoppingBagIcon,
  InboxIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  PowerIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

function Sidebar({ open, handleOpen }) {
  return (
    <div
      className={`sidebar w-64  text-white ${open ? 'block' : 'hidden'}`}
    >
      <Card className="h-[calc(100vh-2rem)] w-full h-100vh max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
        <div className="p-4 mb-2">
          <Typography variant="h5" color="blue-gray">
            Sidebar
          </Typography>
        </div>
        <List>
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
                className="p-3 border-b-0"
              >
                <ListItemPrefix>
                  <PresentationChartBarIcon className="w-5 h-5" />
                </ListItemPrefix>

                <Typography color="blue-gray" className="mr-auto font-normal">
                  Dashboard
                </Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
              <List className="p-0">
                <Link to="#">
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="w-5 h-3" />
                    </ListItemPrefix>
                    Customer
                  </ListItem>
                </Link>
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="w-5 h-3" />
                  </ListItemPrefix>
                  Inventory
                </ListItem>
                <Link to="/cart-details">
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="w-5 h-3" />
                    </ListItemPrefix>
                    Cart
                  </ListItem>
                </Link>

                <Link to="/emp">
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="w-5 h-3" />
                    </ListItemPrefix>
                    Employee
                  </ListItem>
                </Link>

                <Link to="/sup">
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="w-5 h-3" />
                    </ListItemPrefix>
                    Supplier
                  </ListItem>
                </Link>

                <Link to="/transport">
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="w-5 h-3" />
                    </ListItemPrefix>
                    Transport
                  </ListItem>
                </Link>

                <Link to="/transport">
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="w-5 h-3" />
                    </ListItemPrefix>
                    Transport
                  </ListItem>
                </Link>

                <Link to="#">
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="w-5 h-3" />
                    </ListItemPrefix>
                    Order
                  </ListItem>
                </Link>
                <Link to="#">
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="w-5 h-3" />
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
                className={`mx-auto h-4 w-4 transition-transform ${
                  open === 2 ? 'rotate-180' : ''
                }`}
              />
            }
          >
            <ListItem className="p-0" selected={open === 2}>
              <AccordionHeader
                onClick={() => handleOpen(2)}
                className="p-3 border-b-0"
              >
                <ListItemPrefix>
                  <ShoppingBagIcon className="w-5 h-5" />
                </ListItemPrefix>
                <Typography color="blue-gray" className="mr-auto font-normal">
                  E-Commerce
                </Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
              <List className="p-0">
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="w-5 h-3" />
                  </ListItemPrefix>
                  Orders
                </ListItem>
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="w-5 h-3" />
                  </ListItemPrefix>
                  Products
                </ListItem>
              </List>
            </AccordionBody>
          </Accordion>
          <hr className="my-2 border-blue-gray-50" />
          <ListItem>
            <ListItemPrefix>
              <InboxIcon className="w-5 h-5" />
            </ListItemPrefix>
            Inbox
            <ListItemSuffix>
              <Chip
                value="14"
                size="sm"
                variant="ghost"
                color="blue-gray"
                className="rounded-full"
              />
            </ListItemSuffix>
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <UserCircleIcon className="w-5 h-5" />
            </ListItemPrefix>
            Profile
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <Cog6ToothIcon className="w-5 h-5" />
            </ListItemPrefix>
            Settings
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <PowerIcon className="w-5 h-5" />
            </ListItemPrefix>
            Log Out
          </ListItem>
        </List>
      </Card>
    </div>
  );
}

export default Sidebar;
