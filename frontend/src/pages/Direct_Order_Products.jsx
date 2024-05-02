import React, { useState, useEffect } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Button,
  Typography,
  Breadcrumbs,
  Input,
  Tabs,
  TabsHeader,
  Tab,
  ButtonGroup,
} from '@material-tailwind/react';
import AdminNavbar from '../components/AdminNavbar';
import { DefaultSidebar } from '../components/Manager-Sidebar';
import { Link, NavLink } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5); // Number of products per page
  const [searchInput, setSearchInput] = useState(''); // State for search input
  const [directCart, setDirectCart] = useState({}); // State to manage cart items and quantities

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8070/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error.message);
      }
    };

    fetchProducts();
  }, []);

  // Logic to paginate products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Function to handle search input change
  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
    setCurrentPage(1); // Reset pagination when searching
  };

  // Filter products based on search input
  const filteredProducts = currentProducts.filter((product) =>
    product.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
  const toggleSidebar = () => {
    setOpen(!open);
  };

  // Function to post cart data to the database
  // Function to post cart data to the database
  const postCartData = async (product) => {
    try {
      // Create a new cart item object with the required properties
      const directCartItem = {
        productId: product._id,
        quantity: 1, // Assuming the initial quantity is 1 when adding to the cart
      };

      // Send the cart item to the backend
      const response = await fetch('http://localhost:8070/api/directcart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ item: directCartItem }), // Send a single cart item
      });

      if (!response.ok) {
        throw new Error('Failed to add item to cart');
      }

      // Handle success, maybe clear the cart state
      setDirectCart({});
    } catch (error) {
      console.error('Error adding item to cart:', error.message);
    }
  };

  return (
    <div
      className="flex flex-col h-screen overflow-hidden overflow-x-hidden"
      style={{ backgroundColor: '#02353c' }}
    >
      <div className="flex flex-1 overflow-hidden">
        <div
          className={`sidebar w-68 bg-custom-color text-white ${
            open ? 'block' : 'hidden'
          }`}
        >
          <DefaultSidebar open={open} handleOpen={setOpen} />
        </div>
        <div className="flex flex-col flex-1 overflow-hidden">
          <AdminNavbar toggleSidebar={toggleSidebar} />

          <Card className="overflow-hidden mr-4  ml-4 flex flex-1">
          <Breadcrumbs className="ml-2 mb-2 mt-2">
            <Link to="/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                </Link>
                <Link to="/dashboard">
                  <li class="flex items-center font-sans text-sm antialiased font-normal leading-normal transition-colors duration-300 cursor-pointer text-blue-gray-900 hover:text-amber-800">
                    <span>Dashboard</span>
                  </li>
                </Link>
                <Link to="/productCategory">
                  <li class="flex items-center font-sans text-sm antialiased font-normal leading-normal transition-colors duration-300 cursor-pointer text-blue-gray-900 hover:text-amber-800">
                    <span>Direct-items</span>
                  </li>
                </Link>
            </Breadcrumbs>

            <ButtonGroup className="mt-4 ml-4 mb-2" variant="outlined">
              <Button>
                <NavLink to="/productCategory" activeClassName="active-link">
                  Items
                </NavLink>
              </Button>

              <Button className="bg-black">
                <NavLink
                  to="/direct-cart"
                  className="text-white"
                  activeClassName="active-link"
                >
                  Cart
                </NavLink>
              </Button>
            </ButtonGroup>

            <div className="flex items-center ml-2 mb-4">
              <Input
                type="text"
                placeholder="Search by product name"
                value={searchInput}
                onChange={handleSearchInputChange}
                className="mr-2"
                label="search"
              />
              {/* Button to generate report */}
            </div>

            <CardBody>
              <div>
                <table className="w-full min-w-max table-auto text-left text-sm">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="px-4 py-2">#</th>
                      <th className="px-4 py-2">Product Name</th>
                      <th className="px-4 py-2">Stock</th>
                      <th className="px-4 py-2">Price</th>
                      <th className="px-4 py-2">Image</th>
                      <th className="px-4 py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((product, index) => (
                      <tr key={product._id}>
                        <td className="p-4">{index + 1}</td>
                        <td className="p-4">{product.name}</td>
                        <td className="p-4">{product.quantity}</td>
                        <td className="p-4">Rs.{product.price}</td>
                        <td className="p-4">
                          <img
                            src={product.image}
                            alt={product.name}
                            style={{ width: '50px' }}
                          />
                        </td>
                        <td className="p-4">
                          <Button
                            onClick={() => postCartData(product)}
                            color="teal"
                            ripple="light"
                            size="regular"
                          >
                            Add to Cart
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardBody>
            <CardFooter>
              <div className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  Page {currentPage} of{' '}
                  {Math.ceil(products.length / productsPerPage)}
                </Typography>
                <div className="flex gap-2">
                  {Array.from({
                    length: Math.ceil(products.length / productsPerPage),
                  }).map((_, index) => (
                    <Button
                      key={index}
                      onClick={() => paginate(index + 1)}
                      size="sm"
                      variant={
                        currentPage === index + 1 ? 'filled' : 'outlined'
                      }
                    >
                      {index + 1}
                    </Button>
                  ))}
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
