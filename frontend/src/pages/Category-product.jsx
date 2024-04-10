import React, { useState, useEffect } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Button,
  Typography,
} from '@material-tailwind/react';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5); // Number of products per page

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8070/api/products'); // Assuming your backend endpoint is '/api/products'
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

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Card>
      <CardHeader>
        <Typography variant="h2">Product List</Typography>
      </CardHeader>
      <CardBody>
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Quantity</th>
              <th className="p-4">Price</th>
              <th className="p-4">Description</th>
              <th className="p-4">Image</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product) => (
              <tr key={product._id}>
                <td className="p-4">{product.name}</td>
                <td className="p-4">{product.quantity}</td>
                <td className="p-4">{product.price}</td>
                <td className="p-4">{product.description}</td>
                <td className="p-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: '100px' }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardBody>
      <CardFooter>
        <div className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Page {currentPage} of {Math.ceil(products.length / productsPerPage)}
          </Typography>
          <div className="flex gap-2">
            {Array.from({
              length: Math.ceil(products.length / productsPerPage),
            }).map((_, index) => (
              <Button
                key={index}
                onClick={() => paginate(index + 1)}
                size="sm"
                variant={currentPage === index + 1 ? 'filled' : 'outlined'}
              >
                {index + 1}
              </Button>
            ))}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductList;
