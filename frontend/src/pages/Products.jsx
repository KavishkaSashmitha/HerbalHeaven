import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Input,
} from '@material-tailwind/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuth } from '../middleware/authContext';
import { SidebarWithBurgerMenu } from '../components/navBar';
import backgroundImage from '../assets/product-list.jpg';

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
          className="w-full  hover:scale-105 focus:scale-105 active:scale-100 transition-transform duration-300 ease-in-out"
          color="green"
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export function EcommerceCard() {
  const url = 'http://localhost:8070/api';
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { addToCart } = useAuth();

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
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        minHeight: '100vh',
      }}
    >
      <SidebarWithBurgerMenu />
      <div className="relative flex  w-3/4 gap-2 md:auto search">
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
        <Button size="md" className="rounded-lg ">
          Search
        </Button>
      </div>
      <div className="flex flex-wrap">
        {filteredData.map((product) => (
          <Product key={product._id} product={product} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
}

export default EcommerceCard;
