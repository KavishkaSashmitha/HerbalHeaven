// EcommerceCard.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../middleware/authContext';
import { SidebarWithBurgerMenu } from '../components/navBar';
import ProfileMenu from '../components/Profile';
import {
  Input,
  Dropdown,
  DropdownItem,
  Typography,
  Button,
} from '@material-tailwind/react';
import Product from './Products';

const EcommerceCard = () => {
  const url = 'http://localhost:8070';
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { addToCart } = useAuth();
  const [sortBy, setSortBy] = useState(''); // State for sorting
  const [viewMode, setViewMode] = useState('grid'); // State for view mode

  const fetchInfo = async () => {
    const res = await axios.get(`${url}/api/products`);
    setData(res.data);
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  const sortedData = [...data].sort((a, b) => {
    if (sortBy === 'price') {
      return a.price - b.price;
    }
    return 0;
  });

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: '#02353c',
        }}
      />
      <div className="relative flex justify-between">
        <SidebarWithBurgerMenu />
        <div className="relative flex w-1/2 gap-2 mt-2 mb-2 md:auto justify-center mx-auto">
          <Input
            type="search"
            color="black"
            label="Type here..."
            className="pr-20"
            containerProps={{
              className: 'min-w-[288px]',
            }}
            onChange={handleSearch}
          />
          <Dropdown
            color="white"
            placement="bottom-end"
            buttonText="Sort By"
            buttonType="filled"
            size="regular"
            block={false}
            ripple="light"
            onChange={handleSortChange}
          >
            <DropdownItem color="white" ripple="light" value="price">
              Price
            </DropdownItem>
            {/* Add more sorting options if needed */}
          </Dropdown>
          <Button
            size="sm"
            color="white"
            className="!absolute right-1 top-1 rounded"
            onClick={() => setViewMode(viewMode === 'list' ? 'grid' : 'list')}
          >
            {viewMode === 'list' ? 'Grid View' : 'List View'}
          </Button>
        </div>

        <ProfileMenu />
      </div>

      <div>
        <Typography className="white">Product List</Typography>
        <div
          className={viewMode === 'grid' ? 'flex flex-wrap justify-center' : ''}
        >
          {sortedData
            .filter(
              (product) =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
            )
            .map((product) => (
              <Product
                key={product._id}
                product={product}
                addToCart={addToCart}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default EcommerceCard;
