import React, { useState } from 'react';
import {
  Button,
  Checkbox,
  IconButton,
  Typography,
} from '@material-tailwind/react';
import Swal from 'sweetalert2';

const CartItemCard = ({
  item,
  onDelete,
  onUpdateQuantity,
  isSelected,
  onToggleSelect,
  onCheckout,
}) => {
  const [editedQuantity, setEditedQuantity] = useState(item.quantity);
  const [editing, setEditing] = useState(false);

  const handleChangeQuantity = (event) => {
    let newQuantity = parseInt(event.target.value.trim());
    if (isNaN(newQuantity)) {
      newQuantity = item.quantity;
    } else {
      newQuantity = Math.min(Math.max(1, newQuantity), item.stock);
    }
    setEditedQuantity(newQuantity);
  };

  const handleIncreaseQuantity = () => {
    setEditedQuantity(Math.min(editedQuantity + 1, item.stock));
  };

  const handleDecreaseQuantity = () => {
    setEditedQuantity(Math.max(1, editedQuantity - 1));
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleUpdate = async () => {
    try {
      await onUpdateQuantity(item._id, editedQuantity);
      setEditing(false);
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const handleDeleteConfirmation = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this item from the cart.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete(item._id);
      }
    });
  };

  return (
    <div className="bg-white w-full rounded-lg shadow-md p-4 mb-4 flex flex-col lg:flex-row items-center">
      <Checkbox
        checked={isSelected}
        onChange={() => onToggleSelect(item._id)}
      />
      <img
        variant="circular"
        alt={item.name}
        src={item.image}
        className="h-20 w-20 mb-4 lg:mb-0 lg:mr-4"
      />
      <div className="flex-grow">
        <Typography
          variant="h6"
          color="blue-gray"
          className="text-lg font-semibold"
        >
          Name: {item.name}
        </Typography>
        <Typography
          variant="h6"
          color="blue-gray"
          className="text-m font-semibold"
        >
          Quantity: {item.quantity}
        </Typography>
        <Typography variant="small" color="gray">
          Item Price: Rs.{item.price * editedQuantity}
        </Typography>
        {editing ? (
          <div className="flex items-center mt-2">
            <IconButton
              color="light-green"
              onClick={handleDecreaseQuantity}
              className="mr-2"
            >
              <i className="fas fa-minus" />
            </IconButton>
            <input
              type="number"
              value={editedQuantity}
              onChange={handleChangeQuantity}
              max={item.stock}
              className="border border-gray-400 rounded-md px-2 py-1 w-16 text-center mr-2"
            />
            <IconButton
              color="light-green"
              onClick={handleIncreaseQuantity}
              className="mr-2"
            >
              <i className="fas fa-plus" />
            </IconButton>
            <IconButton color="green" onClick={handleUpdate} className="mr-2">
              <i className="fas fa-check" />
            </IconButton>
          </div>
        ) : (
          <IconButton color="light-green" onClick={handleEdit} className="mr-2">
            <i className="fas fa-pencil-alt" />
          </IconButton>
        )}
      </div>
      <IconButton
        color="red"
        onClick={handleDeleteConfirmation}
        className="ml-auto"
      >
        <i className="fas fa-trash" />
      </IconButton>
    </div>
  );
};

export default CartItemCard;
