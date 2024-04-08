import 'tailwindcss/tailwind.css';
import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Input } from '@material-tailwind/react';
import { Card, Typography, Button } from '@material-tailwind/react';
import { Link } from 'react-router-dom';

const InventoryList = () => {
  const [items, setItems] = useState([]);
  const [searchItem, setSearchItem] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:8070/inventory/viewInventoryItems')
      .then((result) => setItems(result.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this item?'
    );
    if (confirmDelete) {
      axios
        .delete(`http://localhost:8070/inventory/deleteInventoryItem/${id}`)
        .then(() => {
          setItems(items.filter((item) => item._id !== id));
        })
        .catch((err) => console.log(err));
    }
  };

  const filteredItems = items.filter((item) => {
    return (
      item.productName.toLowerCase().includes(searchItem.toLowerCase()) ||
      item.shortDescription.toLowerCase().includes(searchItem.toLowerCase())
    );
  });

  return (
    <div className="flex justify-center items-center h-100 pt-5">
      <Card className="w-full max-w-10xl p-2">
        <Typography
          variant="h6"
          color="blue-gray"
          className="text-center text-3xl font-bold font-times bg-blue-gray-300 p-2 rounded-md"
        >
          Inventory List
        </Typography>

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

        <table className="w-full  table-auto text-left mx-auto p-10 mt-5">
          <thead>
            <tr>
              {[
                'Product No',
                'Product Name',
                'Short Description',
                'Cost',
                'Quantity',
                'Reorder Level',
                'Manufacture Date',
                'Expiary Date',
                'Image',
                'Action',
              ].map((head, index) => (
                <th
                  key={index}
                  className="border-b border-blue-gray-100 bg-green-300 p-7"
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
            {filteredItems.map((item) => (
              <tr key={item._id} className="even:bg-green-100 p-4">
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
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {item.shortDescription}
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
                <td className="p-9">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {item.quantity}
                  </Typography>
                </td>
                <td className="p-10">
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
                    <img
                      src={`http://localhost:8070/${item.image}`}
                      alt="img"
                    />
                  </Typography>
                </td>
                <td className="p-2">
                  <Link
                    to={`/inventory/update/${item._id}`}
                    className="btn btn-warning"
                  >
                    <Button color="green">Update</Button>
                  </Link>
                  <Button color="red" onClick={() => handleDelete(item._id)}>
                    Delete
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
      </Card>
    </div>
  );
};

export default InventoryList;