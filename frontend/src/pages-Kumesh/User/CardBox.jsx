// import React from "react";
// import "./CardDetails.css";
// function CardBox(props) {
//   const { address, cardholdername, cardnumber } = props.card;

//   return (
//     <div>
//       <div className="card-details-box">
//         <div className="card-set-pay">
//           <h1 className="card-num">{cardnumber}</h1>
//           <p>{address}</p>
//           <p>{cardholdername}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CardBox;

import React from "react";
import "./CardDetails.css";

function CardBox(props) {
  const { address, cardholdername, cardnumber } = props.card;

  // Get the last four digits of the card number
  const lastFourDigits = cardnumber.slice(-4);

  // Replace the rest of the digits with 'x'
  const maskedCardNumber = "xxxx xxxx xxxx " + lastFourDigits;

  return (
    <div className="card-details-box bg-white shadow-md rounded-lg p-6">
    <div className="card-set-pay">
      <h1 className="text-xl font-bold">{maskedCardNumber}</h1>
      <p className="text-gray-600">{address}</p>
      <p className="text-gray-600">{cardholdername}</p>
    </div>
  </div>
  
  );
}

export default CardBox;
