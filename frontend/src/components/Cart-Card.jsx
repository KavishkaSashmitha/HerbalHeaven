import React from 'react';
import { Card, IconButton, Typography } from '@material-tailwind/react';
import {
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
} from '@material-tailwind/react';
import { Link } from 'react-router-dom';

const CartItemCard = ({ item, onDelete }) => {
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
              ${item.price}
            </Typography>
            <ul className="flex flex-inline item-center justify-center gap-1 m-2">
              <IconButton size="sm">
                <i className="fas fa-minus" />
              </IconButton>
              <Typography
                variant="small"
                color="gray"
                className="text-gray-600"
              >
                Quantity: 1
              </Typography>
              <IconButton size="sm">
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
