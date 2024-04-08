import React from 'react';
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
  Button,
} from '@material-tailwind/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useAuth } from '../middleware/authContext';

function NavList() {
  const { isLoggedIn } = useAuth();
  return (
    <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <Link
          to="/products"
          className="flex items-center hover:text-blue-500 transition-colors"
        >
          Products
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <Link
          to="user/cart"
          className="flex items-center hover:text-blue-500 transition-colors"
        >
          Cart
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <Link
          to="#"
          className="flex items-center hover:text-blue-500 transition-colors"
        >
          Blocks
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <Link
          to="#"
          className="flex items-center hover:text-blue-500 transition-colors"
        >
          Docs
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        {isLoggedIn ? (
          <Link to="/dashboard">
            <Button>Dashboard</Button>
          </Link>
<<<<<<< Updated upstream
        ) : (
          <Link to="/login">
            <Button color="teal">Login</Button>
          </Link>
        )}
      </Typography>
    </ul>
  );
}

export function NavbarSimple() {
  const [openNav, setOpenNav] = React.useState(false);

  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

  React.useEffect(() => {
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (
    <header>
      <Navbar className="mx-auto max-w-screen-3xl px-6 py-3  " color="amber">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography
            as="a"
            href="#"
            variant="h6"
            className="mr-4 cursor-pointer py-1.5"
          >
            <Link to="/">Herbal Heaven</Link>
          </Typography>
          <div className="hidden lg:block">
            <NavList />
          </div>
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <XMarkIcon className="h-6 w-6" strokeWidth={2} />
            ) : (
              <Bars3Icon className="h-6 w-6" strokeWidth={2} />
            )}
          </IconButton>
        </div>
        <Collapse open={openNav}>
          <NavList />
        </Collapse>
      </Navbar>
    </header>
=======

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
                    open === 1 ? "rotate-180" : ""
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
                  <Link to="#">
                    <ListItem>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Customer
                    </ListItem>
                  </Link>
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Inventory
                  </ListItem>
                  <Link to="#">
                    <ListItem>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Cart
                    </ListItem>
                  </Link>

                  <Link to="/emp">
                    <ListItem>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Employee
                    </ListItem>
                  </Link>

                  <Link to="/sup">
                    <ListItem>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Supplier
                    </ListItem>
                  </Link>

                  <Link to="#">
                    <ListItem>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Transport
                    </ListItem>
                  </Link>

                  <Link to="#">
                    <ListItem>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Order
                    </ListItem>
                  </Link>
                  <Link to="/carddetails">
                    <ListItem>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Payment
                    </ListItem>
                  </Link>
                </List>
              </AccordionBody>
            </Accordion>
            <Link to="#">
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
            <Link to="/netincome">
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
                      Net Income
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
                    <ListItemSuffix>
                      <Chip
                        value={cartCount}
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
>>>>>>> Stashed changes
  );
}
