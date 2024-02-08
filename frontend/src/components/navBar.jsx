import React from 'react';
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
  Button,
} from '@material-tailwind/react';
import {
  Bars3Icon,
  ShoppingBagIcon,
  UserIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useAuth } from '../middleware/authContext';

function NavList() {
  const { isLoggedIn } = useAuth();
  return (
    <ul className="my-2 flex flex-col gap-2   lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="white-gray"
        className="p-1 font-medium"
      >
        {isLoggedIn ? (
          <Link to="/dashboard">
            <UserIcon />
          </Link>
        ) : (
          <>
            <ul className="my-2 flex flex-col gap-2   lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
              <li>
                <Link
                  to="/cart"
                  className="flex items-center hover:text-light-green-300 transition-colors"
                >
                  <ShoppingBagIcon className="h-6 w-6" strokeWidth={2} />
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="flex items-center hover:text-light-green-300 transition-colors"
                >
                  <UserIcon className="h-6 w-6" strokeWidth={2} />
                </Link>
              </li>
            </ul>
          </>
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
      <Navbar
        style={{ backgroundColor: '#0F4602', border: 'none' }}
        className="mx-auto max-w-screen-3xl px-6 py-3 !rounded-none "
      >
        <div className="flex items-center justify-between text-white-gray-900">
          <Typography
            as="a"
            href="/"
            variant="h6"
            className="mr-4 cursor-pointer py-1.5"
          >
            <Link to="/">Herbal Heaven</Link>
          </Typography>
          <ul className="my-2 flex flex-col gap-2   lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Typography
              as="li"
              variant="small"
              color="white-gray"
              className="p-1 font-medium"
            >
              <Link
                to="/products"
                className="flex items-center hover:text-light-green-300 transition-colors"
              >
                Products
              </Link>
            </Typography>
            <Typography
              as="li"
              variant="small"
              color="white-gray"
              className="p-1 font-medium"
            >
              <Link
                to="user/cart"
                className="flex items-center hover:text-light-green-300 transition-colors"
              >
                Cart
              </Link>
            </Typography>
            <Typography
              as="li"
              variant="small"
              color="white-gray"
              className="p-1 font-medium"
            >
              <Link
                to="#"
                className="flex items-center hover:text-light-green-300 transition-colors"
              >
                Blocks
              </Link>
            </Typography>
            <Typography
              as="li"
              variant="small"
              color="white-gray"
              className="p-1 font-medium"
            >
              <Link
                to="#"
                className="flex items-center hover:text-green-500 transition-colors"
              >
                Docs
              </Link>
            </Typography>
          </ul>
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
          <ul></ul>
        </Collapse>
      </Navbar>
    </header>
  );
}
