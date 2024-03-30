import React, { useEffect, useState } from 'react';
import ImageSlider from '../components/Slider';
import { SidebarWithBurgerMenu } from '../components/navBar';
import backgroundImage from '../assets/product-list.jpg';
import axios from 'axios';
import Spinner from '../components/Spinner';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Input,
} from '@material-tailwind/react';
import { useAuth } from '../middleware/authContext';

const Product = ({ product }) => {
  const { addToCart, isLoggedIn } = useAuth(); // Accessing addToCart function from AuthProvider

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
          </div>

          <div>
            <Typography color="blue-gray" className="font-medium">
              Rs. {product.price}
            </Typography>
          </div>
        </div>
      </CardBody>
      <CardFooter className="pt-0">
        <Button
          onClick={() => addToCart(product)}
          disabled={!isLoggedIn} // Disable button if user is not logged in
          className="w-full  hover:scale-105 focus:scale-105 active:scale-100 transition-transform duration-300 ease-in-out"
          color="green"
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

function Home() {
  const images = [
    '/slider/slider_1.png',
    '/slider/slider_2.png',
    '/slider/slider_3.png',
  ];

  const url = 'http://localhost:8070/api';
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { loading } = useAuth(); // Accessing loading state from AuthProvider

  const fetchInfo = () => {
    return axios.get(`${url}/products`).then((res) => setData(res.data));
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = data.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <SidebarWithBurgerMenu />
      <div>
        <ImageSlider images={images} />
      </div>
      <div className="relative flex w-full gap-2 md:auto search">
        <Input
          type="search"
          placeholder="Search"
          containerProps={{
            className: 'min-w-[288px]',
          }}
          className="!border-t-green-300 pl-9 placeholder:text-green-300 focus:!border-green-300"
          labelProps={{
            className: 'before:content-none after:content-none',
          }}
          style={{ backgroundColor: '#f0f4f8', color: '#1b5e20' }}
          onChange={handleSearch}
        />
        <Button size="md" className="rounded-lg">
          Search
        </Button>
      </div>
      <div className="flex flex-wrap">
        {filteredData.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      {loading && (
        <div className="flex justify-center">
          {/* Show a loading indicator while fetching data */}
          <Spinner />
        </div>
      )}
    </div>
  );
}

export default Home;
