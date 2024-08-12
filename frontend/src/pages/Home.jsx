import React, { useEffect, useState } from 'react';
import ImageSlider from '../components/Slider';
import { SidebarWithBurgerMenu } from '../components/navBar';
import backgroundImage from '../assets/cool-background.png';
import axios from 'axios';
import Spinner from '../components/Spinner';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from '@material-tailwind/react';
import { useAuth } from '../middleware/authContext';
import { Footer } from '../components/Footer';
import ProfileMenu from '../components/Profile';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Product = ({ product }) => {
  const { addToCart, isLoggedIn } = useAuth();

  return (
    <Card
      key={product._id}
      className="mb-4 w-72 bg-light-green-200 hover:shadow-lg transition-shadow duration-300 ease-in-out"
    >
      <CardHeader shadow={false} floated={false} className="h-48">
        <img
          src={product.image}
          alt="card-image"
          className="object-cover w-full h-full"
        />
      </CardHeader>
      <CardBody>
        <div className="flex items-center justify-between mb-2">
          <Typography color="blue-gray" className="font-bold">
            {product.name}
          </Typography>
          <Typography color="blue-gray" className="font-medium">
            Rs. {product.price}
          </Typography>
        </div>
      </CardBody>
      <CardFooter className="pt-0">
        <Button
          style={{ backgroundColor: '#ff8f00' }}
          onClick={() => addToCart(product)}
          disabled={!isLoggedIn}
          className="w-full transition-transform duration-300 ease-in-out hover:scale-105"
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

function Home() {
  const images = [
    '/slider/slider_1.jpg',
    '/slider/slider_2.jpg',
    '/slider/slider_3.jpg',
  ];

  const url = 'http://localhost:8070/api';
  const [data, setData] = useState([]);
  const { loading, addToCart } = useAuth();

  const fetchInfo = () => {
    return axios.get(`${url}/products`).then((res) => setData(res.data));
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: 'linear',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const featuredProduct = data.length > 0 ? data[0] : null;
  const allProducts = data.slice(1); // Exclude the featured product

  return (
    <>
      <div className="relative bg-custom-color h-screen">
        <div className="absolute inset-0 overflow-hidden">
          <ImageSlider images={images} className="h-75vh w-full object-cover" />
        </div>
        <div className="relative z-10 flex justify-between p-4">
          <SidebarWithBurgerMenu />
          <ProfileMenu />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
          <h1 className="text-6xl text-white font-bold mb-4">
            Welcome to Our Store
          </h1>
          <p className="text-xl text-white mb-8">
            Discover our range of herbal and natural products
          </p>
          <Link to="/products">
            <Button size="lg" color="green" className="shadow-lg">
              Shop Now
            </Button>
          </Link>
        </div>
      </div>

      {featuredProduct && (
        <div className="max-w-7xl mx-auto mt-10 mb-10 flex items-center">
          <div className="w-1/2">
            <Card className="mb-4 w-full bg-light-green-200 hover:shadow-lg transition-shadow duration-300 ease-in-out">
              <CardHeader shadow={false} floated={false} className="h-64">
                <img
                  src={featuredProduct.image}
                  alt="featured-product-image"
                  className="object-cover w-full h-full"
                />
              </CardHeader>
              <CardBody>
                <Typography color="blue-gray" className="font-bold text-2xl">
                  {featuredProduct.name}
                </Typography>
                <Typography color="blue-gray" className="font-medium text-xl">
                  Rs. {featuredProduct.price}
                </Typography>
                <Typography color="gray" className="mt-2">
                  {featuredProduct.description}
                </Typography>
              </CardBody>
              <CardFooter className="pt-0">
                <Button
                  style={{ backgroundColor: '#ff8f00' }}
                  onClick={() => addToCart(featuredProduct)}
                  className="w-full transition-transform duration-300 ease-in-out hover:scale-105"
                >
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          </div>
          <div className="w-1/2 h-full flex flex-col justify-center items-center bg-green-100 p-10 rounded-lg">
            <Typography className="text-4xl font-bold text-green-900">
              Special Offer!
            </Typography>
            <Typography className="text-2xl text-gray-700 mt-4">
              Get 20% off on your first purchase
            </Typography>
            <Link to="/products">
              <Button
                size="lg"
                color="orange"
                className="mt-6 shadow-lg transition-transform duration-300 ease-in-out hover:scale-105"
              >
                Shop Now
              </Button>
            </Link>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto mt-10 mb-10">
        <h2 className="text-3xl font-bold text-center mb-6">All Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {allProducts.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      </div>

      {loading && (
        <div className="flex justify-center">
          <Spinner />
        </div>
      )}

      <div className="flex justify-center mx-auto mt-10 max-w-7xl">
        <Footer />
      </div>
    </>
  );
}

export default Home;
