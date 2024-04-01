import React, { useState } from 'react';
import { Card, IconButton, Typography } from '@material-tailwind/react';
import {
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
} from '@material-tailwind/react';

const CartItemCard = ({ item, onDelete, onUpdateQuantity }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedQuantity, setEditedQuantity] = useState(item.quantity);

  const handleEditQuantity = () => {
    setIsEditing(true);
  };

  const handleChangeQuantity = (event) => {
    const inputValue = event.target.value;
    if (inputValue.trim() !== '') {
      // Check if the input value is not empty
      const newQuantity = Math.max(1, parseInt(inputValue));
      setEditedQuantity(newQuantity);
    }
  };
  const handleSaveQuantity = async () => {
    try {
      await onUpdateQuantity(item._id, editedQuantity);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  return (
    <Card className="w-3/4 ml-4 mb-4 mx-auto bg-light-green-100">
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
              Rs.{item.price * editedQuantity}
            </Typography>
            {isEditing ? (
              <input
                type="number"
                value={editedQuantity}
                onChange={handleChangeQuantity}
                className="border border-gray-400 rounded-md px-2 py-1 mt-2"
              />
            ) : (
              <Typography
                variant="small"
                color="gray"
                className="text-gray-600 cursor-pointer"
                onClick={handleEditQuantity}
              >
                {editedQuantity}
              </Typography>
            )}
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
            {isEditing ? (
              <IconButton
                color="light-green"
                className="mt-2"
                onClick={handleSaveQuantity}
              >
                <i className="fas fa-check" />
              </IconButton>
            ) : (
              <IconButton
                color="light-green"
                className="mt-2"
                onClick={handleEditQuantity}
              >
                <i className="fas fa-pen" />
              </IconButton>
            )}
          </ul>
        </ListItem>
      </List>
    </Card>
  );
};

export default CartItemCard;
