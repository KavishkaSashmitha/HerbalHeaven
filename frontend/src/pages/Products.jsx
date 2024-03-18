/* eslint-disable jsx-a11y/img-redundant-alt */
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from '@material-tailwind/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuth } from '../middleware/authContext';
import { SidebarWithBurgerMenu } from '../components/navBar';

const Product = ({ product }) => {
  const { addToCart } = useAuth();

  return (
    <>
    <SidebarWithBurgerMenu />
    <Card key={product._id} className="w-96 mb-4 mt-2  ml-2 bg-light-green-200">
      <CardHeader shadow={false} floated={false} className="h-96">
        <img
          src={product.image} // Assuming your product object has an 'image' property
          alt="card-image"
          className="h-full w-full object-cover"
        />
      </CardHeader>
      <CardBody>
        <div className="mb-2 flex items-center justify-between ">
          <Typography color="blue-gray" className="font-medium">
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
    </>
  );
};

export function EcommerceCard() {
  const url = 'http://localhost:8070/api';
  const [data, setData] = useState([]);

  const fetchInfo = () => {
    return axios.get(`${url}/products`).then((res) => setData(res.data));
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div>
      {data.map((product) => (
        <Product key={product._id} product={product} />
      ))}
    </div>
  );
}

export default EcommerceCard;
