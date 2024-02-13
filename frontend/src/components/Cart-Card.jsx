import React from 'react';
import { Card, IconButton } from '@material-tailwind/react';

const CartItemCard = ({ item, onDelete }) => {
  return (
    <div className="flex flex-col items-center justify-center mb-4  item-cart">
      <img
        src={item.image}
        alt={item.name}
        className="w-32 h-32 object-cover mb-2"
      />
      <div className="text-center">
        <p className="text-lg font-semibold">{item.name}</p>
        <p className="text-gray-600">${item.price}</p>
        <ul className="flex flex-inline  item-center justify-center gap-1 m-2 ">
          <IconButton size="sm">
            <i className="fas fa-minus" />
          </IconButton>
          <p className="text-gray-600">Quantity: 1</p>{' '}
          <IconButton size="sm">
            <i className="fas fa-plus" />
          </IconButton>
        </ul>
      </div>
      <ul className="flex flex-inline gap-2  ">
        <IconButton
          color="red"
          className="mt-2"
          onClick={() => onDelete(item._id)}
        >
          <i className="fas fa-trash" />
        </IconButton>
        <IconButton
          color="light-green"
          className="mt-2"
          onClick={() => onDelete(item._id)}
        >
          <i className="fas fa-pen" />
        </IconButton>
      </ul>
    </div>
  );
};

export default CartItemCard;
