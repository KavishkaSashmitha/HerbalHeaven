import React, { useState } from 'react';
import { Card, IconButton, Typography } from '@material-tailwind/react';
import {
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
} from '@material-tailwind/react';
import { Link } from 'react-router-dom';

const CartItemCard = ({ item, onDelete }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <Card className="w-full ml-4 mb-4 mx-auto bg-light-green-100">
      <List>
        <ListItem>
          <ListItemPrefix>
            <Avatar variant="circular" alt={item.name} src={item.image} />
          </ListItemPrefix>
          <div className="flex flex-col items-center justify-center">
            <Typography
              variant="h6"
              color="blue-gray"
              className="text-lg font-semibold"
            >
              {item.name}
            </Typography>
            <Typography variant="small" color="gray" className="text-gray-600">
              ${item.price * quantity}
            </Typography>
            <ul className="flex flex-inline item-center justify-center gap-1 m-2">
              <IconButton size="sm" onClick={handleDecreaseQuantity}>
                <i className="fas fa-minus" />
              </IconButton>
              <Typography
                variant="small"
                color="gray"
                className="text-gray-600"
              >
                {quantity}
              </Typography>
              <IconButton size="sm" onClick={handleIncreaseQuantity}>
                <i className="fas fa-plus" />
              </IconButton>
            </ul>
          </div>
        </ListItem>
        <ListItem>
          <ul className="flex justify-center mx-auto gap-2">
            <IconButton
              color="red"
              className="mt-2"
              onClick={() => onDelete(item._id)}
            >
              <i className="fas fa-trash" />
            </IconButton>
            <Link to={`update/${item.id}`}>
              <IconButton color="light-green" className="mt-2">
                <i className="fas fa-pen" />
              </IconButton>
            </Link>
          </ul>
        </ListItem>
      </List>
    </Card>
  );
};

export default CartItemCard;
