import React from "react";
import { FaAddressCard } from "react-icons/fa6";
import { RiBankFill } from "react-icons/ri";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function CardDetails(props) {
  const { _id, address, cardholdername } = props.card;
  const history = useNavigate();

  const deleteHandler = async () => {
    const confirmDeletion = window.confirm("Are you sure you want to delete card details?");
    
    if (confirmDeletion) {
      try {
        await axios.delete(`http://localhost:8070/cards/${_id}`);
        alert("Card details deleted successfully!");
        history("/carddetails");
      } catch (error) {
        console.error("Error deleting card details:", error);
        // Handle the error appropriately
      }
    } else {
      console.log("Deletion canceled by user");
    }
  };

  return (
    <div className="table w-full">
      <div className="table-row bg-gray-100">
        <div className="table-cell p-4 flex items-center">
          <RiBankFill className="text-green-500 mr-2" />
          {cardholdername}
        </div>
        <div className="table-cell p-4 pt-2">{address}</div>
        <div className="table-cell p-4 flex items-center justify-center space-x-4">
          <Link to={`/carddetails/${_id}`}>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Update
            </button>
          </Link>
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={deleteHandler}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardDetails;
