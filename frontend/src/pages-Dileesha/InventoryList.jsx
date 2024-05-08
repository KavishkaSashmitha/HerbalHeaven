import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Input } from '@material-tailwind/react';
import { Card, Typography, Button, IconButton } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Footer } from '../components/Footer';
import AdminNavbar from '../components/AdminNavbar';
import { DefaultSidebar } from '../components/Manager-Sidebar';

const InventoryList = () => {
  const [open, setOpen] = React.useState(0);

  const [items, setItems] = useState([]);
  const [searchItem, setSearchItem] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);

  const toggleSidebar = () => {
    setOpen(!open);
  };

  useEffect(() => {
    axios
      .get('http://localhost:8070/inventory/viewInventoryItems')
      .then((result) => setItems(result.data))
      .catch((err) => console.log(err));
  }, [items]);

  const handleDelete = (id) => {
    const confirmDelete = Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this Employee!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true,
    });
    if (confirmDelete) {
      axios
        .delete(`http://localhost:8070/inventory/deleteInventoryItem/${id}`)
        .then(() => {
          setItems(items.filter((item) => item._id !== id));
        })
        .catch((err) => console.log(err));
    }
  };

  /*
  const handleReorderList = () => {
    const reorderItem = items.filter((item) => item.quantity < item.reorderLevel);
    
    const products = reorderItem
    // Extract necessary fields and structure them according to the backend schem
    // Send products array to the backend
    axios.post('http://localhost:8070/inventory/addReorderItem',products )
      .then((response) => {
        console.log('Reorder items sent successfully:', response.data);
        
        // Optionally handle navigation here if needed
      })
      .catch((error) => {
        console.error('Error sending reorder items:', error);
      });
  };
  */

  const handleReorderList = () => {
    // Filter items based on the reorder condition
    const reorderItem = items.filter(
      (item) => item.quantity < item.reorderLevel
    );

    // Map the filtered items to the format expected by the backend
    const products = reorderItem.map((item) => ({
      productID: item._id,
      productNo: item.productNo,
      productName: item.productName,
      category: item.category,
      quantity: item.quantity,
      reorderLevel: item.reorderLevel,
    }));

    // Log the data to be sent (optional)
    console.log('Data to be sent:', products);

    axios
      .post('http://localhost:8070/inventory/addReorderItem', { products })
      .then((response) => {
        console.log('Reorder items sent successfully:', response.data);
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Reorder list sent successfully!',
          showConfirmButton: false,
          timer: 1500,
        });

        // Optionally handle navigation or state updates here
      })
      .catch((error) => {
        console.error('Error sending reorder items:', error);
      });
  };
  const filteredItems = items.filter((item) => {
    return (
      item.productName.toLowerCase().includes(searchItem.toLowerCase()) ||
      item.shortDescription.toLowerCase().includes(searchItem.toLowerCase()) ||
      item.category.toLowerCase().includes(searchItem.toLowerCase())
    );
  });

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const nextPage = () => setCurrentPage(currentPage + 1);
  const prevPage = () => setCurrentPage(currentPage - 1);

  //generate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredItems.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  //end
  //handle publish
  const handlePublish = async (item) => {
    try {
      // Check if all required fields are present in the item
      if (
        !item.productName ||
        !item.quantity ||
        !item.cost ||
        !item.shortDescription ||
        !item.image
      ) {
        console.error('Failed to create product: Missing required fields');
        // Optionally, display an error message to the user or handle the error accordingly
        return;
      }

      const newProductData = {
        name: item.productName,
        quantity: item.quantity,
        price: item.cost,
        description: item.shortDescription,
        image: item.image,
      };

      const response = await axios.post(
        'http://localhost:8070/api/products/save',
        newProductData
      );

      if (response.status === 201) {
        console.log('Product created successfully:', response.data);
        // Optionally, update the state or perform any other actions
      } else {
        console.error('Failed to create product:', response.statusText);
        // Optionally, display an error message to the user
      }
    } catch (error) {
      console.error('Error creating product:', error.message);
      // Optionally, display an error message to the user
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
        <div className="w-full h-full ">
          <AdminNavbar toggleSidebar={toggleSidebar} />
          <Card className="w-full max-w-10xl p-2">
            <Typography
              variant="h6"
              color="blue-gray"
              className="text-center text-3xl font-bold font-times bg-blue-gray-100 p-2 rounded-md"
            >
              Inventory List
            </Typography>

            <div className="flex justify-between items-center">
              <div className="flex-grow">
                <Typography variant="h6" color="blue-gray">
                  Search Product
                </Typography>
                <Input
                  type="text"
                  placeholder="Search..."
                  value={searchItem}
                  onChange={(e) => setSearchItem(e.target.value)}
                  className="mb-6 max-w-30"
                />
              </div>
              <div>
                <Button
                  class="select-none rounded-lg bg-black-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-black-500/20 transition-all hover:shadow-lg hover:shadow-black-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  type="button"
                  className=" ml-2 mt-5"
                  onClick={handleReorderList}
                >
                  Reorder List
                </Button>
              </div>
              <div>
                <Link to="/inventory/report" className="btn btn-primary">
                  <Button
                    class="select-none rounded-lg bg-black-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-black-500/20 transition-all hover:shadow-lg hover:shadow-black-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                    className=" ml-2 mt-5"
                  >
                    Generate Report
                  </Button>
                </Link>
              </div>
            </div>

            <table className="w-full  table-auto text-left mx-auto p-10 mt-5">
              <thead>
                <tr>
                  {[
                    'Product No',
                    'Product Name',
                    // 'Short Description',
                    'category',
                    'Cost',
                    'Quantity',
                    'Reorder Level',
                    'Manufacture Date',
                    'Expiary Date',
                    'Image',
                    'Action',
                    'Publish',
                  ].map((head, index) => (
                    <th
                      key={index}
                      className="border-b border-blue-gray-100 bg-blue-gray-200 p-7"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-semibold leading-none opacity-70 text-black"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginatedItems.map((item) => (
                  <tr key={item._id} className="even:bg-blue-gray-50 p-4">
                    <td className="p-8">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item.productNo.toString().replace(/\d/g, '*')}
                      </Typography>
                    </td>
                    <td className="p-2">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item.productName}
                      </Typography>
                    </td>
                    {/* <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item.shortDescription}
                      </Typography>
                    </td> */}
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item.category}
                      </Typography>
                    </td>
                    <td className="p-5">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        Rs {item.cost}/=
                      </Typography>
                    </td>
                    <td className="p-8">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item.quantity}
                      </Typography>
                    </td>
                    <td className="p-8">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item.reorderLevel}
                      </Typography>
                    </td>
                    <td className="p-5">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {new Date(item.manufactureDate)
                          .toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                          })
                          .replace(/\//g, '-')}
                      </Typography>
                    </td>
                    <td className="p-2">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {new Date(item.expiaryDate)
                          .toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                          })
                          .replace(/\//g, '-')}
                      </Typography>
                    </td>
                    <td className="p-2">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item.image && (
                          <img
                            src={`${item.image}`}
                            alt="Product"
                            style={{ width: '100px', height: '80px' }}
                          />
                        )}
                      </Typography>
                    </td>
                    <td className="p-1">
                      <Link
                        to={`/inventory/update/${item._id}`}
                        className="btn btn-warning"
                      >
                        <Button color="green">Update</Button>
                      </Link>
                      <Button
                        color="red"
                        className="mr-1 mt-1"
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </Button>
                    </td>
                    <td>
                      <Button
                        color="yellow"
                        className="ml-0 mt-2 "
                        onClick={() => handlePublish(item)}
                      >
                        Publish
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Link to="/inventory/add" className="btn btn-primary">
              <Button
                class="select-none rounded-lg bg-black-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-black-500/20 transition-all hover:shadow-lg hover:shadow-black-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
                className="mt-3"
              >
                Add New Product
              </Button>
            </Link>
            <div className="flex justify-end mt-4">
              {/* Previous page button */}
              <Button
                className="bg-custom-color hover:bg-amber-800 text-cyan-50"
                variant="outlined"
                size="sm"
                onClick={prevPage}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <div className="flex items-center gap-2 ">
                {pageNumbers.map((number) => (
                  <IconButton
                    className="bg-custom-color hover:bg-amber-800 text-cyan-50"
                    key={number}
                    variant={number === currentPage ? 'outlined' : 'text'}
                    size="sm"
                    onClick={() => setCurrentPage(number)}
                  >
                    {number}
                  </IconButton>
                ))}
              </div>
              <Button
                className="bg-custom-color hover:bg-amber-800 text-cyan-50"
                variant="outlined"
                size="sm"
                onClick={nextPage}
                disabled={indexOfLastItem >= filteredItems.length}
              >
                Next
              </Button>
            </div>
          </Card>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default InventoryList;
