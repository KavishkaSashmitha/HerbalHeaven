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
import ProfileMenu from '../components/Profile';
import { FaCartShopping } from 'react-icons/fa6';

const Product = ({ product, addToCart }) => {
  return (
    <Card key={product._id} className="w-72 mb-4 mt-2 ml-2 bg-blue-gray-200">
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
          style={{ backgroundColor: '#ff8f00' }}
          className="flex items-center w-full hover:scale-105 focus:scale-105 active:scale-100 transition-transform duration-300 ease-in-out"
        >
          <FaCartShopping className="h-5 w-5 mr-2" />{' '}
          {/* Added margin to separate icon and text */}
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

  const fetchInfo = () => {
    return axios.get(`${url}/api/products`).then((res) => setData(res.data));
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

      <div></div>
      <div className="flex flex-wrap justify-center">
        {filteredData.map((product) => (
          <Product key={product._id} product={product} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
}

export default EcommerceCard;
