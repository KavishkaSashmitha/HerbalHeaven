import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Input,
  Select,
  Option,
} from '@material-tailwind/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuth } from '../middleware/authContext';
import { SidebarWithBurgerMenu } from '../components/navBar';
import backgroundImage from '../assets/product-list.jpg';
import ProfileMenu from '../components/Profile';
import { FaCartShopping } from 'react-icons/fa6';

const Product = ({ product, addToCart }) => {
  return (
    <Card key={product._id} className="w-72 mb-4 mt-2 ml-2 bg-light-green-200">
      <CardHeader shadow={false} floated={false} className="h-48">
        <img
          src={product.image}
          alt="card-image"
          className="h-full  w-full object-cover"
        />
      </CardHeader>
      <CardBody>
        <div className="mb-2 flex items-center justify-between ">
          <div>
            <Typography color="blue-gray" className="font-bold variant-h3 ">
              {product.name}
            </Typography>
            <Typography color="blue-gray" className="font-medium">
              ${product.price}
            </Typography>
          </div>
          <Typography
            variant="small"
            color="gray"
            className="font-normal opacity-75"
          >
            {product.description}
          </Typography>
        </div>
      </CardBody>
      <CardFooter className="pt-0">
        <Button
          onClick={() => addToCart(product)}
          style={{ backgroundColor: '#ff8f00' }}
          className="flex items-center w-full hover:scale-105 focus:scale-105 active:scale-100 transition-transform duration-300 ease-in-out"
        >
          <FaCartShopping className="h-5 w-5 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export function EcommerceCard() {
  const url = 'http://localhost:8070';
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { addToCart } = useAuth();
  const [sortBy, setSortBy] = useState('');

  const fetchInfo = () => {
    return axios.get(`${url}/api/products`).then((res) => setData(res.data));
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortBy = (selectedValue) => {
    if (selectedValue) {
      setSortBy(selectedValue);
    }
  };

  const sortByPriceAsc = () => {
    const sortedData = [...data].sort((a, b) => a.price - b.price);
    setData(sortedData);
  };

  const sortByPriceDesc = () => {
    const sortedData = [...data].sort((a, b) => b.price - a.price);
    setData(sortedData);
  };

  useEffect(() => {
    if (sortBy === 'priceAsc') {
      sortByPriceAsc();
    } else if (sortBy === 'priceDesc') {
      sortByPriceDesc();
    }
  }, [sortBy]);

  const filteredData = data.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  console.log(sortBy);
  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%', 
          height: '100%',
          backgroundColor: '#02353c',
          backgroundSize: 'cover',
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
          <Button
            size="sm"
            color="white"
            className="!absolute right-1 top-1 rounded"
          >
            Search
          </Button>
        </div>

        <ProfileMenu />
      </div>
      <Card>
        <div className="flex justify-between items-center px-4 py-2">
          <Typography color="black" className="text-xl font-bold ">
            Products ({filteredData.length})
          </Typography>
          <div className="w-72">
            <Select
              label="Sort by"
              onChange={(selectedValue) => handleSortBy(selectedValue)}
              value={sortBy}
            >
              <Option value="priceAsc">Price: Low to High</Option>
              <Option value="priceDesc">Price: High to Low</Option>
            </Select>
          </div>
        </div>
        <CardBody>
          <div className="flex flex-wrap justify-center">
            {filteredData.map((product) => (
              <Product
                key={product._id}
                product={product}
                addToCart={addToCart}
              />
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default EcommerceCard;
