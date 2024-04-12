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
} from '@material-tailwind/react';
import AdminNavbar from '../components/AdminNavbar';
import { DefaultSidebar } from '../components/Manager-Sidebar';
import { Link } from 'react-router-dom';

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
      <div className="flex flex-1 overflow-scroll">
        <div
          className={`sidebar w-68 bg-custom-color text-white ${
            open ? 'block' : 'hidden'
          }`}
        >
          <DefaultSidebar open={open} handleOpen={setOpen} />
        </div>
        <div className="flex flex-col flex-1 overflow-scroll">
          <AdminNavbar toggleSidebar={toggleSidebar} />

          <Card className="flex flex-col flex-1 ml-2">
            <Breadcrumbs className="ml-2 mb-2 mt-2">
              {/* Breadcrumbs */}
            </Breadcrumbs>

            <div className="flex w-max gap-4 md-auto ml-2 mt-4 mb-4">
              <Link to="/productCategory">
                <Button className="flex">Direct Sell</Button>
              </Link>
              <Link to="/directcart">
                <Button className="flex">Direct Cart</Button>
              </Link>
            </div>
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
                  <thead>{/* Table header */}</thead>
                  <tbody>
                    {filteredProducts.map((product) => (
                      <tr key={product._id}>
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
