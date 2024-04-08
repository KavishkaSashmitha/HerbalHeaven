import React from "react";
import "./CardDetails.css";
import { FaAddressCard } from "react-icons/fa6";
import { RiBankFill } from "react-icons/ri";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function CardDetails(props) {
  const { _id, address, cardholdername } = props.card;
  const history = useNavigate();

  // const deleteHandeler = async () => {
  //   await axios
  //     .delete(`http://localhost:8070/cards/${_id}`)
  //     .then((res) => res.data)
  //     .then(() => history("/"))
  //     .then(() => history("/carddetails"));
  // };
  const deleteHandeler = async () => {
    const confirmDeletion = window.confirm("Are you sure you want to delete card details?");
    
    if (confirmDeletion) {
      try {
        await axios.delete(`http://localhost:8070/cards/${_id}`);
        alert("Card details deleted successfully!");
        history("/carddetails");
        window.location.reload();
      } catch (error) {
        console.error("Error deleting card details:", error);
        // Handle the error appropriately
      }
    } else {
      // User chose not to delete, you can add additional logic if needed
      console.log("Deletion canceled by user");
    }
  };
  
  return (
    <div>
      
      <div className="ful-set-pay">
        <tr className="card-thead">
          <td className="card-td btn-set-rwo" data-label="Account">
            <RiBankFill className="add-pay-btn-tbl" /> {cardholdername}
          </td>
          <td className="card-td" data-label="Due Date">
            {address}
          </td>

          <td className="card-td" data-label="Amount">
            <Link to={`/carddetails/${_id}`}>
              <button className="updt-card">update</button>
            </Link>

            <button className="dlt-card" onClick={deleteHandeler}>
              Delete
            </button>
          </td>
        </tr>
      </div>
    </div>
  );
}

export default CardDetails;
