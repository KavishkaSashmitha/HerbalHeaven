import React, { useState, useEffect } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Button,
  Typography,
  Breadcrumbs,
} from '@material-tailwind/react';
import AdminNavbar from '../components/AdminNavbar';
import { DefaultSidebar } from '../components/Manager-Sidebar';
import { Link } from 'react-router-dom';
import { QrReader } from 'react-qr-reader';
import QRCode from 'qrcode';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);
  const [searchInput, setSearchInput] = useState('');
  const [directCart, setDirectCart] = useState({});
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showScanner, setShowScanner] = useState(false);
  const [scannedMessage, setScannedMessage] = useState(null); // State to hold scanned message

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

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
    setCurrentPage(1);
  };

  const filteredProducts = currentProducts.filter((product) =>
    product.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const toggleSidebar = () => {
    setOpen(!open);
  };
  const handleScan = async (data) => {
    console.log('Scanned result:', data);
    if (data) {
      try {
        const response = await fetch(
          `http://localhost:8070/api/products/${data}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        const productData = await response.json();
        // Update products state with only the scanned product
        setProducts([productData]);
        setScannedMessage(`Scanned successfully: ${productData.name}`);
      } catch (error) {
        console.error('Error scanning QR code:', error.message);
        setScannedMessage(`Error scanning QR code: ${error.message}`);
      }
    }
  };

  const handleError = (error) => {
    console.error('QR code scanning error:', error);
    setScannedMessage(`QR code scanning error: ${error.message}`); // Set error message
  };
  const handleResult = async (result) => {
    // Handle the result of the QR code scanning process
    console.log('Scanned result:', result);
    // Optionally, you can process the scanned result here
    if (result) {
      try {
        const response = await fetch(
          `http://localhost:8070/api/products/${result}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        const productData = await response.json();
        await postCartData(productData);
        setScannedMessage(`Scanned successfully: ${result}`); // Set scanned message
      } catch (error) {
        console.error('Error scanning QR code:', error.message);
        setScannedMessage(`Error scanning QR code: ${error.message}`); // Set error message
      } finally {
        setShowScanner(false); // Turn off the scanner
      }
    }
  };

  const renderQrScanner = () => (
    <div className="w-full max-w-md mx-auto mt-4">
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        onResult={handleResult}
        style={{ width: '100%' }}
      />
    </div>
  );

  const postCartData = async (product) => {
    try {
      const directCartItem = {
        productId: product._id,
        quantity: 1,
      };

      const response = await fetch('http://localhost:8070/api/directcart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ item: directCartItem }),
      });

      if (!response.ok) {
        throw new Error('Failed to add item to cart');
      }

      // Optionally, you can update state or show a success message here
      console.log('Product added to cart successfully');
    } catch (error) {
      console.error('Error adding item to cart:', error.message);
      // Handle error appropriately
    }
  };

  const generateAndDownloadQRCode = async () => {
    if (selectedProducts.length === 1) {
      const product = selectedProducts[0];
      const qrCodeDataUrl = await QRCode.toDataURL(product.name);

      const downloadLink = document.createElement('a');
      downloadLink.href = qrCodeDataUrl;
      downloadLink.download = `${product.name}-qrcode.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } else if (selectedProducts.length > 1) {
      // Logic to generate QR codes for multiple selected products
      // Same as the existing logic
    }
  };

  const handleCheckboxChange = (e, product) => {
    if (e.target.checked) {
      setSelectedProducts([...selectedProducts, product]);
    } else {
      setSelectedProducts(
        selectedProducts.filter((p) => p._id !== product._id)
      );
    }
  };
  

  return (
    <div
      className="flex flex-col h-screen overflow-auto overflow-x-hidden"
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
        <div className="flex flex-col flex-1 ">
          <AdminNavbar toggleSidebar={toggleSidebar} />
          <Card className="overflow-hidden mr-4 ml-4 flex ">
            <CardBody>
              <Breadcrumbs className="ml-2 mb-2 mt-2">
                <Link to="/">
                  <span>Dashboard</span>
                </Link>
                <Link to="/productCategory">
                  <span>Direct-items</span>
                </Link>
              </Breadcrumbs>
              <div>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchInput}
                  onChange={handleSearchInputChange}
                  className="rounded-lg p-2 w-full mb-4"
                />
              </div>
              <div className="fixed bottom-0 right-0 mr-4 mb-4">
                <Button onClick={() => setShowScanner(!showScanner)}>
                  Toggle QR Scanner
                </Button>
                {showScanner && renderQrScanner()}
                {selectedProducts.length > 0 && (
                  <Button onClick={generateAndDownloadQRCode}>
                    Generate QR Codes
                  </Button>
                )}
                {scannedMessage && (
                  <Typography color="red" className="mt-2">
                    {scannedMessage}
                  </Typography>
                )}
              </div>
              <table className="w-full min-w-max table-auto text-left text-sm">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-4 py-2">#</th>
                    <th className="px-4 py-2">Product Name</th>
                    <th className="px-4 py-2">Stock</th>
                    <th className="px-4 py-2">Price</th>
                    <th className="px-4 py-2">Image</th>
                    <th className="px-4 py-2">Actions</th>
                    <th className="px-4 py-2">Select</th>
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
                      <td className="p-4">
                        <input
                          type="checkbox"
                          onChange={(e) => handleCheckboxChange(e, product)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex justify-between mt-4">
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    Page {currentPage} of{' '}
                    {Math.ceil(products.length / productsPerPage)}
                  </Typography>
                </div>
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
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
