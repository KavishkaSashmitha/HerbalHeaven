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

const Product = ({ product }) => {
  const { addToCart } = useAuth();

  return (
    <Card key={product._id} className="w-96 mb-4">
      <CardHeader shadow={false} floated={false} className="h-96">
        <img
          src="img/p1.png" // Assuming your product object has an 'image' property
          alt="card-image"
          className="h-full w-full object-cover"
        />
      </CardHeader>
      <CardBody>
        <div className="mb-2 flex items-center justify-between">
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
          ripple={false}
          fullWidth={true}
          onClick={() => addToCart(product)}
          className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
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

  const fetchInfo = () => {
    return axios.get(`${url}/products`).then((res) => setData(res.data));
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return <div>{data.map((product) => <Product key={product._id} product={product} />)}</div>;
}

export default EcommerceCard;
