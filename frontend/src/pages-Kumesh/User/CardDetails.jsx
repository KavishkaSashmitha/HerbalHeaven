import React from 'react';
import { RiBankFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CardDetails(props) {
  const { _id, address, cardholdername } = props.card;
  const history = useNavigate();

  const deleteHandler = async () => {
    const confirmDeletion = window.confirm(
      'Are you sure you want to delete card details?'
    );

    if (confirmDeletion) {
      try {
        await axios.delete(`http://localhost:8070/cards/${_id}`);
        alert('Card details deleted successfully!');
        history('/carddetails');
      } catch (error) {
        console.error('Error deleting card details:', error);
        // Handle the error appropriately
      }
    } else {
      console.log('Deletion canceled by user');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl overflow-hidden shadow-lg mb-4 mr-4">
      <div className="p-6">
        <div className="flex items-center">
          <RiBankFill className="text-4xl text-blue-500 mr-4" />
          <div>
            <h2 className="font-bold text-xl">{cardholdername}</h2>
            <p className="text-gray-500">{address}</p>
          </div>
        </div>
        <div className="mt-4 flex justify-between">
          <Link to={`/carddetails/${_id}`}>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Update
            </button>
          </Link>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={deleteHandler}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardDetails;
