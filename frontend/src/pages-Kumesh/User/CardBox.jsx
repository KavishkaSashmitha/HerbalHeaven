import React from "react";
import "./CardDetails.css";
function CardBox(props) {
  const { address, cardholdername, cardnumber } = props.card;

  return (
    <div>
      <div className="card-details-box">
        <div className="card-set-pay">
          <h1 className="card-num">{cardnumber}</h1>
          <p>{address}</p>
          <p>{cardholdername}</p>
        </div>
      </div>
    </div>
  );
}

export default CardBox;
